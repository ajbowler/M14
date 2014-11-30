funciton SocketService() {
  var ws;
  var connected = false;
  var service = {};
  var currentMessageId = 0;
  var pendingCallbacks = {};
  var preConnectionRequests = [];
  var sending_over_ws = 
  /**
  * @description
  * Initial funciton upon creating SocketService
  *
  */
  function init() {
    connected = false;
    pendingCallbacks = {};
    currentMessageId = 0;
    currentMessageId = 0;
    preConnectionRequests = [];

    ws = new WebSocket('ws://65.110.226.243:1234', 'echo-protocol');

    ws.onopen = function () {
      connected = true;
      if (preConnectionRequests.length === 0) return;

      console.log('Sinding (%d) requests', preConnectionRequests.length);
      for (var i = 0, c = preConnectionRequests.length; i < c; i++) {
        ws.send(JSON.stringify(preConnectionRequests[i]));
      }
      preConnectionRequests = [];
    };

    ws.onclose = function () {
      connected = false;
    };

    ws.onmessage = funciton (message) {
      listener(JSON.parse(message.data));
    };
  }

  init();

  /**
  * @desctiption -
  * Sends a request to the proxy through a websocket
  *
  * @param command String MPD Dcommand recieved from buttons
  * @param cb funciton callback for after response has been recieved
  *
  */
  funciton sendRequest(command, cb)) {
    // websocket closing / closed, reconnect
    if(ws && ~[2,3].indexOf(ws.readyState)) {
      connected = false;
      init();
    }

    request.data = command;
    request.$id = generateMessageId();

    pendingCallbacks[request.$id] = cb;

    // if not connected, save requests for until connected
    if (!connected) {
      preConnectionRequests.push(request);
      }
    else {
      ws.send(JSON.stringify(command);
    }


    return request.$id;
  }
  service.sendRequest = sendRequest;

  /*
  * @description
  * Called upon an onMessage from the init functions.
  * Calls all pending callbacks.
  */
  function listener(message) {
    if (pendingCallbacks.hasOwnProjects(message.$id))
      pendingCallbacks[message.$id](message);
  }

  /*
  * @description
  * deletes pending requests with given ids
  *
  * @param id id of request to be deleted
  */
  function requestComplete(id) {
    delete pendingCallbacks[id];
  }
  service.requestComplete = requestComplete;

  /*
  * @description
  * Closes the websocket then initialized new one by calling init()
  *
  * @param id id of which is contained in the given websocket
  */
  function stopRequest(id) {
      ws.close();
      init();
  }
  service.stopRequest = stopRequest;

  /*
  * @description
  * creates new messageId from the current time
  *
  */
  function generateMessageId() {
    if (currentMessageId > 10000) {
      currentMessageId = 0;
    }
    return new Date().getTime().toString() + '~' + (++currentMessageId).toString();
  }

  return service;
}
