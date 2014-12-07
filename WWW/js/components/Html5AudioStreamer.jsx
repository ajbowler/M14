/** @jsx React.DOM */

/* jslint browserify: true */
/* jslint devel: true */
'use strict';

var React = require('react/addons');
var $ = require('jquery');

var Html5AudioStreamer = React.createClass({
  render: function() {
    // var url = 'http://' + this.props.host + ':' + this.props.port + '/' + this.props.suffix;
    var url = 'http://localhost:8000/mpd.ogg';
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
