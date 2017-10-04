"use strict"

module.exports = (context, callback) => {
    callback(undefined, {status: "You said: " + context});
}
