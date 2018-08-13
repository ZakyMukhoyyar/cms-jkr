package com.agit.services.impl;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.security.authentication.encoding.Md5PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.project.common.DataTables;
import com.agit.controller.administration.model.MenuModel;
import com.agit.controller.administration.model.StateModel;
import com.agit.controller.administration.model.UserModel;
import com.agit.dao.AdminDao;
import com.agit.dao.InterfaceBaseDao;
import com.agit.entity.security.SecComponent;
import com.agit.entity.security.SecMenu;
import com.agit.entity.security.SecRole;
import com.agit.entity.security.SecRoledetail;
import com.agit.entity.security.SecUser;
import com.agit.entity.security.SecUserrole;
import com.agit.services.AdminService;
import com.agit.services.GenericService;

@Service
@Transactional(readOnly = true)
public class AdminServiceImpl extends AbstractServiceImpl<SecUser> implements AdminService {

	@Autowired
	SessionFactory sessionFactory;

	@Autowired
	private AdminDao adminDao;

	@Autowired
	protected GenericService genericService;

	@Override
	public Class<SecUser> getRealClass() {
		return SecUser.class;
	}

	@Override
	public InterfaceBaseDao<SecUser> getDao() {
		return this.adminDao;
	}

	Md5PasswordEncoder encoder = new Md5PasswordEncoder();

	@Transactional(propagation = Propagation.REQUIRED)
	@Override
	public void saveOrUpdate(SecUser secUser) {
		super.saveOrUpdate(secUser);
	}

	@Override
	public String encodePassword(String password) {
		return encoder.encodePassword(password, null);
	}

	@Override
	public SecUser getSecUser(String username) {
		return adminDao.getSecUser(username);
	}

	@Override
	public List<String> getAllRights() {
		return adminDao.getAllRights();
	}

	@Override
	public List<String> getRightsByUser(SecUser user) {
		return adminDao.getRightsByUser(user);
	}

	@Override
	public SecUser getSecUser(Long id) {
		return adminDao.getSecUser(id);
	}

	@Modifying
	@Transactional(propagation = Propagation.REQUIRED)
	@Override
	public void resetFailAttempts(String username) {
		adminDao.resetFailAttempts(username);
	}

	@Override
	public List<MenuModel> getAllMenuModel(SecUser secUser) {
		List<MenuModel> menuModels = new ArrayList<MenuModel>();

		List<SecMenu> parentMenu = adminDao.getAllParentMenu();
		for (SecMenu parent : parentMenu) {
			menuModels.add(generateMenuModel(parent, secUser));
		}

		return menuModels;
	}

	private MenuModel generateMenuModel(SecMenu menu, SecUser secUser) {
		List<SecMenu> childs = adminDao.getChildMenuByParent(menu);
		List<SecComponent> components = adminDao.getComponentByMenu(menu);

		MenuModel parentModel = new MenuModel();
		parentModel.setMenu(menu);
		parentModel.setComponents(components);

		if (childs.size() > 0) {
			List<MenuModel> childModelList = new ArrayList<MenuModel>();
			for (SecMenu child : childs) {
				Collection<String> rights = adminDao.getMenuByName(child.getName(),secUser);
				if(rights.size() > 0){
					MenuModel childModel = generateMenuModel((SecMenu) child, secUser);
					childModelList.add(childModel);
				}
				
			}
			parentModel.setChilds(childModelList);
		}

		return parentModel;
	}

	@Override
	public boolean getPriviledge(Long user, String priviledge) {
		return adminDao.getPriviledge(user, priviledge);
	}

	@Override
	public List<SecUserrole> listSecUserrole(Long userId) {
		return adminDao.listSecUserrole(userId);
	}

	@Override
	public List<SecRoledetail> listSecRoledetail(Long roleId) {
		return adminDao.listSecRoledetail(roleId);
	}

	@Override
	public DataTables searchByMapCriteria(DataTables dataTables, HashMap<String, Object> searchMap) {
		return adminDao.searchByMapCriteria(dataTables, searchMap);
	}

	@Modifying
	@Transactional(propagation = Propagation.REQUIRED)
	@Override
	public void saveSecUser(UserModel model, SecUser userLogin) {

		List<Long> unchecked = new ArrayList<Long>();
		List<Long> checked = new ArrayList<Long>();
		for (StateModel stateModel : model.getStates()) {
			if (stateModel.getId() != null) {
				if ("1".equals(stateModel.getState())) {
					checked.add(stateModel.getId());
				} else if ("0".equals(stateModel.getState())) {
					unchecked.add(stateModel.getId());
				}
			}
		}

		SecUser user = null;
		if (model.getId() != null) {

			// delete any unchecked mapping for the group
			List<Long> all = new ArrayList<Long>();
			all.addAll(checked);
			all.addAll(unchecked);
			if (all.size() > 0) {
				sessionFactory.getCurrentSession()
						.createQuery("delete from SecUserrole where user.id = :userId and role.id in :all")
						.setParameter("userId", model.getId()).setParameterList("all", all).executeUpdate();
			}

			user = (SecUser) adminDao.get(SecUser.class, model.getId());
			user.setLastUpdatedBy(userLogin.getId());
			user.setLastUpdatedDate(new Date(System.currentTimeMillis()));
		} else {
			user = new SecUser();
			user.setCreatedBy(userLogin.getId());
			user.setCreatedDate(new Date(System.currentTimeMillis()));

		}
		user.setUsrPassword(model.getUsrPassword());
		user.setUsrLogin(model.getUsrLogin());
		user.setUsrFirstName(model.getUsrFirstName());
		user.setUsrLastName(model.getUsrLastName());
		user.setUsrEmail(model.getUsrEmail());
		user.setUsrPhone(model.getUsrPhone());
		user.setUsrType(model.getUsrType());

		adminDao.save(user);
		model.setId(user.getId());

		if (!checked.isEmpty()) {
			@SuppressWarnings("unchecked")
			List<SecRole> roles = sessionFactory.getCurrentSession().createCriteria(SecRole.class)
					.add(Restrictions.in("id", checked)).list();
			SecUserrole userrole = null;
			for (SecRole role : roles) {
				userrole = new SecUserrole();
				userrole.setUser(user);
				userrole.setRole(role);
				userrole.setCreatedBy(userLogin.getId());
				userrole.setCreatedDate(new Date(System.currentTimeMillis()));

				sessionFactory.getCurrentSession().save(userrole);
			}
		}
	}

	@Override
	public List<String> getComponent(Long user, String priviledge) {
		return adminDao.getComponent(user, priviledge);
	}

	@Override
	public boolean getPriviledge(Long user, String menu, String component) {
		return adminDao.getPriviledge(user, menu, component);
	}

	@Override
	public List<Long> getChildsUserIdList(Long parenId) {
		List<Integer> res = adminDao.getChildsUserIdList(parenId);
		List<Long> result = null;
		;
		if (res != null) {
			result = new ArrayList<Long>();
			for (Integer integer : res) {
				result.add(integer.longValue());
			}
		}
		return result;
	}

}
