package sendingcommands;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.sql.Connection;
import java.sql.Date;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.ListIterator;
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
  public Connection internalCon = null;

  public Regular(String index) {
    this.username = index;
    this.joindate = null; // default Date constructor uses time/date
    
  }

  public Regular getUserFromDatabase(String username) throws SQLException {
	this.Connect();
    // try block for sqlException
    try {
      // try block for Connection Exception
      try {/*
        Context initCtx = new InitialContext();
        Context envCtx = (Context) initCtx.lookup("java:comp/env");
        DataSource ds = (DataSource) envCtx.lookup("jdbc/db309M14");
        internalCon = (Connection) ds.getConnection();
			internalCon = DriverManager.getConnection
			("jdbc:mysql://mysql.cs.iastate.edu:3306/db309M14","u309M14","vtGQsRyY+");*/
	
      }
      catch(Exception exc){}//empty until decide on procedure for not making connection
      // create a statement and a result set to find the username string
      Statement myStmt = internalCon.createStatement();
      // finds the username based on the userID
      ResultSet Rs = myStmt.executeQuery("SELECT * FROM user WHERE username =\"" + username + "\";");
      while (Rs.next()) {
        this.username = Rs.getString("username");
        this.password = Rs.getString("password");
        this.userID = Rs.getString("userID");
        this.joindate = Rs.getTimestamp("JoinDate");
        this.email = Rs.getString("EmailAddress");
      }
      this.Close();
      return this;
    }
    // catch statement for original try block
    catch (SQLException e) {
      StringWriter errors = new StringWriter();
      e.printStackTrace(new PrintWriter(errors));
      System.out.println(errors.toString());
    }
    this.Close();
    // return 'Didnt Work" if connection is unsuccessful
    return null;
  }

  private void Close() {
	// TODO Auto-generated method stub
	
}

// Connects to a Database Connection
  public void Connect(){
	   // try block for Connection Exception
	    try {/*
	      Context initCtx = new InitialContext();
	      Context envCtx = (Context) initCtx.lookup("java:comp/env");
	      DataSource ds = (DataSource) envCtx.lookup("jdbc/db309M14");
	      internalCon = (Connection) ds.getConnection();*/
				internalCon = DriverManager.getConnection
				("jdbc:mysql://mysql.cs.iastate.edu:3306/db309M14","u309M14","vtGQsRyY+");
		
	    }
	    catch(Exception exc){}//empty until decide on procedure for not making connection
  }
  
  // Disconnects from a database
  public void Disconnect(){
	  try {
		internalCon.close();
	} catch (SQLException e) {
		// TODO decide 
		e.printStackTrace();
	}
  }
  
  
  // returns a string of the user name
  public String getPassword(){
      return this.password;
    }

  // Adds a friend
  public void addFriend(Integer friendID) {
	  Connection internalCon = null;
    try {
    	try {
    		Context initCtx = new InitialContext();
        Context envCtx = (Context) initCtx.lookup("java:comp/env");
        DataSource ds = (DataSource) envCtx.lookup("jdbc/db309M14");
        internalCon = (Connection) ds.getConnection();
      }
      catch(Exception exc){}//empty until decide on procedure for not making connection
      // create a statement and a result set to find the username string
      Statement myStmt = internalCon.createStatement();
      // execute sql command
      myStmt.execute("INSERT INTO friends VALUES(" + userID + ",\"" + friendID.toString() + "\");");
      internalCon.close();
    }
    catch (SQLException e) {
      e.printStackTrace();
    }
  }

  // adds a connection to connections
  public void addConnection(String host, String port, String name) {
	  try {
	    this.Connect();
	    Statement myStmt = internalCon.createStatement();
        // initialize a String
        String id = "";
       
        // actually creates a connection in the connections table
        myStmt.execute("INSERT INTO connections (host, port, name) VALUES (\""
            + host + "\"," + port + "," + "\"" + name
            + "\"" + ");");
        // finds the id of the connection in order to create an edge
        ResultSet rs = myStmt.executeQuery("SELECT ID FROM connections where name = \"" + name + "\";");
        while (rs.next()) {
          id = rs.getString("ID");
        }
        // creates edge between user and connection
        System.out.println("User ID: " + userID);
        myStmt.execute("insert into connectionEdges (userID, connectionID) VALUES (\"" + userID + "\",\"" + id + "\");");
        //myStmt.execute("insert into connectionEdges (userID, connectionID) VALUES (\"6\", \"22\");");
	  }
	  catch (SQLException e) {
		  e.printStackTrace();
		  this.Close();
	  }
    this.Close();
  }
  
  // removes a connections from database
  public void removeConnection(String MPDID) {
	  try {
	    this.Connect();
	    Statement myStmt = internalCon.createStatement();
        myStmt.execute("DELETE FROM connections where ID = " + MPDID + ";");
        myStmt.execute("DELETE FROM connectionEdges where connectionID = " + MPDID + ";");
	  }
	  catch (SQLException e) {
		  e.printStackTrace();
	  }
	 this.Close();
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
  
  public String getUsername(){
	  return this.username;
  }
  
  // Returns an array of connections that the user owns
  @SuppressWarnings("resource")
  public ArrayList<MpdConnection> getConnections(){
	  this.Connect();
	  try{
      // create a statement and a result set to find the username string
      Statement myStmt = internalCon.createStatement();
      ResultSet Rs = myStmt.executeQuery("SELECT * FROM connectionEdges WHERE userID =" + userID + ";");
      // array that holds the connectionIDs that the user owns
      ArrayList<String> conID = new ArrayList<String>();
      // To be returned array that will hold all of the connections the user owns
      ArrayList<MpdConnection> cons = new ArrayList<MpdConnection>();
      
      // A few loops that find all of the connection ids that the user owns and then 
      // creates the array based on these ids.
      while(Rs.next()){
        conID.add( Rs.getString("connectionID") );
      }
      
      MpdConnection mCon;
      for(int i = 0; i < conID.size(); i++) {
    	  Rs = myStmt.executeQuery("SELECT * FROM connections WHERE ID =" + conID.get(i) + ";");
    	  while(Rs.next()) {  
    	        mCon = new MpdConnection( (Rs.getString("host")), Rs.getString("port") );
    	        cons.add(mCon);
    	  }
      }
      this.Close();
      return cons;
    }
    catch (SQLException e) {
      e.printStackTrace();
    }
    this.Close();
    return null;
  }

  /*
  // currently overridden toString block until decide on standard toString procedure
  @Override
  public String toString() {
    return "userInfo [UserName=" + this.username + ", password=" + this.password + "]";
  }*/
}
