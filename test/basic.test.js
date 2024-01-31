const urlMetadata = require('./../index')

test('basic example', async () => {
  const url = 'https://www.npmjs.com/package/url-metadata'
  const title = 'url-metadata - npm'
  try {
    const metadata = await urlMetadata(url)
    expect(metadata.url).toBe(url)
    expect(metadata.title).toBe(title)
    expect(metadata.lang).toBe('en')
    expect(metadata.charset).toBe('utf-8')
    expect(metadata['og:url']).toBe(url)
    expect(metadata['og:title']).toBe('url-metadata')
    expect(metadata.description.length).toBeGreaterThan(10)
    expect(metadata['twitter:description'].length).toBeGreaterThan(10)
    expect(metadata.favicons.length).toBeGreaterThan(1)
    expect(metadata.headings.length).toBeGreaterThan(3)
    expect(metadata.headings[0].level).toBe('h1')
    expect(metadata.headings[0].text).toBe('url-metadata')
    expect(metadata.imgTags.length).toBeGreaterThan(1)
    expect(metadata.imgTags[0].src).toBe('https://static-production.npmjs.com/255a118f56f5346b97e56325a1217a16.svg')
    expect(metadata.imgTags[0].alt).toBe('TypeScript icon, indicating that this package has built-in type declarations')
    expect(metadata.imgTags[0].title).toBe('This package contains built-in TypeScript declarations')
  } catch (err) {
    expect(err).toBe(undefined)
  }
})

test('option to `includeResponseBody`, custom `headers`, truncate description, ensureSecureImageRequest', async () => {
  const url = 'https://www.npmjs.com/package/url-metadata'
  try {
    const metadata = await urlMetadata(url, {
      includeResponseBody: true,
      requestHeaders: {
        'User-Agent': 'foo',
        From: 'bar@bar.com'
      },
      descriptionLength: 20,
      ensureSecureImageRequest: true
    })
    expect(metadata.responseBody).toContain('<!doctype html>')
    expect(metadata.description.length).toBe(20)
    expect(metadata.imgTags.length).toBeGreaterThan(1)
    expect(metadata.imgTags[0].src).toBe('https://static-production.npmjs.com/255a118f56f5346b97e56325a1217a16.svg')
  } catch (err) {
    expect(err).toBe(undefined)
  }
})

test('redirect on link shortener', async () => {
  const url = 'https://bit.ly/3Bg19uM'
  try {
    const metadata = await urlMetadata(url)
    expect(metadata.requestUrl).toBe(url)
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
