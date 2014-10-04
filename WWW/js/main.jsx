/**
 * @jsx React.DOM
 */

var React = require('react');
var $ = require('jquery');
var playerControlBar = require('./components/playerControls.jsx');
//Generic exmaple of pulling in react-bootstrap components, see API for more detail.
//var <react-bootstrapComponent> = require('react-bootstrap/<componentName>');

// TODO: React components go here.

React.renderComponent(playerControlBar, $('#container').get(0));