package com.m14.rest;
import java.sql.Statement;
import java.util.ArrayList;

//data class that holds information for the user's connections
public class MpdConnection {

  private String connectionName;
  private String serverHost;
  private String serverPort;
  private String serverPassword;
  private String streamHost;
  private String streamPort;
  private String streamSuffix;

  public MpdConnection(String connectionName, String serverHost, String serverPort, 
    String serverPass, String streamHost, String streamPort, String streamSuffix) {
    this.connectionName = connectionName;
    this.serverHost = serverHost;
    this.serverPort = serverPort;
    this.serverPass = serverPass;
    this.streamHost = streamHost;
    this.streamPort = streamPort;
    this.streamSuffix = streamSuffix;
  }

  public String getConnectionName() {
    return this.connectionName;
  }

  public String getServerHost() {
    return this.host;
  }

  public String getServerPort() {
    return this.port;
  }

  public String getServerPass() {
    return this.serverPass;
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

  // Returns an array of the users connections
  public ArrayList<MpdConnection> retrieveMpdConnections(){
    Regular user = new Regular();
    return user.getConnections();
  }
}