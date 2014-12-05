/** @jsx React.DOM */

/* jslint browserify: true */
'use strict';

var React = require('react/addons');
var Panel = require('react-bootstrap/Panel');
var PlayerControls = require('./PlayerControls.jsx');
var Html5AudioStreamer = require('./Html5AudioStreamer.jsx');
var StatusModal = require('./StatusModal.jsx');
var DropdownMenu = require('./DropdownMenu.jsx');

var MusicPlayer = React.createClass({
  render: function() {
    return this.transferPropsTo(
      /* jshint ignore: start */
      <div>
        <div>
          <img src="images/M14.svg" alt="M(usic)14" id="logo"/>
          <DropdownMenu
            username={this.props.username}
            userID={this.props.userID}
            email={this.props.email} />
        </div>
        <Panel className='panel-heading text-center'>
          <div>
            <PlayerControls />
          </div>
        </Panel>
        <Html5AudioStreamer />
        <StatusModal />
      </div>
      /* jshint ignore: end */
    );
  }
});

module.exports = MusicPlayer;
