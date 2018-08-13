package com.agit.services;

import java.util.HashMap;
import java.util.List;

import com.project.common.DataTables;
import com.agit.entity.security.SecMenu;
import com.agit.entity.security.SecUser;

public interface MenuService {

	public SecMenu findById(Long id);

	public List<SecMenu> list();

	public void saveSecRole(SecMenu model, SecUser userLogin);
	
	public DataTables searchByMapCriteria(DataTables dataTables, HashMap<String, Object> searchMap);
}
