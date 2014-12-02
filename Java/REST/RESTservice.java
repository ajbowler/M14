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

import com.m14.rest.Regular;

@Path("/app")
public class RESTservice {
	
  @GET
  @Path("/test/{name}")
  @Produces(MediaType.APPLICATION_JSON)
  public UserPassBean getUserinJSON(@PathParam("name") String name) {
  
	UserPassBean upb = new UserPassBean("Nicholas Montelibano", "password");
	
    Regular Usr = new Regular(null);
    try {
		Usr = Usr.getUserFromDatabase(upb.username);
		//upb = new UserPassBean(Usr.getUsername(), Usr.getPassword());
		return upb;
		
	} catch (SQLException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	return upb;
  }
	
	
  @POST
  @Path("/login")
  @Produces(MediaType.APPLICATION_JSON)
  @Consumes("text/plain")
  public Response getUserinJSON2(String Pass) {
    try {
      // Must first create the object before getting information from input.username with getUserFromDatabase
      Regular user =  new Regular(null);
      user = user.getUserFromDatabase("Nicholas Montelibano");
      
      if (user.getPassword().equals(Pass)) {
        return Response.status(201).entity("IT WORKED").build();
      } else {
        return Response.status(401).entity("Authentication failed!" + user.getPassword()).build();
      }
    }
    catch(Exception exc) {
      StringWriter errors = new StringWriter();
      exc.printStackTrace(new PrintWriter(errors));
      // prints stack trace to Catalina.out
      System.out.println(errors.toString());
      return Response.status(401).entity("Authentication failed! \n \n \n " + errors.toString()).build();
    }
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
  // public Response createConnectionJSON(Regular user, String ip, String port, String mpdPassword) {
  //   try {
  //     user.addConnection(ip, port, user.getUsername());
  //   }

  //   catch (SQLException exc) {
  //     StringWriter errors = new StringWriter();
  //     exc.printStackTrace(new PrintWriter(errors));
  //     // prints stack trace to Catalina.out
  //     System.out.println(errors.toString());
  //     return Response.status(420).entity("Error in adding connection " + user.getUsername() + ". See log at Catalina.out").build();
  //   }

  //   // The location of the Node.js server
  //   String nodeURL = "http://localhost:8007";
  //   URL obj = new URL(nodeURL);
  //   HttpURLConnection nodeConnection = (HttpURLConnection) obj.openConnection();

  //   nodeConnection.setDoOutput(true);
  //   nodeConnection.setRequestMethod("POST");
  //   nodeConnection.setRequestProperty("Content-Type", "application/json");
  //   nodeConnection.setRequestProperty("Accept", "application/json");
 
  //   DataOutputStream wr = new DataOutputStream(nodeConnection.getOutputStream());
  //   JSONObject mpdConnection = new JSONObject();
  //   mpdConnection.put("host", ip);
  //   mpdConnection.put("port", port);
  //   mpdConnection.put("password", mpdPassword);
  //   wr.writeBytes(mpdConnection.toString());
  //   wr.flush();
  //   wr.close();

  //   return Response.status(200).entity(mpdConnection.toString()).build();
  // }

  // @POST
  // @Path("/destroy")
  // @Produces("application/json")
  // @Consumes(MediaType.APPLICATION_JSON)
  // public Response destroyConnectionJSON(Regular user, String ip, Integer port, String mpdPassword) {
  //   try {
  //     user.removeConnection(ip, port, name);
  //   }

  //    catch (SQLException e) {
  //     e.printStackTrace();
  //     return Response.status(420).entity("Didn't Work").build();
  //   }

  //   // The location of the Node.js server
  //   String nodeURL = "http://localhost:8007";
  //   URL obj = new URL(nodeURL);
  //   HttpURLConnection nodeConnection = (HttpURLConnection) obj.openConnection();

  //   nodeConnection.setDoOutput(true);
  //   nodeConnection.setRequestMethod("POST");
  //   nodeConnection.setRequestProperty("Content-Type", "application/json");
  //   nodeConnection.setRequestProperty("Accept", "application/json");
 
  //   DataOutputStream wr = new DataOutputStream(nodeConnection.getOutputStream());
  //   JSONObject mpdConnection = new JSONObject();
  //   mpdConnection.put("host", ip);
  //   mpdConnection.put("port", port);
  //   mpdConnection.put("password", mpdPassword);
  //   wr.writeBytes(mpdConnection.toString());
  //   wr.flush();
  //   wr.close();

  //   return Response.status(200).entity(mpdConnection.toString()).build(); 
  // }

}
