package com.m14.rest;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class MpdConnection {
  private String connectionName;
  private String serverHost;
  private String serverPort;
  private String serverPassword;
  private String streamHost;
  private String streamPort;
  private String streamSuffix;

  public MpdConnection() {} // JAXB needs this
  
  public MpdConnection(String connectionName, String serverHost, String serverPort, String serverPass, String streamHost, String streamPort, String streamSuffix) {
    this.connectionName = connectionName;
    this.serverHost = serverHost;
    this.serverPort = serverPort;
    this.serverPassword = serverPass;
    this.streamHost = streamHost;
    this.streamPort = streamPort;
    this.streamSuffix = streamSuffix;
  }

  public String getConnectionName() {
    return this.connectionName;
  }

  public String getServerHost() {
    return this.serverHost;
  }

  public String getServerPort() {
    return this.serverPort;
  }

  public String getServerPass() {
    return this.serverPassword;
  }

  public String getStreamHost() {
    return this.streamHost;
  }

  public String getStreamPort() {
    return this.streamPort;
  }

  public String getStreamSuffix() {
    return this.streamSuffix;
  }
  
  public void setConnectionName(String connectionName) {
    this.connectionName = connectionName;
  }
  
  public void setServerHost(String serverHost) {
    this.serverHost = serverHost;
  }
 
  public void setStreamHost(String streamHost) {
    this.streamHost = streamHost;
  }
  
  public void setServerPort(String serverPort) {
    this.serverPort = serverPort;
  }
  
  public void setServerPass(String serverPassword) {
    this.serverPassword = serverPassword;
  }
  
  public void setStreamPort(String streamPort) {
    this.streamPort = streamPort;
  }
  
  public void setStreamSuffix(String streamSuffix) {
    this.streamSuffix = streamSuffix;
  }

}