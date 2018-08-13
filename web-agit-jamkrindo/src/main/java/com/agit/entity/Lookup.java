package com.agit.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.agit.entity.util.CustomJsonDateSerializer;

@Entity
@Table(name="cms.lookup")
public class Lookup implements Serializable {
	/**
	 * 
	 */
	
	/*POSITION TYPE*/
	public static final String LOOKUP_POSITION_TYPE						= "POSITION_TYPE";
	
	/*USER ENABLE*/
	public static final String LOOKUP_USER_STATUS_TYPE					= "USER_STATUS_TYPE";
	public static final String LOOKUP_USER_STATUS_TYPE_0				= "0";
	public static final String LOOKUP_USER_STATUS_TYPE_1				= "1";
		
	/*USER TYPE*/
	public static final String LOOKUP_USER_TYPE							="USER_TYPE";
	
	/*PROVINCE*/
	public static final String LOOKUP_PROVINCE							="PROVINCE";
	
	/*COMPANY_TYPE*/
	public static final String LOOKUP_COMPANY_TYPE						="COMPANY_TYPE";
	
	/*OFFICE_STATUS*/
	public static final String LOOKUP_OFFICE_STATUS						="OFFICE_STATUS";
	
	/*HOST_TYPE*/
	public static final String LOOKUP_HOST_TYPE							="HOST_TYPE";
	
	/*POOL_STATUS*/
	public static final String LOOKUP_POOL_STATUS						="POOL_STATUS";
	
	/*VISIT_STATUS*/
	public static final String LOOKUP_VISIT_STATUS						="VISIT_STATUS";
	
	/*MEET_STATUS*/
	public static final String LOOKUP_MEET_STATUS						="MEET_STATUS";
	
	/*NEWS TYPE*/
	public static final String LOOKUP_NEWS_TYPE							="NEWS_TYPE";
	
	/*NEWS STATUS*/
	public static final String LOOKUP_NEWS_STATUS						="NEWS_STATUS";
	
	/*VISIT TYPE*/
	public static final String LOOKUP_VISIT_TYPE						="VISIT_TYPE";
	
	/*MEET_TYPE*/
	public static final String LOOKUP_MEET_TYPE							="MEET_TYPE";
	
	/*REKOMENDASI*/
	public static final String LOOKUP_REKOMENDASI						="REKOMENDASI";
	
	/*LOSS_EVENT*/
	public static final String LOOKUP_LOSS_EVENT						="LOSS_EVENT";
	
	/*REASON_NO_PAID*/
	public static final String LOOKUP_REASON_NO_PAID					="REASON_NO_PAID";
	
	/*PRODUCT_TYPE*/
	public static final String LOOKUP_PRODUCT_TYPE						="PRODUCT_TYPE";
	
	/*MOBILE_TRACKING_INTERVAL*/
	public static final String LOOKUP_MOBILE_TRACKING_INTERVAL			="MOBILE_TRACKING_INTERVAL";
	
	/*MOBILE_TRACKING_DISTANCE*/
	public static final String LOOKUP_MOBILE_TRACKING_DISTANCE			="MOBILE_TRACKING_DISTANCE";
	
	/*MOBILE_GEOFENCE_SETTING*/
	public static final String LOOKUP_MOBILE_GEOFENCE_SETTING			="MOBILE_GEOFENCE_SETTING";
	
	/*MOBILE_TRACKING_DISTANCE*/
	public static final String LOOKUP_MOBILE_CHAT_SERVER_PORT			="MOBILE_CHAT_SERVER_PORT";
	
	/*MOBILE_DATA_SEND_INTERVAL*/
	public static final String LOOKUP_MOBILE_DATA_SEND_INTERVAL			="MOBILE_DATA_SEND_INTERVAL";
	
	/*MOBILE_CHAT_SERVER_IP*/
	public static final String LOOKUP_MOBILE_CHAT_SERVER_IP				="MOBILE_CHAT_SERVER_IP";
	
	/*MEETWITH*/
	public static final String LOOKUP_MEETWITH							="MEETWITH";
	
	/*PARAM_NAME*/
	public static final String LOOKUP_PARAM_NAME						="PARAM_NAME";
	
	/*RECALL_ACC_STATUS*/
	public static final String LOOKUP_RECALL_ACC_STATUS					="RECALL_ACC_STATUS";
	
	/*PAYMENT_UPLOAD_REASON*/
	public static final String LOOKUP_PAYMENT_UPLOAD_REASON				="PAYMENT_UPLOAD_REASON";
	
	/*ACCOUNT_STATUS*/
	public static final String LOOKUP_ACCOUNT_STATUS					="ACCOUNT_STATUS";
	
	/*MANUAL_ACC_STATUS*/
	public static final String LOOKUP_MANUAL_ACC_STATUS					="MANUAL_ACC_STATUS";
	
	/*REJECT_REASON*/
	public static final String LOOKUP_REJECT_REASON						="REJECT_REASON";
	
	/*BUSINESS_EXTEND_AGENT_DELQ*/
	public static final String LOOKUP_BUSINESS_EXTEND_AGENT_DELQ		="BUSINESS_EXTEND_AGENT_DELQ";
	
	/*FC_ACTIVITY*/
	public static final String LOOKUP_FC_ACTIVITY						="FC_ACTIVITY";
	
	/*FC_AUTOEXTEND*/
	public static final String LOOKUP_FC_AUTOEXTEND						="FC_AUTOEXTEND";
	
	/*VALUE_TYPE*/
	public static final String LOOKUP_VALUE_TYPE						="VALUE_TYPE";
	
	/*ACTION_STATUS*/
	public static final String LOOKUP_ACTION_STATUS						="ACTION_STATUS";
	
	/*AREA_TYPE*/
	public static final String LOOKUP_AREA_TYPE							="AREA_TYPE";
	
	/*BATCH_ACTIVITY*/
	public static final String LOOKUP_BATCH_ACTIVITY					="BATCH_ACTIVITY";
	
	/*POI_STATUS*/
	public static final String LOOKUP_POI_STATUS						="POI_STATUS";
	
	/*POI_TYPE*/
	public static final String LOOKUP_POI_TYPE							="POI_TYPE";
	
	/*TEMPLATE_STATUS*/
	public static final String LOOKUP_TEMPLATE_STATUS					="TEMPLATE_STATUS";
	
	/*SUBSCRIPTION_STATUS*/
	public static final String LOOKUP_SUBSCRIPTION_STATUS				="SUBSCRIPTION_STATUS";
	
	/*BROADCAST_LEVEL*/
	public static final String LOOKUP_BROADCAST_LEVEL					="BROADCAST_LEVEL";
	
	/*ID_CARD_TYPE*/
	public static final String LOOKUP_ID_CARD_TYPE						="ID_CARD_TYPE";
	
	/*SEX*/
	public static final String LOOKUP_SEX								="SEX";
	
	/*AGENT_STATUS*/
	public static final String LOOKUP_AGENT_STATUS						="AGENT_STATUS";
	
	/*PARAM_TYPE*/
	public static final String LOOKUP_PARAM_TYPE						="PARAM_TYPE";
	
	/*STATUS_TYPE*/
	public static final String LOOKUP_STATUS_TYPE						="STATUS_TYPE";	
	
	/*ADDRESS_TYPE*/
	public static final String LOOKUP_ADDRESS_TYPE						="ADDRESS_TYPE";	
	
	/*ANSTYPE*/
	public static final String LOOKUP_ANSTYPE							="ANSTYPE";	
	
	/*ATM_CATEGORY*/
	public static final String LOOKUP_ATM_CATEGORY						="ATM_CATEGORY";	
	
	/*COMPANY_STATUS*/
	public static final String LOOKUP_COMPANY_STATUS					="COMPANY_STATUS";	
	
	/*IMEI_STATUS*/
	public static final String LOOKUP_IMEI_STATUS						="IMEI_STATUS";
	public static final String LOOKUP_IMEI_STATUS_SPARE					="SPARE";
	
	
	/*BATCH_STATUS*/
	public static final String LOOKUP_BATCH_STATUS						="BATCH_STATUS";	
	
	/*OFFICE_TYPE*/
	public static final String LOOKUP_OFFICE_TYPE						="OFFICE_TYPE";	
	
	/*PACKAGE_SELECTION*/
	public static final String LOOKUP_PACKAGE_SELECTION					="PACKAGE_SELECTION";	
	
	/*SURVEY_TYPE*/
	public static final String LOOKUP_SURVEY_TYPE						="SURVEY_TYPE";	
	
	/*YES_NO*/
	public static final String LOOKUP_YES_NO							="YES_NO";	
	
	/*SURVEY_ANSWER_TYPE*/
	public static final String LOOKUP_SURVEY_ANSWER_TYPE				="SURVEY_ANSWER_TYPE";	
	
	
	public static final String LOOKUP_APPROVE = "APPROVE";
	
	
	private static final long serialVersionUID = 4657650934308043988L;

	public static final String LOOKUP_BROADCAST_TO = "BROADCAST_TO";
	
	@Id
	@SequenceGenerator(name="solid.lookup_id_seq", sequenceName="solid.lookup_id_seq", initialValue=1000, allocationSize=1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="solid.lookup_id_seq")
	@Column(name="lookup_id")
	private Long id;
	
	@Column(name="lookup_type", length=30)
	private String type;
	
	@Column(name="lookup_value", length=50)
	private String value;
	
	@Column(name="lookup_description", length=100)
	private String description;
	
	@Column(name="display_flag", length=1)
	private String activeFlag;
	
	@Column(name="creation_date")
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

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getActiveFlag() {
		return activeFlag;
	}

	public void setActiveFlag(String activeFlag) {
		this.activeFlag = activeFlag;
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
