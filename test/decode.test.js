// Test decode() option you can implement to handle custom encodings.
// This module is not opinionated about what you do in the decode() function,
// it simply receives a buffer as argument and returns a string.

const urlMetadata = require('./../index')

test('basic decode option', async () => {

  const url = 'https://www.npmjs.com/package/url-metadata'

  const options = {
    decode: function (buf) {
      expect(Buffer.isBuffer(buf)).toBe(true)
      return buf.toString()
    }
  }

  try {
    const metadata = await urlMetadata(url, options)
    expect(typeof metadata.description).toBe('string')
    expect(metadata.url).toBe(url);
  } catch(err) {
    expect(err).toBe(undefined)
  }
})
