package com.agit.util;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

public class DateUtil {
	public static Date truncate(Date date){
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.set(Calendar.HOUR, 0);
		cal.set(Calendar.MINUTE, 0);
		cal.set(Calendar.SECOND, 0);
		cal.set(Calendar.MILLISECOND, 0);
		cal.set(Calendar.AM_PM, Calendar.AM);
		return cal.getTime();
	}
	
	public static Date endOfDay(Date date){
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.set(Calendar.HOUR_OF_DAY, 23);
		cal.set(Calendar.MINUTE, 59);
		cal.set(Calendar.SECOND, 59);
		cal.set(Calendar.MILLISECOND, 999);
		return cal.getTime();
	}
	
	public static int compare(Date date1, Date date2){
		Calendar cal1 = Calendar.getInstance();
		cal1.setTime(date1);
		cal1.set(Calendar.HOUR, 0);
		cal1.set(Calendar.MINUTE, 0);
		cal1.set(Calendar.SECOND, 0);
		cal1.set(Calendar.MILLISECOND, 0);
		cal1.set(Calendar.AM_PM, Calendar.AM);
		
		Calendar cal2 = Calendar.getInstance();
		cal2.setTime(date2);
		cal2.set(Calendar.HOUR, 0);
		cal2.set(Calendar.MINUTE, 0);
		cal2.set(Calendar.SECOND, 0);
		cal2.set(Calendar.MILLISECOND, 0);
		cal2.set(Calendar.AM_PM, Calendar.AM);
		
		return cal1.compareTo(cal2);
	}
	
	public static Date stringToDate(String dt) {
		//01-Jun-2016
		DateFormat df = new SimpleDateFormat("dd-MMM-yyyy",Locale.ENGLISH); 
	    Date startDate=null;
	    //String dt1 = dt.substring(0,4)+"/"+dt.substring(4, 6)+"/"+dt.substring(6, 8);
	    try {
	        startDate = df.parse(dt);
	        String newDateString = df.format(startDate);
	        System.out.println(newDateString);
	    } catch (ParseException e) {
	        e.printStackTrace();
	    }
	    
	    return startDate;
	}
	
	public static String DateToString(Date lDate,String f) throws Exception {
		 String dateText=null;
		 DateFormat df = new SimpleDateFormat(f); 
		if (null != lDate ){
        dateText = df.format(lDate);
		}
      return dateText;
	}
}
