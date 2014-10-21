/**
 * @jsx React.DOM
 */
var React = require('react');
var $ = require('jquery');
var playerControls = require('./components/playerControls.jsx');

React.renderComponent(playerControls, $('#container').get(0));