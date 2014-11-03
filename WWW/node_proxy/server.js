var net = require('net');
var http = require('http');

var server = http.createServer(function(request, response) {});

var count = 0;
var clients = {};

// The mpd connection
var mpd = net.connect({port: 6600}, function() {
  console.log('Connected to MPD');
  mpd.write('password coms309M14\n'); // Immediately enter the password
});

mpd.on('data', function(data) {
  // console.log('[MPD]\n' + data.toString());
  // The string message that was sent to us
    var msgString = '[MPD]\n' + data.toString();

    console.log(msgString);

    // Loop through all clients
    for(var i in clients) {
      // Send a message to the client with the message
      clients[i].sendUTF(msgString);
    }
});

mpd.on('end', function() {
  console.log('Disconnected from MPD');
  process.exit();
  return 0;
});

// The websocket on port 1234
server.listen(1234, function() {
      console.log((new Date()) + ' Server is listening on port 1234');
});

var WebSocketServer = require('websocket').server;
wsServer = new WebSocketServer({
  httpServer: server
});

wsServer.on('request', function(r){
  // Code here to run on connection

  var connection = r.accept('echo-protocol', r.origin);

  // Specific id for this client & increment count
  var id = count++;

  // Store the connection method so we can loop through & contact all clients
  clients[id] = connection;

  console.log((new Date()) + ' Connection accepted [' + id + ']');

  // Create event listener
  connection.on('message', function(message) {

    // The string message that was sent to us
    var msgString = message.utf8Data;

    mpd.write(msgString.toString() + '\n');

  });

  connection.on('close', function(reasonCode, description) {
    delete clients[id];
    console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
  });

});

// Handle stdin
process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (text) {
  mpd.write(text);
});
