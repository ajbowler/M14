/** @jsx React.DOM */

var React = require('react');
var $ = require('jquery');

var mpd = require('mpd');
var cmd = mpd.cmd;
var client = mpd.connect({port: 6600, host: 'localhost'});

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

module.exports = playButton;

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

module.exports = pauseButton;