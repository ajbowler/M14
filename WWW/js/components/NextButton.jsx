/**
 * @jsx React.DOM
 */

var React = require('react/addons');
var Control = require('react-bootstrap/Button.js');
var Glyphicon = require('react-bootstrap/Glyphicon.js');

var ws = new WebSocket('ws://65.110.226.243:1234', 'echo-protocol');

function sendMessage(message) {
  ws.send(message);
}

ws.addEventListener("message", function(e) {
  // The data is simply the message that we're sending back
  var msg = e.data;

  // Append the message
  // document.getElementById('ws-messages').innerHTML += '<br>' + msg;
});

var PlayButton = React.createClass({
  render: function() {
    return <Control bSize='large' id='playButton' onClick={this.play}><Glyphicon glyph='step-forward' /> </Control>
  },

    play: function() {
    sendMessage('next');
  }
});

module.exports = PlayButton;
