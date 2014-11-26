/*
 * This server_v2.js handles all of the proxy connections between the client and mpd.
 */

var _ = require('lodash');

var net = require('net');
var http = require('http');
var restify = require('restify');

function Proxy(mpd, httpServer, wsServer) {
  this.mpd = mpd;
  this.httpServer = httpServer;
  this.wsServer = wsServer;
  this.clients = {};
}

Proxy.connectionCount = 0;

Proxy.prototype.connectClient = function(client) {
  this.clients.push(client);
};

Proxy.prototype.disconnectClient = function(clientAddress) {
  var idx = _.find(this.clients, { remoteAddress: clientAddress });
  this.clients.splice(idx, 1);
};

Proxy.prototype.setupMPD = function(host, port, pass) {

  // The mpd connection
  this.mpd = net.connect({host: host, port: port}, function() {
    if (pass !== null && pass !== '') this.mpd.write('password ' + pass + '\n'); // Immediately enter the password if there is a password
  });

  this.mpd.on('data', function(data) {
    // The string message that was sent to us
    var msgString = data.toString();

    console.log(msgString);

    // Loop through all clients
    _.forEach(this.clients, function (client) {
      // Send a message to the client with the message
      client.sendUTF(msgString);
    });
  });

  this.mpd.on('end', function() {
    // TODO: decide what happens if a MPD connection shuts down.
    console.log('mpd connection closing');
    // process.exit();
    return 0;
  });

};

Proxy.prototype.setupWS = function(port) {

  port = port || 8007;

  this.httpServer = http.createServer(function(request, response) {});

  this.httpServer.listen(port, function() {
    console.log((new Date()) + ' Server is listening on port ' + port);
  });

  var WebSocketServer = require('websocket').server;

  this.wsServer = new WebSocketServer({httpServer: this.httpServer});

  this.wsServer.on('request', function(r){
    // Code here to run on connection

    var connection = r.accept('echo-protocol', r.origin);

    // Specific id for this client & increment count
    var id = count++;

    // Store the connection method so we can loop through & contact all clients
    this.clients[id] = connection;

    console.log((new Date()) + ' Connection accepted [' + id + ']');

    // Create event listener
    connection.on('message', function(message) {

      // The string message that was sent to us
      var msgString = message.utf8Data;

      console.log(msgString);

      this.mpd.write(msgString.toString() + '\n');

    });

    connection.on('close', function(reasonCode, description) {
      delete this.clients[id];
      console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });

  });

};

var test = {
  connectionCount: 0
};

var localServer = restify.createServer();
localServer.use(restify.bodyParser());

var connections = {}; // The object containing all of the proxy connections.

localServer.listen(8008, function() {
  // this is listening to Java to create new connection objects
});

// POST remove a connection by id
localServer.post('/destroy', function(req, res, next) {
  var cid = req.params.connectionID; //TODO: use connection id to delete connections
  delete connections[cid];

  console.log('destroyed ' + cid);

  res.send(200);

  return next();
});

// POST make a new connection with a unique id
localServer.post('/create', function(req, res, next) {
  console.log(req.toString());
  // TODO: check to see the format that things are returned. i.e. do we need to JSON.parse()?
  var mpdHost = req.params.host;
  var mpdPort = req.params.port;
  var mpdPass = req.params.pass;
  var id = test.connectionCount++; // TODO: generate a connection id in a better way

  console.log('created ' + id);

  // push the new connection
  if (_.contains(id)) {
    // add new client to websocket
    connections[id].addClient();
  } else {
    connections[id] = new Proxy();
    // create a new mpd connection
    connections[id].setupMPD(mpdHost, mpdPort, mpdPass);
    connections[id].setupWS();

  }

  // TODO: generate the result to send
  // make sure to handle the case where something goes wrong (400/500 error)
  res.send(200, JSON.stringify({'connectionID': id}));

  return next();
});
