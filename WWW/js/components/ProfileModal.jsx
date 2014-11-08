/**
 * @jsx React.DOM
 */

var React = require('React');
var Modal = require('react-bootstrap/Modal');
var UserInput = require('react-bootstrap/Input');
var ModalButton = require('react-bootstrap/Button');

var ProfileModal = React.createClass({
	render: function() {
		return this.transferPropsTo(
			<Modal title={this.props.username}
				animation={true}>
				<div className="modal-body">
					<div className="form-group">
		        <form>
		        	<UserInput type="text" placeholder="Connection Name"/>
		          <UserInput type="text" placeholder="MPD Server Host"/>
		          <UserInput type="password" placeholder="MPD Server Password (if required)"/>
		          <ModalButton bsStyle="success" type="submit" /* onClick= TODO */>Add Connection</ModalButton>
		        </form>
	        </div>
      	</div>
				<div className="modal-footer">
					<ModalButton bsStyle="primary" onClick={this.props.onRequestHide}>Close</ModalButton>
				</div>
			</Modal>
		);
	}
});

module.exports = ProfileModal;