const urlMetadata = require('./../index')

test('options: `includeResponseBody`, custom `headers`, `descriptionLength`, `ensureSecureImageRequest`', async () => {
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

test('option: `parseResponseObject` from html string', async () => {
  const html = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>Metadata page</title>
      <meta name="author" content="foobar">
      <meta name="keywords" content="HTML, CSS, JavaScript">
    </head>
    <body>
      <h1>Metadata page</h1>
    </body>
  </html>
  `
  const response = new Response(html, {
    headers: {
      'Content-Type': 'text/html'
    }
  })

  try {
    // pass null `url` param & response object as option
    const metadata = await urlMetadata(null, { parseResponseObject: response })
    expect(metadata.url).toBe('')
    expect(metadata.title).toBe('Metadata page')
    expect(metadata.lang).toBe('en')
    expect(metadata.charset).toBe('utf-8')
    expect(metadata.author).toBe('foobar')
  } catch (e) {
    expect(e).toBe(undefined)
  }
})

const size = 1000
test('option: max `size` 1000 bytes aborts call & errors', async () => {
  try {
    const url = 'https://google.com'
    const metadata = await urlMetadata(url, { size })
    // should not reach here, but just in case:
    expect(metadata).toBeUndefined()
  } catch (e) {
    expect(e.message).toContain(`over limit: ${size}`)
  }
})
