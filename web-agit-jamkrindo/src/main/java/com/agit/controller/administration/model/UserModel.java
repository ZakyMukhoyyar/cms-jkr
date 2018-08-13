/**
 * 
 */
package com.agit.controller.administration.model;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
/**
*
* @author Ridwan
*/
public class UserModel {
	
	private Long id;
	@JsonProperty("roles")
	private List<StateModel> states;
	private Long companyId;
	private String companyName;
	private String chatLogin;	
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
	private String usrPosition;
	private String usrType;
	private Long areaId;
	private String areaName;
	private String usrStatus;
	private Integer usrEnabled;
	private String usrExpiredPassword;
	
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public List<StateModel> getStates() {
		return states;
	}
	public void setStates(List<StateModel> states) {
		this.states = states;
	}
	public Long getCompanyId() {
		return companyId;
	}
	public void setCompanyId(Long companyId) {
		this.companyId = companyId;
	}
	public String getCompanyName() {
		return companyName;
	}
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}
	public String getChatLogin() {
		return chatLogin;
	}
	public void setChatLogin(String chatLogin) {
		this.chatLogin = chatLogin;
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
	public String getUsrPosition() {
		return usrPosition;
	}
	public void setUsrPosition(String usrPosition) {
		this.usrPosition = usrPosition;
	}
	public String getUsrType() {
		return usrType;
	}
	public void setUsrType(String usrType) {
		this.usrType = usrType;
	}
	public Long getAreaId() {
		return areaId;
	}
	public void setAreaId(Long areaId) {
		this.areaId = areaId;
	}
	public String getAreaName() {
		return areaName;
	}
	public void setAreaName(String areaName) {
		this.areaName = areaName;
	}
	public String getUsrStatus() {
		return usrStatus;
	}
	public void setUsrStatus(String usrStatus) {
		this.usrStatus = usrStatus;
	}
	public Integer isUsrEnabled() {
		return usrEnabled;
	}
	public void setUsrEnabled(Integer usrEnabled) {
		this.usrEnabled = usrEnabled;
	}
	public String getUsrExpiredPassword() {
		return usrExpiredPassword;
	}
	public void setUsrExpiredPassword(String usrExpiredPassword) {
		this.usrExpiredPassword = usrExpiredPassword;
	}
	public Integer getUsrEnabled() {
		return usrEnabled;
	}
	
	
	

	
}