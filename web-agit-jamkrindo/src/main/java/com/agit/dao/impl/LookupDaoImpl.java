package com.agit.dao.impl;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.agit.dao.LookupDao;
import com.agit.entity.Lookup;
/**
*
* @author Ridwan
*/
@Repository
public class LookupDaoImpl extends BaseDao<Lookup> implements LookupDao {

	@Autowired
	SessionFactory sessionFactory;

	@Override
	public Lookup findById(Long id) {
		return (Lookup) sessionFactory.getCurrentSession()
				.createQuery("from Lookup where id = :id").setParameter("id", id).uniqueResult();
	}

}
