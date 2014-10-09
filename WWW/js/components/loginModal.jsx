/** @jsx React.DOM */

var React = require('react');
var Modal = require('react-bootstrap/Modal');
var userInput = require('react-bootstrap/Input');
var ModalButton = require('react-bootstrap/Button');

function handleHide() {
  alert('Close me!');
}

var loginModal = (
    <Modal title="Login or Register"
      backdrop={false}
      animation={false}
      onRequestHide={handleHide}>
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

module.exports = loginModal;