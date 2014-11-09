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

    <Modal>

      <div className="modal-body">

       <div className="form-group">

          <form>
            <UserInput type="text"  placeholder='' label="Username" bsStyle="sucess" />
            <UserInput type="text"  placeholder='' label="Password" bsStyle="sucess" />
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
        <ModalButton bsStyle="success" bsSize="large">Login</ModalButton>
      </ModalTrigger>
    );
  }
});


module.exports = LaunchButton;
