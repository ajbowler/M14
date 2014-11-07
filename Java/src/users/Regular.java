package jdbc;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

//a user that can do everything that premium can but change the background image
//Does not include being addressed as his/her majesty

public class Regular extends User {
	Connection myConn;

	public Regular(Connection con) {
		myConn = con;
	}

	// STILL NEEDS WORK
	// This will eventually need to be implimented so that it is the id the
	// database uses to find the user.
	// As of now, defaulted to 0.
	public String userID = "0";

	// the date that the user created the m14 profile
	// date will be an eight digit int so if the user joined October 20th, 1993
	// the
	// int would be 10201993
	// we can obviously change this system if we wanted to
	int joinDate;

	// returns a string of the user name, or a blank string (for now);
	String getUsername() {
		try {
			String usr = null;
			// Create a statement and a result set to find the username string
			Statement myStmt = myConn.createStatement();
			//finds the username based on the userID
			ResultSet Rs = myStmt.executeQuery("SELECT * FROM user WHERE userID =" + userID+ ";");
			while (Rs.next()) {
				usr = Rs.getString("username");
			}
			return usr;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		// returns a blank string if the above doesn't work
		String usr = "";
		return usr;
	}

	// adds a friend
	void addFriend(Integer friendID) {
		try {

			// create a statement
			Statement myStmt = myConn.createStatement();
			// execute sql command
			myStmt.execute("INSERT INTO friends VALUES(" + userID + "," + friendID.toString() + ");");

		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	// adds a connection to connections
	void addConnection(Integer ip, Integer port, String name) {
		try {

			Statement myStmt = myConn.createStatement();
			// Initialize a String
			String id = "";
			// Actually creates a connection in the connections table
			myStmt.execute("INSERT INTO connections (IP, port, name) VALUES ("+ ip.toString() + "," + port.toString() + "," + "\""+name+"\"" +");");
			//Finds the id of the connection in order to create an edge
			ResultSet rs = myStmt.executeQuery("SELECT ID FROM connections where IP = " + ip.toString() + ";");
			while(rs.next()){
				id = rs.getString("ID");
			}
			//Creates edge between user and connection
			myStmt.execute("INSERT INTO connectionEdges VALUES(" + userID + "," + id + ");");
		} catch (SQLException e) {

			e.printStackTrace();
		}
	}

	// checks how long the user has had an account. If it has been long enough
	// the user
	// will be upgraded to premium
	void checkLoyalty() {
		// TODO
	}
}
