/**
 * @jsx React.DOM
 */

var React = require('react');
var $ = require('jquery');
var Hello = require('./components/hello.jsx');
var CheckboxWithLabel = require('./components/CheckboxWithLabel.jsx');
var Alert = require('react-bootstrap/Alert');

React.renderComponent(
  <Hello name='World' />,
  document.getElementById('hello')
);

React.renderComponent(
  <CheckboxWithLabel labelOn='Checked' labelOff='Unchecked' />,
  document.getElementById('checkbox')
);

React.renderComponent(
	<Alert bsStyle="warning">
		Check out this awesome react-bootstrap stuff!
	</Alert>,
	//non-jQuery is lame!
	//document.getElementById('alert')
	$('#alert').get(0)
);