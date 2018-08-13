package com.agit.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.List;

import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.utils.URLEncodedUtils;
import org.apache.http.conn.scheme.PlainSocketFactory;
import org.apache.http.conn.scheme.Scheme;
import org.apache.http.conn.scheme.SchemeRegistry;
import org.apache.http.conn.ssl.SSLSocketFactory;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.impl.conn.tsccm.ThreadSafeClientConnManager;
import org.apache.http.params.BasicHttpParams;
import org.apache.http.params.CoreConnectionPNames;
import org.apache.http.params.HttpParams;
import org.apache.http.util.EntityUtils;
import org.apache.log4j.Logger;

//import com.agit.solid.webui.composer.utilities.survey.SurveyDialogComposer;

@SuppressWarnings("deprecation")
public   class ServiceClient {
	@SuppressWarnings("unused")
	private static final Logger logger = Logger.getLogger(ServiceClient.class);
	
    @SuppressWarnings("unused")
	public static void main(String[] args) {
        
        String url = "http://localhost/";
        //ServiceClient client = new ServiceClient(2, url);
       /*  if (args.length > 0) url = args[0];
        client.getGood(url);
        client.getGood(url);
        client.getBad(url);
        client.getGood(url);
        */
    }
     
    private HttpClient client;
    @SuppressWarnings("unused")
	private String url;
    private int poolSize=3;
       
    public ServiceClient() {
        // Set up the multithreaded http client.
    	
        SchemeRegistry schemeRegistry = new SchemeRegistry();
        schemeRegistry.register(
                 new Scheme("http", 80, PlainSocketFactory.getSocketFactory()));
        schemeRegistry.register(new Scheme("https", 443, SSLSocketFactory.getSocketFactory()));
 
        ThreadSafeClientConnManager cm = new ThreadSafeClientConnManager(schemeRegistry);
        cm.setDefaultMaxPerRoute(poolSize);
        cm.setMaxTotal(200);
         
        HttpParams params = new BasicHttpParams();
        params.setParameter(CoreConnectionPNames.SO_TIMEOUT, 60000);
        params.setParameter(CoreConnectionPNames.CONNECTION_TIMEOUT, 60000);
        client = new DefaultHttpClient(cm, params);
    }
     
    @SuppressWarnings("unused")
	public String connect(String url) {
        HttpGet get = new HttpGet(url);
        HttpResponse response;
        try {
            response = client.execute(get);
            if (response.getStatusLine().getStatusCode() != HttpStatus.SC_OK) {
                EntityUtils.consume(response.getEntity());
                return null;
            }
             
            Reader is = new InputStreamReader(response.getEntity().getContent());
            StringBuffer buf = new StringBuffer();
             
            while (is.ready()) {
                char[] b = new char[1024];
                int c = is.read(b);
                buf.append(b);
            }
            is.close();
             
            return buf.toString();
        } catch (ClientProtocolException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            get.abort();
            return null;
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            get.abort();
            return null;
        }
    }
 
     
    @SuppressWarnings("unused")
	public String getBad(String url) {
        HttpGet get = new HttpGet(url);
        HttpResponse response;
        try {
            response = client.execute(get);
            if (response.getStatusLine().getStatusCode() != HttpStatus.SC_OK) {
                EntityUtils.consume(response.getEntity());
                return null;
            }
             
            Reader is = new InputStreamReader(response.getEntity().getContent());
            StringBuffer buf = new StringBuffer();
             
            while (is.ready()) {
                char[] b = new char[1024];
                int c = is.read(b);
                buf.append(b);
            }
             
            return buf.toString();
        } catch (ClientProtocolException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            get.abort();
            return null;
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            get.abort();
            return null;
        }
    }
    
    
    @SuppressWarnings("unused")
	public String sendPost(String url,List<NameValuePair> urlParameters) throws Exception {
    	 
	 
		HttpClient client = new DefaultHttpClient();
		HttpPost post = new HttpPost(url);
		String params = URLEncodedUtils.format(urlParameters, "utf-8");
		System.out.println("Send Post params: "+params);
		HttpGet get = new HttpGet(url+"?"+params);
		// add header
		//get.setHeader("Accept", "text/html");
		//get.setHeader("Content-Type", "application/x-www-form-urlencoded");
 
		/*List<NameValuePair> urlParameters = new ArrayList<NameValuePair>();
		urlParameters.add(new BasicNameValuePair("sn", "C02G8416DRJM"));
		urlParameters.add(new BasicNameValuePair("cn", ""));
		urlParameters.add(new BasicNameValuePair("locale", ""));
		urlParameters.add(new BasicNameValuePair("caller", ""));
		urlParameters.add(new BasicNameValuePair("num", "12345")); 
		post.setEntity(new UrlEncodedFormEntity(urlParameters));
		*/
		//post.setEntity(new UrlEncodedFormEntity(urlParameters));
		//HttpResponse response = client.execute(post);
		HttpResponse response = client.execute(get);
		System.out.println("\nSending 'GET' request to URL : " + url);
		//System.out.println("Get parameters : " + get.getParams().);
		//post.getEntity().writeTo(writer);
		System.out.println("Response Code : " + 
                                    response.getStatusLine().getStatusCode());
 
		BufferedReader rd = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
 
		StringBuffer result = new StringBuffer();
		String line = "";
		while ((line = rd.readLine()) != null) {
			result.append(line);
		}
    return result.toString();
	 
 
	}
}