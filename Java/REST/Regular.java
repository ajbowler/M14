package com.m14.rest;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.sql.Connection;
import java.sql.Date;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.concurrent.TimeUnit;
import javax.sql.DataSource;
import javax.naming.Context;
import javax.naming.InitialContext;


//A user that can do everything that premium can but change the background image
//Does not include being addressed as his/her majesty
public class Regular extends User {

  static Connection myConn;
  static java.sql.Connection DBCon;

  // Variables to store user information
  public String username = null;
  public String password = null;
  public String email = null;
  public Timestamp joindate;
  public String userID = "0";


  public Regular(java.sql.Connection DBCon, String username) {
    Regular.DBCon = DBCon;
    this.username = username;
    this.joindate = null; // default Date constructor uses time/date
  }

  public Regular getUserFromDatabase(String username) throws SQLException {
    Connection internalCon = null;
    // try block for sqlException
    try {
      // try block for Connection Exception
      try {
        Context initCtx = new InitialContext();
        Context envCtx = (Context) initCtx.lookup("java:comp/env");
        DataSource ds = (DataSource) envCtx.lookup("jdbc/db309M14");
        internalCon = (Connection) ds.getConnection();
      }
      catch(Exception exc){}//empty until decide on procedure for not making connection
      // create a statement and a result set to find the username string
      Statement myStmt = internalCon.createStatement();
      // finds the username based on the userID
      ResultSet Rs = myStmt.executeQuery("SELECT * FROM user WHERE username =" + username + ";");
      while (Rs.next()) {
        this.username = Rs.getString("username");
        this.password = Rs.getString("password");
        this.userID = Rs.getString("userID");
        this.joindate = Rs.getTimestamp("JoinDate");
        this.email = Rs.getString("EmailAddress");
      }
      internalCon.close();
      return this;
    }
    // catch statement for original try block
    catch (SQLException e) {
      StringWriter errors = new StringWriter();
      e.printStackTrace(new PrintWriter(errors));
      System.out.println(errors.toString());
    }
    internalCon.close();
    // return 'Didnt Work" if connection is unsuccessful
    return null;
  }

  // returns a string of the user name
  public String getPassword(){
      return this.password;
    }

  // Adds a friend
  public void addFriend(Integer friendID) {
    try {
      // create a statement
      Statement myStmt = myConn.createStatement();
      // execute sql command
      myStmt.execute("INSERT INTO friends VALUES(" + userID + ","
          + friendID.toString() + ");");
    }
    catch (SQLException e) {
      e.printStackTrace();
    }
  }

  // adds a connection to connections
  public void addConnection(Integer ip, Integer port, String name) {
    try {

      Statement myStmt = myConn.createStatement();
      // initialize a String
      String id = "";
      // aSctually creates a connection in the connections table
      myStmt.execute("INSERT INTO connections (IP, port, name) VALUES ("
          + ip.toString() + "," + port.toString() + "," + "\"" + name
          + "\"" + ");");
      // finds the id of the connection in order to create an edge
      ResultSet rs = myStmt
          .executeQuery("SELECT ID FROM connections where IP = "
              + ip.toString() + ";");
      while (rs.next()) {
        id = rs.getString("ID");
      }
      // creates edge between user and connection
      myStmt.execute("INSERT INTO connectionEdges VALUES(" + userID + ","
          + id + ");");
    } catch (SQLException e) {

      e.printStackTrace();
    }
  }

  // checks how long the user has had an account. If it has been long enough
  // the user
  // will be upgraded to premium
  public void checkLoyalty(Timestamp date) {

    Date todaysDate = new Date(0);
    long difference = date.getTime() - todaysDate.getTime();
    long days = TimeUnit.MILLISECONDS.toDays(difference);

    if(difference >= 30) {
      // Convert this Regular user to a Premium user
      // This can be done with another class, maybe something like
      // UserUpgrade.java, and you would pass in the Regular user and all of its
      // properties (Connection lists, etc.) and create a new Premium user
      // with the transferred properties. Then update the database to reflect that
      // user's loyalty.
    }
  }

  public Timestamp getJoinDate() {
    return this.joindate;
  }

  public String getEmail(){
    return this.email;
  }

  /*
  // currently overridden toString block until decide on standard toString procedure
  @Override
  public String toString() {
    return "userInfo [UserName=" + this.username + ", password=" + this.password + "]";
  }*/
}
