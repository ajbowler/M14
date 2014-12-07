/** @jsx React.DOM */

/* jslint browserify: true */
/* jslint devel: true */
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
var Panel = require('react-bootstrap/Panel');
var Accordion = require('react-bootstrap/Accordion');

var ModalScrollFixMixin = {
  componentDidMount: function() {
    if (document && document.body) {
      var orig = document.body.className;
      document.body.className = orig + (orig ? ' ' : '') + 'modal-open';
    }
  },
  componentWillUnmount: function() {
    if (document && document.body) {
      document.body.className = document.body.className.replace(/ ?modal-open/, '');
    }
  }
};

var ProfileModal = React.createClass({
  mixins: [ModalScrollFixMixin],

  propTypes: {
    username: React.PropTypes.string.isRequired,
    email: React.PropTypes.string.isRequired,
    select: React.PropTypes.func.isRequired
  },

  getInitialState: function() {
    return {
      showNewConnectionForm: false,
      selectedConnection: this.props.selected
    };
  },

  showConnectionForm: function() {
    this.setState({showNewConnectionForm: !(this.state.showNewConnectionForm)});
  },

  selectConnection: function(connection, idx) {
    this.props.select(idx);
    this.setState({
      mpdHost: connection.serverHost,
      mpdPort: connection.serverPort,
      mpdPass: connection.serverPass,
      streamHost: connection.streamHost,
      streamPort: connection.streamPort,
      streamSuffix: connection.streamSuffix,
      selectedConnection: idx
    });
  },

  render: function() {
    return (
    /*jslint ignore: start */
      <Modal title='Profile'
        animation={true}
        className='modal-scrollable'>
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
              <Accordion>
                {this.props.connections.map(function(connection, idx) {
                  return (
                    <Connection
                      onClick={this.selectConnection.bind(null, connection, idx)}
                      connection={connection}
                      index={idx}
                      selected={this.state.selectedConnection}
                    />
                  );
                }.bind(this))}
              </Accordion>
            </div>
            <ModalButton bsStyle='link' onClick={this.showConnectionForm}>
              Add New Connection
            </ModalButton>
            {this.state.showNewConnectionForm ? <NewConnection username={this.props.username} /> : null}
          </TabPane>
      </TabbedArea>
    </div>
        <div className='modal-footer'>
          <ModalButton bsStyle='primary' onClick={this.props.onRequestHide}>
            Close
          </ModalButton>
        </div>
      </Modal>
      /*jslint ignore: end */
    );
  }
});

var NewConnection = React.createClass({
  addConnection: function() {

    console.log(this.props);

    var request = {
      url: 'http://proj-309-m14.cs.iastate.edu/REST/app/createConnection',
      type: 'POST',
      contentType: 'text/plain',
      cache: false,
      dataType: 'text',
      data: JSON.stringify({
        username: this.props.username,
        connectionName: this.refs.connectionName.getValue(),
        serverHost: this.refs.serverHost.getValue(),
        serverPort: this.refs.serverPort.getValue(),
        serverPass: this.refs.serverPass.getValue(),
        streamHost: this.refs.streamHost.getValue(),
        streamPort: this.refs.streamPort.getValue(),
        streamSuffix: this.refs.streamSuffix.getValue()
      })
    };

    request.success = function(e) {
      // TODO: make this a success alert rather than a log
      console.log('success');
      console.log(e);
    };

    request.error = function(e) {
      // TODO: make this an error alert rather than a log
      console.log('error');
      console.log(e);
    };

    $.ajax(request);
  },

  render: function() {
    return (
      /*jslint ignore: start */
      <div>
        <h3>Add New Connection</h3>
        <div className='form-group'>
          <form>
            <UserInput type='text' placeholder='Connection Name' ref='connectionName'/>
            <UserInput type='text' placeholder='MPD Server Host' ref='serverHost'/>
            <UserInput type='text' placeholder='MPD Server Port' ref='serverPort'/>
            <UserInput type='password' placeholder='MPD Server Password (if required)' ref='serverPass'/>
            <UserInput type='text' placeholder='MPD Stream Host' ref='streamHost'/>
            <UserInput type='text' placeholder='MPD Stream Port' ref='streamPort'/>
            <UserInput type='text' placeholder='MPD Stream Suffix (mpd.ogg or mpd.mp3)' value='mpd.ogg' ref='streamSuffix'/>
            <ModalButton bsStyle='success' onClick={this.addConnection}>Add Connection</ModalButton>
          </form>
        </div>
      </div>
      /*jslint ignore: end */
    );
  }
});

var Connection = React.createClass({
  propTypes: {
    connection: React.PropTypes.object.isRequired,
    index: React.PropTypes.number.isRequired,
    selected: React.PropTypes.number.isRequired,
    onClick: React.PropTypes.func.isRequired
  },
  render: function() {
    var connection = this.props.connection;
    var index = this.props.index;
    var style = this.props.selected === index ? 'primary' : 'info';
    return (
      /*jslint ignore: start */
      <Panel bsStyle={style} header={connection.connectionName} eventKey={index + 1}>
        MPD Server Host: {connection.serverHost}<br/>
        MPD Server Port: {connection.serverPort}<br/>
        MPD Server Pass: {connection.serverPass}<br/>
        Audio Stream Host: {connection.streamHost}<br/>
        Audio Stream Port: {connection.streamPort}<br/>
        Audio Stream Suffix: {connection.streamSuffix}<br/>
        <ModalButton onClick={this.props.onClick}>Select</ModalButton>
      </Panel>
      /*jslint ignore: end */
    );
  }
});

module.exports = ProfileModal;
