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

//By adding the "@path" this class will be executed when "/hello"
//is appended to the url, "proj-309-m14.cs.iastate.edu:8080/Login/send
@Path("/test")
public class RESTservice {

  @GET
  @Path("/get/{param}")
  @Produces(MediaType.APPLICATION_JSON)
  //public Regular getUserinJSON(@PathParam("param") String msg) {
  public Regular getUserinJSON(@PathParam("param") String index) {
    try{
      // Create new Regular user from index given
      Regular Usr = new Regular(null, index);
      // Get all variables to return as JSON
      Usr.getUsername();
      Usr.getEmail();
      Usr.getJoinDate();
      Usr.getPassword();
      return Usr;
    }

    //If exception, create a stackflow to print if needed
    catch(Exception exc){
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

}
