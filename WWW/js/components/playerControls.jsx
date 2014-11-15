/** @jsx React.DOM */

var React = require('react');
var PlayButton = require('./PlayButton.jsx');
var PauseButton = require('./PauseButton.jsx');
var StopButton = require('./StopButton.jsx');
var ButtonGroup = require('react-bootstrap/ButtonGroup.js');

var PlayerControls = React.createClass({
	render: function() {
		return (
			<ButtonGroup>
				<PlayButton />
				<PauseButton />
        <StopButton />
			</ ButtonGroup>
		);
	}
});

module.exports = PlayerControls;