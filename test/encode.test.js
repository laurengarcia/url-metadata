const urlMetadata = require('./../index')

test('basic encode option', async () => {

  const url = 'https://www.npmjs.com/package/url-metadata';

  const options = {
    encode: function (value) {
      expect(value).toBeDefined()
      return encodeURIComponent(value).replace(/['*]/g, escape)
    }
  }

  try {
    const metadata = await urlMetadata(url, options)
    expect(metadata.url).toBe('https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Furl-metadata')
  } catch(err) {
    expect(err).toBe(undefined)
  }
})
