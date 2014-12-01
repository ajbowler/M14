/** @jsx React.DOM */
var React = require('react/addons');
var Html5AudioStreamer = React.createClass({
// This commented out code may be used later to get the user's
// getInitialState: function() {
//   return {
//     host:'10.30.121.50',
//     port:'8000',
//     suffix:'ogg.mp3'
//   };
// },

// componentDidMount: function() {
//   $.get(this.props.user, function(result) {
//     if (this.isMounted()) {
//       this.setState({
//         host: result.host,
//         port: result.port,
//         suffix: result.suffix
//       });
//     }
//   }.bind(this));
// },

render: function() {
// var url = 'http://' + this.host + ':' + this.port + '/' + this.suffix;
var url = 'http://65.110.226.243:8000/mpd.ogg'
return (
  <audio autoPlay preload="auto" id="audioStream" src={url}>
    HTML5 Audio not supported.
  </audio>
);
}

});
module.exports = Html5AudioStreamer;
