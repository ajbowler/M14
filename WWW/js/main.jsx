/**
 * @jsx React.DOM
 */

var React = require('react');
var $ = require('jquery');
var ProfileModal = require('./components/ProfileModal.jsx');
var LoginModal = require('./components/LoginModal.jsx');

/*var Html5AudioStreamer = require('./components/Html5AudioStreamer.jsx');
<<<<<<< Updated upstream
var PlayerControls = require('./components/PlayerControls.jsx');

=======
//var PlayerControls = require('./components/PlayerControls.jsx');
>>>>>>> Stashed changes
React.renderComponent(
  <Html5AudioStreamer />,
  $('#audio').get(0)
);

React.renderComponent(
  <PlayerControls />,
  $('#playerControls').get(0)
);*/



React.renderComponent(
  <MusicPlayer />,
  $('#container').get(0)
);
