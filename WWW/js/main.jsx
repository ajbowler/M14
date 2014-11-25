/**
 * @jsx React.DOM
 */

var React = require('react');
var $ = require('jquery');
var MusicPlayer = require('./components/MusicPlayer.jsx');

React.renderComponent(
  <MusicPlayer/>,
  $('#container').get(0)
);
