package com.agit.services;

import java.util.HashMap;
import java.util.List;

import com.project.common.DataTables;
import com.agit.controller.administration.model.MenuModel;
import com.agit.controller.administration.model.UserModel;
import com.agit.entity.security.SecRoledetail;
import com.agit.entity.security.SecUser;
import com.agit.entity.security.SecUserrole;

public interface AdminService {

	public void saveOrUpdate(SecUser secUser);
	
	public String encodePassword(String password);

	public SecUser getSecUser(String username);
	
	public SecUser getSecUser(Long id);

	public List<String> getAllRights();

	public List<String> getRightsByUser(SecUser user);

	public void resetFailAttempts(String username);

	public List<MenuModel> getAllMenuModel(SecUser secUser);

	public boolean getPriviledge(Long user, String priviledge);

	public List<SecUserrole> listSecUserrole(Long userId);

	public List<SecRoledetail> listSecRoledetail(Long roleId);

	public void saveSecUser(UserModel model, SecUser userLogin);
	
	public DataTables searchByMapCriteria(DataTables dataTables, HashMap<String, Object> searchMap);
	
	public List<String> getComponent(Long user, String priviledge);
	
	public boolean getPriviledge(Long user, String menu, String component);
	
	public List<Long> getChildsUserIdList(Long id);

}
