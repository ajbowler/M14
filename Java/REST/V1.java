package com.m14.REST;

/* Unused Imports (For eventual JDBC)
 * 
 * import java.sql.DriverManager;
 * import java.sql.ResultSet;
 * import java.sql.Statement;
 * import java.sql.Connection;
 *  
 */
import javax.activation.DataSource;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import javax.ws.rs.*;

//By adding the "@path" this class will be executed when "/hello"
//is appended to the url, "proj-309-m14.cs.iastate.edu:8080/Login/send

@Path("/v1")
public class V1 {

  @GET
  //This "@Path" declares what the msg is;
  //Basically uses the next string of the URL to get the value used
  @Path("/{param}")
  public Response getMsg(@PathParam("param") String input) {
  
    String output = "eventually a json object, not a " + input;
    
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

