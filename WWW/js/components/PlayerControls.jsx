/** @jsx React.DOM */

/* jslint browserify: true */
'use strict';

var React = require('react/addons');
var PlayButton = require('./PlayButton.jsx');
var PauseButton = require('./PauseButton.jsx');
var StopButton = require('./StopButton.jsx');
var NextButton = require('./NextButton.jsx');
var PreviousButton = require('./PreviousButton.jsx');
var ButtonGroup = require('react-bootstrap/ButtonGroup.js');


var PlayerControls = React.createClass({
  render: function() {
    return (
      /*jslint ignore: start */
      <ButtonGroup>
        <PreviousButton websocket={this.props.websocket} host={this.props.host} port={this.props.port}/>
        <PlayButton websocket={this.props.websocket} host={this.props.host} port={this.props.port}/>
        <PauseButton websocket={this.props.websocket} host={this.props.host} port={this.props.port}/>
        <StopButton websocket={this.props.websocket} host={this.props.host} port={this.props.port}/>
        <NextButton websocket={this.props.websocket} host={this.props.host} port={this.props.port}/>
      </ ButtonGroup>
      /*jslint ignore: end */
    );
  }
});

module.exports = PlayerControls;
