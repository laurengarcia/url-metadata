const urlMetadata = require('./../index')

test('basic example', async () => {
  const url = 'https://www.npmjs.com/package/url-metadata'
  try {
    const metadata = await urlMetadata(url)
    expect(metadata.url).toBe(url)
  } catch (err) {
    expect(err).toBe(undefined)
  }
})

test('option to `includeResponseBody`, custom `headers`', async () => {
  const url = 'https://www.npmjs.com/package/url-metadata'
  try {
    const metadata = await urlMetadata(url, {
      includeResponseBody: true,
      requestHeaders: {
        'User-Agent': 'foo',
        From: 'bar@bar.com'
      }
    })
    expect(metadata.responseBody).toContain('<!doctype html>')
  } catch (err) {
    expect(err).toBe(undefined)
  }
})

test('redirect on link shortener', async () => {
  const url = 'https://bit.ly/3Bg19uM'
  try {
    const metadata = await urlMetadata(url)
    expect(metadata.url).not.toBe(url)
  } catch (err) {
    expect(err).toBe(undefined)
  }
})
