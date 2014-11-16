package com.M14.login;

import javax.sql.DataSource;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;
import javax.ws.rs.*;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.sql.Connection;

//By adding the "@path" this class will be executed when "/hello"
//is appended to the url, "proj-309-m14.cs.iastate.edu:8080/Login/send

@Path("/jsonTest")
public class JsonTest {

	
	@GET
	//This "@Path" declares what the msg is;
	//Basically uses the next string of the URL to get the value used
	@Produces("application/json")
	@Path("/{param}")
	public JaxBean getMsg(@PathParam("param") String msg) {
	
	try{	
		
		Context initCtx = new InitialContext();
		Context envCtx = (Context) initCtx.lookup("java:comp/env");
		DataSource ds = (DataSource) envCtx.lookup("jdbc/db309M14");
		
	
		
		Connection conn = (Connection) ds.getConnection();
		
		//create a statement	
		Statement myStmt = ((java.sql.Connection) conn).createStatement();
		
		//execute sql query
		ResultSet myRs = myStmt.executeQuery("select * from user");
		
		myRs.next();
		String output = myRs.getString("username");
		
		//String output = "testingLogin";
		
		conn.close();
		
		return new JaxBean(output, "test");
		
	}
	
	catch(Exception exc){
		StringWriter errors = new StringWriter();
		exc.printStackTrace(new PrintWriter(errors));
		
		return new JaxBean("Didnt", "Work");
	}

	}
	
	@POST
	@Path("/post")
	@Consumes("application/json")
	@Produces("application/json")
	
	public Response echoJson(String msg){
	
		return Response.status(200).entity("working json").build();
	}
	
}

