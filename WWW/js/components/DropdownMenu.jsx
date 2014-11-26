/**
* @jsx React.DOM
*/

var React = require('react/addons');
var Modal = require('react-bootstrap/Modal');
var DropdownButton = require('react-bootstrap/DropdownButton.js');
var ProfileModal = require('./ProfileModal.jsx');
var MenuItem = require('react-bootstrap/MenuItem.js');
var ModalTrigger = require('react-bootstrap/ModalTrigger.js');
var Glyphicon = require('react-bootstrap/Glyphicon.js');

var cogGlyph = React.createClass({
  render: function(){
    return <Glyphicon glyph = 'cog' />
  }
});

var DropdownMenu = React.createClass({
  render: function() {
    return (
      <div className='pull-right'>
        <DropdownButton title = {<cogGlyph />} pullRight>
          <ModalTrigger modal={<ProfileModal 
            humanName='Andrew Bowler' 
            username='ajbowler' 
            email='ajbowler@iastate.edu'/>}>
            <MenuItem id='profile'>Profile</MenuItem>
          </ModalTrigger>
          </DropdownButton>
      </div>
    );
  }
});

module.exports = DropdownMenu;
