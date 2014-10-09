/** @jsx React.DOM */

var React = require('react');
var Modal = require('react-bootstrap/Modal');
var userInput = require('react-bootstrap/Input');
var ModalButton = require('react-bootstrap/Button');
var ModalTrigger = require('react-bootstrap/ModalTrigger');

var MyModal = React.createClass({
  render: function() {
    return this.transferPropsTo(
      <Modal title="Login or Register"
        backdrop={false}
        animation={false}
      >
      <div className="modal-body">
        <form>
          <userInput type="text" placeholder='Username'/>
          <userInput type="password" placeholder='Password'/>
        </form>
      </div>
      <div className="modal-footer">
        <ModalButton bsStyle='primary'>Login</ModalButton>
        <ModalButton bsStyle='primary'>Register New User</ModalButton>
      </div>
    </Modal>
      );
  }
});

var launchButton = (
    <ModalTrigger modal={<MyModal />}>
      <ModalButton bsStyle="primary" bsSize="large">Login Module Trigger</ModalButton>
    </ModalTrigger>
  );

module.exports = launchButton;