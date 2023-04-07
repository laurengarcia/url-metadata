const urlMetadata = require('./../index')

test('basic encode option', () => {

  const url = 'https://www.npmjs.com/package/url-metadata';

  const options = {
    encode: function (value) {
      expect(value).toBeDefined()
      return encodeURIComponent(value).replace(/['*]/g, escape)
    }
  }

  return urlMetadata(url, options).then(
    function (metadata) {
      expect(metadata.url).toBe('https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Furl-metadata')
    },
    function (error) {
      console.log(error)
    }
  )
})
