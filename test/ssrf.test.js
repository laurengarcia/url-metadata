const urlMetadata = require('./../index')

test('default req filtering agent opts blocks localhost:3000', async () => {
  const url = 'http://localhost:3000'
  try {
    await urlMetadata(url)
  } catch (err) {
    expect(err).toBeDefined()
    expect(err.message).toContain('fetch failed')
  }
})

test('default filtering agent opts blocks 127.0.0.1:8080', async () => {
  const url = 'http://127.0.0.1:8080/'
  try {
    await urlMetadata(url)
  } catch (err) {
    expect(err).toBeDefined()
    expect(err.message).toContain('fetch failed')
  }
})

// Test this against a running localhost on port 8080.
// Keep commented out otherwise:

// test('filtering agent opts allows 127.0.0.1:8080', async () => {
//   const url = 'http://127.0.0.1:8080/'
//   try {
//     const metadata = await urlMetadata(url, {
//       requestFilteringAgentOptions: {
//         allowPrivateIpAddress: true
//       }
//     })
//     console.log(metadata)
//   } catch (err) {
//     expect(err).toBe(undefined)
//   }
// })
