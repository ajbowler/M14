package jdbc;

import java.sql.*;

//a user that can do everything that premium can but change the background image
//Does not include being addressed as his/her majesty

public class Regular extends User{
	// STILL NEEDS WORK
	// This will eventually need to be implimented so that it is the id the database uses to find the user.
	// As of now, defaulted to 0.
	FINAL int userID = 0;

	// password that IS for the m14 account
	String acctPassword;
	
	// pretty obvious?
	String userName;
	
	// list of playlists
	Playlist[] playlists;
	
	// list of other users if this user actually has 'friends'
	User[] friends;
	
	// the date that the user created the m14 profile
	// date will be an eight digit int so if the user joined October 20th, 1993 the
	// int would be 10201993 
	// we can obviously change this system if we wanted to
	int joinDate;
	
	//adds a friend
	void addFriend(Connection myConn, int friendID){

		//create a statement
		Statement myStmt = myConn.createStatement();
		//execute sql command
		myStmt.executeQuery("insert into friends values(" + userID + "," + friendID + ");");
	}
	
	// adds a connection to connections
	void addConnection(Connectin myConn, int ip, int port, string name){
		//TODO//create a statement
		Statement myStmt = myConn.createStatement();
		//execute sql command
		myStmt.executeQuery("insert into connections (column 2, column 3, column 4) values(" + name + "," + ip + "," + port + ");");
	}
	
	// checks how long the user has had an account. If it has been long enough the user
	// will be upgraded to premium
	void checkLoyalty(){
		//TODO
	}
}
