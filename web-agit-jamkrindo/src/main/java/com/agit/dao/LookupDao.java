package com.agit.dao;

import com.agit.entity.Lookup;
/**
*
* @author Ridwan
*/
public interface LookupDao extends InterfaceBaseDao<Lookup> {
	
	Lookup findById(Long id);

}
