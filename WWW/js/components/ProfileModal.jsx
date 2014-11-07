/**
 * @jsx React.DOM
 */

var React = require('React');
var Modal = require('react-bootstrap/Modal');
var ModalTrigger = require('react-bootstrap/ModalTrigger');
var ModalButton = require('react-bootstrap/Button');

var ProfileModal = React.createClass({
	render: function() {
		return this.transferPropsTo(
			<Modal title={this.props.username}
				animation={false}>
				<div>
					Stuff goes here!
				</div>
				<div className="modal-footer">
					<ModalButton bsStyle="primary" onClick={this.props.onRequestHide}>Close</ModalButton>
				</div>
			</Modal>
		);
	}
});

var LaunchButton = (
  <ModalTrigger modal={<ProfileModal username="Andrew Bowler" />}>
    <ModalButton bsStyle="primary" bsSize="large">Profile Modal Trigger</ModalButton>
  </ModalTrigger>
);

module.exports = LaunchButton;