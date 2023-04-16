const urlMetadata = require('./../index')

test('fails gracefully', async () => {
  const url = 'XYZ'
  try {
    const metadata = await urlMetadata(url)
    expect(metadata.robots).toBe('all')
  } catch (err) {
    expect(err).toBeDefined()
  }
})
