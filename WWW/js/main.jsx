/**
 * @jsx React.DOM
 */

var React = require('react');
var $ = require('jquery');
var MusicPlayer = require('./components/MusicPlayer.jsx');
var LoginModal = require('./components/LoginModal.jsx');
var ExampleParent = require('./components/ExampleParent.jsx');

var App = React.createClass({

  getInitialState: function() {
    return {
      loggedIn: false
    };
  },

  render: function() {
    var app = this;
    var login = function() {
      app.setState({loggedIn: true});
    };

    if (this.state.loggedIn === false) {
      renderedComponent = <LoginModal login={login} />;
    } else {
      renderedComponent = <MusicPlayer />;
    }

    return (
      <div>
        {renderedComponent}
      </div>
    );
  }
});

React.renderComponent(
  <App />,
  $('#container').get(0)
);