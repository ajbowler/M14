/**
 * @jsx React.DOM
 */

var React = require('react/addons');
var Panel = require('react-bootstrap/Panel');
var ModalTrigger = require('react-bootstrap/ModalTrigger');
var ModalButton = require('react-bootstrap/Button');
var ProfileModal = require('./ProfileModal.jsx');
var PlayerControls = require('./PlayerControls.jsx');

var MusicPlayer = React.createClass({
  render: function() {
    return this.transferPropsTo(
      <div>
        <div>
          <ModalTrigger modal={<ProfileModal 
            humanName="Andrew Bowler" 
            username="ajbowler" 
            email="ajbowler@iastate.edu"/>}>
            <ModalButton bsStyle="primary" bsSize="large">Profile</ModalButton>
          </ModalTrigger>
          Replace this button with the dropdown
        </div>
        <Panel className="panel-heading text-center" header="M(usic)14 INSERT GRAPHIC HERE">
          <div>
            <PlayerControls />
          </div>
        </Panel>
      </div>
    );
  }
});

module.exports = MusicPlayer;