package com.agit.entity.security;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import org.apache.commons.lang.StringUtils;
import com.agit.entity.Entity;

public class SecUser implements Serializable, Entity {
	/**
	 *
	 * @author Ridwan
	 */
	public static final String COMP_ADMIN 			= "COMP_ADMIN";
	public static final String SUPER_ADMIN	 		= "SUPER_ADMIN";
	
	private static final long serialVersionUID = 6751516406395916644L;
	private Long id;
	private String usrLogin;
	private String usrPassword;
	private String usrLastName;
	private String usrFirstName;
	private String usrEmail;
	private String usrPhone;
	private Date createdDate;
	private Long createdBy;
	private Long lastUpdatedBy;
	private Date lastUpdatedDate;
	private String usrType;
	private String roles;
	private Set<SecUserrole> userroles = new HashSet<SecUserrole>(0);
	
	

	public void setId(Long id) {
		this.id = id;
	}

	public Long getId() {
		return id;
	}
	
	public void setUserroles(Set<SecUserrole> userroles) {
		this.userroles = userroles;
	}
	
	public Set<SecUserrole> getUserroles() {
		return userroles;
	}
	public boolean isNew() {
        return getId() == null;
    }

	public String getUsrLogin() {
		return usrLogin;
	}

	public void setUsrLogin(String usrLogin) {
		this.usrLogin = usrLogin;
	}

	public String getUsrPassword() {
		return usrPassword;
	}

	public void setUsrPassword(String usrPassword) {
		this.usrPassword = usrPassword;
	}

	public String getUsrLastName() {
		return usrLastName;
	}

	public void setUsrLastName(String usrLastName) {
		this.usrLastName = usrLastName;
	}

	public String getUsrFirstName() {
		return usrFirstName;
	}

	public void setUsrFirstName(String usrFirstName) {
		this.usrFirstName = usrFirstName;
	}

	public String getUsrEmail() {
		return usrEmail;
	}

	public void setUsrEmail(String usrEmail) {
		this.usrEmail = usrEmail;
	}

	public String getUsrPhone() {
		return usrPhone;
	}

	public void setUsrPhone(String usrPhone) {
		this.usrPhone = usrPhone;
	}


	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public Long getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(Long createdBy) {
		this.createdBy = createdBy;
	}

	public Long getLastUpdatedBy() {
		return lastUpdatedBy;
	}

	public void setLastUpdatedBy(Long lastUpdatedBy) {
		this.lastUpdatedBy = lastUpdatedBy;
	}

	public Date getLastUpdatedDate() {
		return lastUpdatedDate;
	}

	public void setLastUpdatedDate(Date lastUpdatedDate) {
		this.lastUpdatedDate = lastUpdatedDate;
	}





	public String getUsrType() {
		return usrType;
	}

	public void setUsrType(String usrType) {
		this.usrType = usrType;
	}


	
	public String getRoles() {
		return roles;
	}

	public void setRoles(String roles) {
		this.roles = roles;
	}

	public boolean isPasswordDefault() {
		// TODO Auto-generated method stub
		return false;
	}


	public String getName(){
		String pico	= "";
		if(StringUtils.isNotBlank(getUsrFirstName()))
			pico	= getUsrFirstName();
		
		if(StringUtils.isNotBlank(getUsrLastName()))
			pico	+= " " + getUsrLastName();
		
		return pico;
		}
	
	
	
}