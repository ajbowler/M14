/**
 * @jsx React.DOM
 */

var React = require('react');
var $ = require('jquery');
var Hello = require('./components/hello.jsx');
var CheckboxWithLabel = require('./components/CheckboxWithLabel.jsx');
var Alert = require('react-bootstrap/Alert');
var Login = require('./components/LoginBox.jsx');

React.renderComponent(
  <Hello name='Lexie' />,
  document.getElementById('hello')
);

React.renderComponent(
<CheckboxWithLabel labelOn='TestOn' labelOff='TestOff' />,  
  document.getElementById('checkbox')
);

React.renderComponent(
	<Alert bsStyle="warning">
		This is my computer youre looking at, my website
	</Alert>,
	//non-jQuery is lame!
	//document.getElementById('alert')
	$('#alert').get(0)
);


React.rederComponent(
     <Login />,
     document.getElementById('Unique')
);
