const urlMetadata = require('./../index')

test('basic example', async () => {
  const url = 'https://www.npmjs.com/package/url-metadata'
  const title = 'url-metadata - npm'
  try {
    const metadata = await urlMetadata(url)
    expect(metadata.title).toBe(title)
    expect(metadata.url).toBe(url)
    expect(metadata['og:url']).toBe(url)
    expect(metadata['og:title']).toBe('url-metadata')
    expect(metadata.description.length).toBeGreaterThan(10)
    expect(metadata['twitter:description'].length).toBeGreaterThan(10)
    expect(metadata.favicons.length).toBeGreaterThan(1)
  } catch (err) {
    expect(err).toBe(undefined)
  }
})

test('option to `includeResponseBody`, custom `headers`, truncate description', async () => {
  const url = 'https://www.npmjs.com/package/url-metadata'
  try {
    const metadata = await urlMetadata(url, {
      includeResponseBody: true,
      requestHeaders: {
        'User-Agent': 'foo',
        From: 'bar@bar.com'
      },
      descriptionLength: 20
    })
    expect(metadata.responseBody).toContain('<!doctype html>')
    expect(metadata.description.length).toBe(20)
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

test('no error when favicons missing from page', async () => {
  const url = 'https://www.crypto51.app/'
  try {
    const metadata = await urlMetadata(url)
    expect(metadata.favicons.length).toBe(0)
  } catch (err) {
    expect(err).toBe(undefined)
  }
})
