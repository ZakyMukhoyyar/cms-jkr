package com.agit.services;

import java.util.HashMap;
import java.util.List;

import com.project.common.DataTables;
import com.agit.controller.administration.model.RoleModel;
import com.agit.entity.security.SecRole;
import com.agit.entity.security.SecUser;

public interface RoleService {

	public SecRole findById(Long id);

	public List<SecRole> list();

	public void saveSecRole(RoleModel model, SecUser userLogin);
	
	public DataTables searchByMapCriteria(DataTables dataTables, HashMap<String, Object> searchMap);
}
