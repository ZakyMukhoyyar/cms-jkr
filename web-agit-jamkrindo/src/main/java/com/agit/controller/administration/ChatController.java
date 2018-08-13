package com.agit.controller.administration;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.servlet.http.HttpSession;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.agit.entity.MessageType;
import com.agit.entity.security.SecMenu;
import com.agit.entity.security.SecUser;
import com.agit.entity.Message;
import com.agit.controller.BaseController;


@Controller
@RequestMapping("/administration/chat/")
public class ChatController extends BaseController {

	final static String MENU = "ADMINISTRATION";
	final static String PRIVILEDGE = "CHAT";
	String BASE_VIEW = "02.administration/";
	String LIST_VIEW = "chat";

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

	    @OnOpen
	    public void start(Session session, @PathParam("usrLogin") String usrLogin) {
	        this.usrLogin = usrLogin;
	        this.session = session;
	        connections.put(this.usrLogin, this);
	        broadcast(new Message(MessageType.USER_LIST, getLoggedUsersList()).toJson());

	        String message = String.format("%s %s", usrLogin, "has joined.");
	        broadcast(new Message(MessageType.MESSAGE, message, "[SERVER]").toJson());
	    }

	    @OnClose
	    public void end() {
	        connections.remove(this.usrLogin);
	        broadcast(new Message(MessageType.USER_LIST, getLoggedUsersList()).toJson());
	        String message = String.format("%s %s", usrLogin, "has disconnected.");
	        broadcast(new Message(MessageType.MESSAGE, message, "[SERVER]").toJson());
	    }

	    @OnMessage
	    public void incoming(String message) {
	        broadcast(new Message(MessageType.MESSAGE, message, usrLogin).toJson());
	    }

	    private void broadcast(String msg) {
	        for (Map.Entry<String, Chat> client : connections.entrySet()) {
	            try {
	                synchronized (client) {
	                    client.getValue().session.getBasicRemote().sendText(msg);
	                }
	            } catch (IOException e) {
	                connections.remove(client.getKey());
	                broadcast(new Message(MessageType.MESSAGE, getLoggedUsersList()).toJson());
	                try {
	                    client.getValue().session.close();
	                } catch (IOException e1) {
	                    // Ignore
	                }
	                String message = String.format("%s %s", client.getKey(), "has been disconnected.");
	                Message jsonMessage = new Message(MessageType.MESSAGE, message, "[SERVER]");
	                broadcast(jsonMessage.toJson());
	            }
	        }
	    }

	    private synchronized String getLoggedUsersList() {
	        String userList = "";
	        for (String nickname : connections.keySet())
	            userList += nickname + "</br>";
	        return userList;
	    }
	}    
	
	private void putIntoRequest(Model model) {
		model.addAttribute("SELECTED_MENU", MENU);
		model.addAttribute("SELECTED_SUBMENU", PRIVILEDGE);
	}

}
