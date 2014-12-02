import java.sql.Statement;

//data class that holds information for the user's connections
public class MpdConnection {

private String host;

private String port;

public MpdConnection(String inHost, String inPort) {
 this.host = inHost;
 this.port = inPort;
}

public String getHost() {
 return this.host;
}

public String getPort() {
 return this.port;
}

// Returns an array of the users connections
public MpdConnection[] retrieveMpdConnections(String userID){
 Regular user = new Regular(userID);
 return user.getConnections();
}

public Statement createStatement() {
 // TODO Auto-generated method stub
 return null;
}

//TODO
//find all the necessary properties needed for the Connection class

}
