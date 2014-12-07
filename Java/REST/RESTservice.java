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
import javax.xml.bind.annotation.XmlRootElement;

import java.io.DataOutputStream;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.net.URL;
import java.net.HttpURLConnection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Connection;
import java.util.ArrayList;

import org.json.*;

import com.m14.rest.Regular;
import com.m14.rest.AuthBean;
import com.m14.rest.DestroyBean;

@Path("/app")
public class RESTservice {

  @POST
  @Path("/login")
  @Produces(MediaType.APPLICATION_JSON)
  @Consumes(MediaType.TEXT_PLAIN)
  public Response loginUser(String input) {

    try {
      JSONObject obj = new JSONObject(input);
      AuthBean authBean = new AuthBean(obj.getString("username"), obj.getString("password"));
      // Must first create the object before getting information from input.username with
      // getUserFromDatabase
      Regular user = new Regular();
      user = user.getUserFromDatabase(authBean.getUsername());
      // Authentication
      UserBean userBean = new UserBean(user.getUsername(), user.getPassword(), user.getEmail());
      if (user.password.equals(authBean.getPassword())) {
        return Response.status(201).entity(userBean).build();
      } else {
        return Response.status(401).entity("Authentication failed!").build();
      }
    } catch (Exception exc) {
      StringWriter errors = new StringWriter();
      exc.printStackTrace(new PrintWriter(errors));
      // prints stack trace to Catalina.out
      System.out.println(errors.toString());
      return Response.status(401).entity("Authentication failed!").build();
    }

  }

  @POST
  @Path("/createUsr")
  @Produces(MediaType.APPLICATION_JSON)
  @Consumes(MediaType.TEXT_PLAIN)
  public Response createUser(String input) {
    try {
      JSONObject obj = new JSONObject(input);
      UserBean userBean =
          new UserBean(obj.getString("username"), obj.getString("password"), obj.getString("email"));
      Regular registeredUser = new Regular();

      // Instantiate and add the user to the database.
      registeredUser.dbAddUser(userBean.getUsername(), userBean.getPassword(), userBean.getEmail());
      return Response.status(201).entity(userBean).build();
    } catch (Exception exc) {
      StringWriter errors = new StringWriter();
      exc.printStackTrace(new PrintWriter(errors));
      // prints stack trace to Catalina.out
      System.out.println(errors.toString());
      return Response.status(401).entity("Couldn't register user!").build();
    }
  }

  @POST
  @Path("/getConnections")
  @Produces(MediaType.APPLICATION_JSON)
  @Consumes(MediaType.TEXT_PLAIN)
  public Response getMPDConnectionsForUser(String input) {
    try {
      JSONObject obj = new JSONObject(input);
      AuthBean authBean = new AuthBean(obj.getString("username"), obj.getString("password"));

      Regular user = new Regular();
      user = user.getUserFromDatabase(authBean.getUsername());

      ArrayList<MpdConnection> mpdConnectionArrayList = user.getConnections();
      System.out.println(mpdConnectionsArrayList.toString());

      // 1. Make a JSONArray.
      // 2. Loop through the arraylist and for each MpdConnection, add it to the JSONArray.
      // 3. Make wrapper JSONObject for the array.

      JSONArray mpdConnectionsJSON = new JSONArray();

      return null; // TODO

    } catch (Exception exc) {
      StringWriter errors = new StringWriter();
      exc.printStackTrace(new PrintWriter(errors));
      // prints stack trace to Catalina.out
      System.out.println(errors.toString());
      return Response.status(401).entity("Couldn't return connections!").build();
    }
  }

  @POST
  @Path("/createConnection")
  @Produces(MediaType.APPLICATION_JSON)
  @Consumes(MediaType.TEXT_PLAIN)
  public Response createMPDConnection(String input) {
    return null; // TODO
  }

  @POST
  @Path("/destroy")
  @Produces(MediaType.APPLICATION_JSON)
  @Consumes(MediaType.TEXT_PLAIN)
  public Response destroyMPDConnection(String input) {
    return null; // TODO
  }

  // @POST
  // @Path("/post")
  // @Consumes(MediaType.APPLICATION_JSON)
  // public Response createUsrinJSON(Regular Usr) {
  // Usr.getUsername();
  // Usr.getEmail();
  // Usr.getJoinDate();
  // Usr.getPassword();

  // String usrInfo = "User Info: " + Usr.toString();
  // return Response.status(201).entity(usrInfo).build();
  // }

  // @POST
  // @Path("/create")
  // @Produces("application/json")
  // @Consumes(MediaType.APPLICATION_JSON)
  // public Response createConnectionJSON(Regular user, String ip, String port, String mpdPassword)
  // {
  // try {
  // user.addConnection(ip, port, user.getUsername());
  // }

  // catch (SQLException exc) {
  // StringWriter errors = new StringWriter();
  // exc.printStackTrace(new PrintWriter(errors));
  // // prints stack trace to Catalina.out
  // System.out.println(errors.toString());
  // return Response.status(420).entity("Error in adding connection " + user.getUsername() +
  // ". See log at Catalina.out").build();
  // }

  // // The location of the Node.js server
  // String nodeURL = "http://localhost:8007";
  // URL obj = new URL(nodeURL);
  // HttpURLConnection nodeConnection = (HttpURLConnection) obj.openConnection();

  // nodeConnection.setDoOutput(true);
  // nodeConnection.setRequestMethod("POST");
  // nodeConnection.setRequestProperty("Content-Type", "application/json");
  // nodeConnection.setRequestProperty("Accept", "application/json");

  // DataOutputStream wr = new DataOutputStream(nodeConnection.getOutputStream());
  // JSONObject mpdConnection = new JSONObject();
  // mpdConnection.put("host", ip);
  // mpdConnection.put("port", port);
  // mpdConnection.put("password", mpdPassword);
  // wr.writeBytes(mpdConnection.toString());
  // wr.flush();
  // wr.close();

  // return Response.status(200).entity(mpdConnection.toString()).build();
  // }

  // @POST
  // @Path("/destroy")
  // @Produces("application/json")
  // @Consumes(MediaType.APPLICATION_JSON)
  // public Response destroyConnectionJSON(Regular user, String ip, Integer port, String
  // mpdPassword) {
  // try {
  // user.removeConnection(ip, port, name);
  // }

  // catch (SQLException e) {
  // e.printStackTrace();
  // return Response.status(420).entity("Didn't Work").build();
  // }

  // // The location of the Node.js server
  // String nodeURL = "http://localhost:8007";
  // URL obj = new URL(nodeURL);
  // HttpURLConnection nodeConnection = (HttpURLConnection) obj.openConnection();

  // nodeConnection.setDoOutput(true);
  // nodeConnection.setRequestMethod("POST");
  // nodeConnection.setRequestProperty("Content-Type", "application/json");
  // nodeConnection.setRequestProperty("Accept", "application/json");

  // DataOutputStream wr = new DataOutputStream(nodeConnection.getOutputStream());
  // JSONObject mpdConnection = new JSONObject();
  // mpdConnection.put("host", ip);
  // mpdConnection.put("port", port);
  // mpdConnection.put("password", mpdPassword);
  // wr.writeBytes(mpdConnection.toString());
  // wr.flush();
  // wr.close();

  // return Response.status(200).entity(mpdConnection.toString()).build();
  // }

}
