package com.agit.controller.administration;

import java.util.HashMap;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.project.common.AjaxResponse;
import com.project.common.DataTables;
import com.agit.controller.BaseController;
import com.agit.controller.administration.model.UserModel;
import com.agit.entity.Lookup;
import com.agit.entity.security.SecUser;

/**
*
* @author Ridwan
*/
@Controller
@RequestMapping("/administration/user")
public class UserManagementController extends BaseController {

	final static String MENU 		= "ADMINISTRATION";
	final static String PRIVILEDGE 	= "USER_MANAGEMENT";
	private String BASE_VIEW 		= "02.administration/";
	private String LIST_VIEW 		= "user";
	private String EDIT_VIEW		= "user-edit";
	
	@RequestMapping("/")
	public String index(Model model, HttpSession session) {

		if (getPriviledgeUser(session, PRIVILEDGE, VIEW)) {
			
			putIntoRequest(model);
			
			return BASE_VIEW + LIST_VIEW;
		}

		return getUnauthorizedPage();
	}

	@RequestMapping("/search")
	public @ResponseBody DataTables search(DataTables dataTables, 
			@RequestParam(required = false) String usrLogin,
			@RequestParam(required = false) String usrFirstName,
			@RequestParam(required = false) String usrLastName,
			HttpSession session, HttpServletRequest request) {

		HashMap<String, Object> searchMap = new HashMap<>();
		searchMap.put("usrLogin", 		usrLogin);
		searchMap.put("usrFirstName",	usrFirstName);
		searchMap.put("usrLastName", 	usrLastName);

		DataTables dt = adminService.searchByMapCriteria(dataTables, searchMap);
		return dt;
	}

	@RequestMapping("/create")
	public String create(Model model, HttpSession session) {
		
		if (getPriviledgeUser(session, PRIVILEDGE, NEW)) {
			
			model.addAttribute("listRole", roleService.list());
			putIntoRequest(model);
			
			return BASE_VIEW + EDIT_VIEW;
		}
		
		return getUnauthorizedPage();
	}

	@RequestMapping("/edit/{id}")
	public String edit(@PathVariable Long id, Model model, HttpSession session) {
		
		if (getPriviledgeUser(session, PRIVILEDGE, EDIT)) {
			
			SecUser user = adminService.getSecUser(id);
					
			model.addAttribute("user", user);
			model.addAttribute("listUserrole", adminService.listSecUserrole(id));
			model.addAttribute("listRole", roleService.list());
				
			putIntoRequest(model);

			return BASE_VIEW + EDIT_VIEW;
		}

		return getUnauthorizedPage();
	}
	


	@RequestMapping(value = "/save", method = RequestMethod.POST, headers = { "content-type=application/json" })
	public @ResponseBody AjaxResponse save(@RequestBody UserModel model, HttpSession session)throws Exception {
		
		SecUser findUser = adminService.getSecUser(model.getUsrLogin());
		if (model.getId() == null && findUser != null)
			return new AjaxResponse(false, "Username is already exists !");
		
		 if (StringUtils.isNotEmpty(model.getUsrPassword())) {
			 model.setUsrPassword(adminService.encodePassword(model.getUsrPassword()));
	        }
	   
		adminService.saveSecUser(model, getLoginSecUser(session));
		

		return new AjaxResponse(model);
	}
	
	
	
	private void putIntoRequest(Model model) {
		model.addAttribute("SELECTED_MENU", MENU);
		model.addAttribute("SELECTED_SUBMENU", PRIVILEDGE);
		model.addAttribute("listPositionType", genericService.lookup(Lookup.LOOKUP_POSITION_TYPE));
		model.addAttribute("listUserStatus", genericService.lookup(Lookup.LOOKUP_USER_STATUS_TYPE));
		model.addAttribute("listUserType", genericService.lookup(Lookup.LOOKUP_USER_TYPE));
		model.addAttribute("listStatusType", genericService.lookup(Lookup.LOOKUP_STATUS_TYPE));
	}
	
	
}
