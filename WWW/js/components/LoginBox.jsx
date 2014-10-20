/**
 * @jsx React.DOM
*/

var React = require('react');

var CommentBox = React.createClass({
    render: function() {
        return (
             <iframe width="420" height="315"
             src="http://www.youtube.com/embed/XGSy3_Czz8k">
             </iframe> 
        );
    }
});

module.exports = CommentBox;
