const urlMetadata = require('./../index')

test('EUC-JP charset auto-detected in `Content-Type` response header', async () => {
  const url = 'https://item.rakuten.co.jp/amely/c/0000000101/'
  const title = '【楽天市場】レ'
  try {
    const metadata = await urlMetadata(url)
    // Test decoding:
    expect(metadata.title).toContain(title)
  } catch (err) {
    expect(err).toBe(undefined)
  }
})

test('User-specified opts.decode=windows-1251 (Cyrillic)', async () => {
  const url = 'https://sattvinfo.net/'
  const title = 'спутниковое телевидение, установка и настройка спутникового телевидения '
  try {
    const metadata = await urlMetadata(url, { decode: 'windows-1251' })
    // If this breaks, it means the test is broken & we need a diff example url:
    expect(metadata['Content-Type']).toBe('text/html; charset=windows-1251')
    // Test decoding:
    expect(metadata.title).toBe(title)
  } catch (err) {
    expect(err).toBe(undefined)
  }
})

// ex: <meta charset="windows-1251"> (note: there are two charset meta tags on this page for some reason)
test('charset=windows-1251 (Cyrillic) auto-detected in meta tag', async () => {
  const url = 'https://sattvinfo.net/'
  const title = 'спутниковое телевидение, установка и настройка спутникового телевидения '
  try {
    const metadata = await urlMetadata(url)
    // If this breaks, it means the test is broken & we need a diff example url:
    expect(metadata['Content-Type']).toBe('text/html; charset=windows-1251')
    // Test decoding:
    expect(metadata.title).toBe(title)
  } catch (err) {
    expect(err).toBe(undefined)
  }
})

test('throws error with bad opts.decode', async () => {
  const url = 'https://www.npmjs.com/package/url-metadata'
  try {
    await urlMetadata(url, { decode: 'FOO-BAR' })
  } catch (err) {
    expect(err).toBeDefined()
  }
})
