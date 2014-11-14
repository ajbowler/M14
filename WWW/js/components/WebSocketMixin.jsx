var WebSocketMixin = {
	getInitialState: function() {
		return {
			ipAddress: "10.30.121.50"
		};
	},

	componentWillMount: function() {
		this.ws = new WebSocket(('ws://' + this.state.ipAddress + ':1234'), 'echo-protocol');

		this.ws.addEventListener("message", function(e) {
			// The data is simply the message that we're sending back
			var msg = e.data;

			// Append the message
			document.getElementById('ws-messages').innerHTML += '<br>' + msg;
		});
	},

	sendMessage: function(message) {
		this.ws.sendMessage(message);
	}
};

module.exports = WebSocketMixin;