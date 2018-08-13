/**
 * 
 */
package com.agit.services.impl;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;

import org.springframework.dao.DataAccessException;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.project.common.DataTables;
import com.agit.dao.InterfaceBaseDao;

@Service
@Transactional(readOnly = true)
public abstract class AbstractServiceImpl<T>{

	public abstract Class<T> getRealClass();
	
	public abstract InterfaceBaseDao<T> getDao();

	public abstract DataTables searchByMapCriteria(DataTables dataTables, HashMap<String, Object> searchMap);
	
	@Transactional(propagation = Propagation.REQUIRED)
	@Modifying
	public void saveOrUpdate(T t) {
		this.getDao().saveOrUpdate(t);
	}
	
	@Modifying
	@Transactional(propagation = Propagation.REQUIRED)
	public void saveOrUpdateAll(Collection<T> entities) throws DataAccessException {
		this.getDao().saveOrUpdateAll(entities);
	}
	
	@Modifying
	@Transactional(propagation = Propagation.REQUIRED)
	public void delete(T entity) throws DataAccessException {
		this.getDao().delete(entity);
	}

	@Modifying
	@Transactional(propagation = Propagation.REQUIRED)
	public void deleteAll(Collection<T> entities) throws DataAccessException {
		this.getDao().deleteAll(entities);
	}

	public T findById(Long id) {
		return this.getDao().get(this.getRealClass(), id);
	}
	
	public List<T> loadAll(Class<T> clazz){
		return this.getDao().loadAll(clazz);
	}
}
