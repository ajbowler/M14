package com.m14.rest;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class MpdClientBean {
  public String username;
  public String host;
  public String port;

  public MpdClientBean() {}; //JAXB needs this

  public MpdClientBean(String username, String host, String port) {
    this.username = username;
    this.host = host;
    this.port = port;
  }

  public String getUser() {
    return this.username;
  }

  public String getHost() {
    return this.host;
  }

  public String getPort() {
    return this.port;
  }

  public void setUser(String username) {
    this.username = username;
  }

  public void setHost(String host) {
    this.host = host;
  }

  public void setPort(String port) {
    this.port = port;
  }
}