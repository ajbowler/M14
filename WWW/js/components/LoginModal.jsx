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
  getDefaultProps: function() {
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
    var request = {
      url: 'http://proj-309-m14.cs.iastate.edu:8080/REST/v1/test/get/0',
      type: 'GET',
      contentType: 'application/json',
      cache: false,
      dataType: 'json',
      // data: {
      //   username: this.state.username, 
      //   password: this.state.password
      // }
      data: ''
    };

    console.log(request.data);

    $.ajax(request).done(function(data) {
      console.log(data);
      this.props.login(true);
    }).error(function() {
      console.log('error');
    });

    this.props.login(true);
  },

  render: function() {
    return this.transferPropsTo(
      <Modal title='Login' backdrop={true} animation={false} >
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