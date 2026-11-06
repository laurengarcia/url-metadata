import urlMetadata from 'url-metadata';

test('esm import works', async () => {
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
});
