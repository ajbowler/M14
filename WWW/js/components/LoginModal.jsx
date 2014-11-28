/**
* @jsx React.DOM
*/

var React = require('react/addons');
var Modal = require('react-bootstrap/Modal');
var ModalTrigger = require('react-bootstrap/ModalTrigger');
var UserInput = require('react-bootstrap/Input');
var ModalButton = require('react-bootstrap/Button');

var LoginModal = React.createClass({
  propTypes: {
    username: React.PropTypes.string,
    email: React.PropTypes.string,
    joinDate: React.PropTypes.string,
    userID: React.PropTypes.string
  },

  getInitialState: function() {
    return {
      loggedIn: false
    };
  },

  handleLogin: function() {
    var request = {
      url: "http://proj-309-m14.cs.iastate.edu:8080:/login",
      type: "GET",
      contentType: "application/json",
      cache: false,
      dataType: "json",
      data: ""
    };

    $.get(request, function(result) {
      var userInfo = JSON.parse(result);
      this.props.username = userInfo.username;
      this.props.email = userInfo.email;
      this.props.joinDate = userInfo.joinDate;
    });

    this.setState({ loggedIn: true});
  },

  render: function() {
    return this.transferPropsTo(
      <Modal title='Login' backdrop={true} animation={false} >
        <div className='modal-body'>
          <div className='form-group'>
            <form>
              <UserInput type='text'  placeholder='Username' label='Username' />
              <UserInput type='text' type='password' placeholder='Password' label='Password' />
              <ModalButton bsStyle='success' onClick={this.handleLogin}>Login</ModalButton>
            </form>
            </div>
         </div>
      </Modal>
    );
  }
});

module.exports = LoginModal;