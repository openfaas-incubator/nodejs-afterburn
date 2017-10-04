const { Transform } = require('stream')
const Request = require('./request')
const Response = require('./response')

class Afterburn extends Transform {
  constructor (options) {
    super(options)
    this.handler = function (body, callback) { callback(null, body) }
    this.request = new Request()
  }

  _transform (chunk, encoding, callback) {
    this.request.addChunk(chunk)

    // If we didn't get a body back, let's keep rolling @BJC
    if (this.request.complete) {
      return callback(null)
    }

    // If we did get a body, transform it and send it back @BJC
    this.handler(this.request.body, (err, body) => {
      if (err !== null) {
        callback(err, null)
      }
      const res = new Response()
      res.body = body

      callback(null, res.toString())
    })
  }
}

module.exports = Afterburn
