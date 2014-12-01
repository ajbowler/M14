/** @jsx React.DOM */

var React = require('react/addons');
var PlayButton = require('./PlayButton.jsx');
var PauseButton = require('./PauseButton.jsx');
var StopButton = require('./StopButton.jsx');
var NextButton = require('./NextButton.jsx');
var ButtonGroup = require('react-bootstrap/ButtonGroup.js');


var PlayerControls = React.createClass({
  render: function() {
    return (
      <ButtonGroup>
        <PlayButton />
        <PauseButton />
        <StopButton />
        <NextButton />
      </ ButtonGroup>
    );
  }
});

module.exports = PlayerControls;
