/**
 * @jsx React.DOM
 */

var React = require('react');
var $ = require('jquery');
var MusicPlayer = require('./components/MusicPlayer.jsx');
/*var Html5AudioStreamer = require('./components/Html5AudioStreamer.jsx');
var PlayerControls = require('./components/PlayerControls.jsx');
React.renderComponent(
  <Html5AudioStreamer />,
  $('#audio').get(0)
);
React.renderComponent(
  <PlayerControls />,
  $('#playerControls').get(0)
);*/

React.renderComponent(
  <MusicPlayer />,
  $('#container').get(0)
);