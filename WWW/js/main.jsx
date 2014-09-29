/**
 * @jsx React.DOM
 */

var React = require('react');
var Hello = require('./components/hello.jsx');

React.renderComponent(
  <Hello name="World" />,
  document.getElementById('hello')
);
