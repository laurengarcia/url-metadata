const urlMetadata = require('./../index')

// To run this test file standalone:
// npx jest test/proxy.test.js --detectOpenHandles
// or
// npx jest test/proxy.test.js --detectOpenHandles -t "call with params"

const proxyUrl = 'http://api.scraperapi.com/'
const apiKey = process.env.SCRAPERAPI_KEY

test('proxy: ScraperAPI basic call', async () => {
  if (!apiKey) throw new Error('Set SCRAPERAPI_KEY env var to run this test')
  const url = 'https://minifetch.com'
  try {
    const metadata = await urlMetadata(url, {
      proxyUrl,
      proxyParams: { api_key: apiKey }
    })
    expect(metadata.responseStatusCode).toBe(200)
    expect(metadata.title).toContain('SEO')
  } catch (err) {
    expect(err).toBe(undefined)
  }
}, 60000)

test('proxy: ScraperAPI call with params', async () => {
  if (!apiKey) throw new Error('Set SCRAPERAPI_KEY env var to run this test')
  // const url = 'https://www.ebay.com/itm/358599586518' // reachable w premium:true param
  const url = 'https://quotes.toscrape.com/js/' // needs option.includeResponseBody: true
  try {
    const metadata = await urlMetadata(url, {
      // url-metadata's own `timeout` now defaults to 60000ms automatically in
      // proxy mode (proxyUrl set), so no need to pass it explicitly here
      // anymore — jest's own per-test timeout below still needs bumping tho.
      includeResponseBody: true,
      proxyUrl,
      proxyParams: {
        api_key: apiKey,
        // No extra credit cost: wait_for_selector, country_code,
        //   session_number, device_type, keep_headers
        // Extra credit cost: premium, render, screenshot, ultra_premium
        //
        // country_code: 'us', // works, get results from a specific region
        // premium: true, // works, run thru hi quality residential proxies
        // render: true, // works, with caveats in README
        screenshot: true // works, triggers render: true, check `sa-screenshot` response header
      }
    })
    expect(metadata.responseStatusCode).toBe(200)
    expect(metadata.responseHeaders['sa-screenshot']).toBeDefined()
    expect(metadata.responseHeaders['sa-credit-cost']).toBeDefined()
  } catch (err) {
    expect(err).toBe(undefined)
  }
}, 60000)


test('proxy: omitting proxyUrl with proxyParams errors', async () => {
  if (!apiKey) throw new Error('Set SCRAPERAPI_KEY env var to run this test')
  const url = 'https://minifetch.com'
  try {
    const metadata = await urlMetadata(url, {
      proxyParams: { api_key: apiKey }
    })
    expect(metadata.responseStatusCode).toBe(200)
    // shouldn't get here but just in case
    expect(metadata).toBeUndefined()
  } catch (err) {
    expect(err).toBeDefined()
    expect(err.message).toContain('proxyUrl')
  }
})
