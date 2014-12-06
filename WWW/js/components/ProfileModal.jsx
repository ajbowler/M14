/** @jsx React.DOM */

/* jslint browserify: true */
'use strict';

var React = require('react/addons');
var $ = require('jquery');
var Modal = require('react-bootstrap/Modal');
var TabbedArea = require('react-bootstrap/TabbedArea');
var TabPane = require('react-bootstrap/TabPane');
var ListGroup = require('react-bootstrap/ListGroup');
var ListGroupItem = require('react-bootstrap/ListGroupItem');
var UserInput = require('react-bootstrap/Input');
var ModalButton = require('react-bootstrap/Button');

var ProfileModal = React.createClass({
  propTypes: {
    username: React.PropTypes.string.isRequired,
    email: React.PropTypes.string.isRequired
  },

  updateUserInfo: function() {
    var updatedUserInfo = {
      newUserName: this.props.editUserName,
      newEmail: this.props.editEmail
    };

    var request = {
      url: 'http://proj-309-m14.cs.iastate.edu/userInfo',
      type: 'POST',
      contentType: 'application/json',
      cache: false,
      dataType: 'json',
      data: JSON.stringify(updatedUserInfo)
    };

    $.ajax(request).done(function(data) {
      this.props.username = data.newUserName;
      this.props.email = data.newEmail;
    });

    this.setState({ allowEdit: !(this.state.allowEdit)});
  },

  addConnection: function() {
    var request = {
      url: 'http://proj-309-m14.cs.iastate.edu/REST/app/createConnection',
      type: 'POST',
      contentType: 'application/json',
      cache: false,
      dataType: 'json',
      data: {
        connectionName: this.refs.connectionName.getValue(),
        mpdHost: this.refs.mpdHost.getValue(),
        mpdPort: this.refs.mpdPort.getValue(),
        mpdPass: this.refs.mpdPass.getValue(),
        streamHost: this.refs.streamHost.getValue(),
        streamPort: this.refs.streamHost.getValue(),
        streamSuffix: this.refs.streamSuffix.getValue()
      }
    };

    $.ajax(request).done(function(data) {
      // TODO Select the connection with SocketService.
      console.log(data);
    })
  },

  getInitialState: function() {
    return {
      allowEdit: false
    };
  },

  showEdit: function() {
    this.setState({ allowEdit: !(this.state.allowEdit) });
  },

  render: function() {
    return this.transferPropsTo(
    /*jslint ignore: start */
      <Modal title='Profile'
        animation={true}>
        <div className='modal-body'>
        <TabbedArea defaultActiveKey={1}>
          <TabPane key={1} tab='About Me'>
            <div>
              <div>
                <h3>Basic Info</h3>
                <a onClick={this.showEdit}>Edit</a>
              </div>
              <div>
                {this.state.allowEdit ? <EditInfo /> : null}
              </div>
              <div>
                <ListGroup>
                  <ListGroupItem>
                    <div>
                      Username: {this.props.username}
                    </div>
                  </ListGroupItem>
                  <ListGroupItem>
                    <div>
                      Email: {this.props.email}
                    </div>
                  </ListGroupItem>
                </ListGroup>
              </div>
            </div>
          </TabPane>
          <TabPane key={2} tab='MPD Connections'>
            <div>
              <h3>MPD Connections</h3>
              //TODO: list current connections to this user
            </div>
            <h3>Add New Connection</h3>
            <div className='form-group'>
          <form>
            <UserInput type='text' placeholder='Connection Name' ref='connectionHost'/>
            <UserInput type='text' placeholder='MPD Server Host' ref='mpdHost'/>
            <UserInput type='text' placeholder='MPD Server Port' ref='mpdPort'/>
            <UserInput type='password' placeholder='MPD Server Password (if required)' ref='mpdPass'/>
            <UserInput type='text' placeholder='MPD Stream Host' ref='streamHost'/>
            <UserInput type='text' placeholder='MPD Stream Port' ref='streamPort'/>
            <UserInput type='text' placeholder='MPD Stream Suffix (mpd.ogg or mpd.mp3)' value='mpd.ogg' ref='streamSuffix'/>
            <ModalButton bsStyle='success' onClick={this.addConnection}>Add Connection</ModalButton>
          </form>
        </div>
          </TabPane>
      </TabbedArea>
    </div>
        <div className='modal-footer'>
          <ModalButton bsStyle='primary' onClick={this.props.onRequestHide}>Close</ModalButton>
        </div>
      </Modal>
      /*jslint ignore: end */
    );
  }
});

var EditInfo = React.createClass({
  render: function() {
    return (
      /*jslint ignore: start */
      <div className='input-group'>
        <form>
          <UserInput type='text' className='form-control' placeholder='Name'  value={this.props.editHumanName}/>
          <UserInput type='text' className='form-control' placeholder='Username' value={this.props.editUserName}/>
          <UserInput type='text' className='form-control' placeholder='Email' value={this.props.editEmail}/>
          <ModalButton bsStyle='success' onClick={this.updateUserInfo}>Update</ModalButton>
          <br/>
          <br/>
        </form>
      </div>
    /*jslint ignore: end */
    );
  }
});

module.exports = ProfileModal;
