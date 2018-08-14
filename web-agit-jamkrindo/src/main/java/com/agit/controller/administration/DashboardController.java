package com.agit.controller.administration;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.servlet.http.HttpSession;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.agit.entity.security.SecUser;
import com.agit.controller.BaseController;
import static com.agit.controller.administration.MenuController.PRIVILEDGE;

@Controller
@RequestMapping("/administration/dashboard/")
public class DashboardController extends BaseController {

    final static String MENU = "ADMINISTRATION";
    final static String PRIVILEDGE = "DASHBOARD";
    String BASE_VIEW = "02.administration/";
    String LIST_VIEW = "dashboard";
    String LIST_DEBITUR_VIEW = "debitur-detail";

    @RequestMapping("/")
    public String index(Model model, HttpSession session) {

        if (getPriviledgeUser(session, PRIVILEDGE, VIEW)) {
            SecUser user = getLoginSecUser(session);
            model.addAttribute("user", user);
            putIntoRequest(model);

            return BASE_VIEW + LIST_VIEW;
        }

        return getUnauthorizedPage();
    }
    
    @RequestMapping("dashbord/debitur-detail")
	public String create(Model model, HttpSession session) {
            return BASE_VIEW + LIST_DEBITUR_VIEW;

//		if (getPriviledgeUser(session, PRIVILEDGE, NEW)) {
//			
//			putIntoRequest(model);
//			
//			return BASE_VIEW + LIST_DEBITUR_VIEW;
//		}
		
		
	}

   

    private void putIntoRequest(Model model) {
        model.addAttribute("SELECTED_MENU", MENU);
        model.addAttribute("SELECTED_SUBMENU", PRIVILEDGE);
    }

}
