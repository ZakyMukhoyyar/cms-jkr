package com.agit.controller.administration;

import java.util.HashMap;

import javax.servlet.http.HttpSession;

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
import com.agit.controller.administration.model.RoleModel;
import com.agit.entity.security.SecMenu;
import com.agit.entity.security.SecRole;
/**
*
* @author Ridwan
*/
@Controller
@RequestMapping("/administration/menu")
public class MenuController extends BaseController {

	final static String MENU 		= "ADMINISTRATION";
	final static String PRIVILEDGE 	= "MENU";
	String BASE_VIEW 				= "02.administration/";
	String LIST_VIEW 				= "menu";
	String EDIT_VIEW 				= "menu-edit";

	@RequestMapping("/")
	public String index(Model model, HttpSession session) {
		
		if (getPriviledgeUser(session, PRIVILEDGE, VIEW)) {
			
			putIntoRequest(model);
			
			return BASE_VIEW + LIST_VIEW;
		}
		
		return getUnauthorizedPage();
	}

	@RequestMapping("/search")
	public @ResponseBody DataTables search(DataTables dataTables, @RequestParam String name) {
		
		HashMap<String, Object> searchMap = new HashMap<>();
		searchMap.put("name", name);
		
		return menuService.searchByMapCriteria(dataTables, searchMap);
	}

	@RequestMapping("/create")
	public String create(Model model, HttpSession session) {

		if (getPriviledgeUser(session, PRIVILEDGE, NEW)) {
			
			putIntoRequest(model);
			
			return BASE_VIEW + EDIT_VIEW;
		}
		
		return getUnauthorizedPage();
	}

	@RequestMapping("/edit/{id}")
	public String edit(@PathVariable Long id, Model model, HttpSession session) {

		if (getPriviledgeUser(session, PRIVILEDGE, EDIT)) {
			
			SecMenu menu = menuService.findById(id);
			model.addAttribute("menu", menu);
			putIntoRequest(model);
			
			return BASE_VIEW + EDIT_VIEW;
		}

		return getUnauthorizedPage();
	}

	@RequestMapping(value = "/save", method = RequestMethod.POST, headers = { "content-type=application/json" })
	public @ResponseBody AjaxResponse save(@RequestBody SecMenu model, HttpSession session) {

		menuService.saveSecRole(model, getLoginSecUser(session));

		return new AjaxResponse(model);
	}
	
	private void putIntoRequest(Model model) {
		model.addAttribute("SELECTED_MENU", MENU);
		model.addAttribute("SELECTED_SUBMENU", PRIVILEDGE);
	}
}
