"use strict"
var stdin = process.openStdin();
var fs = require('fs');
var handler = require('./handler');


stdin.addListener("data", function(d) {
    let key = "\r\n\r\n";
    let keyBuffer = new Buffer(key);
    let index = d.indexOf(key);

    let st = d.toString();
    // console.log(st.substring(0, st.indexOf(key)))

    let body = new Buffer(d.length - (index+keyBuffer.byteLength));
    d.copy(body, 0, index+keyBuffer.byteLength);
    // console.log(body.toString())

    handler(body.toString(), (err, output) => {
        let result = addHttp(output);
        let done = process.stdout.write(result);
        // process.exit();
    });
});

function addHttp(content) {
    return new Buffer("HTTP/1.1 200 OK\r\n"+
    "Content-Length: "+ content.length + "\r\n" +
    "\r\n" + 
    content);
}
