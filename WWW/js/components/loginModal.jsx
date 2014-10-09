/** @jsx React.DOM */

var React = require('react');
var Modal = require('react-bootstrap/Modal');
var ModalButton = require('react-bootstrap/Button');

function handleHide() {
  alert('Close me!');
}

var loginModal = (
    <Modal title="Modal title"
      backdrop={false}
      animation={false}
      onRequestHide={handleHide}>
      <div className="modal-body">
        One fine body...
      </div>
      <div className="modal-footer">
        <ModalButton>Close</ModalButton>
        <ModalButton bsStyle="primary">Save changes</ModalButton>
      </div>
    </Modal>
  );

module.exports = loginModal;