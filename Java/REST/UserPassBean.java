package com.m14.rest;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class UserPassBean {
  public String username;
  public String password;

  public UserPassBean() {} // JAXB needs this

    public UserPassBean(String username, String password) {
        this.username = username;
        this.password = password;
    }
}