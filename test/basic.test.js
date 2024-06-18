const urlMetadata = require('./../index')

test('basic example', async () => {
  const url = 'https://www.npmjs.com/package/url-metadata'
  try {
    const metadata = await urlMetadata(url)
    expect(metadata.url).toBe(url)
    expect(metadata.title).toBe('url-metadata - npm')
    expect(metadata.lang).toBe('en')
    expect(metadata.charset).toBe('utf-8')
    expect(metadata['og:url']).toBe(url)
    expect(metadata['og:title']).toBe('url-metadata')
    expect(metadata.description.length).toBeGreaterThan(10)
    expect(metadata['twitter:description'].length).toBeGreaterThan(10)
    expect(metadata.favicons.length).toBe(10)
    expect(metadata.favicons[0].rel).toBe('apple-touch-icon')
    expect(metadata.favicons[9].rel).toBe('icon')
    expect(Array.isArray(metadata.jsonld)).toBe(true)
    expect(metadata.jsonld.length).toBe(0)
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

test('favicons', async () => {
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
})
