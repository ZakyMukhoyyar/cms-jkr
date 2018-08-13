/**
 * 
 */
package com.agit.util;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @author yose
 * 
 */
public class StringUtils {
	public static boolean isEmpty(String str) {
		boolean result = true;
		if (str != null) {
			result = str.trim().isEmpty();
		}
		return result;
	}

	public static boolean isNotEmpty(String str) {
		return !isEmpty(str);
	}

	public static String encodeString(String encodedString) {
		String encode = null;
		try {
			encode = URLEncoder.encode(encodedString, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return encode;

	}
	
	/**
	 * Parse csv from a string and put the result to list
	 * @param input input string
	 * @param separator csv separator
	 * @return List of values from csv string 
	 */
	public static List<String> parseCsv(String input,char separator){
		final char SEPARATOR = separator;
		final String REGEX = "\"([^\"]++)\"?\\s*\\Q"+SEPARATOR+"\\E?|" +
				"([^\\Q"+SEPARATOR+"\\E]+)\\Q"+SEPARATOR+"\\E?|" +
				"\\Q"+SEPARATOR+"\\E{1}+";
		List<String> result = new ArrayList<String>();
		Pattern ptrn = Pattern.compile(REGEX);
		Matcher matcher = ptrn.matcher(input);
		while(matcher.find()){
			String matches = matcher.group();
			matches = matches.replaceAll("\\Q"+SEPARATOR+"\\E$", ""); // strip separator in the end
			matches = matches.replaceAll("^\\s*|\\s*$", ""); // strip space before and after
			matches = matches.replaceAll("^\"+|\"+$", ""); // strip "
			result.add(matches);
		}
		return result;
	}
	
	public static String generateUniqueId(String prefix){
		String prf = prefix;
		if (prefix==null){
			prf = "";
		}
		StringBuffer result = new StringBuffer(prf);
		UUID uuid = UUID.randomUUID();
		result.append(uuid);
		return result.toString();
	}
	
	public static boolean isNumeric(String str) {
		try {
			Double.parseDouble(str);
		} catch (NumberFormatException nfe) {
			return false;
		}
		return true;
	}
	
	public static String print(String str){
		if(str == null)
			return "";
		
		return str;
	}
	
	public static boolean isNotNumeric(String str){
		return !isNumeric(str);
	}
}
