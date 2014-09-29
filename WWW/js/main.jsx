/**
 * @jsx React.DOM
 */

var React = require('react');
var Hello = require('./components/hello.jsx');
var AnotherDiv = require('./components/anotherDiv.jsx');

React.renderComponent(
  <Hello name="World" />,
  document.getElementById('hello')
);

React.renderComponent(
	<AnotherDiv name="(No shit!)" />,
	document.getElementById('div2')
);
