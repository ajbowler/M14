/**
 * @jsx React.DOM
 */

var React = require('react');
var $ = require('jquery');
var Html5AudioStreamer = require('./components/Html5AudioStreamer.jsx');

React.renderComponent(
  <Html5AudioStreamer />,
  $('#audio').get(0)
);


var socket = require('socket.io-client')('10.30.121.50:6600');

socket.on('connect', function(a) {
  console.log('connected');
  console.log(a);
  socket.send('password coms309M14\ncurrentsong');
  socket.on('event', function(data) {
    console.log(data);
  });
  socket.on('disconnect', function() {
    console.log('disconnected from 10.30.121.50:6600');
  });
});



/*
var socket = new WebSocket('ws://localhost:6600');
socket.onopen = function(event) {
  socket.send('currentsong');
  socket.onmessage = function(event) {
    console.log(event);
  };

  socket.onclose = function(event) {
    console.log('connection closed');
  };

};
*/
