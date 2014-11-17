/**
 * @jsx React.DOM
 */

var React = require('react/addons');
var Control = require('react-bootstrap/Button.js');
var Glyphicon = require('react-bootstrap/Glyphicon.js');

var ws = new WebSocket('ws://10.30.121.50:1234', 'echo-protocol');

function sendMessage(message) {
  ws.send(message);
}

ws.addEventListener("message", function(e) {
  // The data is simply the message that we're sending back
  var msg = e.data;

  // Append the message
  document.getElementById('ws-messages').innerHTML += '<br>' + msg;
});

var StopButton = React.createClass({
  render: function() {
    return <Control bSize='large' id='StopButton' onClick={this.stop}><Glyphicon glyph='stop' /> </Control>
  },

  stop: function() {
    sendMessage('stop');
  }
});

module.exports = StopButton;