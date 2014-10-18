/** @jsx React.DOM */
var React = require('react/addons');

var Html5AudioStreamer = React.createClass({
  getInitialState: function() {
    return {
      host:'10.30.202.185',
      port:'8000',
      syffix:''
    };
  },
  render: function() {
    return (
      <audio src={this.host + ':' + this.port + this.suffix}>
        HTML5 Audio not supported.
      </audio>
    );
  }
});
module.exports = Html5AudioStreamer;
