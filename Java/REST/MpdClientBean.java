package com.m14.rest;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class MpdClientBean {
  public Regular user;
  public String host;
  public Integer port;

  public MpdClientBean() {}; //JAXB needs this

  public MpdClientBean(Regular user, String host, Integer port) {
    this.user = user;
    this.host = host;
    this.port = port;
  }

  public Regular getUser() {
    return this.user;
  }

  public String getHost() {
    return this.host;
  }

  public Integer getPort() {
    return this.port;
  }

  public void setUser(Regular user) {
    this.user = user;
  }

  public void setHost(String host) {
    this.host = host;
  }

  public void setPort(Integer port) {
    this.port = port;
  }
}