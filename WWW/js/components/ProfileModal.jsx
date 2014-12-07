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

  getInitialState: function() {
    return {
      mpdHost: '',
      mpdPort: '',
      mpdPass: '',
      streamHost: '',
      streamPort: '',
      streamSuffix: '',
      showNewConnectionForm: false
    };
  },

  addConnection: function() {
    var request = {
      url: 'http://proj-309-m14.cs.iastate.edu/REST/app/createConnection',
      type: 'POST',
      contentType: 'application/json',
      cache: false,
      dataType: 'json',
      data: {
        connectionName: this.state.connectionName,
        mpdHost: this.state.mpdHost,
        mpdPort: this.state.mpdPort,
        mpdPass: this.state.mpdPass,
        streamHost: this.state.streamHost,
        streamPort: this.state.streamPort,
        streamSuffix: this.state.streamSuffix
      }
    };

    $.ajax(request).done(function(data) {
      // TODO Select the connection with SocketService.
      console.log(data);
    });
  },

  updateFields: function() {
    this.setState({
      connectionName: this.refs.connectionName.getValue(),
      mpdHost: this.refs.mpdHost.getValue(),
      mpdPort: this.refs.mpdPort.getValue(),
      mpdPass: this.refs.mpdPass.getValue(),
      streamHost: this.refs.streamHost.getValue(),
      streamPort: this.refs.streamHost.getValue(),
      streamSuffix: this.refs.streamSuffix.getValue()
    });
  },

  showConnectionForm: function() {
    this.setState({showNewConnectionForm: !(this.state.showNewConnectionForm)});
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
            <ModalButton 
              bsStyle='link' 
              onClick={this.showConnectionForm}>
              Add New Connection
            </ModalButton>
            {this.state.showNewConnectionForm ? <NewConnection /> : null}
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

var NewConnection = React.createClass({
  render: function() {
    return (
      /*jslint ignore: start */
      <div>
        <h3>Add New Connection</h3>
        <div className='form-group'>
          <form>
            <UserInput type='text' placeholder='Connection Name' ref='connectionHost' onChange={this.updateFields}/>
            <UserInput type='text' placeholder='MPD Server Host' ref='mpdHost' onChange={this.updateFields}/>
            <UserInput type='text' placeholder='MPD Server Port' ref='mpdPort' onChange={this.updateFields}/>
            <UserInput type='password' placeholder='MPD Server Password (if required)' ref='mpdPass' onChange={this.updateFields}/>
            <UserInput type='text' placeholder='MPD Stream Host' ref='streamHost' onChange={this.updateFields}/>
            <UserInput type='text' placeholder='MPD Stream Port' ref='streamPort' onChange={this.updateFields}/>
            <UserInput type='text' placeholder='MPD Stream Suffix (mpd.ogg or mpd.mp3)' value='mpd.ogg' ref='streamSuffix' onChange={this.updateFields}/>
            <ModalButton bsStyle='success' onClick={this.addConnection}>Add Connection</ModalButton>
          </form>
        </div>
      </div>
      /*jslint ignore: end */
    );
  }
});

module.exports = ProfileModal;