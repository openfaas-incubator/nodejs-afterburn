class Request {
  constructor () {
    this.headers = {}
    this.headerLength = 0
    this.body = ''
    this.bodyLength = 0
    this.raw = ''

    // This is used to delimit headers from body
    this.delimiter = '\r\n\r\n'
  }

  addChunk (chunk) {
    this.raw += chunk
    this.length += chunk.length

    if (this.parseHeaders() && this.parseBody()) {
      this.complete = true
    }
  }

  parseBody () {
    if (this.body !== '') {
      return this.body
    }

    this.bodyLength = this.headers['Content-Length'] || this.raw.length

    // If we don't have the whole body, wait
    if (this.raw.length < this.bodyLength) {
      return false
    }

    this.body = this.raw.slice(this.headerLength, this.headerLength + this.bodyLength)

    return this.body
  }

  parseHeaders () {
    // If we've already parsed headers, lets not do it again
    if (Object.keys(this.headers).length !== 0) {
      return this.headers
    }

    // Try to find the end of the header block, if not found assume we need another chunk
    let index = this.raw.indexOf(this.delimiter)
    if (index === -1) {
      return false
    }

    // Get the headers as a string
    this.headerLength = index + this.delimiter.length
    let rawHeaders = this.raw.slice(0, this.headerLength)

    // Build the header object
    rawHeaders.split('\r\n').reduce((m, obj) => {
      if (obj.length > 0) {
        let key = obj.substring(0, obj.indexOf(': '))
        let value = obj.substring(obj.indexOf(': ') + 2)
        m[key] = value
      }
      return m
    }, this.headers)

    return this.headers
  }

  // toString () {
  //   let headers = this.headers
  //   if (Object.keys(this.headers).length === 0) {
  //     return 'Error: No Headers'
  //   }
  //
  //   let str = Object.keys(headers).reduce((str, key) => {
  //     return str.concat(key + headers[key] + '\r\n')
  //   }, 'HTTP/1.1 200 OK\r\n')
  //
  //   str.concat('\r\n')
  //   str.concat(this.body)
  //
  //   return Buffer.from(str)
  // }
}

module.exports = Request
