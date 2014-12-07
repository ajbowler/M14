/** @jsx React.DOM */

/* jslint browserify: true */
/* jslint devel: true */
'use strict';

var React = require('react/addons');
var Control = require('react-bootstrap/Button.js');
var Glyphicon = require('react-bootstrap/Glyphicon.js');

var StopButton = React.createClass({
  render: function() {
    /*jslint ignore: start */
    return <Control bSize='large' id='stopButton' onClick={this.stop}><Glyphicon glyph='stop' /> </Control>
    /*jslint ignore: end */
  },

  stop: function() {
    console.log('sending: stop to ' + this.props.host + ':' + this.props.port);
    this.props.websocket.send(JSON.stringify({
      mpdCommand: 'stop',
      mpdHost: this.props.host + ':' + this.props.port
    }));
  }
});

module.exports = StopButton;
