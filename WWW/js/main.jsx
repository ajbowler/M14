/** @jsx React.DOM */

var React = require('react');
var $ = require('jquery');
var MusicPlayer = require('./components/MusicPlayer.jsx');
var LoginModal = require('./components/LoginModal.jsx');

        username: user.username,
        userID: user.userID,
        email: user.email
      });
    };

    /*jslint ignore: start */
    if (this.state.loggedIn === false) {
      renderedComponent = <LoginModal login={login} />;
    } else {
      renderedComponent =
      <MusicPlayer
        username={this.state.username}
        userID={this.state.userID}
        email={this.state.email}
      />;
    }
    /*jslint ignore: end */

    return (
      /*jslint ignore: start */
      <div>
        {renderedComponent}
      </div>
      /*jslint ignore: end */
    );
  }
});

React.renderComponent(
  /*jslint ignore: start */
  <App />,
  $('#container').get(0)
  /*jslint ignore: end */
);
