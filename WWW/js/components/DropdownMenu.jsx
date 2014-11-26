/**
* @jsx React.DOM
*/

var React = require('react');
var Modal = require('react-bootstrap/Modal');
var ModalButton = require('react-bootstrap/Button');
var ButtonGroup = require('react-bootstrap/ButtonGroup.js');
var DropdownButton = require('react-bootstrap/DropdownButton.js');
var ProfileModal = require('./ProfileModal.jsx');
var MenuItem = require('react-bootstrap/MenuItem.js')
var ModalTrigger = require('react-bootstrap/ModalTrigger.js')
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
            <ModalButton id='profile'>Profile</ModalButton>
          </ModalTrigger>
          </DropdownButton>
      </div>
    );
  }
});

module.exports = DropdownMenu;
