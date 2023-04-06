const urlMetadata = require('./../index')

// Example decode() option you can implement to handle custom encodings.
// This module is not opinionated about what you do in the decode() function,
// only that it takes a buffer as its argument and returns a string:

const options = {
  decode: function (buf) {
    console.log(`decode() should be true: ${Buffer.isBuffer(buf)}`)
    return buf.toString()
  }
}
urlMetadata('https://www.npmjs.com/package/url-metadata', options).then(
  function (metadata) { // success callback
    console.log(metadata)
  },
  function (error) { // failure callback
    console.log(error)
  })
