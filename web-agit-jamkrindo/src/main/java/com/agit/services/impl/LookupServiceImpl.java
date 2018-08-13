package com.agit.services.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.project.common.DataTables;
import com.agit.entity.Lookup;
import com.agit.entity.security.SecUser;
import com.agit.services.LookupService;


@Service
@Transactional(readOnly = true)
public class LookupServiceImpl extends SimpleServiceImpl<Lookup> implements LookupService{

	@Autowired
	private SessionFactory sessionFactory;
	
	@Override
	public Class<Lookup> getRealClass() {
		return Lookup.class;
	}
	
	public DataTables searchByMapCriteria(DataTables dataTables, HashMap<String, Object> searchMap) {
		String status				= (String) searchMap.get("status");
		String description			= (String) searchMap.get("description");
		String code					= (String) searchMap.get("code");
		String type					= (String) searchMap.get("type");
		

		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(Lookup.class);
		
		if (StringUtils.isNotBlank(type))
			criteria.add(Restrictions.eq("type", type));
		
		if (StringUtils.isNotBlank(status))
			criteria.add(Restrictions.eq("activeFlag", status));
	
		if (StringUtils.isNotBlank(description))
			criteria.add(Restrictions.ilike("description", description, MatchMode.ANYWHERE));
		if (StringUtils.isNotBlank(code))
			criteria.add(Restrictions.ilike("code", code, MatchMode.ANYWHERE));

		return getDataTablesFromCriteria(criteria, dataTables);
	}
	
	@Modifying
    @Transactional(propagation=Propagation.REQUIRED)
    public void saveLookup(Lookup model, SecUser user) {

		Lookup lookup = null;

		if (model.getId() != null) {
			lookup = findById(model.getId());
			lookup.setUpdateBy(user.getId());
			lookup.setUpdateDate(new Date());
		} else {
			lookup = new Lookup();
			lookup.setCreateBy(user.getId());
			lookup.setCreateDate(new Date());
			//lookup.setType(new String("VISIT_TYPE"));
		}
		
		lookup.setType(model.getType());
		lookup.setValue(model.getDescription());
		lookup.setDescription(model.getDescription());
		lookup.setActiveFlag(model.getActiveFlag());

	
		saveOrUpdate(lookup);
		model.setId(lookup.getId());
		
   	    }

	@SuppressWarnings("unchecked")
	@Override
	public String checkExistingByCodeAndType(String code,
			String type) {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(Lookup.class);
		criteria.add(Restrictions.eq("code", code).ignoreCase());
		criteria.add(Restrictions.eq("type", type).ignoreCase());
		
		List<Lookup> sts = criteria.list();
		if(!sts.isEmpty()){
			return "Y";
		}
			
		return "N";
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public List<Lookup> findByMapCriteria(Map mapsSearch) {
		String type					= (String) mapsSearch.get("type");
		
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(Lookup.class);
		
		if (StringUtils.isNotBlank(type))
			criteria.add(Restrictions.eq("type", type));
		
		return criteria.list();
	}

	@SuppressWarnings("unchecked")
	@Override
	public boolean isExist(String code, Long id) {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(Lookup.class);
		criteria.add(Restrictions.eq("code", code).ignoreCase()) ;
		if (id != null) {
			criteria.add(Restrictions.ne("id", id));
		}
		List<Lookup> list = criteria.list();
		
		if (list.isEmpty()) {
			return false;
		}
		
		return true;
	}

}
