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

test('disable default filtering agent blocking request to 127.0.0.1:9191', async () => {
  const url = 'http://127.0.0.1:9191'
  try {
    const metadata = await urlMetadata(url, {
      requestFilteringAgentOptions: {
        allowPrivateIPAddress: true
      }
    })
    expect(metadata).toBeUndefined()
  } catch (err) {
    expect(err).toBeDefined()
    // `ECONNREFUSED` error thrown when there's nothing
    // running on 127.0.0.1:9191
    expect(err.message).toContain('ECONNREFUSED')
  }
})
