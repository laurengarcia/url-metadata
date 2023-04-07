// Example decode() option you can implement to handle custom encodings.
// This module is not opinionated about what you do in the decode() function,
// it simply receives a buffer as argument and returns a string.

const urlMetadata = require('./../index')

test('basic decode option', () => {

  const url = 'https://www.npmjs.com/package/url-metadata'

  const options = {
    decode: function (buf) {
      expect(Buffer.isBuffer(buf)).toBe(true)
      return buf.toString()
    }
  }

  return urlMetadata(url, options).then(
    function (metadata) {
      expect(typeof metadata.description).toBe('string')
      expect(metadata.url).toBe(url);
    },
    function (error) {
      expect(error).toBe(undefined)
    }
  )
})
