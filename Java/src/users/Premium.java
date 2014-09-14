package users;

// The most royal of users. All users under this category will be refered to as
// his/her majesty.... also they can do everything else a regular user can do but 
// they can upload an image to the background
public class Premium extends Users{
	
	// name of the file that the background image is in
	String imageName;
	
	// password that IS for the m14 account
	String acctPassword;
	
	// pretty obvious?
	String userName;
	
	// list of playlists
	Playlist[] playlists;
	
	// list of other users if this user actually has 'friends'
	Users[] friends;
	
	// the date that the user created the m14 profile
	// date will be an eight digit int so if the user joined October 20th, 1993 the
	// int would be 10201993
	// we can obviously change this system if we wanted to
	int joinDate;
	
	
	void connect() {
		//TODO
	}
	
	void playMusic(){
		//TODO
	}
	
	void shuffle(){
		//TODO
	}
	
	//adds a friend
	void addFriend(){
		//TODO
	}
	
	// updates the friends list
	// we can add this to add friend or call it inside of add friend if need be
	void updateFriends(){
		//TODO
	}
	
	// yeah I guess we should be able to do this
	void Login(){
		//TODO
	}
	
	// adds a connection to connections
	void addConnection(){
		//TODO
	}
	
	// updates connections. Can be absorbed or called by addConnection if need be
	void updateConnections(){
		//TOD
	}
	
	// changes the background image of the website
	void changeImage(){
		//TODO
	}

}