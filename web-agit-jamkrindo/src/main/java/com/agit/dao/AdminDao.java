package com.agit.dao;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;

import com.project.common.DataTables;
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
public interface AdminDao extends InterfaceBaseDao<SecUser> {
	
	public SecUser getSecUser(String username);
	
	public SecUser getSecUser(Long id);

	public List<String> getAllRights();

	public List<String> getRightsByUser(SecUser user);

	public void resetFailAttempts(String username);

	public List<SecMenu> getAllParentMenu();

	public List<SecMenu> getChildMenuByParent(SecMenu parent);

	public List<SecComponent> getComponentByMenu(SecMenu menu);

	public boolean getPriviledge(Long user, String priviledge);

	public List<SecRole> roles();
	
	public List<SecUserrole> listSecUserrole(Long userId);

	public List<SecRoledetail> listSecRoledetail(Long roleId);
	
	public DataTables searchByMapCriteria(DataTables dataTables, HashMap<String, Object> searchMap);
	
	public List<String> getComponent(Long user, String priviledge);
	
	public boolean getPriviledge(Long user, String menu, String component);

	public List<Integer> getChildsUserIdList(Long parenId);

	public Collection<String> getMenuByName(String name, SecUser secUser);


}
