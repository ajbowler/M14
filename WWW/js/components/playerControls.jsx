/** @jsx React.DOM */

var React = require('react');
var ButtonGroup = require('react-bootstrap/ButtonGroup');
var Control = require('react-bootstrap/Button');
var ButtonToolbar = require('react-bootstrap/ButtonToolbar');
var Glyphicon = require('react-bootstrap/Glyphicon');

var playerControlBar = (
  <div>
    <ButtonToolbar>
      <ButtonGroup>
        <Control bsSize="large"><Glyphicon glyph="fast-backward" /> </Control>
        <Control bsSize="large"><Glyphicon glyph="backward" /> </Control>
        <Control bsSize="large"><Glyphicon glyph="play" /> </Control>
        <Control bsSize="large"><Glyphicon glyph="pause" /> </Control>
        <Control bsSize="large"><Glyphicon glyph="forward" /> </Control>
        <Control bsSize="large"><Glyphicon glyph="fast-forward" /> </Control>
      </ButtonGroup>
    </ButtonToolbar>
  </div>
);

module.exports = playerControlBar;