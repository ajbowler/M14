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