/** @jsx React.DOM */

/* jslint browserify: true */
/* jslint devel: true */
'use strict';

var React = require('react/addons');
var Control = require('react-bootstrap/Button.js');
var Glyphicon = require('react-bootstrap/Glyphicon.js');

var ws = new WebSocket('ws://proj-309-m14.cs.iastate.edu:8007', 'echo-protocol');

ws.onmessage = function(e) {
  console.log(e.data);
};

var PlayButton = React.createClass({
  render: function() {
    /*jslint ignore: start */
    return <Control bSize='large' id='playButton' onClick={this.play}><Glyphicon glyph='play' /> </Control>
    /*jslint ignore: end */
  },

  play: function() {
    console.log(ws);
    console.log('sending: play');
    ws.send(JSON.stringify({
      mpdCommand: 'play',
      mpdHost: 'localhost:6600' // TODO: make this variable instead of hardcoded
    }));
  }
});

module.exports = PlayButton;
