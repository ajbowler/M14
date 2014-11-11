/**
 * @jsx React.DOM
 */

var React = require('React');
var Panel = require('react-bootstrap/Panel');
var ModalTrigger = require('react-bootstrap/ModalTrigger');
var ModalButton = require('react-bootstrap/Button');
var ProfileModal = require('./ProfileModal.jsx');

var MusicPlayer = React.createClass({
	render: function() {
		return this.transferPropsTo(
			<Panel className="panel-heading text-center" header="M(usic)14 INSERT GRAPHIC HERE">
				<div className="text-left">
					Replace this button with the dropdown
					<ModalTrigger modal={<ProfileModal username="Andrew Bowler"/>}>
						<ModalButton bsStyle="primary" bsSize="large">Profile</ModalButton>
					</ModalTrigger>
				</div>
			</Panel>
		);
	}
});

module.exports = MusicPlayer;