package com.agit.services;

import java.util.List;

import com.agit.entity.Lookup;
import com.agit.entity.ParamConfig;

public interface GenericService {

	public List<Lookup> lookup(String type);
	
	public Lookup getLookupByValue(String type, String value);
	
	public String getLookupDesc(String type, String value);

	public ParamConfig getConfigByName(String name);
	
	//public List<Long> getChildIds(Long parenId);
}
