/**
 * @jsx React.DOM
 */

var React = require('react');
var $ = require('jquery');
var Hello = require('./components/hello.jsx');
var CheckboxWithLabel = require('./components/CheckboxWithLabel.jsx');
var Alert = require('react-bootstrap/Alert');
var Html5AudioStreamer = require('./components/Html5AudioStreamer.jsx');
var PlayButton = require('./components/PlayButton.jsx');

React.renderComponent(
  <Hello name='World' />,
  document.getElementById('hello')
);

React.renderComponent(
<<<<<<< HEAD
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

React.renderComponent(
  <Html5AudioStreamer />,
  $('#audio').get(0)
);
=======
  <PlayButton />,
  $('#playButton').get(0)
);
>>>>>>> 20c52cc... Play Button component
