/**
 * @jsx React.DOM
 */

var React = require('React');
var $ = require('jquery');
var Modal = require('react-bootstrap/Modal');
var TabbedArea = require('react-bootstrap/TabbedArea');
var TabPane = require('react-bootstrap/TabPane');
var ListGroup = require('react-bootstrap/ListGroup');
var ListGroupItem = require('react-bootstrap/ListGroupItem');
var UserInput = require('react-bootstrap/Input');
var ModalButton = require('react-bootstrap/Button');

var ProfileModal = React.createClass({
  propTypes: {
    username: React.PropTypes.string.isRequired,
    humanName: React.PropTypes.string,
    email: React.PropTypes.string
  },

  componentDidMount: function() {
    // Test retrieval of just the current username for now, 
    // will add email and human name later.
    var request = {
      url: "http://proj-309-m14.cs.iastate.edu:8080/username",
      type: "GET",
      contentType: "application/json",
      accepts: "application/json",
      cache: false,
      dataType: "json",
      data: ""
    };

    $.get(request, function(result) {
      var userName = result[0];
      if (this.isMounted()) {
        this.props.username = userName;
      }
    }.bind(this));
  },

  updateUserInfo: function() {
    var updatedUserInfo = {
      newUserName: this.props.editUserName,
      newHumanName: this.props.editHumanName,
      newEmail: this.props.editEmail
    };

    var request = {
      url: "http://proj-309-m14.cs.iastate.edu:8080:/userInfo",
      type: "POST",
      contentType: "application/json",
      cache: false,
      dataType: "json",
      data: JSON.stringify(updatedUserInfo)
    };

    $.ajax(request).done(function(data) {
      this.props.username = newUserName;
      this.props.humanName = newHumanName;
      this.props.email = newEmail;
      forceUpdate();
    });

    this.setState({ allowEdit: !(this.state.allowEdit)});
  },

  addConnection: function() {
    // TODO
  },

  getInitialState: function() {
    return {
      allowEdit: false
    };
  },

  showEdit: function() {
    this.setState({ allowEdit: !(this.state.allowEdit) });
  },

  render: function() {
    return this.transferPropsTo(
      <Modal title="Profile"
        animation={true}>
        <div className="modal-body">
        <TabbedArea defaultActiveKey={1}>
          <TabPane key={1} tab="About Me">
            <div>
              <div>
                <h3>Basic Info</h3>
                <a onClick={this.showEdit}>Edit</a>
              </div>
              <div>
                {this.state.allowEdit ? <EditInfo /> : null}
              </div>
              <div>
                <ListGroup>
                  <ListGroupItem>
                    <div>
                      Name: {this.props.humanName}
                    </div>
                  </ListGroupItem>
                  <ListGroupItem>
                    <div>
                      Username: {this.props.username}
                    </div>
                  </ListGroupItem>
                  <ListGroupItem>
                    <div>
                      Email: {this.props.email}
                    </div>
                  </ListGroupItem>
                </ListGroup>
              </div>
            </div>
          </TabPane>
          <TabPane key={2} tab="MPD Connections">
            <div>
              <h3>MPD Connections</h3>
              //TODO: list current connections to this user
            </div>
            <h3>Add New Connection</h3>
            <div className="form-group">
          <form>
            <UserInput type="text" placeholder="Connection Name"/>
            <UserInput type="text" placeholder="MPD Server Host"/>
            <UserInput type="password" placeholder="MPD Server Password (if required)"/>
            <ModalButton bsStyle="success" onClick={this.addConnection}>Add Connection</ModalButton>
          </form>
        </div>
          </TabPane>
      </TabbedArea>
    </div>
        <div className="modal-footer">
          <ModalButton bsStyle="primary" onClick={this.props.onRequestHide}>Close</ModalButton>
        </div>
      </Modal>
    );
  }
});

var EditInfo = React.createClass({
  render: function() {
    return (
    <div className="input-group">
      <form>
        <UserInput type="text" className="form-control" placeholder="Name"  value={this.props.editHumanName}/>
        <UserInput type="text" className="form-control" placeholder="Username" value={this.props.editUserName}/>
        <UserInput type="text" className="form-control" placeholder="Email" value={this.props.editEmail}/>
        <ModalButton bsStyle="success" onClick={this.updateUserInfo}>Update</ModalButton>
        <br/>
        <br/>
      </form>
    </div>
    );
  }
});

module.exports = ProfileModal;