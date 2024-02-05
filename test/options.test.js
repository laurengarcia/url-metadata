const urlMetadata = require('./../index')

test('options `includeResponseBody`, custom `headers`, truncate description, ensureSecureImageRequest', async () => {
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

test('option ensureSecureImageRequest', async () => {
  const url = 'http://news.bbc.co.uk '
  try {
    const metadata = await urlMetadata(url, {
      ensureSecureImageRequest: true
    })
    // this page has favicons with `//:` protocol-relative cases
    // with no scheme; ensure they get upgraded to 'https://'
    metadata.favicons.forEach(function (favicon) {
      expect(favicon.href.indexOf('https://')).toBe(0)
    })
  } catch (err) {
    expect(err).toBe(undefined)
  }
})
