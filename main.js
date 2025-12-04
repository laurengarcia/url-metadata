const extractCharset = require('./lib/extract-charset')
const parse = require('./lib/parse')
const createHttpError = require('./lib/http-error')

module.exports = function (url, options, _fetch, useAgent) {
  if (!options || typeof options !== 'object') options = {}

  const opts = Object.assign(
    // defaults
    {
      requestHeaders: {
        'User-Agent': 'url-metadata (+https://www.npmjs.com/package/url-metadata)',
        From: 'example@example.com'
      },
      requestFilteringAgentOptions: undefined, // Node.js v18+ only, silently ignored by others
      agent: undefined, // Node.js v6+ only; silently ignored by others
      cache: 'no-cache', // Browser only
      mode: 'cors', // Browser only
      maxRedirects: 10,
      timeout: 10000,
      size: 0, // Node.js v6+ only; silently ignored by others
      compress: true, // Node.js v6+ only; silently ignored by others
      decode: 'auto',
      descriptionLength: 750,
      ensureSecureImageRequest: true,
      includeResponseBody: false,
      parseResponseObject: undefined
    },
    // user options override defaults
    options
  )

  let requestUrl = ''
  let destinationUrl = ''
  let contentType
  let charset
  let currentResponse = null

  async function fetchData (_url, redirectCount = 0) {
    if (redirectCount > opts.maxRedirects) {
      throw new Error('too many redirects')
    }
    if (!_url && opts.parseResponseObject) {
      return opts.parseResponseObject
    } else if (_url) {
      requestUrl = url
      const requestOpts = {
        method: 'GET',
        headers: opts.requestHeaders,
        agent: opts.agent || useAgent(url, opts.requestFilteringAgentOptions),
        cache: opts.cache,
        mode: opts.mode,
        redirect: 'manual',
        timeout: opts.timeout,
        size: opts.size,
        compress: opts.compress
      }

      // Make the fetch request
      const response = await _fetch(_url, requestOpts)

      if (response.status >= 300 && response.status < 400 && response.headers.get('location')) {
        const newUrl = new URL(response.headers.get('location'), url).href
        return fetchData(newUrl, redirectCount + 1)
      }
      return response
    } else if (!_url) {
      throw new Error('url parameter is missing')
    }
  }

  return new Promise((resolve, reject) => {
    fetchData(url)
      .then((response) => {
        // First, set `currentResponse` in case of error
        currentResponse = response

        if (!response) {
          return reject(new Error(`response is ${typeof response}`))
        }
        if (!response.ok) {

          // Special handling for 402 Payment Required
          if (response.status === 402) {
            const contentType = response.headers.get('content-type')
            if (contentType && contentType.includes('application/json')) {
              return response.json()
                .then(x402Data => {
                  return reject(createHttpError(`response code ${response.status}`, response.status, true, x402Data))
                })
                .catch(() => {
                  // If JSON parsing fails
                  return reject(createHttpError(`response code ${response.status}`, response.status, true))
                })
            }
          }

          // Handle other non-402 responses:
          return reject(createHttpError(`response code ${response.status}`, response.status))
        }

        // disambiguate `requestUrl` from final destination url
        // (ex: links shortened by bit.ly)
        if (response.url) destinationUrl = response.url

        // validate response content type
        contentType = response.headers.get('content-type')
        const isHTML = contentType && contentType.includes('html')
        if (!isHTML) {
          return reject(createHttpError(`unsupported content type: ${contentType}`, response.status))
        }

        return response.arrayBuffer()
      })
      .then(async (responseBuffer) => {
        if (!responseBuffer) return

        // handle optional user-specified charset
        if (opts.decode !== 'auto') {
          charset = opts.decode
        // extract charset in opts.decode='auto' mode
        } else {
          charset = extractCharset(contentType, responseBuffer)
        }

        try {
          // decode with charset
          const decoder = new TextDecoder(charset)
          const responseDecoded = decoder.decode(responseBuffer)
          // now parse the metadata!
          resolve(parse(
            requestUrl,
            destinationUrl,
            responseDecoded,
            currentResponse.status,
            currentResponse.headers,
            opts
          ))
        } catch (e) {
          return reject(createHttpError(`decoding with charset: ${charset}`, currentResponse.status))
        }
      })
      .catch(error => {
        // Catch-all block for errors not explicitly rejected above
        // Cleanup resources to avoid memory leaks
        if (currentResponse && currentResponse.body) {
          // Destroy the body stream `node-fetch` uses to force-close the connection
          if (typeof currentResponse.body.destroy === 'function') currentResponse.body.destroy()
          // Modern browsers and Node.js 18+ have cancel() on the ReadableStream
          else if (typeof currentResponse.body.cancel === 'function') currentResponse.body.cancel().catch(() => {})
          // Fallback: consume the stream to close the connection
          else if (typeof currentResponse.text === 'function') currentResponse.text().catch(() => {})
        }
        // Set status code on error if it wasn't set already
        if (currentResponse && currentResponse.status && !error.statusCode) {
          error.statusCode = currentResponse.status
        }
        // Finally, reject
        return reject(error)
      })
  })
}
