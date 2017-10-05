"use strict"
var stdin = process.openStdin();
var fs = require('fs');
var handler = require('./function/handler.js');


stdin.addListener("data", function(d) {
    let key = "\r\n\r\n";
    let keyBuffer = new Buffer(key);
    let index = d.indexOf(key);

    let st = d.toString();
    // console.log(st.substring(0, st.indexOf(key)))

    let body = new Buffer(d.length - (index+keyBuffer.byteLength));
    d.copy(body, 0, index+keyBuffer.byteLength);
    // console.log(body.toString())

    try {
        let contentType = "";
        handler(body.toString(), (err, res) => {
            let result;

            if(err) {
                result = err.toString();
            } else if(isArray(res) || isObject(res)) {
                result = JSON.stringify(res);
                contentType = "application/json";
            } else {
                result = res;
            }

            let done = process.stdout.write(addHttp(result, contentType));

            // process.exit();
        });
    } catch(e) {
        let done = process.stdout.write(addHttp(e.toString(), contentType));
    }

});

function addHttp(content, contentType) {
    return new Buffer("HTTP/1.1 200 OK\r\n" +
    (contentType.length > 0 ? ("Content-Type: "+ contentType+"\r\n") : "") +
    "Content-Length: "+ content.length + "\r\n" +
    "\r\n" + content);
}

let isArray = (a) => {
    return (!!a) && (a.constructor === Array);
};

let isObject = (a) => {
    return (!!a) && (a.constructor === Object);
};

