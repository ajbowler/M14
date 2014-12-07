package com.m14.rest;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class MpdConnectionListBean {

  private JSONObject mpdConnectionList;
  
  public MpdConnectionListBean() {} // JAXB needs this

  public MpdConnectionListBean(JSONObject mpdConnectionList) {
    this.mpdConnectionList = mpdConnectionList;
  }

  public getMpdConnectionList() {
    return this.mpdConnectionList;
  }
}