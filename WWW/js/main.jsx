/**
 * @jsx React.DOM
 */

var React = require('react');
var $ = require('jquery');
var Html5AudioStreamer = require('./components/Html5AudioStreamer.jsx');
var PlayButton = require('./components/PlayButton.jsx');

React.renderComponent(
  <Html5AudioStreamer />,
  $('#audio').get(0)
);

React.renderComponent(
  <PlayButton />,
  $('#playButton').get(0)
);