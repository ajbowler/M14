package users;

/**
* Abstract class to incorporate essential functionality of all Users
* 
*/
public abstract class Users {
	// Name which will default to guest.
	String name;
	//list of objects that hold data of user's connections
	Connection[] Connections;
	String IP;
	String port;
	//NOT the m14 password
	String mpdPassword;
	
	void connect(){}
	
	void playMusic(){}
	
	void shuffle(){}
	

}
