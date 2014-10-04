
var React = require('react');
var butn = require('react-bootstrap/Button');
var Glyphicon = require('react-bootstrap/Glyphicon');
var $ = require('jquery');

function sendStuff(){

	$.ajax({
    type: 'POST',
    url: 'proj-309-m14.cs.iastate.edu:8080/rest',
    dataType: 'json',
    success: function (msg) {
      if (msg) {
        alert("Somebody" + name + " was added in list !");
          location.reload(true);
        } 
        else {
          alert("Cannot add to list !");
        }
    },
    data: 'String'
  });

}

var requestButton = React.createClass({

	render: function(){
		return <butn bsSize='large' onClick={this.sendStuff}></butn>
	},

	sendStuff: sendStuff

});

module.exports = <requestButton />;