/** @jsx React.DOM */

/* jslint browserify: true */
/* jslint devel: true */
'use strict';

var React = require('react/addons');
var Control = require('react-bootstrap/Button.js');
var Glyphicon = require('react-bootstrap/Glyphicon.js');

var PlayButton = React.createClass({
  render: function() {
    /*jslint ignore: start */
    return <Control bSize='large' id='playButton' onClick={this.play}><Glyphicon glyph='play' /> </Control>
    /*jslint ignore: end */
  },

  play: function() {
    console.log('sending: play');
    this.props.websocket.send(JSON.stringify({
      mpdCommand: 'play',
      mpdHost: 'localhost:6600' // TODO: make this variable instead of hardcoded
    }));
  }
});

module.exports = PlayButton;
