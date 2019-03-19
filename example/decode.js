const urlMetadata = require('./../index')

// Example decode() option you can implement to handle custom encodings.
// Here we are decoding Japanese EUC-JP encoded metadata.
// This module is not opinionated about what you do in the decode() function,
// only that it takes a buffer as its argument and returns a string:
//
// const urlMetadata = require('url-metadata')
// const detectCharacterEncoding = require('detect-character-encoding')
// const iconv = require('iconv-lite')

// const options = {
//   decode: function (buf) {
//     console.log(`isBuffer() should be true: ${Buffer.isBuffer(buf)}`)

//     const result = detectCharacterEncoding(buf)
//     if (!result) {
//       return ''
//     }
//     const encoding = result.encoding
//     console.log(`encoding: ${encoding}`)
//     if (encoding === 'UTF-8') {
//       return buf.toString()
//     }
//     if (!iconv.encodingExists(encoding)) {
//       return ''
//     }
//     return iconv.decode(buf, encoding)
//   }
// }
// urlMetadata('https://www.rakuten.co.jp/', options).then(
//   function (metadata) { // success callback
//     console.log(metadata)
//   },
//   function (error) { // failure callback
//     console.log(error)
//   })

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
