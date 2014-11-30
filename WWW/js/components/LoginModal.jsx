/**
* @jsx React.DOM
*/

var React = require('react/addons');
var $ = require('jquery');
var Modal = require('react-bootstrap/Modal');
var ModalTrigger = require('react-bootstrap/ModalTrigger');
var UserInput = require('react-bootstrap/Input');
var ModalButton = require('react-bootstrap/Button');

var LoginModal = React.createClass({
  getInitialState: function() {
    return {
      loggedIn: false
    };
  },

  updateUsername: function(e) {
    this.setState({username: $('#login_username').val()});
  },

  updatePassword: function(e) {
    this.setState({password: $('#login_password').val()});
  },

  handleLogin: function() {
    var app = this;
    var request = {
      url: 'http://proj-309-m14.cs.iastate.edu/REST/v1/test/get/0',
      // url: 'http://proj-309-m14.cs.iastate.edu/REST/v1/login/' + this.state.username,
      type: 'GET',
      contentType: 'application/json',
      cache: false,
      dataType: 'json',
      data: ''
    };

    $.ajax(request).done(function(data) {
      app.props.login(data);
    }).error(function() {
      console.log('Could not login.');
    });
  },

  render: function() {
    return this.transferPropsTo(
      <Modal title='Login' backdrop={true} animation={true} >
        <div className='modal-body'>
          <div className='form-group'>
            <form>
              <UserInput 
                type='text' 
                id='login_username' 
                placeholder='Username' 
                label='Username' 
                onChange={this.updateUsername} />
              <UserInput 
                type='text' 
                type='password' 
                id='login_password' 
                placeholder='Password' 
                label='Password' 
                onChange={this.updatePassword} />
              <ModalButton bsStyle='success' onClick={this.handleLogin}>Login</ModalButton>
            </form>
            </div>
         </div>
      </Modal>
    );
  }
});

module.exports = LoginModal;