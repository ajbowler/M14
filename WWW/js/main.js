/**
 * @jsx React.DOM
 */

var React = require('react');

var Hello = React.createClass({

  render: function() {
    return <div>Hello, {this.props.name}!</div>
  }
});

React.renderComponent(
  <Hello name="World" />,
  document.getElementById('hello')
);
