/**
 * @jsx React.DOM
 */

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

ws.addEventListener("message", function(e) {
  // The data is simply the message that we're sending back
  var msg = e.data;

  // Append the message
  document.getElementById('ws-messages').innerHTML += '<br>' + msg;
});

var PlayButton = React.createClass({
  render: function() {
    return <Control bSize='large' id='playButton' onClick={this.play}><Glyphicon glyph='play' /> </Control>
  },

    play: function() {
    sendMessage('play');
  }
});

module.exports = PlayButton;
