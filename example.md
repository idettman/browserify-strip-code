# Usage Example

## This shows how to use the transform from the javascript build file 

### Example `build.js` file which can be ran as follows: `node build.js`

```javascript
const browserify = require('browserify')
const fs = require('fs')
const path = require('path')
const stripCode = require('browserify-strip-code')

const b = browserify()
b.add('./index.js')
/**
* the strip code transform accepts an optional object with a whitelist property,
* which is an array of filenames that will be the only files processed, ignoring all other files if defined
*/
b.transform(stripCode, {whitelist:['index.js']})
b.bundle().pipe(fs.createWriteStream(path.join(__dirname, 'bundle.js')))
```

### The `index.js` file from the example. Browserify builds and the transform will remove code block between the comments

```javascript

/* start-test-block */
console.log('REMOVE')
console.log('REMOVE 2')
/* end-test-block */

console.log('SHOULD NOT BE REMOVED')
```
