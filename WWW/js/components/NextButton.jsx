/** @jsx React.DOM */

/* jslint browserify: true */
/* jslint devel: true */
'use strict';

var React = require('react/addons');
var Control = require('react-bootstrap/Button.js');
var Glyphicon = require('react-bootstrap/Glyphicon.js');

var NextButton = React.createClass({
  render: function() {
    /*jslint ignore: start */
    return <Control bSize='large' id='NextButton' onClick={this.next}><Glyphicon glyph='step-forward' /> </Control>
    /*jslint ignore: end */
  },

  next: function() {
    console.log('sending: next');
    this.props.websocket.send(JSON.stringify({
      mpdCommand: 'next',
      mpdHost: '10.30.121.50:6600' // TODO: make this variable instead of hardcoded
    }));
  }
});

module.exports = NextButton;
