package com.m14.rest;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class AuthBean {
  public String username;
  public String password;

  public AuthBean() {} // JAXB needs this

  public AuthBean(String username, String password) {
    this.username = username;
    this.password = password;
  }

  public String getUsername() {
    return this.username;
  }

  public String getPassword() {
    return this.password;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public void setPassword(String password) {
    this.password = password;
  }
}