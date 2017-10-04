const test = require('ava')
const Response = require('./response')

test('toString appropriately converts a body to a full response', async (t) => {
  t.plan(1)
  var fixture = 'foo'

  const res = new Response()
  res.body = fixture

  const expected = 'HTTP/1.1 200 OK\r\nContent-Length: ' +
    fixture.length +
    '\r\n\r\n' +
    fixture

  const actual = res.toString()

  t.deepEqual(actual.toString(), expected)
})

// test('toHttpResponse adds appropriate headers and line endings for a strng', async (t) => {
//   t.plan(1)
//   var fixture = { 'foo': 1, 'bar': 'baz' }
//
//   const afterburn = new Afterburn(() => {})
//   const expected = 'HTTP/1.1 200 OK\r\nContent-Length: ' +
//     fixture.length +
//     '\r\n\r\n' +
//     fixture
//
//   const actual = afterburn.toHttpResponse(fixture)
//
//   t.deepEqual(actual.toString(), expected)
// })
