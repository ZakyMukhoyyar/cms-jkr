package com.agit.dao.impl;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.agit.dao.GenericDao;
import com.agit.entity.Lookup;
import com.agit.entity.ParamConfig;
/**
*
* @author Ridwan
*/
@Repository
public class GenericDaoImpl implements GenericDao {

	@Autowired
	protected SessionFactory sessionFactory;

	@SuppressWarnings("unchecked")
	@Override
	public List<Lookup> lookup(String type) {
		return sessionFactory.getCurrentSession()
				.createQuery("from Lookup where type = :type and activeFlag='Y'")
				.setParameter("type", type).list();
	}
	
	@Override
	public Lookup getLookupByValue(String type, String value) {
		return (Lookup) sessionFactory.getCurrentSession()
				.createQuery("from Lookup where type = :type and value= :value")
				.setParameter("type", type)
				.setParameter("value", value).uniqueResult();
	}

	@Override
	public String getLookupDesc(String type, String value) {
		Lookup lookup = (Lookup) sessionFactory.getCurrentSession()
				.createQuery("from Lookup where type = :type and value= :value")
				.setParameter("type", type)
				.setParameter("value", value).uniqueResult();

		if (lookup != null)
			return lookup.getDescription();

		return null;
	}

	@Override
	public ParamConfig getConfigByName(String name) {
		return (ParamConfig) sessionFactory.getCurrentSession()
				.createQuery("from ParamConfig where name = :name")
				.setParameter("name", name).uniqueResult();
	}

	/*@SuppressWarnings("unchecked")
	@Override
	public List<Integer> getChildIds(Long parenId) {
		List<Integer> result = null;
		try {
			result = sessionFactory.getCurrentSession().createSQLQuery("select btncol.user_tree("+parenId+")").list();
		} catch (HibernateException e) {
			e.printStackTrace();
		}
		//if(result==null) return new ArrayList<Integer>();
		
		return result;

	}*/

}