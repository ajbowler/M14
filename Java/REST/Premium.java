package com.m14.rest;

import java.net.URL;
import java.sql.Connection;

//The most royal of users. All users under this category will be refered to as
//his/her majesty.... also they can do everything else a regular user can do but 
//they can upload an image to the background

public class Premium extends Regular{

  public Premium(Connection con, String name) {
    super(name);
    // TODO Auto-generated constructor stub
  }

  // name of the file that the background image is in
  URL imageName;
  
  // changes the background image of the website
  void changeImage(){
    //TODO
  }
  
}
