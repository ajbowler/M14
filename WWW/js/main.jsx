/**
 * @jsx React.DOM
 */

var React = require('react');
var $ = require('jquery');
var MusicPlayer = require('./components/MusicPlayer.jsx');
var LoginModal = require('./components/LoginModal.jsx');

React.renderComponent(
  <LoginModal />, 
  $('#container').get(0)
);