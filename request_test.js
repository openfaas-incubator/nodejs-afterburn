const test = require('ava')
const Request = require('./request')

test('parseBody correctly parses a body when Content-Length is present', async (t) => {
  t.plan(1)

  // TODO: Verify with @alexellis that this is how requests are received. @BJC
  let fixture = '' +
    'User Agent: curl/7.43.0\r\n' +
    'Accept: */*\r\n' +
    'Method: GET\r\n' +
    'Query: action=quote&qty=1&productId=105\r\n' +
    'Content-Length: 10\r\n' +
    '\r\n' +
    '0123456789'

  const req = new Request()

  req.raw = fixture
  req.parseHeaders()

  const actual = req.parseBody()
  const expected = '0123456789'

  t.deepEqual(actual, expected)
})

test('parseHeaders correctly parses a full set of headers', async (t) => {
  t.plan(1)

  // TODO: Verify with @alexellis that this is how requests are received. @BJC
  let fixture = '' +
    'User Agent: curl/7.43.0\r\n' +
    'Accept: */*\r\n' +
    'Method: GET\r\n' +
    'Query: action=quote&qty=1&productId=105\r\n' +
    '\r\n'

  const req = new Request()
  req.raw = fixture
  const actual = req.parseHeaders()
  const expected = {
    'User Agent': 'curl/7.43.0',
    'Accept': '*/*',
    'Method': 'GET',
    'Query': 'action=quote&qty=1&productId=105'
  }

  t.deepEqual(actual, expected)
})

test('parseHeaders fails on incomplete headers', async (t) => {
  t.plan(1)

  // TODO: Verify with @alexellis that this is how requests are received. @BJC
  let fixture = 'User Agent: curl/7.43.0\r\n'

  const req = new Request()
  req.raw = fixture
  const actual = req.parseHeaders()
  const expected = false

  t.deepEqual(actual, expected)
})

test('parseHeaders memoizes previously parsed headers', async (t) => {
  t.plan(2)

  // TODO: Verify with @alexellis that this is how requests are received. @BJC
  let fixture = '' +
    'User Agent: curl/7.43.0\r\n' +
    'Accept: */*\r\n' +
    'Method: GET\r\n' +
    'Query: action=quote&qty=1&productId=105\r\n' +
    '\r\n'

  const req = new Request()
  req.raw = fixture
  let actual = req.parseHeaders()
  let expected = {
    'User Agent': 'curl/7.43.0',
    'Accept': '*/*',
    'Method': 'GET',
    'Query': 'action=quote&qty=1&productId=105'
  }

  // Check initial state
  t.deepEqual(actual, expected)

  // Change the headers
  fixture = '' +
    'User Agent: curl/7.43.0\r\n' +
    'Query: action=quote&qty=1&productId=105\r\n' +
    '\r\n'

  actual = req.parseHeaders()
  req.raw = fixture
  t.deepEqual(actual, expected)
})

// test('toString adds appropriate headers and line endings for a strng', async (t) => {
//   t.plan(1)
//   var fixture = 'foo'
//
//   const req = new Request()
//   req.addChunk(fixture)
//
//   const expected = 'HTTP/1.1 200 OK\r\n\r\n' +
//     fixture
//
//   const actual = req.toString()
//
//   t.deepEqual(actual.toString(), expected)
// })

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
