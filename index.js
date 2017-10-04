const process = require('process')
const handler = require('./function/handler')
const Afterburn = require('./afterburn')

const stdin = process.openStdin()
const stdout = process.stdout

const afterburn = Afterburn.new({ handler: handler })

stdin
  .pipe(afterburn.receiveData)
  .pipe(stdout)
