package com.m14.rest;
import java.sql.Statement;
import java.util.ArrayList;

//data class that holds information for the user's connections

public class MpdConnection {

  private String host;
  private String port;
  private String password;

  public MpdConnection(String inHost, String inPort, String inPss) {
   this.host = inHost;
   this.port = inPort;
   this.password = inPss;
  }

  public String getHost() {
   return this.host;
  }

  public String getPort() {
   return this.port;
  }

  // Returns an array of the users connections
  public ArrayList<MpdConnection> retrieveMpdConnections(String userID){
   Regular user = new Regular(userID);
   return user.getConnections();
  }
}
