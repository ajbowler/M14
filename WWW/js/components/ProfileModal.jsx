/**
 * @jsx React.DOM
 */

var React = require('React');
var Modal = require('react-bootstrap/Modal');
var ModalTrigger = require('react-bootstrap/ModalTrigger');
var TabbedArea = require('react-bootstrap/TabbedArea');
var TabPane = require('react-bootstrap/TabPane');
var ListGroup = require('react-bootstrap/ListGroup');
var ListGroupItem = require('react-bootstrap/ListGroupItem');
var UserInput = require('react-bootstrap/Input');
var ModalButton = require('react-bootstrap/Button');

var ProfileModal = React.createClass({
	addConnection: function() {
	// TODO
	},

	render: function() {
		return this.transferPropsTo(
			<Modal title="Profile"
				animation={true}>
				<div className="modal-body">
				<TabbedArea defaultActiveKey={1}>
					<TabPane key={1} tab="About Me">
						<div>
							<h3>Basic Info</h3>
							<ListGroup>
								<ListGroupItem>Name: {this.props.humanName}</ListGroupItem>
								<ListGroupItem>Username: {this.props.username}</ListGroupItem>
								<ListGroupItem>Email: {this.props.email}</ListGroupItem>
							</ListGroup>
						</div>
					</TabPane>
					<TabPane key={2} tab="MPD Connections">
						<div>
							<h3>MPD Connections</h3>
							//TODO: list current connections to this user
						</div>
						<h3>Add New Connection</h3>
						<div className="form-group">
			        <form>
			        	<UserInput type="text" placeholder="Connection Name"/>
			          <UserInput type="text" placeholder="MPD Server Host"/>
			          <UserInput type="password" placeholder="MPD Server Password (if required)"/>
			          <ModalButton bsStyle="success" type="submit" onClick={this.addConnection}>Add Connection</ModalButton>
			        </form>
	        	</div>
					</TabPane>
	      </TabbedArea>
      	</div>
				<div className="modal-footer">
					<ModalButton bsStyle="primary" onClick={this.props.onRequestHide}>Close</ModalButton>
				</div>
			</Modal>
		);
	}
});

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

module.exports = LaunchButton;