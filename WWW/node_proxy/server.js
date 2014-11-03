// var WebSocket = require('ws');
var net = require('net');

// var ws = new WebSocket('ws://10.30.121.50');

var mpd = net.connect({port: 6600}, function() {
  console.log('Connected to MPD');
  mpd.write('password coms309M14\n'); // Immediately enter the password
});

mpd.on('data', function(data) {
  console.log('[MPD]\n' + data.toString());
});

mpd.on('end', function() {
  console.log('Disconnected from MPD');
  process.exit();
  return 0;
});

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (text) {
  mpd.write(text);
});

// ws.on('open', function() {});
