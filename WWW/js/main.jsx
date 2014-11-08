/**
 * @jsx React.DOM
 */

var React = require('react');
var $ = require('jquery');
var ProfileModal = require('./components/ProfileModal.jsx');
var ModalTrigger = require('react-bootstrap/ModalTrigger');
var ModalButton = require('react-bootstrap/Button');
/*var Html5AudioStreamer = require('./components/Html5AudioStreamer.jsx');
var PlayerControls = require('./components/PlayerControls.jsx');

React.renderComponent(
  <Html5AudioStreamer />,
  $('#audio').get(0)
);

React.renderComponent(
  <PlayerControls />,
  $('#playerControls').get(0)
);*/


// TODO:  Add REST request for username
var LaunchButton = React.createClass({
	render: function() {
		return (
	  <ModalTrigger modal={<ProfileModal username="Andrew Bowler" /* insert username here */ />}>
	    <ModalButton bsStyle="primary" bsSize="large">Profile</ModalButton>
	  </ModalTrigger>
	  );
	}
});

React.renderComponent(
	<LaunchButton />,
	$('#container').get(0)
);