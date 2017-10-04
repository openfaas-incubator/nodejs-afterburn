class Response {
  constructor () {
    this.body = ''
  }

  toString () {
    return Buffer.from(
      'HTTP/1.1 200 OK\r\n' +
      'Content-Length: ' + this.body.length + '\r\n' +
      '\r\n' +
      this.body)
  }
}

module.exports = Response
