"use strict"

function handler(context, callback) {
    let err = null;
    
    callback(err, "Input:\n" + context);
}

module.exports = handler;