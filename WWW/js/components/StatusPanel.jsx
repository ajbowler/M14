/** @jsx React.DOM */

/* jslint browserify: true */
/* jslint devel: true */
'use strict';

var React = require('react');
var Panel = require('react-bootstrap/Panel');

/**
 * @desc Takes an MPD command response and turns it into a JSON Object
 *
 * @param msg - The MPD response message
 * @return a JSON representation of the response
 */
function mpd2json(msg) {
  var arr = msg.split('\n');

  // This gets rid of the last empty string that is in all responses
  arr.pop();

  // Checks that the response is OK
  if (arr.pop() !== 'OK') return null;

  // Checks if there is anything left to parse
  if (arr.length === 0) return null;

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
    console.log('sending: currentsong');
    this.props.websocket.send(JSON.stringify({
      mpdCommand: 'currentsong',
      mpdHost: '10.30.121.50:6600' // TODO: make this variable instead of hardcoded
    }));
  },

  render : function() {
    return (
      /* jslint ignore: start */
      <div id='statuspanel'>
        <Panel header={"Playing"} bsStyle="primary">
          {this.state.status}
        </Panel>
        <button onClick={this.getInfo}>Get Song</button>
      </div>
      /* jslint ignore: end */
    );
  }
});

module.exports = StatusPanel;
