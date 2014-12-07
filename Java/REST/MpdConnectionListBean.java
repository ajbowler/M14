package com.m14.rest;

import javax.xml.bind.annotation.XmlRootElement;

import org.json.JSONObject;

@XmlRootElement
public class MpdConnectionListBean {

  private String mpdConnectionList;
  
  public MpdConnectionListBean() {} // JAXB needs this

  public MpdConnectionListBean(JSONObject mpdConnectionList) {
    this.mpdConnectionList = mpdConnectionList.toString();
  }

  public String getMpdConnectionList() {
    return this.mpdConnectionList;
  }
  
  @Override
  public String toString() {
    return (mpdConnectionList.toString());  
  }
}