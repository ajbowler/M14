/** @jsx React.DOM */

/* jslint browserify: true */
'use strict';

var React = require('react/addons');
var Panel = require('react-bootstrap/Panel');
var PlayerControls = require('./PlayerControls.jsx');
var Html5AudioStreamer = require('./Html5AudioStreamer.jsx');
var StatusPanel = require('./StatusPanel.jsx');
var DropdownMenu = require('./DropdownMenu.jsx');

var $ = require('jquery');

var ws = new WebSocket('ws://proj-309-m14.cs.iastate.edu:8007', 'echo-protocol');

var MusicPlayer = React.createClass({
  getInitialState: function() {
    return {
      connections: [],
      selectedConnection: 0
    };
  },

  componentDidMount: function() {
    this.getConnections();
  },

  getConnections: function() {
    $.ajax({
      url: 'http://proj-309-m14.cs.iastate.edu/REST/app/getConnections',
      type: 'POST',
      contentType: 'text/plain',
      cache: false,
      dataType: 'text',
      data: JSON.stringify({
        username: this.props.username,
        password: this.props.password
      }),
      success: function(data) {
        var dataJSON = JSON.parse(data);
        this.setState({connections: dataJSON.mpdConnections});
      }.bind(this)
    });
  },

  selectConnection: function(idx) {
    this.setState({
      selectedConnection: idx
    });
  },

  render: function() {
    var connection = this.state.connections[this.state.selectedConnection] || {};
    return (
      /* jshint ignore: start */
      <div id='musicplayer'>
        <div id='header'>
          <img src="images/M14.svg" alt="M(usic)14" id="logo"/>
          <DropdownMenu
            username={this.props.username}
            password={this.props.password}
            userID={this.props.userID}
            email={this.props.email}
            connections={this.state.connections}
            selected={this.state.selectedConnection}
            select={this.selectConnection}
            getConnections={this.getConnections}/>
        </div>
        <Panel id='controls' className='panel-heading text-center'>
          <div>
            <PlayerControls websocket={ws} host={connection.serverHost} port={connection.serverPort}/>
          </div>
        </Panel>
        <StatusPanel websocket={ws} host={connection.serverHost} port={connection.serverPort}/>
        <Html5AudioStreamer
          host={connection.streamHost}
          port={connection.streamPort}
          suffix={connection.streamSuffix}/>
      </div>
      /* jshint ignore: end */
    );
  }
});

module.exports = MusicPlayer;
