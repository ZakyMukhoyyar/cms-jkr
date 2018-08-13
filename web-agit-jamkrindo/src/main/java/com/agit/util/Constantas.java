package com.agit.util;

import java.text.SimpleDateFormat;
import java.util.Locale;

public class Constantas {
	public static final String LOG_ASSIGNMENT_TYPE_MANUAL_ASSIGNMENT = "MANUAL";
	public static final String LOG_ASSIGNMENT_TYPE_RECALL_ASSIGNMENT = "RECALL";
	public static final String GENERAL_DATE_FORMAT					 = "dd-MMM-yy";
	public static final String GENERAL_CURR_FORMAT					 = "###,###,###,###,##0";
	public static SimpleDateFormat fdatetime 	= new SimpleDateFormat("dd-MMM-yyyy HH:mm:ss");
	public static SimpleDateFormat fdate 		= new SimpleDateFormat("dd-MMM-yyyy",Locale.ENGLISH);//,Locale.ENGLISH);
	public static SimpleDateFormat ftimestamp	= new SimpleDateFormat("dd MMM yyyy - HH:mm");
	public static SimpleDateFormat ftime 		= new SimpleDateFormat("HH:mm:ss");
	public static SimpleDateFormat ffilename	= new SimpleDateFormat("ddMMyyyy-HHmmss");
}
