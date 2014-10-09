/**
 * @jsx React.DOM
 */
var React = require('react');
var $ = require('jquery');
var playerControlBar = require('./components/playerControls.jsx');
var requestButton = require('./components/requestButton.jsx');
var loginModal = require('./components/loginModal.jsx');
//Generic exmaple of pulling in react-bootstrap components, see API for more detail.
//var <react-bootstrapComponent> = require('react-bootstrap/<componentName>');

// TODO: React components go here.

React.renderComponent(playerControlBar, $('#container').get(0));
React.renderComponent(requestButton, $('#ajaxButton').get(0));