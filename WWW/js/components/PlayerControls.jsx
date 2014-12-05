/** @jsx React.DOM */

/* jslint browserify: true */
'use strict';

var React = require('react/addons');
var PlayButton = require('./PlayButton.jsx');
var PauseButton = require('./PauseButton.jsx');
var StopButton = require('./StopButton.jsx');
var ButtonGroup = require('react-bootstrap/ButtonGroup.js');

var PlayerControls = React.createClass({
  render: function() {
    return (
      /*jslint ignore: start */
      <ButtonGroup>
        <PlayButton />
        <PauseButton />
        <StopButton />
      </ ButtonGroup>
      /*jslint ignore: end */
    );
  }
});

module.exports = PlayerControls;
