/** @jsx React.DOM */

/* jslint browserify: true */
'use strict';

var React = require('react/addons');
var Modal = require('react-bootstrap/Modal');
var DropdownButton = require('react-bootstrap/DropdownButton.js');
var ProfileModal = require('./ProfileModal.jsx');
var MenuItem = require('react-bootstrap/MenuItem.js');
var ModalTrigger = require('react-bootstrap/ModalTrigger.js');
var Glyphicon = require('react-bootstrap/Glyphicon.js');

var cogGlyph = React.createClass({
  render: function(){
    /*jslint ignore: start */
    return <Glyphicon glyph = 'cog' />
    /*jslint ignore: end */
  }
});

var DropdownMenu = React.createClass({
  render: function() {
    return (
      /*jslint ignore: start */
      <div className='pull-right'>
        <DropdownButton title = {<cogGlyph />} pullRight>
          <ModalTrigger modal={
            <ProfileModal
              username={this.props.username}
              email={this.props.email}
              connections={this.props.connections}
              selected={this.props.selected}
              select={this.props.select}/>
            }>
            <MenuItem id='profile'>Profile</MenuItem>
          </ModalTrigger>
          </DropdownButton>
      </div>
      /*jslint ignore: end */
    );
  }
});

module.exports = DropdownMenu;
