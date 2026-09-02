const extractCharset = require('./lib/extract-charset')
const parse = require('./lib/parse')
const createHttpError = require('./lib/http-error')
const resolveFields = require('./lib/resolve-fields')
const { isHeaderOnly, expandHeaderSelection, hasNetworkGroup } = resolveFields

// Monotonic clock when available (browsers + Node 16+), else wall clock fallback.
// Every perf value is a delta from the same source, so the two never mix.
const now = (typeof performance !== 'undefined' && performance.now)
  ? () => performance.now()
  : () => Date.now()

// Credential-bearing headers dropped when a redirect hop changes host,
// mirroring browsers & `node-fetch` >=2.6.7 (CVE-2022-0235 class)
const sensitiveHeaders = ['authorization', 'www-authenticate', 'cookie', 'cookie2']

// Releases the response body stream back to the connection pool without
// reading it. Required whenever we resolve or reject at headers (network mode
// or error) — otherwise the socket is held until timeout/GC. Covers
// `node-fetch` (destroy), whatwg streams (cancel), and a text() fallback.
function drainBody (response) {
  if (!response || !response.body) return
  if (typeof response.body.destroy === 'function') response.body.destroy()
  else if (typeof response.body.cancel === 'function') response.body.cancel().catch(() => {})
  else if (typeof response.text === 'function') response.text().catch(() => {})
}

module.exports = function (url, options, _fetch, useAgent) {
  if (!options || typeof options !== 'object') options = {}

  const opts = Object.assign(
    // defaults
    {
      requestHeaders: {
        'User-Agent': 'url-metadata (+https://www.npmjs.com/package/url-metadata)',
        From: 'example@example.com'
      },
      proxyUrl: undefined, // proxy/unblocking service endpoint (ex: ScraperAPI); presence of this triggers proxy mode
      proxyParams: undefined, // optional vendor query params, passed through verbatim exactly as named in their docs (ex: ScraperAPI's api_key, render, screenshot, country_code) - some vendors need none (ex: header-auth vendors, see requestHeaders)
      parseResponseObject: undefined,
      fields: undefined, // sparse fieldset (array of atomic keys and/or group names); undefined returns full result
      omitEmpty: false, // drop empty fields (undefined, null, '', [], {}) from result for token efficiency
      requestFilteringAgentOptions: undefined, // Node.js v18+ only, silently ignored by others
      agent: undefined, // Node.js only; silently ignored by others
      maxRedirects: 10,
      timeout: 10000, // auto-bumped to 60000 in proxy mode unless explicitly overridden, see below
      size: 0, // Node.js only; silently ignored by others
      compress: true, // Node.js only; silently ignored by others
      ensureSecureImageRequest: true,
      decode: 'auto',
      cache: 'no-cache', // Browser only
      mode: 'cors', // Browser only
      descriptionLength: 750,
      includeResponseBody: false
    },
    // user options override defaults
    options
  )

  if (opts.proxyParams && !opts.proxyUrl) {
    throw new Error('proxyParams requires a proxyUrl')
  }

  // Eager `fields` option validation — throws before any network round-trip
  // on an invalid selection (unknown token, empty array, wrong shape).
  resolveFields(opts.fields)

  // The `network` group is a live-transaction probe; it has no meaning when
  // parsing a passed-in Response (no fetch happens). Guard eagerly.
  if (opts.parseResponseObject && hasNetworkGroup(opts.fields)) {
    throw new Error("`fields: ['network']` is not supported in parseResponseObject mode")
  }

  // Header-only selections (`network` or a subset of its transport fields)
  // probe the *target* URL. In proxy mode the response is the proxy's
  // envelope, so status/headers/redirects/timing would describe the proxy
  // call, not the target — and the (billed) upstream fetch has already
  // happened, so the body-skip saves nothing. Misleading with no upside;
  // plus wastes a billed fetch. Refuse it eagerly.
  if (opts.proxyUrl && isHeaderOnly(opts.fields)) {
    throw new Error("header-only `fields` (ex: 'network') are not supported in proxy mode: transport data would reflect the proxy, not the target url")
  }

  // Header-only selection (`network` or a subset of its atomic fields): the
  // body read can be skipped. Engages for live fetches only — filtering in
  // parseResponseObject mode is handled separately.
  const headerOnly = !opts.parseResponseObject && isHeaderOnly(opts.fields)

  // Proxy calls route through a third-party service doing its own upstream
  // fetch (plus optional headless rendering via params like ScraperAPI's
  // `render`), which routinely takes far longer than a direct fetch.
  // Default to a longer timeout in proxy mode, unless the caller explicitly
  // passed their own `timeout`.
  if (opts.proxyUrl && options.timeout === undefined) {
    opts.timeout = 60000
  }

  // Builds the outgoing proxy request url. `proxyParams` (if any) passes
  // through verbatim as query params, so any vendor-specific param (ex:
  // ScraperAPI's api_key, render, screenshot, country_code) just works
  // without us maintaining a list. `url` (the real target) is always
  // injected last so it always wins, even if `proxyParams` happens to
  // include one of its own.
  function buildProxyUrl (targetUrl) {
    return `${opts.proxyUrl}?${new URLSearchParams({ ...opts.proxyParams, url: targetUrl }).toString()}`
  }

  const requestUrl = url
  let finalUrl = ''
  const redirects = {
    count: 0,
    chain: []
  }
  const perf = {
    redirectTimeMs: undefined, // redirect tax (before last hop)
    ttfbMs: undefined, // cumulative: first request start -> final hop's headers arriving
    responseTimeMs: undefined // cumulative: first request start -> body read complete
  }
  let overallStart // start of the very first hop; baseline for both ttfbMs and responseTimeMs
  let contentType
  let charset
  let currentResponse = null

  async function fetchData (_url, redirectCount = 0, requestHeaders = opts.requestHeaders) {
    if (redirectCount > opts.maxRedirects) {
      // `notFollowedRedirect` flags this as a redirect we declined to follow
      // (maxRedirects reached), not a transport error. The resolved next-hop
      // url is `url` here and on the last redirects.chain entry's `location`,
      // so a maxRedirects: 0 hop-walk (ex: robots-check-before-fetch) can
      // disambiguate cleanly without matching the message string.
      throw createHttpError({ msg: 'too many redirects', redirects, requestUrl, url: _url, notFollowedRedirect: true })
    }
    if (!_url && !opts.parseResponseObject) {
      throw new Error('url parameter is missing')
    }
    if (!_url && opts.parseResponseObject) {
      return opts.parseResponseObject
    } else if (_url) {
      // Track the real target url for this hop (not the proxy endpoint, when
      // proxying) so it's available once we reach a final, non-redirect response.
      finalUrl = _url

      // Generic query-param passthrough via `buildProxyUrl` above, confirmed
      // working across ≥2 vendors (ScraperAPI, ScrapingAnt) with no branching
      // needed — both just take `url` + their own auth param in the query string.
      const fetchUrl = opts.proxyUrl ? buildProxyUrl(_url) : _url

      const requestOpts = {
        method: 'GET',
        headers: requestHeaders,
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

      // Perf: mark hop start; remember the first one for redirect accounting.
      // Note: with a proxy configured this measures time to the proxy service
      // (which does its own upstream fetch), not direct origin time.
      const hopStart = now()
      if (overallStart === undefined) overallStart = hopStart

      // --> Make the fetch request <--
      const response = await _fetch(fetchUrl, requestOpts)

      // Perf: `node-fetch` resolves once response headers arrive (body is a stream),
      // so this is effectively time-to-first-byte for this hop
      const headersAt = now()

      // If response is 3xx redirect
      if (response.status >= 300 && response.status < 400 && response.headers.get('location')) {
        // Resolve the Location header against this hop's url (relative allowed).
        const newUrl = new URL(response.headers.get('location'), _url).href
        // Collect redirects in object that is passed back to user. `location`
        // exposes each hop's resolved destination, so a caller can inspect a
        // redirect without following it (ex: a maxRedirects: 0 hop-walk that
        // robots-checks each destination before requesting it).
        redirects.count = redirectCount + 1
        redirects.chain.push({
          order: redirects.count,
          url: _url,
          statusCode: response.status,
          location: newUrl
        })
        // Then, follow the redirect. Strip sensitive headers when the hop
        // crosses hosts; once stripped they stay stripped for later hops.
        let nextHeaders = requestHeaders
        // Compare exact host - its what browsers, curl, unidici do
        if (new URL(newUrl).host !== new URL(_url).host) {
          nextHeaders = {}
          for (const key of Object.keys(requestHeaders)) {
            if (!sensitiveHeaders.includes(key.toLowerCase())) nextHeaders[key] = requestHeaders[key]
          }
        }
        return fetchData(newUrl, redirectCount + 1, nextHeaders)
      }

      // Perf: last hop reached (the first non-redirect response). ttfbMs and
      // responseTimeMs are both measured from overallStart (the very first
      // request), matching Google/web.dev's TTFB, which includes redirect time.
      perf.ttfbMs = Math.round(headersAt - overallStart)
      // Perf: redirect tax = everything that elapsed before the last hop began.
      // Still its own field for transparency — now a component of ttfbMs rather
      // than something a caller needs to add to it.
      if (redirects.count > 0) perf.redirectTimeMs = Math.round(hopStart - overallStart)

      // Finally, return the response
      return response
    }
  }

  return new Promise((resolve, reject) => {
    fetchData(url)
      .then((response) => {
        // First, set `currentResponse` in case of error
        currentResponse = response

        // `finalUrl` (ex: redirects, links shortened by bit.ly, etc) is set
        // per-hop inside `fetchData` above rather than read from `response.url`
        // here, since `response.url` reflects the proxy endpoint's url when
        // `opts.proxyUrl` is configured, not the real target.

        if (!response) {
          throw createHttpError({ msg: `response is ${typeof response}`, redirects, requestUrl, url: finalUrl })
        }

        if (!response.ok) {
          const throwGenericError = () => {
            throw createHttpError({ msg: `response code ${response.status}`, statusCode: response.status, redirects, requestUrl, url: finalUrl })
          }
          if (response.status === 402) {
            // x402 v2: the PAYMENT-REQUIRED header itself is the identifier.
            const paymentRequiredHeader = response.headers.get('payment-required')
            if (paymentRequiredHeader) {
              let x402Data
              try {
                x402Data = JSON.parse(Buffer.from(paymentRequiredHeader.trim(), 'base64').toString('utf8'))
              } catch {
                // Identified as x402 but undecodable → x402 fails over to undefined.
              }
              throw createHttpError({ msg: `response code ${response.status}`, statusCode: response.status, redirects, paymentRequired: true, x402: x402Data, requestUrl, url: finalUrl })
            }
            // x402 v1: the body markers (x402Version / accepts) are the identifier.
            const contentType = response.headers.get('content-type')
            if (contentType && contentType.includes('application/json')) {
              return response.json()
                .then(
                  // Successful body parse:
                  (body) => {
                    const isX402 = body && (Array.isArray(body.accepts) || body.x402Version !== undefined)
                    if (isX402) {
                      throw createHttpError({ msg: `response code ${response.status}`, statusCode: response.status, redirects, paymentRequired: true, x402: body, requestUrl, url: finalUrl })
                    }
                    throwGenericError() // JSON 402, no x402 markers (MPP, Lightning, quota) → generic
                  },
                  // Failed body parse, can't confirm x402:
                  throwGenericError
                )
            }
          }

          // All others get generic error:
          // non-402, or a 402 we couldn't positively identify as x402.
          throwGenericError()
        }

        // Header-only (`fields: ['network']`) mode: everything requested is
        // available from the response headers. When the caller doesn't also
        // want the raw body, skip the body entirely — drain the stream to
        // release the socket, then resolve.
        // `performance.responseTimeMs` stays undefined (body unread).
        if (headerOnly && !opts.includeResponseBody) {
          drainBody(response)
          resolve(parse.headerOnly(
            requestUrl,
            redirects,
            perf,
            finalUrl,
            response.status,
            response.headers,
            expandHeaderSelection(opts.fields),
            undefined,
            opts
          ))
          return
        }

        // Read content type (also used for charset detection below). In
        // header-only mode we don't enforce HTML, so a `network` probe works
        // against any content type (PDF, JSON, image).
        contentType = response.headers.get('content-type')
        if (!headerOnly) {
          const isHTML = contentType && contentType.includes('html')
          if (!isHTML) {
            throw createHttpError({ msg: `unsupported content type: ${contentType}`, statusCode: response.status, redirects, requestUrl, url: finalUrl })
          }
        }

        // Now, read the fetch response stream to completion,
        // returns promise that resolves as array buffer (binary data)
        return response.arrayBuffer()
      })
      .then(async (responseBuffer) => {
        if (!responseBuffer) return

        // Perf: body fully read here (arrayBuffer resolved). Same overallStart
        // baseline as ttfbMs, so responseTimeMs - ttfbMs cleanly yields body
        // download time (redirect time cancels out of that subtraction since
        // it's baked into both).
        if (overallStart !== undefined) perf.responseTimeMs = Math.round(now() - overallStart)

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

          // Header-only mode reaches here only when `includeResponseBody` is
          // set: return the transport fields + raw body, skipping cheerio and
          // all extractors.
          if (headerOnly) {
            resolve(parse.headerOnly(
              requestUrl,
              redirects,
              perf,
              finalUrl,
              currentResponse.status,
              currentResponse.headers,
              expandHeaderSelection(opts.fields),
              responseDecoded,
              opts
            ))
            return
          }

          // Now parse the metadata!
          resolve(parse(
            requestUrl,
            redirects,
            perf,
            finalUrl,
            responseDecoded,
            currentResponse.status,
            currentResponse.headers,
            opts
          ))
        } catch (e) {
          throw createHttpError({ msg: `decoding with charset: ${charset}`, statusCode: currentResponse.status, redirects, requestUrl, url: finalUrl })
        }
      })
      .catch(error => {
        // Catch all errors thrown above; they must fall thru this block to
        // clean up resources and avoid memory leaks
        drainBody(currentResponse)
        // Set status code on error if it wasn't set already
        if (currentResponse && currentResponse.status && !error.statusCode) {
          error.statusCode = currentResponse.status
        }
        // Finally, reject
        return reject(error)
      })
  })
}
