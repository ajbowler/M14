/** @jsx React.DOM */

/* jslint browserify: true */
'use strict';

var React = require('react/addons');
var $ = require('jquery');
var Modal = require('react-bootstrap/Modal');
var ModalTrigger = require('react-bootstrap/ModalTrigger');
var UserInput = require('react-bootstrap/Input');
var ModalButton = require('react-bootstrap/Button');
var ButtonToolbar = require('react-bootstrap/ButtonToolbar');
var Alert = require('react-bootstrap/Alert');

var LoginModal = React.createClass({
  getInitialState: function() {
    return {
      loggedIn: false,
      loginFailed: false,
      registerFailed: false,
      username: '',
      password: '',
      email: '',
      errorMessage: ''
    };
  },

  updateFields: function() {
    this.setState({
      username: this.refs.username.getValue(),
      password: this.refs.password.getValue(),
      email: this.refs.email.getValue()
    });
  },

  showLoginFailed: function() {
    this.setState({
      loginFailed: !(this.state.loginFailed),
      errorMessage: 'Unable to login, empty headed animal food trough wiper!'
    });
  },

  showRegisterFailed: function() {
    this.setState({
      registerFailed: !(this.state.registerFailed),
      errorMessage: 'Could not register, silly goose!'
    });
  },

  handleLogin: function() {
    var app = this;
    var request = {
      url: 'http://proj-309-M14.cs.iastate.edu/REST/app/login',
      type: 'POST',
      contentType: 'text/plain',
      cache: false,
      data: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    };

    $.ajax(request).done(function(data) {
      app.props.login(data);
    }).error(function() {
      app.showLoginFailed();
    });
  },

  handleRegister: function() {
    var app = this;
    var request = {
      url: 'http://proj-309-M14.cs.iastate.edu/REST/app/createUsr',
      type: 'POST',
      contentType: 'text/plain',
      cache: false,
      data: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        email: this.state.email
      })
    };

    $.ajax(request).done(function(data) {
      // Now that the user is registered, log them in.
      data.password = this.state.password;
      app.props.login(data);
    }).error(function() {
      app.showRegisterFailed();
    });
  },

  render: function() {
    return this.transferPropsTo(
      /*jslint ignore: start */
      <Modal title='Login' backdrop={true} animation={true} >
        <div className='modal-body'>
          {this.state.loginFailed ? <AuthError message={this.state.errorMessage} /> : null}
          {this.state.registerFailed ? <AuthError message={this.state.errorMessage} /> : null}
          <div className='form-group'>
            <form>
              <UserInput
                type='text'
                ref='username'
                placeholder='Username'
                label='Username'
                value={this.state.username}
                onChange={this.updateFields} />
              <UserInput
                type='password'
                ref='password'
                placeholder='Password'
                label='Password'
                value={this.state.password}
                onChange={this.updateFields} />
              <UserInput
                type='text'
                ref='email'
                placeholder='Email'
                label='Email (when registering only)'
                value={this.state.email}
                onChange={this.updateFields} />
              <ButtonToolbar>
                <ModalButton bsStyle='success' onClick={this.handleLogin}>Login</ModalButton>
                <ModalButton bsStyle='link' onClick={this.handleRegister}>Register</ModalButton>
              </ButtonToolbar>
            </form>
            </div>
         </div>
      </Modal>
      /*jslint ignore: end */
    );
  }
});

var AuthError = React.createClass({
  render: function() {
    /* jslint ignore: start */
    return <Alert bsStyle='danger'><strong>{this.props.message}!</strong></Alert>
    /* jslint ignore: end */
  }
});

module.exports = LoginModal;
