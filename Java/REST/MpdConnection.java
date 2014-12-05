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
public ArrayList<MpdConnection> retrieveMpdConnections(){
 Regular user = new Regular();
 return user.getConnections();
}

public Statement createStatement() {
 // TODO Auto-generated method stub
 return null;
}

//TODO
//find all the necessary properties needed for the Connection class

}
