package com.agit.controller.file;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.FileNameMap;
import java.net.URLConnection;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.agit.controller.BaseController;
/**
*
* @author Ridwan
*/
@Controller
@RequestMapping("/file")
public class FileController extends BaseController {

	private static final Logger logger = LoggerFactory
			.getLogger(FileController.class);
	private static final FileNameMap mapping = URLConnection.getFileNameMap();

	protected String getDefaultImageFileName(String type) {
		String fileName = null;
		if ("user".equals(type)) {
			fileName = "no-profile-image.png";
		} else if ("agent".equals(type)) {
			fileName = "no-profile-image.png";
		} else if ("outlet".equals(type)) {
			fileName = "no-profile-image.png";
		}
		return fileName;
	}

	@RequestMapping(value = "/get/{type}", method = RequestMethod.GET)
	public void getImage(@PathVariable("type") String type,
			@RequestParam("name") String name, HttpServletResponse response) {
		String fileName = name;
		String dir = "";
		if ("agent".equals(type)) {
			dir = this.getDirAgentFC();
			if (StringUtils.isBlank(name)) {
				fileName = getDefaultImageFileName(type);
			}
		} else if ("visit".equals(type)) {
			dir = this.getDirVisit();
			if (StringUtils.isBlank(name)) {
				fileName = getDefaultImageFileName(type);
			}

		} else {
			logger.error("Failed to get the file: Unknown type " + type);
			return;
		}
		File file = new File(dir, fileName);
		if (!file.exists()) {
			fileName = getDefaultImageFileName(type);
			file = new File(dir, fileName);
		}
		String contentType = mapping.getContentTypeFor(file.getAbsolutePath());
		response.setContentType(contentType);
		OutputStream os = null;
		InputStream is = null;
		try {
			os = response.getOutputStream();
			is = new FileInputStream(file);
			FileCopyUtils.copy(is, os);
			os.flush();
		} catch (IOException e) {
			logger.error("Error stream", e);
		} finally {
			if (is != null) {
				try {
					is.close();
				} catch (IOException e) {
					logger.error("Error closing stream", e);
				}
			}
			if (os != null) {
				try {
					os.close();
				} catch (IOException e) {
					logger.error("Error closing stream", e);
				}
			}
		}
	}
}
