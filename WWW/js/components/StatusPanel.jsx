/** @jsx React.DOM */

/* jslint browserify: true */
'use strict';

var React = require('react');
var Panel = require('react-bootstrap/Panel');
var _ = require('lodash');

/**
 * @desc Takes an MPD command response and turns it into a JSON Object
 *
 * @param msg - The MPD response message
 * @return a JSON representation of the response
 */
function mpd2json(msg) {

  var arr = msg.split('\n');

  _.pull(arr, '', 'OK MPD 0.17.0', 'OK MPD 0.18.0', 'OK MPD 0.19.0', 'OK');

  // Checks if there is anything left to parse
  if (arr.length === 0) {
    return null;
  }

  for(var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].split(': ');
    for (var j = 0; j < arr[i].length; j++) {
      arr[i][j] = '"' + arr[i][j] + '"';
    }
    arr[i] = arr[i].join(':');
  }

  var jsonString = '{' + arr.toString() + '}';
  return JSON.parse(jsonString);
}

var StatusPanel = React.createClass({

  getInitialState: function() {
    return {
      status: {}
    };
  },

  componentDidMount: function() {
    this.props.websocket.onmessage = this.handleMessage;
  },

  handleMessage: function(e) {
    var response = mpd2json(e.data);
    if (response !== null) {
      console.log(response);
      this.setState({status: response});
    }
  },

  getInfo: function () {
    console.log('sending: currentsong to ' + this.props.host + ':' + this.props.port);
    this.props.websocket.send(JSON.stringify({
      mpdCommand: 'currentsong',
      mpdHost: this.props.host + ':' + this.props.port
    }));
  },

  render : function() {
    return (
      /* jslint ignore: start */
      <Panel header='Playing' bsStyle='primary'>
        Title: {this.state.status.Title}<br/>
        Artist: {this.state.status.Artist}<br/>
        Album: {this.state.status.Album}<br/>
      </Panel>
      /* jslint ignore: end */
    );
  }
});

module.exports = StatusPanel;
