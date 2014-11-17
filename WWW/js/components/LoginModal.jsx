/**
* @jsx React.DOM
*/

var React = require('react');
var Modal = require('react-bootstrap/Modal');
var ModalTrigger = require('react-bootstrap/ModalTrigger');
var UserInput = require('react-bootstrap/Input');
var ModalButton = require('react-bootstrap/Button');

var LoginModal = React.createClass({

    render: function() {
    return this.transferPropsTo(

    <Modal title="Login" backdrop={true} animation={false} >

      <div className="modal-body">

       <div className="form-group">

          <form>
            <UserInput type="text"  placeholder="TestUsername" label="Username" bsStyle="default" />

            <UserInput type="text" type="password" label="Password" bsStyle="default" />

          <ModalButton bsStyle="default" type="submit" /* onClick= TODO */>Login</ModalButton>
          </form>

        </div>
      </div>

   </Modal>
   );
 }
});

// end LoginModal

  // TODO:  Add REST request for username
var LaunchButton = React.createClass({
  render: function() {
    return (
      <ModalTrigger modal={<LoginModal />}>
        <ModalButton bsStyle="primary" bsSize="large">Login</ModalButton>
      </ModalTrigger>
    );
  }
});


module.exports = LaunchButton;
