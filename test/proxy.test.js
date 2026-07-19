const urlMetadata = require('./../index')

// To run this test file standalone:
// npx jest test/proxy.test.js --detectOpenHandles
// or
// npx jest test/proxy.test.js --detectOpenHandles -t "call with params"

const proxyUrl = 'http://api.scraperapi.com/'
const apiKey = process.env.SCRAPERAPI_KEY

test('proxy: basic call via ScraperAPI', async () => {
  if (!apiKey) throw new Error('Set SCRAPERAPI_KEY env var to run this test')
  const url = 'https://minifetch.com'
  try {
    const metadata = await urlMetadata(url, {
      proxy: { url: proxyUrl, apiKey }
    })
    expect(metadata.responseStatusCode).toBe(200)
    expect(metadata.title).toContain('SEO')
  } catch (err) {
    expect(err).toBe(undefined)
  }
})

test('proxy: call with params', async () => {
  if (!apiKey) throw new Error('Set SCRAPERAPI_KEY env var to run this test')
  // const url = 'https://www.ebay.com/itm/358599586518'
  // const url = 'https://www.x402scan.com' // Triggers Next.js error when render: true
  const url = 'https://quotes.toscrape.com/js/' // needs option.includeResponseBody: true
  try {
    const metadata = await urlMetadata(url, {
      // url-metadata's own fetch timeout (default 10000ms) — bump alongside
      // the jest test timeout below since `render: true` does full headless
      // rendering on ScraperAPI's end and can run past 10s on its own.
      timeout: 60000,
      includeResponseBody: true,
      proxy: {
        url: proxyUrl,
        apiKey,
        // Swap params one at a time to check which are compatible with the
        // `isHTML` content-type check in main.js (ex: `screenshot` and some
        // `output_format` values won't return html & will fail that check).
        //
        // No extra credit cost: wait_for_selector, country_code,
        //   session_number, device_type, output_format, keep_headers, autoparse
        // Extra credit cost: premium, render, screenshot, ultra_premium
        params: {
          // country_code: 'us' // works, get results from a specific region
          // premium: true // works, run thru hi quality residential proxies
          // render: true // works, with caveats in README
          'screenshot': true, // works, check `sa-screenshot` response header
        }
      }
    })
    expect(metadata.responseStatusCode).toBe(200)
    console.log(metadata)
  } catch (err) {
    expect(err).toBe(undefined)
  }
}, 60000) // jest's own per-test timeout (default 5000ms) — separate from the `timeout` option above, needs bumping too
