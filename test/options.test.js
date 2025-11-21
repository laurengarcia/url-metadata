const urlMetadata = require('./../index')

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

test('options: `includeResponseBody`, custom `headers`, `descriptionLength`, `ensureSecureImageRequest`', async () => {
  const html = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>Metadata page</title>
      <meta name="author" content="foobar">
      <meta name="keywords" content="HTML, CSS, JavaScript">
      <meta name="description" content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been">

      <link rel="icon" type="image/png" href="http://foo.com/foo.png" sizes="96x96" />
      <link rel="icon" type="image/svg+xml" href="//foo.com/favicon.svg" />
      <link rel="shortcut icon" href="//foo.com/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="http://foo.com/apple-touch-icon.png" />

    </head>
    <body>
      <h1>Metadata page</h1>

      <img src="http://foo.com/foo.jpg" alt="bar" title="baz" />
      <img src="//foo.com/bar.png" alt="foobar" title="foobaz" />

    </body>
  </html>
  `
  const response = new Response(html, {
    headers: {
      'Content-Type': 'text/html'
    }
  })

  try {
    const metadata = await urlMetadata(null, {
      parseResponseObject: response,
      includeResponseBody: true,
      requestHeaders: {
        'User-Agent': 'foo',
        From: 'bar@bar.com'
      },
      descriptionLength: 20,
      ensureSecureImageRequest: true
    })

    expect(metadata.responseBody).toContain('<!DOCTYPE html>')
    expect(metadata.description.length).toBe(20)

    expect(metadata.imgTags.length).toBe(2)
    expect(metadata.imgTags[0].src).toBe('https://foo.com/foo.jpg')
    expect(metadata.imgTags[0].alt).toBe('bar')
    expect(metadata.imgTags[0].title).toBe('baz')
    expect(metadata.imgTags[1].src).toBe('https://foo.com/bar.png')

    // TODO: test favicons for https:// upgrade

  } catch (err) {
    expect(err).toBe(undefined)
  }
})
