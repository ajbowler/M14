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


  /**
   * Authenticates and logs in
   * 
   * @param input text in JSON format with username and password
   * @return
   */
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
      // StringWriter errors = new StringWriter();
      // exc.printStackTrace(new PrintWriter(errors));
      // // prints stack trace to Catalina.out
      // System.out.println(errors.toString());
      String errors = printErrors(exc);
      return Response.status(401).entity("Authentication failed!").build();
    }

  }

  /**
   * Creates a user to put in the user table on the database
   * 
   * @param input text in JSON format with username, password, and email
   * @return
   */
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
      // StringWriter errors = new StringWriter();
      // exc.printStackTrace(new PrintWriter(errors));
      // // prints stack trace to Catalina.out
      // System.out.println(errors.toString());
      String errors = printErrors(exc);
      return Response.status(500).entity(errors.toString()).build();
    }
  }

  /**
   * Grabs all connections correlated with a user and returns them as a String in JSON format
   * 
   * @param input text in JSON format with username and password
   * @return
   */
  @POST
  @Path("/getConnections")
  @Produces(MediaType.TEXT_PLAIN)
  @Consumes(MediaType.TEXT_PLAIN)
  public Response getMPDConnectionsForUser(String input) {
    try {
      JSONObject obj = new JSONObject(input);
      AuthBean authBean = new AuthBean(obj.getString("username"), obj.getString("password"));
      Regular user = new Regular();
      user = user.getUserFromDatabase(authBean.getUsername());
      ArrayList<MpdConnection> mpdConnectionArrayList = user.getConnections();
      // 1. Make a JSONArray.
      // 2. Loop through the arraylist and for each MpdConnection, add it to the JSONArray.
      // 3. Make wrapper JSONObject for the array.

      // 1.
      JSONArray mpdConnectionsJSON = new JSONArray();

      // 2.
      for (MpdConnection mpdConn : mpdConnectionArrayList) {
        JSONObject mpdJSON = new JSONObject();

        String connName = mpdConn.getConnectionName();
        String connServeHost = mpdConn.getServerHost();
        String connServePort = mpdConn.getServerPort();
        String connServePass = mpdConn.getServerPass();
        String connStreamHost = mpdConn.getStreamHost();
        String connStreamPort = mpdConn.getStreamPort();
        String connStreamSuffix = mpdConn.getStreamSuffix();

        mpdJSON.put("connectionName", connName);
        mpdJSON.put("serverHost", connServeHost);
        mpdJSON.put("serverPort", connServePort);
        mpdJSON.put("serverPass", connServePass);
        mpdJSON.put("streamHost", connStreamHost);
        mpdJSON.put("streamPort", connStreamPort);
        mpdJSON.put("streamSuffix", connStreamSuffix);

        mpdConnectionsJSON.put(mpdJSON);
      }

      JSONObject mpdConnections = new JSONObject();
      mpdConnections.put("mpdConnections", mpdConnectionsJSON);

      MpdConnectionListBean mpdListBean = new MpdConnectionListBean(mpdConnections);
      return Response.status(201).entity(mpdListBean.toString()).build();

    } catch (Exception exc) {
      // StringWriter errors = new StringWriter();
      // exc.printStackTrace(new PrintWriter(errors));
      // // prints stack trace to Catalina.out
      // System.out.println(errors.toString());
      String errors = printErrors(exc);
      return Response.status(500).entity(errors.toString()).build();
    }
  }

  /**
   * 
   * NOTE: This method relies on the assumption that only logged-in users can add connections. This
   * is because in order to create the Regular user it simply calls getUserFromDatabase.
   * 
   * @param input text in JSON format with connectoinName, serverHost, serverPort, serverPass,
   *        streamHost, streamPort, and streamSuffix
   * @return
   */
  @POST
  @Path("/createConnection")
  @Produces(MediaType.APPLICATION_JSON)
  @Consumes(MediaType.TEXT_PLAIN)
  public Response createMPDConnection(String input) {
    try {
      JSONObject obj = new JSONObject(input);

      // Create ConnectionBean from JSON
      MpdConnection mpdConnection =
          new MpdConnection(obj.getString("connectionName"), obj.getString("serverHost"),
              obj.getString("serverPort"), obj.getString("serverPass"),
              obj.getString("streamHost"), obj.getString("streamPort"),
              obj.getString("streamSuffix"));

      Regular user = new Regular();
      // Instantiate and add the user to the database.
      user = user.getUserFromDatabase(obj.getString("username"));
      // Add connection tied to user just created
      user.addConnection(mpdConnection.getConnectionName(), mpdConnection.getServerHost(),
          mpdConnection.getServerPort(), mpdConnection.getServerPass(),
          mpdConnection.getStreamHost(), mpdConnection.getStreamPort(),
          mpdConnection.getStreamSuffix());

      // Send new MPD connection as a JSON over to Node
      JSONObject mpdJSON = new JSONObject();
      mpdJSON.put("host", mpdConnection.getServerHost());
      mpdJSON.put("port", mpdConnection.getServerPort());
      mpdJSON.put("pass", mpdConnection.getServerPass());
      String mpdJSONString = mpdJSON.toString();

      // Set up the request.
      String url = "http://localhost:8008/create";
      // URL nodeURL = new URL(url);
      // HttpURLConnection nodeConnection = (HttpURLConnection) nodeURL.openConnection();
      // nodeConnection.setDoOutput(true);
      // nodeConnection.setDoInput(true);
      // nodeConnection.setRequestProperty("Content-Type", "application/json");
      // nodeConnection.setRequestProperty("Content-Length", mpdJSONString.length);
      // nodeConnection.setRequestProperty("Connection", "keep-alive");
      // nodeConnection.setRequestProperty("Accept", "*/*");
      // nodeConnection.setRequestMethod("POST");

      HttpURLConnection nodeConnection = setupNodeConnection(url, mpdJSONString);

      // Set up the output stream.
      // OutputStreamWriter wr = new OutputStreamWriter(nodeConnection.getOutputStream());
      // wr.write(mpdJSONString);
      // wr.flush();

      writeToNode(nodeConnection, mpdJSONString);

      // Check the response from Node.
      int httpResult = nodeConnection.getResponseCode();
      return checkNodeResponse(httpResult, nodeConnection, "create", mpdConnection, "Could not add connection");

      // if(httpResult == HttpURLConnection.HTTP_OK) {
      //   BufferedReader br = new BufferedReader(new InputStreamReader(nodeConnection.getInputStream(),"utf-8"));  

      //   String line = null;  

      //   while ((line = br.readLine()) != null) {  
      //    sb.append(line + "\n");  
      //   }  

      //   br.close();  

      //   System.out.println(""+sb.toString());

      //   return Response.status(201).entity(mpdConnection).build();
      // } else {
      //   System.out.println("Error reading response from Node.");
      //   System.out.println("Response message: " + nodeConnection.getResponseMessage());
      //   return Response.status(500).entity("Could not add connection").build();
      // }
    } catch (Exception exc) {
      // StringWriter errors = new StringWriter();
      // exc.printStackTrace(new PrintWriter(errors));
      // // prints stack trace to Catalina.out
      // System.out.println(errors.toString());
      String errors = printErrors(exc);
      return Response.status(500).entity(errors.toString()).build();
    }
  }

  /**
   * Request body must contain - connectionID: "(connection ID)" NOTE: Also assumes user is already
   * logged in Only receives a connectionID, used to delete the connection This connectionID taken
   * from the client calling getConnections
   * 
   * @param input text in JSON format with username, password, and connectionID
   * @return
   */
  @POST
  @Path("/destroy")
  @Produces(MediaType.APPLICATION_JSON)
  @Consumes(MediaType.TEXT_PLAIN)
  public Response destroyMPDConnection(String input) {
    JSONObject obj;
    try {
      obj = new JSONObject(input);
      AuthBean authBean = new AuthBean(obj.getString("username"), obj.getString("password"));
      Regular user = new Regular();
      user = user.getUserFromDatabase(authBean.getUsername());
      // Authentication
      UserBean userBean = new UserBean(user.getUsername(), user.getPassword(), user.getEmail());
      if (user.password.equals(authBean.getPassword())) {

        // Remove the connection from the user's list of connections in the database.
        String connectionID = obj.getString("connectionID");
        Regular usr = new Regular();
        usr.removeConnection(connectionID);

        // Turn the connectionID into a JSONObject.
        JSONObject destroyedConn = new JSONObject();
        destroyedConn.put("connectionId", connectionID);

        // Set up the request.
        String destroyedConnString = destroyedConn.toString();
        String url = "http://localhost:8008/destroy";
        // URL nodeURL = new URL(url);
        // HttpURLConnection nodeConnection = (HttpURLConnection) nodeURL.openConnection();
        // nodeConnection.setDoOutput(true);
        // nodeConnection.setDoInput(true);
        // nodeConnection.setRequestProperty("Content-Type", "application/json");
        // nodeConnection.setRequestProperty("Content-Length", destroyedConnString.length);
        // nodeConnection.setRequestProperty("Connection", "keep-alive");
        // nodeConnection.setRequestProperty("Accept", "*/*");
        // nodeConnection.setRequestMethod("POST");

        HttpURLConnection nodeConnection = setupNodeConnection(url, destroyedConnString);

        // Set up the output stream.
        // OutputStreamWriter wr = new OutputStreamWriter(nodeConnection.getOutputStream());
        // wr.write(destroyedConnString);
        // wr.flush();
        writeToNode(nodeConnection, destroyedConnString);

        //Check the response from Node.
        int httpResult = nodeConnection.getResponseCode();
        return checkNodeResponse(httpResult, nodeConnection, "destroy", destroyedConn, "Could not destroy connection");
        // if(httpResult == HttpURLConnection.HTTP_OK) {
        //   BufferedReader br = new BufferedReader(new InputStreamReader(nodeConnection.getInputStream(),"utf-8"));  

        //   String line = null;  

        //   while ((line = br.readLine()) != null) {  
        //    sb.append(line + "\n");  
        //   }  

        //   br.close();  

        //   System.out.println(""+sb.toString());

        //   return Response.status(200).entity(destroyedConn).build();
        // } else {
        //   System.out.println("Error reading response from Node.");
        //   System.out.println("Response message: " + nodeConnection.getResponseMessage());
        //   return Response.status(401).entity("Could not destroy connection").build();
        // }
      } else {
        return Response.status(401).entity("Authentication failed!").build();
      }
    }

    catch (JSONException exc) {
      // StringWriter errors = new StringWriter();
      // exc.printStackTrace(new PrintWriter(errors));
      // // prints stack trace to Catalina.out
      // System.out.println(errors.toString());
      String errors = printErrors(exc);
      return Response.status(500).entity(errors).build();
    } catch (SQLException exc) {
      // StringWriter errors = new StringWriter();
      // exc.printStackTrace(new PrintWriter(errors.toString()));
      // // prints stack trace to Catalina.out
      // System.out.println(errors.toString());
      String errors = printErrors(exc);
      return Response.status(500).entity(errors.toString()).build();
    }
  }

  private HttpURLConnection setupNodeConnection(String url, String content) {
    URL nodeURL = new URL(url);
    HttpURLConnection connection = (HttpURLConnection) nodeURL.openConnection();
    connection.setDoOutput(true);
    connection.setDoInput(true);
    connection.setRequestProperty("Content-Type", "application/json");
    connection.setRequestProperty("Content-Length", content.length);
    connection.setRequestProperty("Connection", "keep-alive");
    connection.setRequestProperty("Accept", "*/*");
    connection.setRequestMethod("POST");

    return connection;
  }

  private String printErrors(Exception exc) {
    StringWriter errors = new StringWriter();
    exc.printStackTrace(new PrintWriter(errors));
    // prints stack trace to Catalina.out
    System.out.println(errors.toString());
    return errors.toString();
  }

  private void writeToNode(HttpURLConnection connection, String content) {
    OutputStreamWriter wr = new OutputStreamWriter(connection.getOutputStream());
    wr.write(content);
    wr.flush();
  }

  private Response checkNodeResponse(int httpResult, HttpURLConnection connection, String method, Object contentReturned, String errorMessage) {
    if(httpResult == HttpURLConnection.HTTP_OK) {
      BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream(),"utf-8"));  

      String line = null;  

      while ((line = br.readLine()) != null) {  
       sb.append(line + "\n");  
      }  

      br.close();  

      System.out.println(""+sb.toString());

      if(method.equals("create")) {
        return Response.status(201).entity((MpdConnection) contentReturned).build();
      } else {
        return Response.status(200).entity((JSONObject) contentReturned).build();
      }
    
    } else {
      System.out.println("Error reading response from Node.");
      System.out.println("Response message: " + connection.getResponseMessage());
      return Response.status(401).entity(errorMessage).build();
    }
  }
}