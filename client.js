/*
 * This a client meant for testing server_vs.js until the same REST calls can be made from Java
 */

/* jslint node: true */
'use strict';

var _ = require('lodash');

var net = require('net');
var http = require('http');
var url = require('url');
var request = require('request');

process.stdin.resume();
process.stdin.setEncoding('utf8');
var util = require('util');

process.stdin.on('data', function (text) {
  var contentString = '', headers = {}, content = {}, options = {}, req;

  var args = text.replace(/^\s+|\s+$/g, '').split(' ');

  if (args[0] === 'create') {

    content = {
      'host': args[1] || 'localhost',
      'port': args[2] || '6600',
      'pass': args[3] || ''
    };

    console.log('==================>\ncreate\nhost: ' + content.host + '\nport: ' + content.port + '\npass: ' + content.pass);

    contentString = JSON.stringify(content);

    headers = {
      'content-length': contentString.length,
      'content-type': 'application/json',
      'connection': 'keep-alive',
      'accept': '*/*'
    };

    options = {
      headers: headers,
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

    req.write(contentString);

    req.end();

  } else if (args[0] === 'destroy') {

    content.connectionId = args[1] || '';

    console.log('==================>\ndestroy\nconnectionID: ' + content.connectionId);

    contentString = JSON.stringify(content);

    headers = {
      'content-length': contentString.length,
      'content-type': 'application/json',
      'connection': 'keep-alive',
      'accept': '*/*'
    };

    options = {
      headers: headers,
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

    req.write(contentString);

    req.end();

  } else if (args[0] === 'quit') {
    done();
  } else {
    console.log('invalid command');
  }
});

function done() {
  console.log('Now that process.stdin is paused, there is nothing more to do.');
  process.exit();
}
