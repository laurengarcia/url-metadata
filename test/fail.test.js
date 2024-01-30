const urlMetadata = require('./../index')

test('fails gracefully', async () => {
  const url = 'XYZ'
  try {
    const metadata = await urlMetadata(url)
    // Test should never reach here due to error above,
    // and if it does the test isnt working
    expect(metadata.robots).toBe('all')
  } catch (err) {
    expect(err).toBeDefined()
  }
})
