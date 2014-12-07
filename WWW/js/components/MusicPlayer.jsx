/** @jsx React.DOM */

/* jslint browserify: true */
'use strict';

var React = require('react/addons');
var Panel = require('react-bootstrap/Panel');
var PlayerControls = require('./PlayerControls.jsx');
var Html5AudioStreamer = require('./Html5AudioStreamer.jsx');
var StatusPanel = require('./StatusPanel.jsx');
var DropdownMenu = require('./DropdownMenu.jsx');

var ws = new WebSocket('ws://proj-309-m14.cs.iastate.edu:8007', 'echo-protocol');

var MusicPlayer = React.createClass({
  render: function() {
    return this.transferPropsTo(
      /* jshint ignore: start */
      <div id='musicplayer'>
        <div id='header'>
          <img src="images/M14.svg" alt="M(usic)14" id="logo"/>
          <DropdownMenu
            username={this.props.username}
            userID={this.props.userID}
            email={this.props.email} />
        </div>
        <Panel id='controls' className='panel-heading text-center'>
          <div>
            <PlayerControls websocket={ws}/>
          </div>
        </Panel>
        <StatusPanel websocket={ws}/>
        <Html5AudioStreamer />
      </div>
      /* jshint ignore: end */
    );
  }
});

module.exports = MusicPlayer;
