package com.agit.util;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class FncSecurity {
	public static String createChecksum(String data) {
		return getChecksumHex(createChecksum(new ByteArrayInputStream(data.getBytes())));
	}

	public static byte[] createChecksum(InputStream is) {
		byte[] buffer = new byte[1024];
		MessageDigest complete;
		try {
			complete = MessageDigest.getInstance("SHA-512");
			int numRead;

			do {
				numRead = is.read(buffer);
				if (numRead > 0) {
					complete.update(buffer, 0, numRead);
				}
			} while (numRead != -1);
			return complete.digest();
		} catch (NoSuchAlgorithmException e) {
		} catch (IOException e) {
		}
		return null;
	}

	public static String getChecksumHex(byte[] b) {
		String result = "";
		for (int i = 0; i < b.length; i++) {
			result += Integer.toString((b[i] & 0xff) + 0x100, 16).substring(1);
		}
		return result;
	}
}
