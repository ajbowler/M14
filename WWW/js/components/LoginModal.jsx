/** @jsx React.DOM */

/* jslint browserify: true */
'use strict';

/* jslint browserify: true */
/* jslint devel: true */
'use strict';

var React = require('react/addons');
var $ = require('jquery');
var Modal = require('react-bootstrap/Modal');
var ModalTrigger = require('react-bootstrap/ModalTrigger');
var UserInput = require('react-bootstrap/Input');
var ModalButton = require('react-bootstrap/Button');
var ButtonToolbar = require('react-bootstrap/ButtonToolbar');

var LoginModal = React.createClass({
  getInitialState: function() {
    return {
      loggedIn: false,
      username: '',
      password: '',
      email: ''
    };
  },

  updateFields: function() {
    this.setState({
      username: this.refs.username.getValue(),
      password: this.refs.password.getValue(),
      email: this.refs.email.getValue()
    });
  },

  handleLogin: function() {
    var app = this;
    var u = this.state.username;
    var p = this.state.password;
    var e = this.state.email;
    console.log(u);
    console.log(p);
    console.log(e);
    var request = {
      url: 'http://proj-309-m14.cs.iastate.edu/REST/app/login',
      type: 'POST',
      contentType: 'application/json',
      cache: false,
      dataType: 'json',
      data: {
        username: this.state.username,
        password: this.state.password
      }
    };

    console.log(request.data);

    $.ajax(request).done(function(data) {
      app.props.login(data);
    }).error(function() {
      console.log('Could not login.'); // TODO: handle incorrect login by rendering an error message
    });
  },

  handleRegister: function() {
    var app = this;
    var request = {
      url: 'http://proj-309-m14.cs.iastate.edu/REST/app/createUsr',
      type: 'POST',
      contentType: 'application/json',
      cache: false,
      dataType: 'json',
      data: {
        username: this.state.username,
        password: this.state.password,
        email: this.state.email
      }
    };

    $.ajax(request).done(function(data) {
      // Now that the user is registered, log them in.
      app.props.login(data);
    }).error(function() {
      console.log('Could not register.');
    });
  },

  render: function() {
    return this.transferPropsTo(
      /*jslint ignore: start */
      <Modal title='Login' backdrop={true} animation={true} >
        <div className='modal-body'>
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

module.exports = LoginModal;