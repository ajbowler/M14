/* jslint node: true */
'use strict';

var _ = require('lodash');

var net = require('net');
var http = require('http');
var restify = require('restify');
var WebSocketServer = require('websocket').server;

/**
 * @desc Creates a new MPD Object
 *
 * @param {string} mpdHost - The MPD host
 * @param {number} mpdPort - The MPD port
 * @param {string} [mpdPass] - The optional MPD password
 * @class
 */
function MPD(mpdHost, mpdPort, mpdPass) {
  this.netConnection = {};
  this.host = mpdHost;
  this.port = mpdPort;
  this.pass = mpdPass || '';
  this.isConnected = false;
  this.isAuthenticated = false;

  this.setupMPD(this.host, this.port, this.pass);
}

/**
 * @desc Sets up the MPD side of the connection
 *
 * @param {string} host - the MPD host
 * @param {number} port - the MPD port
 * @param {string} [pass] - an optional password for MPD
 */
MPD.prototype.setupMPD = function(host, port, pass) {
  var self = this;

  pass = pass || '';

  // The mpd connection
  self.netConnection = net.connect({host: host, port: port}, function() {
    self.isConnected = true;
  });

  self.netConnection.on('data', function(data) {
    // The string message that was sent to us
    var msgString = data.toString();
    console.log((new Date()) + ' MPD at ' + host + ':' + port + ' says ' + msgString.replace(/^\s+|\s+$/g,''));

    // Loop through all clients
    _.forEach(WS.clients, function (client) {
      // Send a message to the client with the message
      client.sendUTF(msgString);
    });
  });

  self.netConnection.on('end', function() {
    console.log((new Date()) + ' MPD Connection [' + host + ':' + port + '] Closed');

    // Notify the clients that the connection was closed
    _.forEach(WS.clients, function (client) {
      client.sendUTF('MPD Connection [' + host + ':' + port + '] Closed');
    });

    self.isConnected = false;
    self.isAuthenticated = false;
  });
};

/**
 * @desc Sets up the websocket side of the connection
 *
 * @param {number} [port=8007] - The port the websocket runs on
 */
function setupWS(port) {

  port = port || 8007;

  WS.httpServer = http.createServer(function(request, response) {});

  WS.httpServer.listen(port, function() {
    WS.serverActive = true;
    console.log((new Date()) + ' Server is listening on port ' + port);
  });

  WS.wsServer = new WebSocketServer({httpServer: WS.httpServer});

  WS.wsServer.on('request', function(r) {

    var connection = r.accept('echo-protocol', r.origin);

    // Specific id for this client & increment count
    var id = WS.clientCount++;

    console.log((new Date()) + ' Connection accepted [' + id + ']');

    connection.on('connectFailed', function(error) {
      console.log('Connect Error: ' + error.toString());
    });

    connection.on('message', function(message) {

      // The string message that was sent to us
      // Parse msgString for the MPD to connect to.
      var messageJSON = JSON.parse(message.utf8Data);
      var msgString = messageJSON.mpdCommand;
      var selectedMPD = messageJSON.mpdHost;

      var mpd = mpdConnectionList[selectedMPD];

      // Reconnect if necessary
      if (!mpd.isConnected) {
        mpd.setupMPD(mpd.host, mpd.port, mpd.pass);
      }

      // Reauthenticate if necessary
      if (!mpd.isAuthenticated && mpd.pass !== '' ) {
        mpd.netConnection.write('password ' + mpd.pass + '\n');
        // TODO: Check to see if authentication was successful and set
        // isAuthenticated to true. For now, enter password every time.
      }

      console.log((new Date()) + ' Sending MPD [' + selectedMPD + '] ' + msgString);

      // Send the command to MPD
      mpd.netConnection.write(msgString + '\n');

    });

    connection.on('close', function(reasonCode, description) {
      delete WS.clients[id];
      console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected [' + id + ']');
      WS.serverActive = false;
    });


    // Store the connection method so we can loop through & contact all clients
    WS.clients[id] = connection;

  });
}

///////////////////////////////////////////////////////////////////////////////////
// This is where the REST service for creating and destroying connections starts //
///////////////////////////////////////////////////////////////////////////////////

/**
 * @desc The single websocket that all traffic is running through
 */
var WS = {
  httpServer: {},
  wsServer: {},
  clients: {},
  clientCount: 0,
  serverActive: false
};

/**
 * @desc The list of MPD connections. Key-value pairs with 'host:port' as the key.
 */
var mpdConnectionList = {};

var localServer = restify.createServer();
localServer.use(restify.bodyParser());

// this is listening to Java to create new connection objects
localServer.listen(8008, function() {});

// POST remove a connection by id
localServer.post('/destroy', function(req, res, next) {
  var cid = req.params.connectionId;
  delete mpdConnectionList[cid];

  console.log((new Date()) + ' MPD destroyed [' + cid + ']');

  res.send(200);

  return next();
});

// POST make a new connection
localServer.post('/create', function(req, res, next) {
  var mpdHost = req.params.host;
  var mpdPort = req.params.port;
  var mpdPass = req.params.pass;
  var id = mpdHost + ':' + mpdPort;

  //Check if websocket server is set up.
  if(!WS.serverActive) {
    setupWS(8007);
  }

  // create a new mpd connection if the connection id doesn't exist
  if (!_.has(mpdConnectionList, id)) {
    mpdConnectionList[id] = new MPD(mpdHost, mpdPort, mpdPass);
    console.log((new Date()) + ' MPD created [' + id + ']');
  } else {
    console.warn((new Date()) + ' MPD exists [' + id + ']');
  }

  res.send(200, JSON.stringify({'connectionID': id}));

  return next();
});
