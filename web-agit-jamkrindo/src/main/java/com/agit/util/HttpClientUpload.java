package com.agit.util;

import java.io.File;
import java.net.URL;
import java.security.cert.X509Certificate;

import org.apache.http.HttpResponse;
import org.apache.http.HttpVersion;
import org.apache.http.StatusLine;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.conn.ClientConnectionManager;
import org.apache.http.conn.scheme.Scheme;
import org.apache.http.conn.scheme.SchemeRegistry;
import org.apache.http.conn.ssl.SSLSocketFactory;
import org.apache.http.conn.ssl.TrustStrategy;
import org.apache.http.entity.mime.HttpMultipartMode;
import org.apache.http.entity.mime.MultipartEntity;
import org.apache.http.entity.mime.content.ContentBody;
import org.apache.http.entity.mime.content.FileBody;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.impl.conn.PoolingClientConnectionManager;
import org.apache.http.params.CoreProtocolPNames;

public class HttpClientUpload {
	private HttpClient httpClient = null;
	private HttpPost postRequest = null;
	private MultipartEntity reqEntity = null;
	private String dirname = null;
	
	public HttpClientUpload(String host) {
		httpClient 	= new DefaultHttpClient();
		postRequest = new HttpPost(host);
	}
	
	public HttpClientUpload(String host, String dirname) {
		
		TrustStrategy acceptingTrustStrategy = new TrustStrategy() {
            @Override
            public boolean isTrusted(X509Certificate[] certificate, String authType) {
                return true;
            }
        };
        
        /*Setting https untuk accept semua host*/
        try {
        	URL aUrl = new URL(host);
        	String protocol = aUrl.getProtocol();
        	int port = aUrl.getPort();
        	if(protocol.equalsIgnoreCase("https")){
        		SSLSocketFactory sf = new SSLSocketFactory(acceptingTrustStrategy, SSLSocketFactory.ALLOW_ALL_HOSTNAME_VERIFIER);
                SchemeRegistry registry = new SchemeRegistry();
                registry.register(new Scheme(protocol, port, sf));
                ClientConnectionManager ccm = new PoolingClientConnectionManager(registry);
                httpClient 	= new DefaultHttpClient(ccm);
                postRequest = new HttpPost(host);
                reqEntity	= new MultipartEntity(HttpMultipartMode.BROWSER_COMPATIBLE);
        	}else{
        		httpClient = new DefaultHttpClient();
        		httpClient.getParams().setParameter(CoreProtocolPNames.PROTOCOL_VERSION, HttpVersion.HTTP_1_1);
        		postRequest = new HttpPost(host);
        		reqEntity 	= new MultipartEntity();
        	}

		} catch (Exception e) {
			e.printStackTrace();
		}

		this.dirname = dirname;
	}
	
	public String upload(String filename){
		String message = "";
		try {
			File file = new File(dirname + filename);
			ContentBody cbFile = new FileBody(file);
			
			reqEntity.addPart("file", cbFile);
	        postRequest.setEntity(reqEntity);
	        HttpResponse response = httpClient.execute(postRequest);
	        StatusLine statusLine = response.getStatusLine();
	        
	        message = statusLine.getReasonPhrase();

		} catch (Exception e) {
			message = e.getMessage();
			e.printStackTrace();
		}
		
		return message;
	}
	
	public void refresh() {
		try {
			httpClient.execute(postRequest);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}