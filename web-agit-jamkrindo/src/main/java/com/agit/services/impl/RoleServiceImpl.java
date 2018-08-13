package com.agit.services.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

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
import com.agit.controller.administration.model.RoleModel;
import com.agit.controller.administration.model.StateModel;
import com.agit.entity.security.SecComponent;
import com.agit.entity.security.SecRole;
import com.agit.entity.security.SecRoledetail;
import com.agit.entity.security.SecUser;
import com.agit.services.RoleService;

@Service
@Transactional(readOnly = true)
public class RoleServiceImpl extends SimpleServiceImpl<SecRole> implements RoleService{

	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	public Class<SecRole> getRealClass() {
		return SecRole.class;
	}

	@Override
	public DataTables searchByMapCriteria(DataTables dataTables, HashMap<String, Object> searchMap) {
		
		String name	= (String) searchMap.get("name");

		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(SecRole.class);
		if (StringUtils.isNotBlank(name))
			criteria.add(Restrictions.ilike("name", name, MatchMode.ANYWHERE));

		return getDataTablesFromCriteria(criteria, dataTables);
	}
	
	@Modifying
    @Transactional(propagation=Propagation.REQUIRED)
	@Override
    public void saveSecRole(RoleModel model, SecUser userLogin) {
    	List<Long> unchecked = new ArrayList<Long>();
    	List<Long> checked = new ArrayList<Long>();
    	for(StateModel stateModel : model.getStates()){
    		if (stateModel.getId()!= null){
	    		if ("1".equals(stateModel.getState())){
	    			checked.add(stateModel.getId());
	    		}else if ("0".equals(stateModel.getState())){
	    			unchecked.add(stateModel.getId());
	    		}
    		}
    	}
    	
    	SecRole role = null;
    	if (model.getId() != null){
    		
    		// delete any unchecked mapping for the group
    		List<Long> all = new ArrayList<Long>();
        	all.addAll(checked);
        	all.addAll(unchecked);
        	if(all.size() > 0){
        		sessionFactory.getCurrentSession()
            	.createQuery("delete from SecRoledetail where role.id = :roleId and component.id in :all")
            	.setParameter("roleId", model.getId())
        		.setParameterList("all", all)
            	.executeUpdate();
        	}
        	
        	role =  findById(model.getId());
	        /*role.setLastUpdatedBy(userLogin.getId());
	        role.setLastUpdatedDate(new Date(System.currentTimeMillis()));*/
    	}else{
    		role = new SecRole();
    		/*role.setCreatedBy(userLogin.getId());
    		role.setCreatedDate(new Date(System.currentTimeMillis()));*/
    	}
    	
    	role.setName(model.getName());
    	role.setDescription(model.getDescription());
    	
    	saveOrUpdate(role);
    	model.setId(role.getId());
    	
    	if (!checked.isEmpty()){
	        @SuppressWarnings("unchecked")
			List<SecComponent> components = sessionFactory.getCurrentSession()
	        		.createCriteria(SecComponent.class)
	            	.add(Restrictions.in("id", checked))
	        		.list();
	        
	        for(SecComponent component : components){
	        	SecRoledetail roledetail = new SecRoledetail();
	        	roledetail.setRole(role);
	        	roledetail.setComponent(component);
	        	roledetail.setCreatedBy(userLogin.getId());
	        	roledetail.setCreatedDate(new Date(System.currentTimeMillis()));
	        	
	        	sessionFactory.getCurrentSession().save(roledetail);
	        }
    	}
        
    }
}
