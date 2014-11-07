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

var LaunchButton = (
  <ModalTrigger modal={<ProfileModal username="Andrew Bowler" />}>
    <ModalButton bsStyle="primary" bsSize="large">Profile Modal Trigger</ModalButton>
  </ModalTrigger>
);

React.renderComponent(
	<LaunchButton />
	$('#container').get(0)
);