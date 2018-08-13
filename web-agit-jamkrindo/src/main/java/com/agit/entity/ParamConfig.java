package com.agit.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.agit.entity.util.CustomJsonDateSerializer;

@Entity
@Table(name = "cms.m_param_config")
public class ParamConfig implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -4766966230697392291L;

	public static final String WEB_PARAMCONFIG_UPLOAD_DIR = "WEB_UPLOAD_DIR";
	public static final String WEB_PARAMCONFIG_UPLOAD_DIR_FAILED = "WEB_UPLOAD_DIR_FAILED";
	public static final String WEB_PARAMCONFIG_PROMO_BANNER = "WEB_PROMO_BANNER_DIR";
	public static final String WS_PARAMCONFIG_BANNER_AGENT_URL = "WS_PROMO_BANNER_AGENT_URL";
	public static final String WS_PARAMCONFIG_BANNER_MEMBER_URL = "WS_PROMO_BANNER_MEMBER_URL";
	public static final String WS_PARAMCONFIG_REFRESH_AGENT_URL = "WS_REFRESH_AGENT_URL";
	public static final String WS_PARAMCONFIG_REFRESH_MEMBER_URL = "WS_REFRESH_MEMBER_URL";

	public static final String WEB_USER_DEFAULT_PASSWORD = "WEB_USER_DEFAULT_PASSWORD";
	public static final String WEB_ACTIVATION_TIME_LIMIT = "WEB_ACTIVATION_TIME_LIMIT";
	public static final String WEB_INVALID_PASSWD_LIMIT = "WEB_INVALID_PASSWD_LIMIT";
	public static final String WEB_CHANGE_PASSWD_PERIOD = "WEB_CHANGE_PASSWD_PERIOD";
	public static final String WEB_USED_PASSWD_ITERATION = "WEB_USED_PASSWD_ITERATION";
	public static final String WEB_UPLOAD_IMAGE_SIZE_MAX = "WEB_UPLOAD_IMAGE_SIZE_MAX";

	@Id
	@SequenceGenerator(name = "cms.seq_m_param_config", sequenceName = "cms.seq_m_param_config", initialValue = 1000, allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "cms.seq_m_param_config")
	@Column(name = "param_id")
	private Long id;
	
	@Column (name="param_name")
	private String name;
	
	@Column (name="param_value")
	private String value;
	
	@Column (name="param_desc")
	private String desc;
	
	@Column (name="app_type")
	private String type;
	
	
	@Column(name="created_date")
	@Temporal(TemporalType.DATE)
	@JsonSerialize(using=CustomJsonDateSerializer.class)
	private Date createDate ;
	
	@Column(name="created_by")
	private Long createBy ;
	
	@Column(name="last_updated_date")
	@Temporal(TemporalType.DATE)
	@JsonSerialize(using=CustomJsonDateSerializer.class)
	private Date updateDate ;
	
	@Column(name="last_updated_by")
	private Long updateBy ;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public Long getCreateBy() {
		return createBy;
	}

	public void setCreateBy(Long createBy) {
		this.createBy = createBy;
	}

	public Date getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}

	public Long getUpdateBy() {
		return updateBy;
	}

	public void setUpdateBy(Long updateBy) {
		this.updateBy = updateBy;
	}
	
}