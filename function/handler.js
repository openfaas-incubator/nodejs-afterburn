// Would be neat to make the signature (req, res) which would look like a
// normal webserver.  We should at least pass the headers and params parsed? @BJC
module.exports = function (body, callback) {
  let result = body
  callback(null, result)
}
