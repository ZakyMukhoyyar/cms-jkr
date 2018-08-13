/**
 * 
 */
package com.project.common;

import java.io.IOException;
import java.util.Properties;

import org.apache.log4j.Logger;

/**
*
* @author Ridwan
*/
public class SystemPropertiesHelper {
	private static final Logger logger = Logger
			.getLogger(SystemPropertiesHelper.class);
	private static SystemPropertiesHelper helper = null;
	private static Properties property;

	private SystemPropertiesHelper() {
		property = new Properties();
		try {
			property.load(getClass().getResourceAsStream("/solid.properties"));
		} catch (IOException ex) {
			logger.error("Error loading properties file", ex);
		}
	}

	public String getProperty(String key) {
		return property.getProperty(key);
	}

	public void setProperty(String key, String value) {
		property.setProperty(key, value);
	}

	public synchronized static SystemPropertiesHelper getInstance() {
		if (helper == null) {
			helper = new SystemPropertiesHelper();
		}
		return helper;
	}

	public String getPoiImagesPath() {
		return property.getProperty("POI_IMAGES", ".");
	}
	
	/*public String getAgentImagesPath(){
		return property.getProperty("DOWNLOAD_PATH", ".");
		
	}
	*/
	
	
	public String getAgentImagesPath(){
		return property.getProperty("AGENT_IMAGES", ".");
		
	}
	
	
	public String getSurveyFilesPath() {
		return property.getProperty("SURVEY_FILES_PATH", ".");
	}
	
	public String getPoiWebImagesPath() {
		//return property.getProperty("POI_WEB_IMAGE_PATH", "../images");
		return property.getProperty("POI_WEB_IMAGE_PATH", "");
	}
	
	
	public String getSurveyWebImagesPath() {
		 
		return property.getProperty("SURVEY_WEB_IMAGE_PATH", "");
	}
	
	
	public String getMapArcGisUrlJawa() {
		 
		return property.getProperty("POI_WEB_IMAGE_PATH", "");
	}
	
	public String getMapArcGisUrl(){
		return property.getProperty("MAP_ARCGIS_REST_URL", "");
	}
	
	public String getMapWmsUrl(){
		return property.getProperty("MAP_WMS_SERVICE_URL", "");
	}
	
	public String getUpdateSurveyUrl() {
		return property.getProperty("UPDATE_SURVEY_URL", "");	
	}

	public String getBatchUploadValidPath() {
		return property.getProperty("BATCH_VALID_PATH", "/valid");		
	}

	public String getBatchUploadInvalidPath() {
		return property.getProperty("BATCH_INVALID_PATH", "/invalid");
	}

	public String getBatchUploadPath() {
		return property.getProperty("BATCH_ORIGINAL_PATH", "/upload");
	}

	public String getAgentIcon() {
		return property.getProperty("AGENT_ICON", "http://maps.google.com/mapfiles/kml/shapes/sunny.png");
	}
	
	public String getPoiIcon() {
		return property.getProperty("POI_ICON", "http://maps.google.com/mapfiles/kml/shapes/sunny.png");
	}
	
	public String getPoiKiosk() {
		return property.getProperty("POI_KIOSK", "http://maps.google.com/mapfiles/kml/shapes/sunny.png");
	}
	
	public String getPoiAtm() {
		return property.getProperty("POI_ATM", "http://maps.google.com/mapfiles/kml/shapes/sunny.png");
	}
	
	public String getPoiAtmClean() {
		return property.getProperty("POI_ATM_CLEAN", "http://maps.google.com/mapfiles/kml/shapes/sunny.png");
	}
	
	public String getPoiEdc() {
		return property.getProperty("POI_EDC", "http://maps.google.com/mapfiles/kml/shapes/sunny.png");
	}
	
	public String getPoiResident() {
		return property.getProperty("POI_RESIDENT", "http://maps.google.com/mapfiles/kml/shapes/sunny.png");
	}
	
	public String getPoiUsaha() {
		return property.getProperty("POI_USAHA", "http://maps.google.com/mapfiles/kml/shapes/sunny.png");
	}
	
	
	public String getPoiVisitedIcon() {
		return property.getProperty("POI_VISITED_ICON", "http://maps.google.com/mapfiles/kml/shapes/sunny.png");
	}
	
	public String getPoiNotVisitedIcon() {
		return property.getProperty("POI_NOTVISITED_ICON", "http://maps.google.com/mapfiles/kml/shapes/sunny.png");
	}
	
	public String getTrackingPointIcon0() {
		return property.getProperty("TRACKING_POINT_ICON0", "http://maps.google.com/mapfiles/kml/shapes/sunny.png");	
	}
	public String getTrackingPointIcon1() {
		return property.getProperty("TRACKING_POINT_ICON1", "http://maps.google.com/mapfiles/kml/shapes/sunny.png");	
	}
	public String getTrackingPointIcon2() {
		return property.getProperty("TRACKING_POINT_ICON2", "http://maps.google.com/mapfiles/kml/shapes/sunny.png");	
	}
	public String getTrackingPointIcon3() {
		return property.getProperty("TRACKING_POINT_ICON3", "http://maps.google.com/mapfiles/kml/shapes/sunny.png");	
	}
	
	public String getTrackingPointIcon4() {
		return property.getProperty("TRACKING_POINT_ICON4", "http://maps.google.com/mapfiles/kml/shapes/sunny.png");	
	}
	
	public String getTrackingPointIcon5() {
		return property.getProperty("TRACKING_POINT_ICON5", "http://maps.google.com/mapfiles/kml/shapes/sunny.png");	
	}
	
	public String getTrackingPointIcon6() {
		return property.getProperty("TRACKING_POINT_ICON6", "http://maps.google.com/mapfiles/kml/shapes/sunny.png");	
	}
	
	public String getTrackingPointIcon7() {
		return property.getProperty("TRACKING_POINT_ICON7", "http://maps.google.com/mapfiles/kml/shapes/sunny.png");	
	}
	
	
	public String getMapUniverseIframeSrc() {
		return property.getProperty("MAP_UNIVERSE_IFRAME_SRC", "/pages/map.jsp");	
	}
	
	public String getMapTrackingIframeSrc() {
		return property.getProperty("MAP_UNIVERSE_IFRAME_SRC", "/pages/tracking.jsp");	
	}
	
	public String getStreetWebserviceURL() {
		return property.getProperty("STREET_WEBSERVICE_URL", "/search");	
	}
	
	
	public String getUserServiceOpenFireURL() {
		//return property.getProperty("URL_USERSERVICE_OPENFIRE", "http://192.168.96.115:7070/plugins/userService/userservice?");	
		return property.getProperty("URL_USERSERVICE_OPENFIRE", "http://128.199.120.105:9090/plugins/userService/userservice");	
	}
	
	public String getUserSecretOpenFire() {
		return property.getProperty("SECRET_USERSERVICE_OPENFIRE", "fastchat");	
	}
	
	public String getServerChatStatus() {
		return property.getProperty("SERVER_CHAT_STATUS", "ON");	
	}
	
	public String getServerChatName() {
		return property.getProperty("SERVER_CHAT_NAME", "@collection-chat");	
	}
	
	public String getJwChatURL() {
		//return property.getProperty("URL_JWCHAT", "http://localhost:8181/jwchat/fastchat.html");	
		return property.getProperty("URL_JWCHAT", "http://128.199.120.105/chat/example/index.html");	
	}
	
	public String getUploadFilePath() {
		return property.getProperty("UPLOAD_FILE_PATH", ".");
	}
	
	public int getFileMaxSize() {
		return Integer.parseInt(property.getProperty("UPLOAD_FILE_MAX_SIZE", "-1"));
	}
	
	public String getFileExt() {
		return property.getProperty("UPLOAD_FILE_EXT", "");
	}

	public String getBgProcessUploadProxy() {
		return property.getProperty("BG_PROCESS_UPLOAD_PROXY", "");
	}
	public String getBgProcessGenerateProxy() {
		return property.getProperty("BG_PROCESS_GENERATE_PROXY", "");
	}
	public String getBgProcessUploadProd() {
		return property.getProperty("BG_PROCESS_UPLOAD_PROD", "");
	}
	public String getBgProcessGenerateProd() {
		return property.getProperty("BG_PROCESS_GENERATE_PROD", "");
	}
	
	public String getMapStreetDirectoryUniverseIframeSrc() {
		return property.getProperty("MAP_STREET_DIRECTORY", "/pages/map_sd.jsp");	
	}
	
	public String getFlagStreetDirectoryMap() {
		return property.getProperty("FLAG_STREET_DIRECTORY", "0");	
	}
	

	public String getTrackingPointStart() {
		return property.getProperty("TRACKING_POINT_ICON_START", "http://maps.google.com/mapfiles/kml/shapes/sunny.png");	
	}
	
	public String getTrackingPointFinish() {
		return property.getProperty("TRACKING_POINT_ICON_FINISH", "http://maps.google.com/mapfiles/kml/shapes/sunny.png");	
	}
	
	
	
}
