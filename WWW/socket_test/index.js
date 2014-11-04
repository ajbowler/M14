var http = require('http');
var io = require('socket.io');
var port = 6600;

var server = http.createServer(function(req, res){});

server.listen(6600);

var socket = io.listen(server);

socket.on('connection', function(client) { 
    console.log('Connection to client established');

    client.on('disconnect', function() {
        console.log('Server has disconnected');
    });
});