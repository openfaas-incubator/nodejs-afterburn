"use strict"
var stdin = process.openStdin();
var fs = require('fs');
var handler = require('./handler');

var header = null;

stdin.addListener("data", function(data) {
    received = Buffer.concat([received, data]);

    let key = "\r\n\r\n";
    let keyBuffer = new Buffer(key);
    let index = received.indexOf(key);

    let headerLength = index + keyBuffer.byteLength; // received.length - (index + keyBuffer.byteLength);

    let header = new Buffer(headerLength);
    received.copy(header, 0, 0, headerLength);

    let parsedHeader = parseHeader(header.toString());
    let bodyLength = parsedHeader["Content-Length"];

    let body = new Buffer(parseInt(bodyLength));
    if(bodyLength + headerLength < received.length) {
        console.log(received.length ,headerLength , bodyLength)
        process.exit(1)
    }
    received.copy(body, index , 0, bodyLength);


    // clear down buffer.
    received = new Buffer(0);
    
    handler(body.toString(), (err, output) => {
        let result = addHttp(output);
        process.stdout.write(result);

        // process.exit();
    });
});

function addHttp(content) {
    return new Buffer("HTTP/1.1 200 OK\r\n"+
    "Content-Length: "+ content.length + "\r\n" +
    "\r\n" + 
    content);
}

function parseHeader(raw) {
    let map = {};

    raw.split("\r\n").reduce((m,obj) => {
        if(obj.length) {
            map[obj.substring(0, obj.indexOf(" ")-1 )] = obj.substring(obj.indexOf(" ")+1)
        }
    });
    return map;
}

let received = new Buffer(0);