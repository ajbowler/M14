/*
 * This server_v2.js handles all of the proxy connections between the client and mpd.
 */

/* jslint node: true */
'use strict';

var _ = require('lodash');

var net = require('net');
var http = require('http');
var restify = require('restify');
var WebSocketServer = require('websocket').server;

function Proxy(mpd, httpServer, wsServer) {
  this.mpd = mpd;
  this.mpdConnected = false;
  this.mpdAuthenticated = false;
  this.httpServer = httpServer;
  this.wsServer = wsServer;
  this.clients = {};
  this.clientCount = 0;
}

Proxy.connectionCount = 0;

Proxy.prototype.setupMPD = function(host, port, pass) {

  var self = this;

  pass = pass || '';

  // The mpd connection
  self.mpd = net.connect({host: host, port: port}, function() {
    // Immediately enter the password if there is a password
    // if (pass !== '') self.mpd.write('password ' + pass + '\n');
    self.mpdConnected = true;
  });

  self.mpd.on('data', function(data) {
    // The string message that was sent to us
    var msgString = data.toString();
    console.log(msgString);

    // Loop through all clients
    _.forEach(self.clients, function (client) {
      // Send a message to the client with the message
      client.sendUTF(msgString);
    });
  });

  self.mpd.on('end', function() {
    // TODO: decide what happens if a MPD connection shuts down.
    console.log('mpd connection closing');
    self.mpdConnected = false;
    self.mpdAuthenticated = false;
    // process.exit();
    return 0;
  });

};

Proxy.prototype.setupWS = function(port) {

  var self = this;

  port = port || 8007;

  self.httpServer = http.createServer(function(request, response) {});

  self.httpServer.listen(port, function() {
    console.log((new Date()) + ' Server is listening on port ' + port);
  });

  self.wsServer = new WebSocketServer({httpServer: self.httpServer});

  self.wsServer.on('request', function(r) {
    // Code here to run on connection

    var connection = r.accept('echo-protocol', r.origin);

    // Create event listener
    connection.on('message', function(message) {

      // The string message that was sent to us
      var msgString = message.utf8Data;

      self.mpd.write(msgString.toString() + '\n');

    });

    connection.on('close', function(reasonCode, description) {
      delete self.clients[id];
      console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });

    // Specific id for this client & increment count
    var id = self.clientCount++;

    console.log((new Date()) + ' Connection accepted [' + id + ']');
    // Store the connection method so we can loop through & contact all clients
    self.clients[id] = connection;

  });

};

var localServer = restify.createServer();
localServer.use(restify.bodyParser());

var connections = {}; // The object containing all of the proxy connections.
var connectionCount = 0;

// this is listening to Java to create new connection objects
localServer.listen(8008, function() {});

// POST remove a connection by id
localServer.post('/destroy', function(req, res, next) {
  var cid = req.params.connectionId; //TODO: use connection id to delete connections
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
  var id = connectionCount++; // TODO: generate a connection id in a better way

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
