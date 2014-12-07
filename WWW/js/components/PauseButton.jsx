/** @jsx React.DOM */

/* jslint browserify: true */
/* jslint devel: true */
'use strict';

var React = require('react/addons');
var Control = require('react-bootstrap/Button.js');
var Glyphicon = require('react-bootstrap/Glyphicon.js');

var PauseButton = React.createClass({
  render: function() {
    /*jslint ignore: start */
    return <Control bSize='large' id='pauseButton' onClick={this.pause}><Glyphicon glyph='pause' /> </Control>
    /*jslint ignore: end */
  },

  pause: function() {
    console.log('sending: pause');
    this.props.websocket.send(JSON.stringify({
      mpdCommand: 'pause',
      mpdHost: '10.30.121.50:6600' // TODO: make this variable instead of hardcoded
    }));
  }
});

module.exports = PauseButton;
