/** @jsx React.DOM */

var React = require('react');
var ButtonGroup = require('react-bootstrap/ButtonGroup');
var butan = require('react-bootstrap/Button');
var ButtonToolbar = require('react-bootstrap/ButtonToolbar');
var Glyphicon = require('react-bootstrap/Glyphicon');

var playerControlBar = (
  <div>
    <ButtonToolbar>
      <ButtonGroup>
        <butan bsSize="large"><Glyphicon glyph="fast-backward" /> </butan>
        <butan bsSize="large"><Glyphicon glyph="backward" /> </butan>
        <butan bsSize="large"><Glyphicon glyph="play" /> </butan>
        <butan bsSize="large"><Glyphicon glyph="pause" /> </butan>
        <butan bsSize="large"><Glyphicon glyph="forward" /> </butan>
        <butan bsSize="large"><Glyphicon glyph="fast-forward" /> </butan>
      </ButtonGroup>
    </ButtonToolbar>
  </div>
);

module.exports = playerControlBar;