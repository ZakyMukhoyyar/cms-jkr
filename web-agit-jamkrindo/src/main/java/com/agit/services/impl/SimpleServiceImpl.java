/**
 * 
 */
package com.agit.services.impl;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.hibernate.criterion.RowCountProjection;
import org.hibernate.internal.CriteriaImpl;
import org.hibernate.internal.CriteriaImpl.OrderEntry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.project.common.DataTables;
import com.project.common.SortField;

@Service
@Transactional(readOnly = true)
public abstract class SimpleServiceImpl<T>{

	@Autowired
	private SessionFactory sessionFactory;
	
	public abstract Class<T> getRealClass();
	
	public abstract DataTables searchByMapCriteria(DataTables dataTables, HashMap<String, Object> searchMap);
	
	@SuppressWarnings("unchecked")
	public T findById(Long id) {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(this.getRealClass());
		criteria.add(Restrictions.eq("id", id));
		return ((T) criteria.uniqueResult());
	}
	
	@Transactional(propagation = Propagation.REQUIRED)
	@Modifying
	public void saveOrUpdate(T entity) {
		sessionFactory.getCurrentSession().saveOrUpdate(entity);
	}
	
	@SuppressWarnings("unchecked")
	public List<T> list() {
		return sessionFactory.getCurrentSession().createCriteria(this.getRealClass()).list(); 
	}
	
	@SuppressWarnings("rawtypes")
	public DataTables getDataTablesFromCriteria(Criteria criteria, DataTables dataTables) {
		List<SortField> sortFields = dataTables.generateSortFields();
		for (SortField sf : sortFields) {
			if ("asc".equalsIgnoreCase(sf.getDirection())) {
				criteria.addOrder(Order.asc(sf.getField()));
			} else {
				criteria.addOrder(Order.desc(sf.getField()));
			}
		}

		List data = criteria.setFirstResult(dataTables.getiDisplayStart()).setMaxResults(dataTables.getiDisplayLength()).list();

		Long total = 0l;
		if (data != null) {
			Iterator<OrderEntry> orderIter = ((CriteriaImpl) criteria).iterateOrderings();
			while (orderIter.hasNext()) {
				orderIter.next();
				orderIter.remove();
			}
			total = (Long) criteria.setProjection(new RowCountProjection()).setFirstResult(0).uniqueResult();
		}

		return dataTables.extract(data, total);
	}
}
