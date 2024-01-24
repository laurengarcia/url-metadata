const urlMetadata = require('./../index')

// Test user-specified opts.decode `windows-1251`
test('Cyrillic charset=windows-1251', async () => {
  const url = 'https://sattvinfo.net/'
  const title = 'спутниковое телевидение, установка и настройка спутникового телевидения '
  try {
    const metadata = await urlMetadata(url, { decode: 'windows-1251' })
    // If this breaks, it means the test is broken & we need a diff example url:
    expect(metadata['Content-Type']).toBe('text/html; charset=windows-1251')
    expect(metadata.title).toBe(title)
  } catch (err) {
    expect(err).toBe(undefined)
  }
})

// Test auto-detection of Cyrillic charset in meta tag (not `Content-Type` header!)
// <meta http-equiv="Content-Type" content="text/html; charset=windows-1251" />
test('Cyrillic charset=windows-1251', async () => {
  const url = 'https://sattvinfo.net/'
  // TODO: const title = 'спутниковое телевидение, установка и настройка спутникового телевидения '
  try {
    const metadata = await urlMetadata(url)
    // If this breaks, it means the test is broken & we need a diff example url:
    expect(metadata['Content-Type']).toBe('text/html; charset=windows-1251')
    // TODO: expect(metadata.title).toBe(title)
  } catch (err) {
    expect(err).toBe(undefined)
  }
})
