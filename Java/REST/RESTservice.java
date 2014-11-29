package com.m14.rest;

import javax.sql.DataSource;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Connection;

import com.m14.rest.Regular;

public class RESTservice {

  @POST
  @Path("/login/{param}")
  @Produces(MediaType.APPLICATION_JSON)
  public Regular getUserinJSON(@PathParam("param") String username) {
    try {
      return Regular.getUserFromDatabase(username);
    }

    catch(Exception exc) {
      StringWriter errors = new StringWriter();
      exc.printStackTrace(new PrintWriter(errors));
      return null;
    }
  }

  @POST
  @Path("/post")
  @Consumes(MediaType.APPLICATION_JSON)
  public Response createUsrinJSON(Regular Usr){
    try {
      Usr.getUsername();
      Usr.getEmail();
      Usr.getJoinDate();
      Usr.getPassword();
    }

    catch (SQLException e) {
      e.printStackTrace();
      return Response.status(420).entity("Didn't Work").build();
    }

    String usrInfo = "User Info: " + Usr.toString();
    return Response.status(201).entity(usrInfo).build();
  }

  @POST
  @Path("/create")
  @Content-Type("application/json")
  @Consumes(MediaType.APPLICATION_JSON)
  public Response createConnectionJSON(Regular user, String ip, Integer port, String mpdPassword) {
    try {
      user.addConnection(ip, port, name);
    }

     catch (SQLException e) {
      e.printStackTrace();
      return Response.status(420).entity("Didn't Work").build();
    }

    // The location of the Node.js server
    String nodeURL = "http://localhost:8007";
    URL obj = new URL(obj);
    HttpURLConnection nodeConnection = (HttpURLConnection) obj.openConnection();

    nodeConnection.setDoOutput(true);
    nodeConnection.setRequestMethod("POST");
    nodeConnection.setRequestProperty("Content-Type", "application/json");
    nodeConnection.setRequestProperty("Accept", "application/json");
 
    DataOutputStream wr = new DataOutputStream(nodeConnection.getOutputStream());
    JSONObject mpdConnection = new JSONObject();
    mpdConnection.put("host", ip);
    mpdConnection.put("port", port);
    mpdConnection.put("password", password);
    wr.writeBytes(mpdConnection.toString());
    wr.flush();
    wr.close();

    return Response.status(200).entity(mpdConnection.toString()).build();
  }

  @POST
  @Path("/destroy")
  @Content-Type("application/json")
  @Consumes(MediaType.APPLICATION_JSON)
  public Response destroyConnectionJSON(Regular user, String ip, Integer port, String mpdPassword) {
    try {
      user.removeConnection(ip, port, name);
    }

     catch (SQLException e) {
      e.printStackTrace();
      return Response.status(420).entity("Didn't Work").build();
    }

    // The location of the Node.js server
    String nodeURL = "http://localhost:8007";
    URL obj = new URL(obj);
    HttpURLConnection nodeConnection = (HttpURLConnection) obj.openConnection();

    nodeConnection.setDoOutput(true);
    nodeConnection.setRequestMethod("POST");
    nodeConnection.setRequestProperty("Content-Type", "application/json");
    nodeConnection.setRequestProperty("Accept", "application/json");
 
    DataOutputStream wr = new DataOutputStream(nodeConnection.getOutputStream());
    JSONObject mpdConnection = new JSONObject();
    mpdConnection.put("host", ip);
    mpdConnection.put("port", port);
    mpdConnection.put("password", password);
    wr.writeBytes(mpdConnection.toString());
    wr.flush();
    wr.close();

    return Response.status(200).entity(mpdConnection.toString()).build(); 
  }

}
