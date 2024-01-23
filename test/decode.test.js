const urlMetadata = require('./../index')

// Test handling of Cyrillic charset in meta tag (not `content-type` header!)
// <meta http-equiv="Content-Type" content="text/html; charset=windows-1251" />

test('Cyrillic charset=windows-1251', async () => {
  const url = 'https://sattvinfo.net/'
  // TODO: const title = 'спутниковое телевидение, установка и настройка спутникового телевидения '
  try {
    const metadata = await urlMetadata(url)
    // TODO: expect(metadata.title).toBe(title)
    expect(metadata['Content-Type']).toBe('text/html; charset=windows-1251')
  } catch (err) {
    expect(err).toBe(undefined)
  }
})
