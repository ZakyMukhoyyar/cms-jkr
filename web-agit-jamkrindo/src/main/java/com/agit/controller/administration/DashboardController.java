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

@Controller
@RequestMapping("/administration/dashboard/")
public class DashboardController extends BaseController {

    final static String MENU = "ADMINISTRATION";
    final static String PRIVILEDGE = "DASHBOARD";
    String BASE_VIEW = "02.administration/";
    String LIST_VIEW = "dashboard";

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

    @ServerEndpoint(value = "/websocket/chat/{usrLogin}")
    public class Chat {

        private String usrLogin;
        private Session session;
        private final Map<String, Chat> connections = new ConcurrentHashMap<>();

        public Map<String, Chat> getConnections() {
            return connections;
        }

    }

    private void putIntoRequest(Model model) {
        model.addAttribute("SELECTED_MENU", MENU);
        model.addAttribute("SELECTED_SUBMENU", PRIVILEDGE);
    }

}
