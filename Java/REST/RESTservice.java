package com.m14.rest;

import javax.sql.DataSource;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.print.DocFlavor.URL;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.xml.bind.annotation.XmlRootElement;

import java.io.DataOutputStream;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.net.HttpURLConnection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Connection;

import com.m14.rest.Regular;

public class RESTservice {
	
  @POST
  @Path("/login")
  @Produces(MediaType.APPLICATION_JSON)
  @Consumes(MediaType.APPLICATION_JSON)
  public Response getUserinJSON(final UserPassBean input) {
    try {
      // Must first create the object before getting information from input.username with getUserFromDatabase
      Regular user =  new Regular(null, null);
      user = user.getUserFromDatabase(input.username);
      
      if (user.password.equals(input.password)) {
        return Response.status(201).entity(user).build();
      } else {
        return Response.status(401).entity("Authentication failed!").build();
      }
    }
    catch(Exception exc) {
      StringWriter errors = new StringWriter();
      exc.printStackTrace(new PrintWriter(errors));
      // prints stack trace to Catalina.out
      System.out.println(errors.toString());
      return Response.status(401).entity("Authentication failed!").build();
    }
  }

  @POST
  @Path("/post")
  @Consumes(MediaType.APPLICATION_JSON)
  public Response createUsrinJSON(Regular Usr) throws SQLException{
    Usr.getUsername();
    Usr.getEmail();
    Usr.getJoinDate();
    Usr.getPassword();

    String usrInfo = "User Info: " + Usr.toString();
    return Response.status(201).entity(usrInfo).build();
  }

  @POST
  @Path("/create")
  @Produces("application/json")
  @Consumes(MediaType.APPLICATION_JSON)
  public Response createConnectionJSON(Regular user, Integer ip, Integer port, String mpdPassword) {
    try {
      user.addConnection(ip, port, user.getUsername());
    }

    catch (SQLException exc) {
      StringWriter errors = new StringWriter();
      exc.printStackTrace(new PrintWriter(errors));
      // prints stack trace to Catalina.out
      System.out.println(errors.toString());
      return Response.status(420).entity("Error in adding connection " + user.getUsername() + ". See log at Catalina.out").build();
    }

    // The location of the Node.js server
    String nodeURL = "http://localhost:8007";
    URL obj = new URL(nodeURL);
    HttpURLConnection nodeConnection = (HttpURLConnection) obj.openConnection();

    nodeConnection.setDoOutput(true);
    nodeConnection.setRequestMethod("POST");
    nodeConnection.setRequestProperty("Content-Type", "application/json");
    nodeConnection.setRequestProperty("Accept", "application/json");
 
    DataOutputStream wr = new DataOutputStream(nodeConnection.getOutputStream());
    JSONObject mpdConnection = new JSONObject();
    mpdConnection.put("host", ip);
    mpdConnection.put("port", port);
    mpdConnection.put("password", mpdPassword);
    wr.writeBytes(mpdConnection.toString());
    wr.flush();
    wr.close();

    return Response.status(200).entity(mpdConnection.toString()).build();
  }

  @POST
  @Path("/destroy")
  @Produces("application/json")
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
    URL obj = new URL(nodeURL);
    HttpURLConnection nodeConnection = (HttpURLConnection) obj.openConnection();

    nodeConnection.setDoOutput(true);
    nodeConnection.setRequestMethod("POST");
    nodeConnection.setRequestProperty("Content-Type", "application/json");
    nodeConnection.setRequestProperty("Accept", "application/json");
 
    DataOutputStream wr = new DataOutputStream(nodeConnection.getOutputStream());
    JSONObject mpdConnection = new JSONObject();
    mpdConnection.put("host", ip);
    mpdConnection.put("port", port);
    mpdConnection.put("password", mpdPassword);
    wr.writeBytes(mpdConnection.toString());
    wr.flush();
    wr.close();

    return Response.status(200).entity(mpdConnection.toString()).build(); 
  }

}
