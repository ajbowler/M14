package jdbc;

import java.sql.*;
public class Driver {

	public static void main(String[] args) {
		
		try{
			//Get connection to data base
			Connection myConn = DriverManager.getConnection
			("jdbc:mysql://mysql.cs.iastate.edu:3306/db309M14","u309M14","vtGQsRyY+");
			
			//create a statement
			Statement myStmt = myConn.createStatement();
			
			//execute sql query
			ResultSet myRs = myStmt.executeQuery("select * from user");
			
			//process the result
			while(myRs.next()){
				System.out.println(myRs.getString("username"));
			}
		}
		
		catch(Exception exc){
			exc.printStackTrace();
		}
		
	}

}
