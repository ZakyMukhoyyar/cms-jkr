package com.agit.util;

import java.io.IOException;
import java.io.StringReader;
import java.util.ArrayList;
import java.util.List;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.apache.http.NameValuePair;
import org.apache.http.message.BasicNameValuePair;
import org.w3c.dom.Document;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;


public class PluginOpenFire {
	
	private static ServiceClient sc = new ServiceClient();
	/*private static String url =SystemPropertiesHelper.getInstance().getUserServiceOpenFireURL();
	private static String secret =SystemPropertiesHelper.getInstance().getUserSecretOpenFire();
	private static String srvOnStatus =SystemPropertiesHelper.getInstance().getServerChatStatus();
	private static String srvname ="@"+SystemPropertiesHelper.getInstance().getServerChatName();*/
	private static String url ="http://128.199.120.105:9090/plugins/userService/userservice";
	private static String secret = "fastchat";
	private static String srvOnStatus  ="ON";
	private static String srvname ="@collection-chat";
	public static final String SUCCESS ="ok";	
	public static final String BOTH ="3";
	public static final String USER_NOT_FOUND ="UserNotFoundException";
	public static final String USER_ALREADY_EXIST ="UserAlreadyExistsException";
	public static final String REQUEST_NOT_AUHORISED ="RequestNotAuthorised";	
	public static final String SHARED_GROUP_EXCEPTION ="SharedGroupException";
	public static final String ILLEGAL_EXCEPTION ="IllegalArgumentException";
	public static final String SERVERNOTREADY ="Server chat not ready";
	private static DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
	private static DocumentBuilder builder=null;
	private static InputSource is=null;
	
 
	
	public static String saveUser(String loginName,String pass,String usrFirstName, String usrLastName, String usrEmail, String groupName, boolean recordNew) throws Exception{
		String response =null;
		 			
		try{
			//http://serverdev:9000/plugins/userService/userservice?type=add&secret=4mTo41GG&username=admin2&password=Demo2010&name=zuhron&email=m.zuhron@agit.co.id
			//jika user baru										
			//<error>UserAlreadyExistsException</error>
			if (srvOnStatus.equalsIgnoreCase("ON")){
				 
				String type = (recordNew)?"add":"update";
				List<NameValuePair> urlParameters = new ArrayList<NameValuePair>();

				urlParameters.add(new BasicNameValuePair("secret", secret));
				urlParameters.add(new BasicNameValuePair("type", type));
				urlParameters.add(new BasicNameValuePair("username", loginName));
				urlParameters.add(new BasicNameValuePair("password", pass));
				urlParameters.add(new BasicNameValuePair("name", usrFirstName.concat(" ").concat(usrLastName)));
				urlParameters.add(new BasicNameValuePair("email", usrEmail));
				urlParameters.add(new BasicNameValuePair("groups", groupName));
				
				response = getRespone(sc.sendPost(url, urlParameters));
				System.out.println(response);
				  if (response != null){
					  if (response.equalsIgnoreCase(USER_NOT_FOUND)){
						  saveUser( loginName, pass, usrFirstName,  usrLastName,  usrEmail, groupName, true);
					  }else if(response.equalsIgnoreCase(USER_ALREADY_EXIST)){
						  saveUser( loginName, pass, usrFirstName,  usrLastName,  usrEmail, groupName, false);
					  }
				  }
			}else{
				return SERVERNOTREADY;
			}
			
		}catch(Exception e){
			throw e;
		}
		return response;		
	}
	
	public static String updatePassword(String loginName,String pass) throws Exception{
		String response =null;
		 			
		try{
			//http://serverdev:9000/plugins/userService/userservice?type=add&secret=4mTo41GG&username=admin2&password=Demo2010&name=zuhron&email=m.zuhron@agit.co.id
			//jika user baru										
			//<error>UserAlreadyExistsException</error>
			if (srvOnStatus.equalsIgnoreCase("ON")){
				 
				String type = "update";
				List<NameValuePair> urlParameters = new ArrayList<NameValuePair>();

				urlParameters.add(new BasicNameValuePair("secret", secret));
				urlParameters.add(new BasicNameValuePair("type", type));
				urlParameters.add(new BasicNameValuePair("username", loginName));
				urlParameters.add(new BasicNameValuePair("password", pass));
				
				response = getRespone(sc.sendPost(url, urlParameters));
				  if (response != null && !response.equals("ok")){
					  throw new RuntimeException("Unable to update chat password: "+response);
				  }
			}else{
				return SERVERNOTREADY;
			}
			
		}catch(Exception e){
			throw e;
		}
		return response;		
	}
	
	
	
		
		public static String deleteUser(String loginName) throws Exception{
		String response =null;
		 				
		try{
			 	
			if (srvOnStatus.equalsIgnoreCase("ON")){
			  
			  
			   List<NameValuePair> urlParameters = new ArrayList<NameValuePair>();

				urlParameters.add(new BasicNameValuePair("secret", secret));
				urlParameters.add(new BasicNameValuePair("type", "delete"));
				urlParameters.add(new BasicNameValuePair("username", loginName));
				 
				response = getRespone(sc.sendPost(url, urlParameters));
				
			}else{
					return SERVERNOTREADY;
				}		
		}catch(Exception e){
			throw e;
		}
		return response;		
	}
		
		
		
		public static String disableUser(String loginName) throws Exception{
		String response =null;
		 			
		try{
			//http://example.com:9090/plugins/userService/userservice?type=disable&secret=bigsecret&username=kafka
			if (srvOnStatus.equalsIgnoreCase("ON")){
			 
			  
			  
			   List<NameValuePair> urlParameters = new ArrayList<NameValuePair>();

				urlParameters.add(new BasicNameValuePair("secret", secret));
				urlParameters.add(new BasicNameValuePair("type", "disable"));
				urlParameters.add(new BasicNameValuePair("username", loginName));
				 
				response = getRespone(sc.sendPost(url, urlParameters));
				
				
			}else{
				return SERVERNOTREADY;
			}	
			
		}catch(Exception e){
			throw e;
		}
		return response;		
	}
		

		public static String enabledUser(String loginName) throws Exception{
		String response =null;
		 				
		try{
			//http://example.com:9090/plugins/userService/userservice?type=disable&secret=bigsecret&username=kafka	 
			if (srvOnStatus.equalsIgnoreCase("ON")){
			   
			  
			    List<NameValuePair> urlParameters = new ArrayList<NameValuePair>();
			    urlParameters.add(new BasicNameValuePair("secret", secret));
				urlParameters.add(new BasicNameValuePair("type", "enable"));
				urlParameters.add(new BasicNameValuePair("username", loginName));
				 
				response = getRespone(sc.sendPost(url, urlParameters));
				
				
			}else{
				return SERVERNOTREADY;
			}	
		}catch(Exception e){
			throw e;
		}
		return response;		
	}
	
	
	
	
	public static String saveRoaster(String loginName,String jid, String jidName, String group, boolean recordNew) throws Exception{
		String response =null;
		 			
		try{
		 
			if (srvOnStatus.equalsIgnoreCase("ON")){
			    String type = (recordNew)?"add_roster":"update_roster";
				List<NameValuePair> urlParameters = new ArrayList<NameValuePair>();
				urlParameters.add(new BasicNameValuePair("secret", secret));
				urlParameters.add(new BasicNameValuePair("type", type));
				urlParameters.add(new BasicNameValuePair("username", loginName));
				urlParameters.add(new BasicNameValuePair("item_jid", jid.concat(srvname)));
				urlParameters.add(new BasicNameValuePair("name", jidName));
				urlParameters.add(new BasicNameValuePair("subscription",BOTH));
				urlParameters.add(new BasicNameValuePair("group", group));
				 
				response = getRespone(sc.sendPost(url, urlParameters));
				
				
			  if (response.equalsIgnoreCase(USER_NOT_FOUND) && !recordNew ){
				  saveRoaster( loginName,jid,jidName, group,true);
			  }else if(response.equalsIgnoreCase(USER_ALREADY_EXIST) && recordNew){
				  saveRoaster(  loginName,jid,jidName,  group,false);
			  }
			}else{
				return SERVERNOTREADY;
			}	
			
		}catch(Exception e){
			throw e;
		}
		return response;		
	}
	 
	
	
	
	public static String deleteRoaster(String loginName,String jid) throws Exception{
		String response =null;
		 			
		try{
		 
			if (srvOnStatus.equalsIgnoreCase("ON")){			   
				List<NameValuePair> urlParameters = new ArrayList<NameValuePair>();
				urlParameters.add(new BasicNameValuePair("secret", secret));
				urlParameters.add(new BasicNameValuePair("type", "delete_roster"));
				urlParameters.add(new BasicNameValuePair("username", loginName));
				urlParameters.add(new BasicNameValuePair("item_jid", jid.concat(srvname)));			 			 
				response = getRespone(sc.sendPost(url, urlParameters));
				System.out.println("response : "+response);
			}else{
				return SERVERNOTREADY;
			}	
			
		}catch(Exception e){
			throw e;
		}
		return response;		
	}
	 
	 
	
	
	 @SuppressWarnings("unused")
	public static void main(String[] args) {
	        String xml= "<error>UserAlreadyExistsException</error>";
	        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
	        DocumentBuilder builder;
	        InputSource is;
	        try {
	            builder = factory.newDocumentBuilder();
	            is = new InputSource(new StringReader(xml));
	            Document doc = builder.parse(is);
	            NodeList list = doc.getElementsByTagName("error");
//	            System.out.println(list.item(0).getTextContent());
	        } catch (ParserConfigurationException e) {
	        } catch (SAXException e) {
	        } catch (IOException e) {
	        }
	    }
	 
	 private static String getRespone(String xml) throws Exception {
		 String resp=null;
		 try {
			 System.out.println("Response Server Chat"+xml);
	            builder = factory.newDocumentBuilder();
	            is = new InputSource(new StringReader(xml));
	            Document doc = builder.parse(is);
	            NodeList list = doc.getElementsByTagName("error");
	            if (null==list.item(0))
	            	list = doc.getElementsByTagName("result");
	            
//	            resp = list.item(0).getTextContent();
	        } catch (ParserConfigurationException e) {
	        } catch (SAXException e) {
	        } catch (IOException e) {
	        }
		 return resp;
	 }
}
