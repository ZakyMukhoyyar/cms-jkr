package com.agit.controller.administration;

import java.util.Calendar;
import java.util.Date;

import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.project.common.AjaxResponse;
import com.agit.controller.BaseController;
import com.agit.entity.ParamConfig;
import com.agit.entity.security.SecUser;
import com.agit.util.PluginOpenFire;
/**
*
* @author Ridwan
*/
@Controller
@RequestMapping("/password/change")
public class ChangePasswordController extends BaseController {

	String BASE_VIEW 	= "02.administration/";
	String EDIT_VIEW 	= "password-change";
	String DEFAULT_VIEW = "password-change-default";
	PluginOpenFire openFire;
	
	@RequestMapping(method = RequestMethod.GET)
	public String index() {
		
		return BASE_VIEW + EDIT_VIEW;
	}

	@RequestMapping(value = "/default", method = RequestMethod.GET)
    public String changePassword() {
    	return BASE_VIEW + DEFAULT_VIEW;
    }
	
	@SuppressWarnings({ "unused" })
	@RequestMapping(method = RequestMethod.POST)
	public @ResponseBody AjaxResponse change(HttpSession session, 
			@RequestParam String oldPassword,
			@RequestParam String newPassword, 
			@RequestParam String retypePassword) throws Exception {

		SecUser secUser = getLoginSecUser(session);
		//String regex 	= "^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[~!@#$%^&*])[a-zA-Z0-9~!@#$%^&*()+=]{6,10}$";
		String name = secUser.getUsrFirstName()!=null?secUser.getUsrFirstName():""+" "+secUser.getUsrLastName()!=null?secUser.getUsrLastName():"";
		String email = secUser.getUsrEmail();
		//if(newPassword.trim().matches(regex)){
			String encodedPassword 	= adminService.encodePassword(oldPassword);
			if (StringUtils.equals(encodedPassword, secUser.getUsrPassword())) {
				/*ParamConfig config 	= genericService.getConfigByName(ParamConfig.WEB_USED_PASSWD_ITERATION);
				if ( config != null ){
					int times				= Integer.valueOf(config.getValue());
					List<String> passwords	= logPasswordService.lastPasswordList(secUser.getUsrLogin(), times);
					encodedPassword			= adminService.encodePassword(newPassword);
					if(passwords.contains(encodedPassword)){
						
						return new AjaxResponse(false, "This Password already used before, please use another password.");
					}else{*/
						//secUser.setPasswordDefault(false);
				
						String encodedNewPassword 	= adminService.encodePassword(newPassword);
						secUser.setUsrPassword(encodedNewPassword);
						ParamConfig config  = genericService.getConfigByName(ParamConfig.WEB_CHANGE_PASSWD_PERIOD);
						if(config != null){
							Calendar cal = Calendar.getInstance();
							cal.setTime(new Date(System.currentTimeMillis()));
							cal.add(Calendar.DAY_OF_MONTH, Integer.valueOf(config.getValue()));
						}
						
						//secUser.setChatLogin(secUser.getChatLogin().toLowerCase());
						adminService.saveOrUpdate(secUser);
						//TODO OpenFire
						String groupName = "BTN";
					//	openFire.saveUser(secUser.getChatLogin(), newPassword, name, "", email,groupName, true);
						
						//logPasswordService.save(secUser.getUsrLogin(), encodedPassword);
						session.setAttribute("loginSecUser", secUser);
						session.removeAttribute("forceChangePasswd");
						session.setAttribute("passwordPlain", newPassword);
						
					/*}
				}*/
			}else{
				return new AjaxResponse(false, "Old Password is wrong.");
			}
			
			return new AjaxResponse();
		/*} else {
			return new AjaxResponse(false, "Password must contain letter(Upper and Lower case), number and symbol, min 6 max 10");
		}*/
	}
}
