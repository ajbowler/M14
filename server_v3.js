/* jslint node: true */
'use strict';

var _ = require('lodash');

var net = require('net');
var http = require('http');
var restify = require('restify');
var WebSocketServer = require('websocket').server;

function MPD(mpdHost, mpdPort, mpdPass) = {
  netConnection: {},
  host: mpdHost,
  port: mpdPort,
  pass: mpdPass || '',
  isConnected: false,
  isAuthenticated: false
};

var WS = {
  httpServer: {},
  wsServer: {},
  clients: {},
  clientCount: 0,
  serverActive: false
};

/**
 * @desc The global list of MPD connections. Key-value pairs with host and port.
 */
var mpdConnectionList = {};


MPD.prototype.setupMPD(host, port, pass) {
  var self = this;

  pass = pass || '';

  // The mpd connection
  self.netConnection = net.connect({host: host, port: port}, function() {
    self.isConnected = true;
  });

  self.netConnection.on('data', function(data) {
    // The string message that was sent to us
    var msgString = data.toString();
    console.log((new Date()) + ' MPD says ' + msgString.replace(/^\s+|\s+$/g,''));

    // Loop through all clients
    _.forEach(WS.clients, function (client) {
      // Send a message to the client with the message
      client.sendUTF(msgString);
    });
  });

  self.netConnection.on('end', function() {
    console.log((new Date()) + ' MPD Connection Closed');

    // Notify the clients that the connection was closed
    _.forEach(WS.clients, function (client) {
      client.sendUTF('MPD Connection Closed');
    });

    self.isConnected = false;
    self.isAuthenticated = false;
  });
};

function setupWS(port, mpd) {
  console.log('setupWS called!');

  port = port || 8007;

  WS.httpServer = http.createServer(function(request, response) {
    WS.serverActive = true;
  });

  WS.httpServer.listen(port, function() {
    WS.serverActive = true;
    console.log((new Date()) + ' Server is listening on port ' + port);
  });

  WS.wsServer = new WebSocketServer({httpServer: WS.httpServer});

  WS.wsServer.on('request', function(r) {

    var connection = r.accept('echo-protocol', r.origin);

    // Specific id for this client & increment count
    var id = WS.clientCount++;

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
      if (!mpd.isConnected) {
        mpd.setupMPD(mpd.host, mpd.port, mpd.pass);
      }

      // Reauthenticate if necessicary
      if (!mpd.isAuthenticated) {
        mpd.connection.write('password ' + mpd.pass + '\n');
        // TODO: Check to see if authentication was successful and set
        // isAuthenticated to true. For now, enter password every time.
      }

      console.log((new Date()) + ' Sending MPD ' + msgString);

      // Send the command to MPD
      mpd.netConnection.write(msgString + '\n');

    });

    connection.on('close', function(reasonCode, description) {
      delete WS.clients[id];
      console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected [' + id + ']');
      WS.serverActive = false;
    });

    console.log((new Date()) + ' Connection accepted [' + id + ']');

    // Store the connection method so we can loop through & contact all clients
    WS.clients[id] = connection;

  });
};