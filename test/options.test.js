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

// test('option: `ensureSecureImageRequest` edge cases', async () => {
//   const url = 'http://news.bbc.co.uk '
//   try {
//     const metadata = await urlMetadata(url, {
//       requestHeaders: {
//         'User-Agent': 'sparky',
//         From: 'foobarred@foo.com'
//       },
//       ensureSecureImageRequest: true
//     })
//     // this page has favicons with `//:` protocol-relative cases
//     // with no scheme; ensure they get upgraded to 'https://'
//     metadata.favicons.forEach((favicon) => {
//       expect(favicon.href.indexOf('https://')).toBe(0)
//     })
//     // this page also has img tags with base64 data URIs
//     // make sure those are untouched but other imgs are `https://`
//     metadata.imgTags.forEach((img) => {
//       const httpsIndex = img.src.indexOf('https://')
//       const dataUriIndex = img.src.indexOf('data:')
//       expect(httpsIndex === 0 || dataUriIndex === 0).toBe(true)
//     })
//   } catch (err) {
//     expect(err).toBe(undefined)
//   }
// })

test('option: `parseResponseObject`', async () => {
  try {
    const url = 'https://www.npmjs.com/package/url-metadata'
    const response = await fetch(url)
    // pass null `url` param & response object as option`
    const metadata = await urlMetadata(null, { parseResponseObject: response })
    expect(metadata.url).toBe(url)
    expect(metadata.title).toBe('url-metadata - npm')
    expect(metadata.lang).toBe('en')
    expect(metadata.charset).toBe('utf-8')
  } catch (e) {
    expect(e).toBe(undefined)
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
