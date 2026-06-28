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
  } catch (err) {
    expect(err).toBe(undefined)
  }
})

const size = 1000
test('option: max `size` 1000 bytes aborts call & errors', async () => {
  try {
    const url = 'https://google.com'
    const metadata = await urlMetadata(url, { size })
    // should not reach here, but just in case:
    expect(metadata).toBeUndefined()
  } catch (err) {
    expect(err.message).toContain(`over limit: ${size}`)
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
      <link rel="shortcut icon" href="https://foo.com/favicon.ico" />
      <link rel="icon" href="/favicon.ico" />

    </head>
    <body>
      <h1>Metadata page</h1>

      <img src="http://foo.com/foo.jpg" alt="foo" title="bar" />
      <img src="//foo.com/bar.png" alt="bar" title="baz" />
      <img src="/baz.png" alt="baz" title="foo" width="10" height="20" />

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

    // test favicons length
    expect(metadata.favicons.length).toBe(4)

    // test favicon with absolute http:// --> https:// upgrade
    expect(metadata.favicons[0].href).toBe('https://foo.com/foo.png')
    expect(metadata.favicons[0].rel).toBe('icon')
    expect(metadata.favicons[0].type).toBe('image/png')
    expect(metadata.favicons[0].sizes).toBe('96x96')

    // test protocol-relative url //foo.com/favicon.svg -> https:// upgrade
    expect(metadata.favicons[1].href).toBe('https://foo.com/favicon.svg')
    expect(metadata.favicons[1].rel).toBe('icon')
    expect(metadata.favicons[1].type).toBe('image/svg+xml')
    expect(metadata.favicons[1].sizes).toBe(undefined)

    // test https:// passes thru untouched
    expect(metadata.favicons[2].href).toBe('https://foo.com/favicon.ico')
    expect(metadata.favicons[2].rel).toBe('shortcut icon')
    expect(metadata.favicons[2].type).toBe(undefined)
    expect(metadata.favicons[2].sizes).toBe(undefined)

    // test favicon with relative url passes thru untouched
    expect(metadata.favicons[3].href).toBe('/favicon.ico')
    expect(metadata.favicons[3].rel).toBe('icon')

    // test imgTags length
    expect(metadata.imgTags.length).toBe(3)

    // test imgTag for absolute http:// -> https:// upgrade
    expect(metadata.imgTags[0].src).toBe('https://foo.com/foo.jpg')
    expect(metadata.imgTags[0].alt).toBe('foo')
    expect(metadata.imgTags[0].title).toBe('bar')

    // test protocol-relative url //foo.com/bar.png -> https:// upgrade
    expect(metadata.imgTags[1].src).toBe('https://foo.com/bar.png')
    expect(metadata.imgTags[1].alt).toBe('bar')
    expect(metadata.imgTags[1].title).toBe('baz')

    // test imgTag with relative url passes thru untouched
    expect(metadata.imgTags[2].src).toBe('/baz.png')
    expect(metadata.imgTags[2].alt).toBe('baz')
    expect(metadata.imgTags[2].title).toBe('foo')
    expect(metadata.imgTags[2].width).toBe('10')
    expect(metadata.imgTags[2].height).toBe('20')
  } catch (err) {
    expect(err).toBe(undefined)
  }
})
