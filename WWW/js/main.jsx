/**
 * @jsx React.DOM
 */

var React = require('react');
var Hello = require('./components/hello.jsx');
var CheckboxWithLabel = require('./components/CheckboxWithLabel.jsx');

React.renderComponent(
  <Hello name='World' />,
  document.getElementById('hello')
);

React.renderComponent(
  <CheckboxWithLabel labelOn='Checked' labelOff='Unchecked' />,
  document.getElementById('checkbox')
);
