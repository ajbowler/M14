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

/**
 * @desc Creates a new Proxy
 *
 * @param {string} mpdHost - The MPD host
 * @param {number} mpdPort - The MPD port
 * @param {string} [mpdPass] - The optional MPD password
 * @param {number} [wsPort=8007] - The websocket port default 8007
 * @class
 */
function Proxy(mpdHost, mpdPort, mpdPass, wsPort) {
  // The MPD side of the connection
  this.mpd = {
    netConnection: {},
    host: mpdHost,
    port: mpdPort,
    pass: mpdPass || '',
    isConnected: false,
    isAuthenticated: false
  };

  // The websocket side of the connection
  // this.ws = {
  //   httpServer: {},
  //   wsServer: {},
  //   clients: {},
  //   clientCount: 0
  // };

  this.setupMPD(mpdHost, mpdPort, mpdPass);
  //this.setupWS(wsPort);
}

Proxy.ws = {
  httpServer: {},
  wsServer: {},
  clients: {},
  clientCount: 0,
  serverActive: false
};

/**
 * @desc Sets up the MPD side of the connection
 *
 * @param {string} host - the MPD host
 * @param {number} port - the MPD port
 * @param {string} [pass] - an optional password for MPD
 */
Proxy.prototype.setupMPD = function(host, port, pass) {

  var self = this;

  pass = pass || '';

  // The mpd connection
  self.mpd.connection = net.connect({host: host, port: port}, function() {
    self.mpd.isConnected = true;
  });

  self.mpd.connection.on('data', function(data) {
    // The string message that was sent to us
    var msgString = data.toString();
    console.log((new Date()) + ' MPD says ' + msgString.replace(/^\s+|\s+$/g,''));

    // Loop through all clients
    _.forEach(self.ws.clients, function (client) {
      // Send a message to the client with the message
      client.sendUTF(msgString);
    });
  });

  self.mpd.connection.on('end', function() {
    console.log((new Date()) + ' MPD Connection Closed');

    // Notify the clients that the connection was closed
    _.forEach(self.ws.clients, function (client) {
      client.sendUTF('MPD Connection Closed');
    });

    self.mpd.isConnected = false;
    self.mpd.isAuthenticated = false;
  });

};

/**
 * @desc Sets up the websocket side of the connection
 *
 * @param {number} [port=8007] - The port the websocket runs on
 */
Proxy.setupWS = function(port) {
  console.log('setupWS called!');

  var self = this;

  port = port || 8007;

  self.ws.httpServer = http.createServer(function(request, response) {
    self.ws.serverActive = true;
  });

  self.ws.httpServer.listen(port, function() {
    self.ws.serverActive = true;
    console.log((new Date()) + ' Server is listening on port ' + port);
  });

  self.ws.wsServer = new WebSocketServer({httpServer: self.ws.httpServer});

  self.ws.wsServer.on('request', function(r) {

    var connection = r.accept('echo-protocol', r.origin);

    // Specific id for this client & increment count
    var id = self.ws.clientCount++;

    connection.on('message', function(message) {

      // The string message that was sent to us
      // Parse msgString for the MPD to connect to.
      message = JSON.parse(message);
      var msgString = message.mpdCommand;
      var selectedMPD = message.mpdHost;
      console.log('msgString: ' + msgString);

      /*
      connections = {
        '10.30.121.50:6600': mpdConnection
        '0.0.0.0:6600': anotherMpdConnection,
      };

      var mpdConnection = connections[message.mpdHost].netDotConnection;

      mpdConnection.write(things);
      */

      // Reconnect if necessicary
      if (!self.mpd.isConnected) {
        self.setupMPD(self.mpd.host, self.mpd.port, self.mpd.pass);
      }

      // Reauthenticate if necessicary
      if (!self.mpd.isAuthenticated) {
        self.mpd.connection.write('password ' + self.mpd.pass + '\n');
        // TODO: Check to see if authentication was successful and set
        // isAuthenticated to true. For now, enter password every time.
      }

      console.log((new Date()) + ' Sending MPD ' + msgString);

      // Send the command to MPD
      self.mpd.connection.write(msgString + '\n');

    });

    connection.on('close', function(reasonCode, description) {
      delete self.clients[id];
      console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected [' + id + ']');
      self.ws.serverActive = false;
    });

    console.log((new Date()) + ' Connection accepted [' + id + ']');

    // Store the connection method so we can loop through & contact all clients
    self.ws.clients[id] = connection;

  });

};

/*
 * This is where the REST service for creating and destroying connections starts
 */

var localServer = restify.createServer();
localServer.use(restify.bodyParser());

var connections = {};
var connectionCount = 0;

// this is listening to Java to create new connection objects
localServer.listen(8008, function() {});

// POST remove a connection by id
localServer.post('/destroy', function(req, res, next) {
  var cid = req.params.connectionId; //TODO: use connection id to delete connections
  delete connections[cid];

  console.log((new Date()) + ' Proxy destroyed [' + cid + ']');

  res.send(200);

  return next();
});

// POST make a new connection with a unique id
localServer.post('/create', function(req, res, next) {
  // TODO: check the format for reqest. i.e. do we need to JSON.parse()?
  var mpdHost = req.params.host;
  var mpdPort = req.params.port;
  var mpdPass = req.params.pass;
  var id = connectionCount++; // TODO: id = host:port

  console.log((new Date()) + ' Proxy created [' + id + ']');

  //Check if websocket server is set up.
  if(!Proxy.ws.serverActive) {
    Proxy.setupWS(8007);
  }

  // create a new mpd connection if the connection id doesn't exist
  if (!_.contains(id)) {
    connections[id] = new Proxy(mpdHost, mpdPort, mpdPass);
  } else {
    console.warn((new Date()) + ' Proxy exists [' + id + '}');
  }

  res.send(200, JSON.stringify({'connectionID': id}));

  return next();
});