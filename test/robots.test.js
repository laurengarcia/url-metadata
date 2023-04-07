const urlMetadata = require('./../index')

test('retrieves robots meta directives', async () => {
  const url = 'https://moz.com/learn/seo/robots-meta-directives'
  try {
    const metadata = await urlMetadata(url)
    expect(metadata.robots).toBe('all')
  } catch (err) {
    expect(err).toBe(undefined)
  }
})
