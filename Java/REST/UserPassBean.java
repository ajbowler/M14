@XmlRootElement
public class UserPassBean {
  public String username;
  public String password;

  public UserPassBean() {} // JAXB needs this

    public UserPassBean(String username, String password) {
        this.username = username;
        this.password = password;
    }
}