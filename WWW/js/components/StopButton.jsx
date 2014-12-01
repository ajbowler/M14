/**
 * @jsx React.DOM
 */

/* jslint browserify: true */
/* jslint devel: true */
'use strict';

var React = require('react/addons');
var Control = require('react-bootstrap/Button.js');
var Glyphicon = require('react-bootstrap/Glyphicon.js');

var ws = new WebSocket('ws://proj-309-M14.cs.iastate.edu:8007', 'echo-protocol');
ws.addEventListener('message', function(e) {
  var msg = e.data;
  console.log(msg);
});

function sendMessage(message) {
  console.log(ws);
  ws.send(message);
  console.log('sent: ' + message);
}

var StopButton = React.createClass({
  render: function() {
    /* jslint ignore: start */
    return <Control bSize='large' id='StopButton' onClick={this.stop}><Glyphicon glyph='stop' /> </Control>
    /* jslint ignore: end */
  },

  stop: function() {
    sendMessage('stop');
  }
});

module.exports = StopButton;
