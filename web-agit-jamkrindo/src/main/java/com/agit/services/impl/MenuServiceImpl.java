package com.agit.services.impl;

import java.util.HashMap;

import org.apache.commons.lang.StringUtils;
import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.common.DataTables;
import com.agit.entity.security.SecMenu;
import com.agit.entity.security.SecUser;
import com.agit.services.MenuService;

@Service
@Transactional(readOnly = true)
public class MenuServiceImpl extends SimpleServiceImpl<SecMenu> implements MenuService{

	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	public Class<SecMenu> getRealClass() {
		return SecMenu.class;
	}

	@Override
	public DataTables searchByMapCriteria(DataTables dataTables, HashMap<String, Object> searchMap) {
		String name		= (String) searchMap.get("name");
		Long parentId	= (Long) searchMap.get("parentId");
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(SecMenu.class);
		if (StringUtils.isNotBlank(name))
			criteria.add(Restrictions.ilike("name", name, MatchMode.ANYWHERE));
		if (parentId != null)
			criteria.add(Restrictions.isNull("parent.id"));
		return getDataTablesFromCriteria(criteria, dataTables);
	}

	@Override
	public void saveSecRole(SecMenu model, SecUser userLogin) {
		// TODO Auto-generated method stub
		
	}
	
	
}
