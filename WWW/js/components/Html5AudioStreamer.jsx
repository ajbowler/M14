/** @jsx React.DOM */

/* jslint browserify: true */
/* jslint devel: true */
'use strict';

var React = require('react/addons');
var $ = require('jquery');

var Html5AudioStreamer = React.createClass({
  getInitialState: function() {
    return {
      connection: {}
    };
  },

  componentDidMount: function() {

  },

  render: function() {
    // var url = 'http://' + this.state.host + ':' + this.state.port + '/' + this.state.suffix;
    var url = 'http://10.30.121.50:8000/mpd.ogg';
    return (
      /* jshint ignore: start */
      <audio autoPlay preload="auto" id="audioStream" src={url}>
        HTML5 Audio not supported.
      </audio>
      /* jshint ignore: end */
    );
  }

});

module.exports = Html5AudioStreamer;
