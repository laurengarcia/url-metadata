const urlMetadata = require('./../index')

test('basic example', async () => {
  const url = 'https://www.npmjs.com/package/url-metadata'
  try {
    const metadata = await urlMetadata(url)
    expect(metadata.url).toBe(url)
  } catch(err) {
    expect(err).toBe(undefined)
  }
})
