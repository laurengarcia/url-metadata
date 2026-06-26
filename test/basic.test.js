const urlMetadata = require('./../index')

test('basic https:// fetch', async () => {
  const url = 'https://minifetch.com'
  try {
    const metadata = await urlMetadata(url)
    expect(metadata.requestUrl).toBe(url)
    expect(metadata.responseStatusCode).toBe(200)
    expect(typeof metadata.responseHeaders).toBe('object')
    expect(metadata.responseHeaders['content-type']).toContain('text/html')
    expect(metadata.redirects).toBeDefined()
    expect(metadata.redirects.count).toBe(0)
    expect(metadata.redirects.chain.length).toBe(0)
    expect(metadata.performance).toBeDefined()
    expect(metadata.performance.redirectTimeMs).toBe(undefined) // invariant test; no redirects expected
    expect(metadata.url).toContain(url)
    expect(metadata.title).toContain('SEO')
    expect(metadata.lang).toBe('en')
    expect(metadata.charset).toBe('UTF-8')
    expect(metadata.viewport).toBe('width=device-width, initial-scale=1.0')
    expect(metadata['og:url']).toBe(url)
    expect(metadata['og:title']).toContain('SEO')
    expect(metadata.description.length).toBeGreaterThan(10)
    expect(metadata['twitter:description'].length).toBeGreaterThan(10)
    expect(metadata.favicons.length).toBeGreaterThan(1)
    expect(metadata.favicons[0].rel).toBe('icon')
    expect(metadata.favicons[3].rel).toBe('apple-touch-icon')
    expect(Array.isArray(metadata.jsonld)).toBe(true)
    expect(metadata.jsonld.length).toBeGreaterThan(0)
    expect(metadata.headings.length).toBeGreaterThan(3)
    expect(metadata.headings[0].level).toBe('h1')
  } catch (err) {
    expect(err).toBe(undefined)
  }
})

test('basic http:// fetch', async () => {
  try {
    const url = 'http://httpforever.com/'
    const metadata = await urlMetadata(url)
    expect(metadata).toBeDefined()
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

test('favicons & images', async () => {
  const url = 'https://developer.apple.com/safari/resources/'
  const metadata = await urlMetadata(url, {
    requestHeaders: {
      'User-Agent': 'sparky',
      From: 'foobarred@foo.com'
    }
  })
  expect(metadata.favicons.length).toBe(3)
  expect(metadata.favicons[0].rel).toBe('shortcut icon')
  // Safari pinned tab 'mask-icons' can have 'color' attribute:
  expect(metadata.favicons[2].rel).toBe('mask-icon')
  expect(metadata.favicons[2].color).toBe('#333333')

  expect(metadata.imgTags.length).toBeGreaterThan(1)
  expect(metadata.imgTags[0].src).toContain('.png')
  expect(metadata.imgTags[0].alt).toBe('')
  expect(metadata.imgTags[0].title).toBe(undefined)
})
