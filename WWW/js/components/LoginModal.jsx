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
      loggedIn: false
    };
  },

  updateUsername: function() {
    this.setState({username: $('#login_username').val()});
  },

  updatePassword: function() {
    this.setState({password: $('#login_password').val()});
  },

  handleLogin: function() {
    var app = this;
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
        password: this.state.password
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
                id='login_username'
                placeholder='Username'
                label='Username'
                onChange={this.updateUsername} />
              <UserInput
                type='password'
                id='login_password'
                placeholder='Password'
                label='Password'
                onChange={this.updatePassword} />
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