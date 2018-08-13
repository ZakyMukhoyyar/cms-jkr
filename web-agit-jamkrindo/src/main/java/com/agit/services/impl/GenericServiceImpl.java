package com.agit.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.agit.dao.GenericDao;
import com.agit.entity.Lookup;
import com.agit.entity.ParamConfig;
import com.agit.services.GenericService;

@Service
@Transactional(readOnly = true)
public class GenericServiceImpl implements GenericService {
	
	@Autowired
	private GenericDao genericDao;

	@Override
	public List<Lookup> lookup(String type) {
		return genericDao.lookup(type);
	}
	
	@Override
	public Lookup getLookupByValue(String type, String value) {
		return genericDao.getLookupByValue(type, value);
	}

	@Override
	public String getLookupDesc(String type, String value) {
		return genericDao.getLookupDesc(type, value);
	}
	
	@Override
	public ParamConfig getConfigByName(String name) {
		return genericDao.getConfigByName(name);
	}

	/*@Override
	public List<Long> getChildIds(Long parenId) {
		
		List<Integer> res = genericDao.getChildIds(parenId);
		List<Long> result =null;;
		if(res!=null){
			result = new ArrayList<Long>();
			for (Integer integer : res) {
				result.add(integer.longValue());
			}
		}
		return result;
		
	}*/
	

	
}
