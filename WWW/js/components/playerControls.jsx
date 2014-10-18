/** @jsx React.DOM */

var React = require('react');
var $ = require('jquery');
var ButtonGroup = require('react-bootstrap/ButtonGroup');
var Control = require('react-bootstrap/Button');
var ButtonToolbar = require('react-bootstrap/ButtonToolbar');
var Glyphicon = require('react-bootstrap/Glyphicon');

var komponist = require('komponist');

var client = komponist.createConnection(6600, 'localhost', function() {
  console.log('Connected!');
});

/*var playerControlBar = (
  <div>
    <ButtonToolbar>
      <ButtonGroup>
/*        <Control bsSize="large"><Glyphicon glyph="fast-backward" /> </Control>
        <Control bsSize="large"><Glyphicon glyph="backward" /> </Control>

        <Control bsSize="large"><Glyphicon glyph="forward" /> </Control>
        <Control bsSize="large"><Glyphicon glyph="fast-forward" /> </Control>
        <Control bsSize="large" id='playButton'><Glyphicon glyph="play" /> </Control>
        <Control bsSize="large" id='pauseButton'><Glyphicon glyph="pause" /> </Control>
      </ButtonGroup>
    </ButtonToolbar>
  </div>
);*/

var playButton = React.createClass({

  render: function() {
    return <Control bsSize='large' id='playButton' onClick={this.playMusic}><Glyphicon glyph='play' /> </Control>
  },

  playMusic: function() {
    /*client.sendCommand('play[0]', function() {
      console.log('play');
    });*/
  }
});

var pauseButton = React.createClass({
  render: function() {
    return <Control bsSize='large' id='pauseButton' onClick={this.pauseMusic}><Glyphicon glyph='pause' /> </Control>
  },

  pauseMusic: function() {
   /* client.sendCommand('pause 1', function() {
      console.log('pause');
    });*/
  }
});

module.exports = playButton, pauseButton;