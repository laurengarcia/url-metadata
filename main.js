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

  const requestUrl = url
  let destinationUrl = ''
  const redirects = {
    count: 0,
    chain: []
  }
  let contentType
  let charset
  let currentResponse = null

  async function fetchData (_url, redirectCount = 0) {
    if (redirectCount > opts.maxRedirects) {
      throw createHttpError({ msg: 'too many redirects', redirects })
    }
    if (!_url && !opts.parseResponseObject) {
      throw new Error('url parameter is missing')
    }
    if (!_url && opts.parseResponseObject) {
      return opts.parseResponseObject
    } else if (_url) {
      const requestOpts = {
        method: 'GET',
        headers: opts.requestHeaders,
        // If the user doesn't pass in their own agent:
        // When agent is a function, `node-fetch` calls it with the parsed URL
        // of the request it's about to make, and uses the return value as the
        // agent for that request:
        agent: opts.agent || ((parsedURL) => useAgent(parsedURL.href, opts.requestFilteringAgentOptions)),
        cache: opts.cache,
        mode: opts.mode,
        redirect: 'manual',
        timeout: opts.timeout,
        size: opts.size,
        compress: opts.compress
      }

      // Make the fetch request
      const response = await _fetch(_url, requestOpts)

      // If response is 3xx redirect
      if (response.status >= 300 && response.status < 400 && response.headers.get('location')) {
        // Collect redirects in object that is passed back to user
        redirects.count = redirectCount + 1
        redirects.chain.push({
          order: redirects.count,
          url: _url,
          statusCode: response.status
        })
        // Then, follow the redirect
        const newUrl = new URL(response.headers.get('location'), _url).href
        return fetchData(newUrl, redirectCount + 1)
      }

      // Finally, return the response
      return response
    }
  }

  return new Promise((resolve, reject) => {
    fetchData(url)
      .then((response) => {
        // First, set `currentResponse` in case of error
        currentResponse = response

        if (!response) {
          throw createHttpError({ msg: `response is ${typeof response}`, redirects })
        }

        if (!response.ok) {
          // Special handling for 402 Payment Required
          if (response.status === 402) {
            const contentType = response.headers.get('content-type')
            if (contentType && contentType.includes('application/json')) {
              return response.json()
                .then(
                  // Successful json parse, throw w rich x402 data:
                  (x402Data) => { throw createHttpError({ msg: `response code ${response.status}`, statusCode: response.status, redirects, paymentRequired: true, x402: x402Data }) },
                  // Failed json parse, omit:
                  () => { throw createHttpError({ msg: `response code ${response.status}`, statusCode: response.status, redirects, paymentRequired: true }) }
                )
            }
          }

          // Throw other non-402 responses:
          throw createHttpError({ msg: `response code ${response.status}`, statusCode: response.status, redirects })
        }

        // Disambiguate `requestUrl` from final destination `url`
        // (ex: redirects, links shortened by bit.ly)
        if (response.url) destinationUrl = response.url

        // Validate response content type
        contentType = response.headers.get('content-type')
        const isHTML = contentType && contentType.includes('html')
        if (!isHTML) {
          throw createHttpError({ msg: `unsupported content type: ${contentType}`, statusCode: response.status, redirects })
        }

        // Now, read the fetch response stream to completion,
        // returns promise that resolves as array buffer (binary data)
        return response.arrayBuffer()
      })
      .then(async (responseBuffer) => {
        if (!responseBuffer) return

        // Handle optional user-specified charset
        if (opts.decode !== 'auto') {
          charset = opts.decode
        // Otherwise, default to extracting charset in opts.decode='auto' mode
        } else {
          charset = extractCharset(contentType, responseBuffer)
        }

        try {
          // Decode with charset
          const decoder = new TextDecoder(charset)
          const responseDecoded = decoder.decode(responseBuffer)
          // now parse the metadata!
          resolve(parse(
            requestUrl,
            redirects,
            destinationUrl,
            responseDecoded,
            currentResponse.status,
            currentResponse.headers,
            opts
          ))
        } catch (e) {
          throw createHttpError({ msg: `decoding with charset: ${charset}`, statusCode: currentResponse.status, redirects })
        }
      })
      .catch(error => {
        // Catch all errors thrown above; they must fall thru this block to
        // clean up resources and avoid memory leaks
        if (currentResponse && currentResponse.body) {
          // Node.js: Destroy the body stream `node-fetch` uses to force-close the connection
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
