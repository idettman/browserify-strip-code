const through2 = require('through2');

module.exports = function (file, opts) {
  let code = '';
  return through2.obj(function stripCodeThrough(/**Buffer*/buf, enc, next) {
    /*  accumulate the code chunks  */
    code += buf.toString('utf8')
    next()
  }, function stripCodeThroughNext(next) {
    /*  transform the code  */
    code = code.replace(/\/\* start-test-block \*\/((?:.|\n)*)\/\* end-test-block \*\//gm, '')
    this.push(Buffer.from(code))
    next()
  })
}