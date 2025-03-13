const urlMetadata = require('./../index')

test('handle <meta> tags w itemprop in <head>, ignore <meta> tags w itemprop in <body>', async () => {
  // StackOverflow.com pages have overloaded meta tags like the one in the <head> of this ex:
  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
  <meta name="twitter:description" property="og:description" itemprop="description" content="this is a sample description" />
  </head>
  <body>
  <div class="box less-space hero-image-wrapper" itemprop="image" itemscope itemtype="https://schema.org/ImageObject">
     <img src="https://cdn.mos.cms.futurecdn.net/GqMegaDvjg6v4hVKvJ4a83-320-80.png">
     <meta itemprop="url" content="https://cdn.mos.cms.futurecdn.net/GqMegaDvjg6v4hVKvJ4a83.png">
     <meta itemprop="description" content="this is a sample image"
     <meta itemprop="height" content="600">
     <meta itemprop="width" content="338">
  </div>
  </body>
  </html>
  `
  const response = new Response(html, {
    headers: {
      'Content-Type': 'text/html'
    }
  })

  try {
    const metadata = await urlMetadata(null, { parseResponseObject: response })
    expect(metadata.url).toBe('') // ignores <meta> tag w `itemprop="url"` in body
    const correct = 'this is a sample description'
    expect(metadata.description).toBe(correct)
    expect(metadata['og:description']).toBe(correct)
    expect(metadata['twitter:description']).toBe(correct)
  } catch (e) {
    expect(e).toBe(undefined)
  }
})
