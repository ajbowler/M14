/**
 * @jsx React.DOM
 */

var React = require('react/addons');

var ExampleParent = React.createClass({
  getInitialState: function() {
    return {lastLabelClicked: "none"};
  },

  render: function() {
    var me = this;
    var setLastLabel = function(label) {
      me.setState({lastLabelClicked: label});
    };

    return ( 
      <div>
        <p>Last clicked: {this.state.lastLabelClicked}</p>
        <LabeledButton label="Alpha Button" setLastLabel={setLastLabel}/>
        <LabeledButton label="Beta Button" setLastLabel={setLastLabel}/>
        <LabeledButton label="Delta Button" setLastLabel={setLastLabel}/>
      </div>
    );
  }
});

var LabeledButton = React.createClass({
  handleClick: function() {
    this.props.setLastLabel(this.props.label);
  },

  render: function() {
    return <button onClick={this.handleClick}>{this.props.label}</button>;
  }

});

module.exports = ExampleParent;