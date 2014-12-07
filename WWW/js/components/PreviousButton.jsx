/** @jsx React.DOM */

/* jslint browserify: true */
/* jslint devel: true */
'use strict';

var React = require('react/addons');
var Control = require('react-bootstrap/Button.js');
var Glyphicon = require('react-bootstrap/Glyphicon.js');

var PreviousButton = React.createClass({
  render: function() {
    /*jslint ignore: start */
    return <Control bSize='large' id='previousButton' onClick={this.previous}><Glyphicon glyph='step-backward' /> </Control>
    /*jslint ignore: end */
  },

  previous: function() {
    console.log('sending: previous');
    this.props.websocket.send(JSON.stringify({
      mpdCommand: 'previous',
      mpdHost: 'localhost:6600' // TODO: make this variable instead of hardcoded
    }));
  }
});

module.exports = PreviousButton;
