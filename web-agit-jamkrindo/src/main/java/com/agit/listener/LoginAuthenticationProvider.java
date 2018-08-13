package com.agit.listener;

import java.util.ArrayList;
import java.util.Collection;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import com.agit.entity.Lookup;
import com.agit.entity.ParamConfig;
import com.agit.entity.security.SecUser;
import com.agit.services.AdminService;
import com.agit.services.GenericService;
import com.agit.util.PluginOpenFire;
/**
*
* @author Ridwan
*/
@Component("authenticationProvider")
public class LoginAuthenticationProvider implements AuthenticationProvider{

	@Autowired
	protected AdminService adminService;
	@Autowired
	protected GenericService genericService;
	
	PluginOpenFire openFire;
	
	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		
		String username = authentication.getName();
        String password = (String) authentication.getCredentials();
        SecUser user 	= adminService.getSecUser(username);

        if (user == null) {
			throw new BadCredentialsException("User does not exist.");	
		}else{
			
			String passwordEncode = adminService.encodePassword(password);
			if(StringUtils.equals(passwordEncode, user.getUsrPassword())){
					adminService.resetFailAttempts(username);
					Collection<? extends GrantedAuthority> authorities = getGrantedAuthority(user);
					return new UsernamePasswordAuthenticationToken(user, password, authorities);
				}else{
				int MAX_LOGIN_ATTEMPTS = 3;
				ParamConfig config	= genericService.getConfigByName(ParamConfig.WEB_INVALID_PASSWD_LIMIT);
				if( config != null ){
					MAX_LOGIN_ATTEMPTS	= Integer.valueOf(config.getValue());
				}
				
	//			adminService.updateFailAttempts(username, MAX_LOGIN_ATTEMPTS);
				
					throw new BadCredentialsException("Please Input correct username and password");
					
			}
		}
	}

	@Override
	public boolean supports(Class<?> authentication) {
		return authentication.equals(UsernamePasswordAuthenticationToken.class);
	}

	private Collection<GrantedAuthority> getGrantedAuthority(SecUser user) {

		Collection<String> rights = null;
		
		if(user.getUsrType() != null && user.getUsrType().equalsIgnoreCase(SecUser.SUPER_ADMIN)){
			rights = adminService.getRightsByUser(user);
		}else{
			rights = adminService.getRightsByUser(user);
		}
		
		ArrayList<GrantedAuthority> rechteGrantedAuthorities = new ArrayList<GrantedAuthority>(rights.size());

		for (String right : rights) {
			rechteGrantedAuthorities.add(new GrantedAuthorityImpl(right));
		}
		
		return rechteGrantedAuthorities;
	}
	
	class GrantedAuthorityImpl implements GrantedAuthority {
		
		private static final long serialVersionUID = 1L;
		
		private String role;
	 
	    public GrantedAuthorityImpl(String role) {
	        this.role = role;
	    }
	 
	    public String getAuthority() {
	        return role;
	    }
	}
}
