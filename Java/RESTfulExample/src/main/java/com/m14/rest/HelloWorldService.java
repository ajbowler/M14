package com.m14.rest;
 
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;
import javax.ws.rs.*;


// By adding the "@path" this class will be executed when "/hello"
// is appended to the url, "proj-309-m14.cs.iastate.edu:8080/RESTfulExample/rest
@Path("/hello")
public class HelloWorldService {
 
	@GET
        //This "@Path" declares what the msg is; 
        //Basically uses the next string of the URL to get the value used

	@Path("/{param}")
	public Response getMsg(@PathParam("param") String msg) {
 
		String output = "Jersey say : " + msg;
 
		return Response.status(200).entity(output).build();
 
	}
	
	@POST
	@Path("/post")
	@Consumes("application/json")
	@Produces("application/json")
	public Response echoJson(String msg){
		
		return Response.status(200).build();
	}
}
