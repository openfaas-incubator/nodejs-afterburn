const Afterburn = require('./afterburn')
const test = require('ava')
const concat = require('concat-stream')

// const Readable = require('stream').Readable
// const Writable = require('stream').Writable

test('Afterburn adds data to the buffer', async (t) => {
  t.plan(2)

  const afterburn = new Afterburn(() => {})
  afterburn.end('foo')
  afterburn.pipe(concat(() => {
    t.deepEqual(afterburn.request.raw, 'foo')
    t.deepEqual(afterburn.request.raw.length, 3)
  }))
})

test('Afterburn adds data to the buffer', async (t) => {
  t.plan(2)

  const afterburn = new Afterburn(() => {})
  afterburn.write('foo')
  afterburn.write('bar')
  afterburn.end()
  afterburn.pipe(concat(() => {
    t.deepEqual(afterburn.request.raw, 'foobar')
    t.deepEqual(afterburn.request.raw.length, 6)
  }))
})
