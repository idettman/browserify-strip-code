# browserify-strip-code transform
Browserify transform for removing code between the following start and end comment blocks.

```
/* start-strip-code */  
  // Code contained between the start and end strip code comments can be removed when browserify bundles all required js files...
  // Useful to expose private methods for unit testing, and is removed by browserify during bundling if the transform is applied
  
  exportObj.__test__setData = setData;

/* end-strip-code */

 ```
If the optional `whitelist` array argument is defined, only whitelisted filenames will be processed.

---
## Configuration
The comment start and end tags can be configured using the config props `startTag` and `endTag`: `{ startTag: "start-foo-remove", endTag: "end-foo-remove" }`

The browserify-strip-code transform can be configured to only process files from a whitelist: `{ whitelist: [file1.js, file2.js, file3.js] }`

### Change the start and end tag comment strings
```javascript
b.transform(stripCode, {startTag: 'start-test-block', endTag: 'end-test-block'})
```

### Transform every file
Calling the transform with an empty object, will strip code from any js files with the strip comment blocks
 
```javascript
b.transform(stripCode, {})
```
 
### Only strip code from files set in the options whitelist
Calling the transform with an object with a whitelist array property, will only strip code from filenames containing in whitelist array.
This reduces build processing time by only running RegEx on code in whitelisted files

```javascript
// Only index.js file will be processed to strip code surrounded by comments
b.transform(stripCode, {whitelist:['index.js']})
```


## Full Usage Example
Shows how to create a simple build file using browserify and the browserify-strip-code transform

Create a `build.js` file, containing the following code

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

The `index.js` file contains the following code

```javascript
/* start-strip-code */
console.log('REMOVE TEST 1')
console.log('REMOVE TEST 2')
/* end-strip-code */

console.log('THIS LOG SHOULD NOT BE REMOVED')
```