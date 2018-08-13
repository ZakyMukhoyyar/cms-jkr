package com.agit.controller;

import java.io.File;
import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.beans.propertyeditors.CustomNumberEditor;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.validation.DataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.project.common.DataTables;
import com.agit.entity.ParamConfig;
import com.agit.entity.security.SecUser;
import com.agit.services.AdminService;
import com.agit.services.GenericService;
import com.agit.services.RoleService;
import com.agit.services.LookupService;
import com.agit.services.MenuService;
import com.agit.util.HttpClientUpload;
/**
*
* @author Ridwan
*/

@PropertySource("classpath:app.properties")
public class BaseController {
	@Autowired
	protected Environment env;
	@Autowired
	protected GenericService genericService;
	@Autowired
	protected AdminService adminService;
	@Autowired
	protected RoleService roleService;
	@Autowired
	protected LookupService lookupService;
	@Autowired
	protected MenuService menuService;
	
	protected DateFormat dateFormat 			= new SimpleDateFormat("dd/MM/yyyy");
	protected final NumberFormat numberFormat 	= new DecimalFormat("#,##0.00");
	
	public static final String SUPER_ADMIN 		= "ADMIN";
	public static final String USER_ADMIN 		= "USER";
	public static final String MANAGER_ADMIN 	= "MANAJER";
	public static final String VIEW				= "VIEW";
	public static final String NEW				= "NEW";
	public static final String EDIT				= "EDIT";
	public static final String DELETE			= "DELETE";
	
	private String dirNews;
	private String dirAgentFC;
	private String dirVisit;
	private String imgTrackingMarker;
	private String imgTrackingMarkerVisit;
	
	public String getUnauthorizedPage() {
		return "01.misc/not_authorized";
	}
	
	@InitBinder
	public void initBinder(DataBinder binder) throws Exception {
		binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, true));
		binder.registerCustomEditor(BigDecimal.class, new CustomNumberEditor(Double.class, numberFormat, true));
	}

	protected SecUser getLoginSecUser(HttpSession session) {
		return (SecUser) session.getAttribute("loginSecUser");
	}
	protected String getLoginPasswordPlan(HttpSession session) {
		return  (String) session.getAttribute("passwordPlain");
	}
	
	protected Long getUserIdFromSession(HttpSession session) {
		SecUser user = this.getLoginSecUser(session);
		if (user != null) {
			return user.getId();
		}
		return null;
	}
	
	/*protected String getBranchCodeFromSession(HttpSession session) {
		SecUser user = this.getLoginSecUser(session);
		if (user != null) {
			return user.getBranchCode();
		}

		return null;
	}	*/
	
	protected Long getLoginIdFromSession(HttpSession session) {
		SecUser user = this.getLoginSecUser(session);
		if (user != null) {
			if (user.getUsrType().equals(SUPER_ADMIN)) {
				return null;
			} else {
				return user.getId();
			}
		}

		return 0L;
	}
	
	
	protected boolean getPriviledgeUser(HttpSession session, String menu, String component) {
		SecUser user = getLoginSecUser(session);
		if (user.getUsrType().equals(USER_ADMIN))
			return true;
		
		return adminService.getPriviledge(user.getId(), menu, component);
	}
	
	
	
	public String getXMLValue(Object object){
		String XML = "";
		try {
			String className = object.getClass().getSimpleName();
			XML = "<" + className + ">\n";
			for (Field field : object.getClass().getDeclaredFields()) {
				field.setAccessible(true);
				
				String name		= field.getName();
				Object value	= field.get(object);
				
				XML += "\t<"+name+">"+ value +"</"+name+">\n";
				
			}
			XML += "</" + className + ">\n";
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return XML;
	}
	
	

	@RequestMapping("/getUser")
	public @ResponseBody DataTables getUser(DataTables dataTables,
			@RequestParam(required = false) String userName,
			HttpSession session) {
		
		HashMap<String, Object> searchMap = new HashMap<>();
		searchMap.put("loginId",	getLoginIdFromSession(session));
		searchMap.put("userLogin", 	userName);
		dataTables = adminService.searchByMapCriteria(dataTables, searchMap);
		
		return dataTables;
	}
	
	@RequestMapping("/getMenu")
	public @ResponseBody DataTables getMenu(DataTables dataTables,
			@RequestParam(required = false) String name,
			HttpSession session) {
		HashMap<String, Object> searchMap = new HashMap<>();
		long parentId = 12345678910L;
		searchMap.put("name", 	name);
		searchMap.put("parentId", parentId);
		dataTables = menuService.searchByMapCriteria(dataTables, searchMap);
		return dataTables;
	}
	
	
	public String getProductImageDirectory() {
		ParamConfig config = genericService.getConfigByName(ParamConfig.WEB_PARAMCONFIG_PROMO_BANNER);
	    if(config != null){
	    	File dir = new File(config.getValue());
		    if (! dir.exists()) {
		        dir.mkdirs();
		    }
		    
		    return config.getValue();
	    }
	    
		return null;
	}
	
	public Long getUploadImageSizeMax() {
		Long size	= 0L;
		ParamConfig config = genericService.getConfigByName(ParamConfig.WEB_UPLOAD_IMAGE_SIZE_MAX);
	    if(config != null){
	    	size	= Long.valueOf(config.getValue());
	    }
	    
		return size;
	}
	
	public String getAgentProductWsUrl() {
		ParamConfig config = genericService.getConfigByName(ParamConfig.WS_PARAMCONFIG_BANNER_AGENT_URL);
	    if(config != null){
		    return config.getValue();
	    }
	    
		return null;
	}
	
	public String getMemberProductWsUrl() {
		ParamConfig config = genericService.getConfigByName(ParamConfig.WS_PARAMCONFIG_BANNER_MEMBER_URL);
	    if(config != null){
		    return config.getValue();
	    }
	    
		return null;
	}
	
	public void refreshParameters(String app){
		if ("AGENT".equals(app)) {
			ParamConfig config = genericService.getConfigByName(ParamConfig.WS_PARAMCONFIG_REFRESH_AGENT_URL);
		    if(config != null){
		    	String agentWsUrl	= config.getValue();
		    	if(StringUtils.isNotBlank(agentWsUrl)){
					HttpClientUpload httpClient = new HttpClientUpload(agentWsUrl);
					httpClient.refresh();
				}
		    }

		} else if ("MEMBER".equals(app)) {
			ParamConfig config = genericService.getConfigByName(ParamConfig.WS_PARAMCONFIG_REFRESH_MEMBER_URL);
		    if(config != null){
		    	String memberWsUrl	= config.getValue();
		    	if(StringUtils.isNotBlank(memberWsUrl)){
					HttpClientUpload httpClient = new HttpClientUpload(memberWsUrl);
					httpClient.refresh();
				}
		    }

		} else {
			ParamConfig config = genericService.getConfigByName(ParamConfig.WS_PARAMCONFIG_REFRESH_AGENT_URL);
		    if(config != null){
		    	String agentWsUrl	= config.getValue();
		    	if(StringUtils.isNotBlank(agentWsUrl)){
					HttpClientUpload httpClient = new HttpClientUpload(agentWsUrl);
					httpClient.refresh();
				}
		    }
		    
		    config = genericService.getConfigByName(ParamConfig.WS_PARAMCONFIG_REFRESH_MEMBER_URL);
		    if(config != null){
		    	String memberWsUrl	= config.getValue();
		    	if(StringUtils.isNotBlank(memberWsUrl)){
					HttpClientUpload httpClient = new HttpClientUpload(memberWsUrl);
					httpClient.refresh();
				}
		    }
		}
	}
	
	
	@RequestMapping("/getAgentFC")
	public @ResponseBody DataTables getAgentFC(DataTables dataTables,
			@RequestParam(required = false) String name,
			HttpSession session) {
		
		HashMap<String, Object> searchMap = new HashMap<>();
		//searchMap.put("loginId",	getLoginIdFromSession(session));
		searchMap.put("name",name);
		searchMap.put("parentId", getChildsUserIdList(session));
		//searchMap.put("branchCode", getBranchCodeFromSession(session));
		//dataTables = agentService.searchByMapCriteria(dataTables, searchMap);
		
		return dataTables;
	}
	
	
	@RequestMapping("/getFico")
	public @ResponseBody DataTables getFico(DataTables dataTables,
			@RequestParam(required = false) String usrFirstName,
			@RequestParam(required = false) Long areaId,
			@RequestParam(required = false) String usrPosition,
			HttpSession session) {
		
		HashMap<String, Object> searchMap = new HashMap<>();
		//searchMap.put("loginId",	getLoginIdFromSession(session));
		searchMap.put("usrFirstName", 	usrFirstName);
		searchMap.put("areaId", 	areaId);
		searchMap.put("usrPosition", usrPosition);
		dataTables = adminService.searchByMapCriteria(dataTables, searchMap);
		
		return dataTables;
	}
	
	@RequestMapping("/getCustomer")
	public @ResponseBody DataTables getCustomer(DataTables dataTables,
			@RequestParam(required = false) String name,
			@RequestParam(required = false) String no,
			@RequestParam(required = false) Long customerId,
			HttpSession session) {
		
		HashMap<String, Object> searchMap = new HashMap<>();
		searchMap.put("name",name);
		searchMap.put("no",no);
		searchMap.put("id",customerId);
//		dataTables = customerService.searchByMapCriteria(dataTables, searchMap);
		
		return dataTables;
	}
	
	@SuppressWarnings("unchecked")
	protected List<Long> getChildsUserIdList(HttpSession session) {
		List<Long> res = (List<Long>) session.getAttribute("childsUserIdList");
		if(res==null) return new ArrayList<Long>();
		return res;
	}

	@RequestMapping("/getFcProfile")
	public @ResponseBody DataTables getFcProfile(DataTables dataTables,
			@RequestParam(required = false) String name,
			HttpSession session) {
		
		HashMap<String, Object> searchMap = new HashMap<>();
		//searchMap.put("loginId",	getLoginIdFromSession(session));
		searchMap.put("name", 	name);
	//	dataTables = fcProfileService.searchByMapCriteria(dataTables, searchMap);
		
		return dataTables;																																																																																																																																																																																																								
	}
	
	@RequestMapping("/getProductName")
	public @ResponseBody DataTables getProductName(DataTables dataTables,
			@RequestParam(required = false) String name,
			HttpSession session) {
		
		HashMap<String, Object> searchMap = new HashMap<>();
		//searchMap.put("loginId",	getLoginIdFromSession(session));
		searchMap.put("name", 	name);
	//	dataTables = productService.searchByMapCriteria(dataTables, searchMap);
		
		return dataTables;																																																																																																																																																																																																								
	}
	
	
	/**
	 * @return the Directory News
	 */
	public String getDirNews() {
		if (dirNews == null) {
			dirNews = env.getProperty("DIR_NEWS_FILE");
		}
		return dirNews;
	}
	
	public String getDirAgentFC() {
		if (dirAgentFC == null) {
			dirAgentFC = env.getProperty("DIR_AGENT");
		}
		return dirAgentFC;
	}
	
	public String getDirVisit() {
		if (dirVisit == null) {
			dirVisit = env.getProperty("DIR_VISIT");
		}
		return dirVisit;
	}
	
	
	public String getImageTrackingMarker() {
		if (imgTrackingMarker == null) {
			imgTrackingMarker = env.getProperty("IMAGE_TRACKING_MARKER");
		}
		return imgTrackingMarker;
	}
	
	
	public String getImageTrackingVisit() {
		if (imgTrackingMarkerVisit == null) {
			imgTrackingMarkerVisit = env.getProperty("IMAGE_TRACKING_MARKER_VISIT");
		}
		return imgTrackingMarkerVisit;
	}
	
}
