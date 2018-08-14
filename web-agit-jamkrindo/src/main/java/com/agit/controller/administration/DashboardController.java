package com.agit.controller.administration;


import javax.servlet.http.HttpSession;

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
    String LIST_DEBITUR_VIEW = "debitur-detail";
    String LIST_MITRA_VIEW = "list-mitra";
    String LIST_PENDING_PROSES_KLAIM = "pending-proses-klaim";

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

    @RequestMapping("list-mitra")
    public String viewListMitra(Model model, HttpSession session) {
        return BASE_VIEW + LIST_MITRA_VIEW;

    }

    @RequestMapping("debitur-detail")
    public String viewDebiturDetail(Model model, HttpSession session) {
        return BASE_VIEW + LIST_DEBITUR_VIEW;
    }

    @RequestMapping("pending-proses-klaim")
    public String viewPendingProsesKlaim(Model model, HttpSession session) {
        return BASE_VIEW + LIST_PENDING_PROSES_KLAIM;
    }

    private void putIntoRequest(Model model) {
        model.addAttribute("SELECTED_MENU", MENU);
        model.addAttribute("SELECTED_SUBMENU", PRIVILEDGE);
    }

}
