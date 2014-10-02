/**
 * @jsx React.DOM
 */

var React = require('react');

var newDiv = React.createClass({
	render: function() {
		return (
			<div className='anotherDiv'>
				<h3>Check out this JavaScript! {this.props.name}</h3>
			</div>
		);
	}
});

module.exports = newDiv;