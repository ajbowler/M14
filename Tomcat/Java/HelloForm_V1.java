// Import required java libraries
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

// Extend HttpServlet class
public class HelloForm_V1 extends HttpServlet {
 
  public void doGet(HttpServletRequest request,
                    HttpServletResponse response)
            throws ServletException, IOException
  {
      // Set response content type
      response.setContentType("text/html");

      PrintWriter out = response.getWriter();
	  String title1 = "Using GET Method to Read Form Data";
    String title2 = "Notice URL Has Parameters in it: Nick M";
    String docType =
      "<!doctype html public \"-//w3c//dtd html 4.0 " +
      "transitional//en\">\n";
      out.println(docType +
                "<html>\n" +
                "<head><title>" + title1 + "</title></head>\n" +
                "<head><title>" + title2 + "</title></head>\n" +                
                "<body bgcolor=\"#CC9966\">\n" +
                "<h1 align=\"center\">" + title1 + "</h1>\n" +
                "<h1 align=\"center\">" + title2 + "</h1>\n" +                
                "<ul>\n" +
                "  <li><b>Username</b>: "
                + request.getParameter("username") + "\n" +
                "  <li><b>Password</b>: "
                + request.getParameter("password") + "\n" +
                "</ul>\n" +
                "</body></html>");
  }
}