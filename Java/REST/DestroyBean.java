package com.m14.rest;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class DestroyBean {
  public String username;
  public String password;
  public String connectionID;

  public DestroyBean() {} // JAXB needs this

  public DestroyBean(String username, String password, String connectionID) {
    this.username = username;
    this.password = password;
    this.connectionID = connectionID;
  }

  public String getUsername() {
    return this.username;
  }

  public String getPassword() {
    return this.password;
  }

  public String getConnectionID() {
    return this.connectionID;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public void setConnectionID(String connectionID) {
    this.connectionID = connectionID;
  }
}