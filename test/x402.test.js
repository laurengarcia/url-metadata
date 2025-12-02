const urlMetadata = require('./../index')

test('x402 error', async () => {
  try {
    const url = 'https://minifetch.com/api/v1/x402/extract/url-metadata'
    const metadata = await urlMetadata(url)
    // should not reach here, but just in case:
    expect(metadata).toBeUndefined()
  } catch (err) {
    expect(err.message).toContain('response code 402')
    expect(err.paymentRequired).toBe(true)
    expect(err.x402.error).toBe('X-PAYMENT header is required')
    expect(err.x402.x402Version).toBe(1)
    expect(err.x402.accepts).toBeDefined()
  }
})
