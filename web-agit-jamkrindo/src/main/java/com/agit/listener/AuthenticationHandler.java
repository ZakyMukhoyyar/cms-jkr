package com.agit.listener;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.agit.controller.administration.model.MenuModel;
import com.agit.entity.security.SecUser;
import com.agit.services.AdminService;
import com.agit.services.GenericService;

/**
*
* @author Ridwan
*/
@SuppressWarnings("unused")
@Component("authenticationSuccessHandler")
public class AuthenticationHandler extends SavedRequestAwareAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

	@Autowired
	private AdminService adminService;

	@Autowired
	private GenericService genericService;
	
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

		SecUser secUser 	= adminService.getSecUser(((SecUser) authentication.getPrincipal()).getUsrLogin());
		HttpSession session = request.getSession();
		session.setAttribute("loginSecUser", secUser);
		session.setAttribute("menuList", adminService.getAllMenuModel(secUser));
		
		// save login to audit trail
		String activity	= "LOGIN";
		long moduleId	= 2001;
		
		super.onAuthenticationSuccess(request, response, authentication);
	}
	
	
}
