const through2 = require('through2');

module.exports = function (file, opts) {
  // set default obj if undefined
  opts = opts || {}
  
  let code = '';
  const startTag = opts.startTag || 'start-strip-code'
  const endTag = opts.endTag || 'end-strip-code'
  const startComment = '\\/\\* '
  const endComment = ' \\*\\/'
  const startBlock = startComment + startTag + endComment
  const endBlock = startComment + endTag + endComment
  const codeBetweenTags = '((?:.|)*)'
  const stripCodeExpression = new RegExp(startBlock + codeBetweenTags + endBlock, 'gms')
  
  return through2.obj(function stripCodeThrough(/**Buffer*/buf, enc, next) {
    /*  accumulate the code chunks  */
    code += buf.toString('utf8')
    next()
  }, function stripCodeThroughNext(next) {
    if (!Array.isArray(opts.whitelist) || opts.whitelist.findIndex(item => (file.indexOf(item) !== -1)) !== -1) {
      /*  transform the code  */
      code = code.replace(stripCodeExpression, '')
    }
    this.push(Buffer.from(code))
    next()
  })
}