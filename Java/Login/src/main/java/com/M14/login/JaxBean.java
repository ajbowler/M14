package com.M14.login;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class JaxBean {
	public String username;
	public String password;
	
	public JaxBean() {}
	
	public JaxBean(String username, String password){
		this.username = username;
		this.password = password;
	}
	
}
