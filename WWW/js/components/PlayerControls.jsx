/** @jsx React.DOM */

/* jslint browserify: true */
'use strict';

var React = require('react/addons');
var PlayButton = require('./PlayButton.jsx');
var PauseButton = require('./PauseButton.jsx');
var StopButton = require('./StopButton.jsx');
var NextButton = require('./NextButton.jsx');
var ButtonGroup = require('react-bootstrap/ButtonGroup.js');


var PlayerControls = React.createClass({
  render: function() {
    return (
      /*jslint ignore: start */
      <ButtonGroup>
        <PlayButton websocket={this.props.websocket}/>
        <PauseButton websocket={this.props.websocket}/>
        <StopButton websocket={this.props.websocket}/>
        <NextButton websocket={this.props.websocket}/>
      </ ButtonGroup>
      /*jslint ignore: end */
    );
  }
});

module.exports = PlayerControls;
