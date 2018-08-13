package com.agit.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.project.common.DataTables;
import com.agit.entity.Lookup;
import com.agit.entity.security.SecUser;

@SuppressWarnings("rawtypes")
public interface LookupService {

	public Lookup findById(Long id);
	
	public void saveLookup(Lookup model, SecUser user);
	
	public List<Lookup> list();
	
	public DataTables searchByMapCriteria(DataTables dataTables, HashMap<String, Object> searchMap);

	public String checkExistingByCodeAndType(String param, String lookupVisitType);
	
	public boolean isExist(String code,Long id);
	
	public List<Lookup> findByMapCriteria(Map mapsSearch);
	
}
