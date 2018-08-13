package com.agit.util;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Reader;
import java.io.Writer;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class CsvExport {
	List<String> columns = new ArrayList<String>();
	String separator = "~";
	String workDir = "";
	Writer writer;
	File file;
	DateFormat format = new SimpleDateFormat("yyyyddmmhhMMss");
	
	public String getSeparator() {
		return separator;
	}

	public void setSeparator(String separator) {
		this.separator = separator;
	}

	static final String CRLF = System.getProperty("line.separator");
	public String getWorkDir() {
		return workDir;
	}

	public void setWorkDir(String workDir) {
		this.workDir = workDir;
	}
	
public void addTitle(String title) throws IOException{
		 
		
		this.writer.write(title);
		 
	}

public void addFooter(String footer) throws IOException{
	 
	
	this.writer.write(footer);
	 
}

	public void addColumn(String col) throws IOException{
		this.columns.add(col);
		
		this.writer.write(col);
		this.writer.write(this.separator);
	}
	
	public void enter() throws IOException{
		this.writer.write(CRLF);
	}
	
	public void addRow(List<String> row) throws IOException{		
		for (String s : row) {
			if (s == null) s = ""; 
			this.writer.write(s);
			this.writer.write(this.separator);
			
		}
		this.writer.write(CRLF);
	}
	
	public Reader getReader() throws IOException{		
		return new BufferedReader(new FileReader(this.file));
	}
	
	public void flush() throws IOException{
		this.writer.flush();
		this.writer.close();
	}
	
	public void init() throws IOException {

		File out = createFile(getWorkDir());
		this.file = out;
		BufferedWriter writer = new BufferedWriter(new FileWriter(this.file));
		
		this.writer = writer;
	}
	
	private File createFile(String rootDir){
		String fname = String.format("csv_export_%s.csv", this.format.format(new Date()));
		File file = new File(workDir+fname);
		return file;
	}
	
	public void cleanup(){
		this.file.delete();
	}

}
