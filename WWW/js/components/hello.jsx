/**
 * @jsx React.DOM
 */

 var React = require('react');

 var hello = React.createClass({
 	render: function() {
 		return (
 			<div className="hello">Hey, {this.props.name}!</div>
 		);
 	}
 });

module.exports = hello; 
