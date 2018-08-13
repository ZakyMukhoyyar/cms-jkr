package com.agit.dao;

import java.util.List;

import com.agit.entity.Lookup;
import com.agit.entity.ParamConfig;
/**
*
* @author Ridwan
*/
public interface GenericDao {

	public List<Lookup> lookup(String type);
	
	public Lookup getLookupByValue(String type, String value);

	public String getLookupDesc(String type, String value);

	public ParamConfig getConfigByName(String name);

	//public List<Integer> getChildIds(Long parenId);
	
	
}
