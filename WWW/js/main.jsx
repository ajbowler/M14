/**
 * @jsx React.DOM
 */
var React = require('react');
var $ = require('jquery');
var playerControls = require('./components/playerControls.jsx');
/*var playerControlBar = require('./components/playerControls.jsx');
var requestButton = require('./components/requestButton.jsx');
var loginModal = require('./components/loginModal.jsx');*/
//var launchButton = require('./components/launchButton.jsx');

//Generic exmaple of pulling in react-bootstrap components, see API for more detail.
//var <react-bootstrapComponent> = require('react-bootstrap/<componentName>');

// TODO: React components go here.

//React.renderComponent(playerControlBar, $('#container').get(0));
//React.renderComponent(requestButton, $('#ajaxButton').get(0));
//React.renderComponent(loginModal, $('#container').get(0));
/*React.renderComponent(loginModal, $('#container').get(0));*/
React.renderComponent(playerControls, $('#container').get(0));