const urlMetadata = require('./../index')

test('node version', async () => {
  // SSRF features will only work in Node v18+
  const nodeVersionNumber = parseInt(process.version.slice(1))
  expect(nodeVersionNumber).toBeGreaterThan(18)
})

test('default filtering agent opts blocks 127.0.0.1:8080', async () => {
  const url = 'http://127.0.0.1:8080/'
  try {
    const metadata = await urlMetadata(url)
    // should not get here but just in case:
    expect(metadata).toBeUndefined()
  } catch (err) {
    expect(err).toBeDefined()
    expect(err.message).toContain('is private IP address.')
  }
})
