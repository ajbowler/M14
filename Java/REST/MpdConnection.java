// data class that holds information for the user's connections
public class MpdConnection {

  private String host;
  
  private int port;
  
  public MpdConnection(String host, int port) {
    this.host = host;
    this.port = port;
  }
  
  public String getHost() {
    return this.host;
  }
  
  public int getPort() {
    return this.port;
  }

  public Statement createStatement() {
    // TODO Auto-generated method stub
    return null;
  }
  
  //TODO
  //find all the necessary properties needed for the Connection class
  
}
