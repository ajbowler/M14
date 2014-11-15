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

@Path("/info")
public class Start {

	@GET
	//This "@Path" declares what the msg is;
	//Basically uses the next string of the URL to get the value used
	@Path("/{param}")
	public Response getMsg(@PathParam("param") String msg) {
	
	try{	
		
		//Get connection to data base
		/*Connection myConn = (Connection) DriverManager.getConnection
		("jdbc:mysql://mysql.cs.iastate.edu:3306/db309M14","u309M14","vtGQsRyY+");*/
		
		Context initCtx = new InitialContext();
		Context envCtx = (Context) initCtx.lookup("java:comp/env");
		DataSource ds = (DataSource) envCtx.lookup("jdbc/db309M14");
		
		//System.out.println("Made DataSource");
		//System.out.println(ds.toString());
		
		Connection conn = (Connection) ds.getConnection();
		
		//create a statement	
		Statement myStmt = ((java.sql.Connection) conn).createStatement();
		
		//execute sql query
		ResultSet myRs = myStmt.executeQuery("select * from user");
		
		myRs.next();
		String output = myRs.getString("username");
		
		
		//process the result
		/*while(myRs.next()){
			output = output.concat((myRs.getString("username")));
			output = output.concat(" ");
		}*/
		
		//String output = "testingLogin";
		
		conn.close();
		
		return Response.status(200).entity(output).build();
		
	}
	
	catch(Exception exc){
		StringWriter errors = new StringWriter();
		exc.printStackTrace(new PrintWriter(errors));
		
		return Response.status(420).entity(errors.toString()).build();
	}

	}
	
	@POST
	@Path("/post")
	@Consumes("application/json")
	@Produces("application/json")
	
	public Response echoJson(String msg){
	
		return Response.status(200).build();
	}
	
}
