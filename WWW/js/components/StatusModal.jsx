/**
* @jsx React.DOM
*/

var React = require('react');
var Panel = require('react-bootstrap/Panel');


var ws = new WebSocket('ws://65.110.226.243:8007', 'echo-protocol');
var msg = "Getting Song Info..."

function sendMessage(message) {
  ws.send(message);
}

ws.addEventListener("message", function(e) {
  // data we're getting back
  msg = e.data;

  if(msg.indexOf("Artist: ") > -1) {
    var res1 = msg.split("Artist: ");
    var Artist = res1[1].split("\n");
  }
  else {
    var Artist = ["None"];
  }

  if(msg.indexOf("Title: ") > -1) {
    var res2 = msg.split("Title: ");
    var Title = res2[1].split("\n");
  }
  else var Title = ["None"];

  if(msg.indexOf("Album: ") > -1) {
    var res3 = msg.split("Album: ");
    var Album = res3[1].split("\n");
  }
  else var Album = ["None"];

 // var listinfo = msg.split("-");
 // var artist = listinfo[0].split("/");
  msg = "Artist: " + Artist[0] + "| \nAlbum: " + Album[0] + " | \nSong: " + Title[0];
  document.getElementById('ws-messages').innerHTML += '<br>' + msg;
});

//sendMessage('status');

var StatusModal = React.createClass({
  getInfo: function () {
    sendMessage('currentsong');
  },
  render: function() {
    return (
      <div>
        <Panel header={"Playing"} bsStyle="primary">
        {msg}
        </Panel>
        <button onClick={this.getInfo}>Get Song</button>
      </div>
    );
  }
});

module.exports = StatusModal;
