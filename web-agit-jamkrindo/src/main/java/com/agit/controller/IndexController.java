package com.agit.controller;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.agit.entity.security.SecUser;
/**
*
* @author Ridwan
*/
@Controller
public class IndexController extends BaseController {

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String index(Model model, HttpSession session) {
    	SecUser user = this.getLoginSecUser(session);
    	
    	if (SUPER_ADMIN.equals(user.getUsrType())){
    		return "redirect:/administration/user/";
    	} else if (USER_ADMIN.equals(user.getUsrType())){
    		return "redirect:/Pengajuan/cms/";
    	} else if (MANAGER_ADMIN.equals(user.getUsrType())){
    		return "redirect:/approve/cms/";
    	}else{
    		return "02.administration/user";
    	}
    }
    
    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String login() {
        return "01.misc/login";
    }
    
    @SuppressWarnings("unused")
	@RequestMapping(value = "/logout", method = RequestMethod.GET)
    public String logout(HttpServletRequest request) {
    	
    	String activity	= "LOGOUT";
    	long moduleId	= 2002;
    	
    	return "redirect:j_spring_security_logout";
    }
    
    @RequestMapping(value = "/404", method = RequestMethod.GET)
    public String _404() {
        return "01.misc/404";
    }
}
