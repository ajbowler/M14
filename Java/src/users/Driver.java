package jdbc;

import java.sql.*;
public class Driver {

	void addUser(String name, String password){
		String sql = "insert into user values('" + name + "', '" + password + "');";
		System.out.println(sql);
	}
	
	public static void main(String[] args) {
		
		
		/*try{
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
		}*/
		
		Connection myConn;
		// Just tests to make sure that addConnection works
		try {
			myConn = DriverManager.getConnection("jdbc:mysql://mysql.cs.iastate.edu:3306/db309M14","u309M14","vtGQsRyY+");
			Regular usr = new Regular(myConn);
			usr.addConnection(10, 50, "test03");
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

}