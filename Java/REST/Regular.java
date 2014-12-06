package com.m14.rest;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.sql.Connection;
import java.sql.Date;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.ArrayList;

import java.util.concurrent.TimeUnit;

import javax.sql.DataSource;
import javax.naming.Context;
import javax.naming.InitialContext;

// used for loacal testing with local driver
// import java.util.ListIterator;
// import java.sql.DriverManager;

/**
 * A user that can do everything that premium can but change the background image Does not include
 * being addressed as his/her majesty
 *
 * @author Nick and Thomas
 *
 */
public class Regular extends User {

  static Connection myConn;
  static java.sql.Connection DBCon;

  // Variables to store user information
  public String username = null;
  public String password = null;
  public String email = null;
  public String userID = "0";

  public Connection internalCon = null;

  /**
   * Receives instance variables based on receiving information from database (getUserFromDatabase)
   */
  public Regular() {}

  /**
   * Adds user to database
   *
   * @param name username in database
   * @param pswrd password tied to user
   * @param eml email tied to user
   */
  public void dbAddUser(String name, String pswrd, String eml) {
    this.connect();
    try {
      // create a statement and a result set to find the username string
      Statement myStmt = internalCon.createStatement();
      // execute sql command
      myStmt.execute("INSERT INTO user ( username, password, email ) values(\"" + name
          + "\", \"" + pswrd + "\", \"" + eml + "\");");
    } catch (SQLException e) {
      StringWriter errors = new StringWriter();
      e.printStackTrace(new PrintWriter(errors));
      System.out.println(errors.toString());
    }
    this.disconnect();
  }

  /**
   * Connects to the database, queries for given user with username
   *
   * @param username user to fetch information froms
   * @return user with information from database
   * @throws SQLException
   */
  public Regular getUserFromDatabase(String username) throws SQLException {
    this.connect();
    // try block for sqlException
    try {
      Statement myStmt = internalCon.createStatement();
      // finds the username based on the userID
      ResultSet Rs =
          myStmt.executeQuery("SELECT * FROM user WHERE username =\"" + username + "\";");
      while (Rs.next()) {
        this.username = Rs.getString("username");
        this.password = Rs.getString("password");
        this.userID = Rs.getString("userID");
        this.email = Rs.getString("email");
      }
    } catch (SQLException e) {
      StringWriter errors = new StringWriter();
      e.printStackTrace(new PrintWriter(errors));
      System.out.println(errors.toString());
    }
    this.disconnect();
    return this;
  }

  /**
   * Connects to a Database Connection
   */
  public void connect() {
    // try block for Connection Exception
    try {
      Context initCtx = new InitialContext();
      Context envCtx = (Context) initCtx.lookup("java:comp/env");
      DataSource ds = (DataSource) envCtx.lookup("jdbc/db309M14");
      internalCon = (Connection) ds.getConnection();
      // following connection for testing with local driver

      //  internalCon = DriverManager.getConnection
      // ("jdbc:mysql://mysql.cs.iastate.edu:3306/db309M14" ,"u309M14","vtGQsRyY+");

    } catch (Exception exc) {
    }// empty until decide on procedure for not making connection
  }

  /**
   * Disconnects from a database
   */
  public void disconnect() {
    try {
      internalCon.close();
    } catch (SQLException e) {
      e.printStackTrace();
    }
  }

  /**
   * @return a String of username
   */
  public String getPassword() {
    return this.password;
  }

  /**
   * Adds a friend to database
   *
   * @param friendID
   */
  public void addFriend(Integer friendID) {
    this.connect();
    try {
      // create a statement and a result set to find the username string
      Statement myStmt = internalCon.createStatement();
      // execute sql command
      myStmt.execute("INSERT INTO friends VALUES(" + userID + ",\"" + friendID.toString() + "\");");
    } catch (SQLException e) {
      e.printStackTrace();
    }
    this.disconnect();
  }

  /**
   * Adds a connection to connections
   *
   * @param host ip address
   * @param port port
   * @param name name of MPD Connection
   * @param pswrd MPD Password
   */
  public void addConnection(String name, String mpdHost, String mpdPort, String mpdPassword, String streamHost, String streamPort, String streamSuffix) {
    try {
      this.connect();
      Statement myStmt = internalCon.createStatement();
      // initialize a String
      String id = "";
      // actually creates a connection in the connections table
      myStmt.execute("INSERT INTO connections (name, mpdHost, mpdPort, mpdPassword, streamHost, streamPort, streamSuffix) VALUES (\"" + name
          + "\",\"" + mpdHost + "\",\"" + mpdPort + "\",\"" + mpdPassword + "\",\"" + streamHost
          + "\",\"" + streamPort + "\",\"" + streamSuffix + "\");");
      // finds the id of the connection in order to create an edge
      ResultSet rs =
          myStmt.executeQuery("SELECT ID FROM connections where name = \"" + name + "\";");
      while (rs.next()) {
        id = rs.getString("ID");
      }
      // creates edge between user and connection
      System.out.println("User ID: " + userID);
      myStmt.execute("insert into connectionEdges (userID, connectionID) VALUES (\"" + userID
          + "\",\"" + id + "\");");
      // myStmt.execute("insert into connectionEdges (userID, connectionID) VALUES (\"6\", \"22\");");
    } catch (SQLException e) {
      e.printStackTrace();
      this.disconnect();
    }
    this.disconnect();
  }

  /**
   * Removes a connections from database
   *
   * @param MPDID MPD Connection to delete
   */
  public void removeConnection(String MPDID) {
    try {
      this.connect();
      Statement myStmt = internalCon.createStatement();
      myStmt.execute("DELETE FROM connections where ID = " + MPDID + ";");
      myStmt.execute("DELETE FROM connectionEdges where connectionID = " + MPDID + ";");
    } catch (SQLException e) {
      e.printStackTrace();
    }
    this.disconnect();
  }

  /**
   * Checks how long the user has had an account. If it has been long enough the user will be
   * upgraded to premium
   *
   * @param date
   */
  public void checkLoyalty(Timestamp date) {

    Date todaysDate = new Date(0);
    long difference = date.getTime() - todaysDate.getTime();
    long days = TimeUnit.MILLISECONDS.toDays(difference);

    if (difference >= 30) {
      // Convert this Regular user to a Premium user
      // This can be done with another class, maybe something like
      // UserUpgrade.java, and you would pass in the Regular user and all of its
      // properties (Connection lists, etc.) and create a new Premium user
      // with the transferred properties. Then update the database to reflect
      // that
      // user's loyalty.
    }
  }

  /**
   * @return user's email address
   */
  public String getEmail() {
    return this.email;
  }

  /**
   * @return user's username
   */
  public String getUsername() {
    return this.username;
  }

  /**
   * Gets list of connections tied to user in the database
   *
   * @return an array of connections that the user owns
   */
  public ArrayList<MpdConnection> getConnections() {
    this.connect();
    try {
      // create a statement and a result set to find the username string
      Statement myStmt = internalCon.createStatement();
      ResultSet Rs =
          myStmt.executeQuery("SELECT * FROM connectionEdges WHERE userID =" + userID + ";");
      // array that holds the connectionIDs that the user owns
      ArrayList<String> conID = new ArrayList<String>();
      // To be returned array that will hold all of the connections the user
      // owns
      ArrayList<MpdConnection> cons = new ArrayList<MpdConnection>();

      // A few loops that find all of the connection ids that the user owns and
      // then creates the array based on these ids.
      while (Rs.next()) {
        conID.add(Rs.getString("connectionID"));
      }

      MpdConnection mCon;
      for (int i = 0; i < conID.size(); i++) {
        Rs = myStmt.executeQuery("SELECT * FROM connections WHERE ID =" + conID.get(i) + ";");
        while (Rs.next()) {
          mCon =
              new MpdConnection((Rs.getString("name")), Rs.getString("mpdPort"),
                  Rs.getString("mpdPassword"));
          cons.add(mCon);
        }
      }
      this.disconnect();
      return cons;
    } catch (SQLException e) {
      e.printStackTrace();
    }
    this.disconnect();
    return null;
  }

}
