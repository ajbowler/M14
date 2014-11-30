/**
 * @jsx React.DOM
 */

/* jslint browserify: true */
/* jslint devel: true */
'use strict';

var React = require('react/addons');
var Control = require('react-bootstrap/Button.js');
var Glyphicon = require('react-bootstrap/Glyphicon.js');

var ws = new WebSocket('ws://localhost:8007', 'echo-protocol');
ws.addEventListener('message', function(e) {
  var msg = e.data;
  console.log(msg);
});

function sendMessage(message) {
  console.log(ws);
  ws.send(message);
  console.log('sent: ' + message);
}

var PauseButton = React.createClass({
  render: function() {
    /*jslint ignore:start */
    return <Control bSize='large' id='pauseButton' onClick={this.pause}><Glyphicon glyph='pause' /> </Control>
    /*jslint ignore:end */
  },

  pause: function() {
    sendMessage('pause');
  }
});

module.exports = PauseButton;
