////////////////////////////////////////////////////////////////////////////////
// This will be reomved once the Java call is set up                          //
////////////////////////////////////////////////////////////////////////////////
var _ = require('lodash');

var net = require('net');
var http = require('http');

process.stdin.resume();
process.stdin.setEncoding('utf8');
var util = require('util');

process.stdin.on('data', function (text) {
  var content, options, req;
  var args = text.replace(/^\s+|\s+$/g, '').split(' ');
  if (args[0] === 'create') {

    content = {
      host: args[1] || 'localhost',
      port: args[2] || 6600,
      pass: args[3] || ''
    };

    console.log('==================>\ncreate\nhost: ' + content.host + '\nport: ' + content.port + '\npass: ' + content.pass);

    options = {
      host: 'localhost',
      port: 8008,
      path: '/create',
      method: 'POST'
    };

    req = http.request(options, function(res) {
      console.log('STATUS: ' + res.statusCode);
      console.log('HEADERS: ' + JSON.stringify(res.headers));
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
      });
    });

    req.write(JSON.stringify(content));

    req.end();

  } else if (args[0] === 'destroy') {

    content = {
      connectionId: args[1]
    };

    console.log('==================>\ndestroy\nconnectionID: ' + content.connectionID);

    options = {
      host: 'localhost',
      port: 8008,
      path: '/destroy',
      method: 'POST'
    };

    req = http.request(options, function(res) {
      console.log('STATUS: ' + res.statusCode);
      console.log('HEADERS: ' + JSON.stringify(res.headers));
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
      });
    });

    req.write(JSON.stringify(content));

    req.end();

  } else if (text === 'quit\n') {
    done();
  } else {
    console.log('invalid command');
  }
});

function done() {
  console.log('Now that process.stdin is paused, there is nothing more to do.');
  process.exit();
}
