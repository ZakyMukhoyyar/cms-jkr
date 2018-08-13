package com.agit.dao.impl;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.hibernate.criterion.RowCountProjection;
import org.hibernate.internal.CriteriaImpl;
import org.hibernate.internal.CriteriaImpl.OrderEntry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.project.common.DataTables;
import com.project.common.SortField;
import com.agit.dao.AdminDao;
import com.agit.dao.GenericDao;
import com.agit.entity.security.SecComponent;
import com.agit.entity.security.SecMenu;
import com.agit.entity.security.SecRole;
import com.agit.entity.security.SecRoledetail;
import com.agit.entity.security.SecUser;
import com.agit.entity.security.SecUserrole;
/**
*
* @author Ridwan
*/
@Repository
public class AdminDaoImpl extends BaseDao<SecUser> implements AdminDao {

	@Autowired
	SessionFactory sessionFactory;
	@Autowired
	GenericDao genericDao;
	
	@Override
	public SecUser getSecUser(String username) {
		return (SecUser) sessionFactory.getCurrentSession().createQuery("from SecUser where usrLogin = :username")
				.setParameter("username", username).uniqueResult();
	}

	@Override
	public SecUser getSecUser(Long id) {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(SecUser.class);
		criteria.add(Restrictions.eq("id", id));
		SecUser user = (SecUser) criteria.list().get(0);
		
		return user;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<String> getAllRights() {
		return sessionFactory.getCurrentSession().createSQLQuery("select menu_name from cms.m_menu").list();
    }
	
	@SuppressWarnings("unchecked")
	@Override
	public List<String> getRightsByUser(SecUser user) {
        return sessionFactory.getCurrentSession().createSQLQuery("select distinct m.menu_name "
        		+ "from cms.m_menu m "
        		+ "inner join cms.m_component c on c.menu_id = m.menu_id "
        		+ "inner join cms.m_role_dtl rd on rd.menu_comp_id = c.menu_comp_id "
        		+ "inner join cms.m_role r on r.role_id = rd.role_id "
        		+ "inner join cms.t_mapping_userole ur on ur.role_id = r.role_id "
        		+ "where ur.user_id=:userId").setParameter("userId", user.getId()).list();
    }
	
	@SuppressWarnings("unchecked")
	@Override
	public List<String> getMenuByName(String name, SecUser secUser) {
		 return sessionFactory.getCurrentSession().createSQLQuery("select distinct m.menu_name "
	        		+ "from cms.m_menu m "
	        		+ "inner join cms.m_component c on c.menu_id = m.menu_id "
	        		+ "inner join cms.m_role_dtl rd on rd.menu_comp_id = c.menu_comp_id "
	        		+ "inner join cms.m_role r on r.role_id = rd.role_id "
	        		+ "inner join cms.t_mapping_userole ur on ur.role_id = r.role_id "
        		+ "where m.menu_name=:menuName and ur.user_id=:userId").setParameter("menuName", name)
				.setParameter("userId", secUser.getId()).list();
	}
	
	@Override
	public void resetFailAttempts(String username) {
		SecUser user = getSecUser(username);
		if(user != null){
	//		user.setLoginAttempts(0);
			sessionFactory.getCurrentSession().save(user);
		}
	}
	
	/*@Override
	public void updateFailAttempts(String username, int maxRetry) {
		SecUser user = getSecUser(username);
		if(user != null){
			Integer attempts = user.getLoginAttempts();
			if(attempts == null){
				attempts = 0;
			}
			attempts++;
			user.setLoginAttempts(attempts);
			
			if(attempts >= maxRetry){
				user.setUsrStatus(Lookup.LOOKUP_USER_STATUS_TYPE_0);
			}
			
			sessionFactory.getCurrentSession().save(user);
		}
	}*/
	
	@SuppressWarnings("unchecked")
	@Override
	public List<SecMenu> getAllParentMenu(){
	//return sessionFactory.getCurrentSession().createQuery("from SecMenu where parent is null  order by sequence ").list();
	return sessionFactory.getCurrentSession().createQuery("from SecMenu where parent is null  and enabled =:enabled order by sequence ").setParameter("enabled", 1).list();
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<SecMenu> getChildMenuByParent(SecMenu parent){
	//	return sessionFactory.getCurrentSession().createQuery("from SecMenu where parent = :parent  order by sequence ").setParameter("parent", parent).list();
		return sessionFactory.getCurrentSession().createQuery("from SecMenu where parent = :parent and enabled =:enabled order by sequence ").setParameter("parent", parent).setParameter("enabled", 1).list();
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<SecComponent> getComponentByMenu(SecMenu menu){
		return sessionFactory.getCurrentSession().createQuery("from SecComponent where menu = :menu").setParameter("menu", menu).list();
	}
	
	@SuppressWarnings("rawtypes")
	@Override
	public boolean getPriviledge(Long user, String priviledge) {
		List list = sessionFactory.getCurrentSession()
			.createSQLQuery("select 1 from cms.sec_user u "
                    + "inner join cms.t_mapping_userole ur on ur.user_id = u.usr_id "
                    + "inner join cms.m_role r on r.role_id = ur.role_id "
                    + "inner join cms.m_role_dtl rd on rd.role_id = r.role_id "
                    + "inner join cms.m_component c on c.menu_comp_id=rd.menu_comp_id "
                    + "inner join cms.m_menu m on m.menu_id=c.menu_id "
                    + "where m.menu_name = :menuName "
					+ "and u.usr_id = :userId")
			.setParameter("menuName", priviledge).setParameter("userId", user).list();
		
		if (list.isEmpty())
			return false;
		
		return true;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<SecRole> roles() {
		return sessionFactory.getCurrentSession()
				.createQuery("from SecRole").list();
	}
	
    @SuppressWarnings("unchecked")
    @Override
	public List<SecUserrole> listSecUserrole(Long userId) {
        return sessionFactory.getCurrentSession()
                .createQuery("from SecUserrole where user.id = :userId")
                .setParameter("userId", userId)
                .list();
    }
    
	@SuppressWarnings("unchecked")
	@Override
	public List<SecRoledetail> listSecRoledetail(Long roleId) {
        return sessionFactory.getCurrentSession()
                .createQuery("from SecRoledetail where role.id = :roleId")
                .setParameter("roleId", roleId)
                .list();
    }
	
	@SuppressWarnings({ "rawtypes", "unchecked", "unused" })
	@Override
	public DataTables searchByMapCriteria(DataTables dataTables, HashMap<String, Object> searchMap) {
		String usrLogin		= (String) searchMap.get("usrLogin");
		String usrFirstName	= (String) searchMap.get("usrFirstName");
		String usrLastName	= (String) searchMap.get("usrLastName");
		String searchString = null;
		
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(SecUser.class);
		
		if (StringUtils.isNotBlank(usrLogin))
			criteria.add(Restrictions.ilike("usrLogin", usrLogin, MatchMode.ANYWHERE));

		if (StringUtils.isNotBlank(usrFirstName))
			criteria.add(Restrictions.ilike("usrFirstName", usrFirstName, MatchMode.ANYWHERE));
		
		if (StringUtils.isNotBlank(usrLastName))
			criteria.add(Restrictions.ilike("usrLastName", usrLastName, MatchMode.ANYWHERE));
		
		
		
		List<SortField> sortFields = dataTables.generateSortFields();
		for (SortField sf : sortFields) {
			if ("asc".equalsIgnoreCase(sf.getDirection())) {
				criteria.addOrder(Order.asc(sf.getField()));
			} else {
				criteria.addOrder(Order.desc(sf.getField()));
			}
		}
		
		List data = criteria.setFirstResult(dataTables.getiDisplayStart()).setMaxResults(dataTables.getiDisplayLength()).list();
		for (Object object : data) {
			SecUser user = (SecUser) object;
			String roles		= null;

			List<SecUserrole> userroleList = listSecUserrole(user.getId());
			for (SecUserrole ur : userroleList) {
				if(StringUtils.isBlank(roles)){
					roles	= "" ;
				}else{
					roles 	+= " - " ;
				}
				roles += ur.getRole().getDescription();
			}
			
			user.setRoles(roles);;
			data.set(data.indexOf(object), user);
		}
		
		Long total = 0l;
		if (data != null) {
			Iterator<OrderEntry> orderIter = ((CriteriaImpl) criteria).iterateOrderings();
			while (orderIter.hasNext()) {
				orderIter.next();
				orderIter.remove();
			}
			total = (Long) criteria.setProjection(new RowCountProjection()).setFirstResult(0).uniqueResult();
		}
		return dataTables.extract(data, total);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<String> getComponent(Long user, String priviledge) {
		return sessionFactory.getCurrentSession().createSQLQuery("select distinct c.menu_comp_name "
        		+ "from cms.m_menu m "
        		+ "inner join cms.m_component c on c.menu_id = m.menu_id "
        		+ "inner join cms.m_role_dtl rd on rd.menu_comp_id = c.menu_comp_id "
        		+ "inner join cms.m_role r on r.role_id = rd.role_id "
        		+ "inner join cms.t_mapping_userole ur on ur.role_id = r.role_id "
        		+ "where ur.user_id=:userId "
        		+ "and m.menu_name=:menu")
				.setParameter("userId", user)
				.setParameter("menu", priviledge).list();
	}

	@SuppressWarnings("rawtypes")
	@Override
	public boolean getPriviledge(Long user, String menu, String component) {
		List list = sessionFactory.getCurrentSession()
				.createSQLQuery("select 1 from cms.sec_user u "
	                    + "inner join cms.t_mapping_userole ur on ur.user_id = u.usr_id "
	                    + "inner join cms.m_role r on r.role_id = ur.role_id "
	                    + "inner join cms.m_role_dtl rd on rd.role_id = r.role_id "
	                    + "inner join cms.m_component c on c.menu_comp_id=rd.menu_comp_id "
	                    + "inner join cms.m_menu m on m.menu_id=c.menu_id "
	                    + "where m.menu_name = :menuName "
	                    + "and c.menu_comp_name = :compName "
						+ "and u.usr_id = :userId")
				.setParameter("menuName", menu).setParameter("compName", component).setParameter("userId", user).list();
			
			if (list.isEmpty())
				return false;
			
			return true;
	}
	

	@SuppressWarnings("unchecked")
	@Override
	public List<Integer> getChildsUserIdList(Long parenId) {
		List<Integer> result = null;
		try {
			result = sessionFactory.getCurrentSession().createSQLQuery("select cms.user_tree("+parenId+")").list();
		} catch (HibernateException e) {
			e.printStackTrace();
		}
		return result;
	}

}
