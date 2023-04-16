const parse = require('./lib/parse')

module.exports = function (url, options) {
  if (!options || typeof options !== 'object') options = {}

  const opts = Object.assign(
    // defaults
    {
      requestHeaders: {
        'User-Agent': 'url-metadata/3.0 (npm module)',
        From: 'example@example.com'
      },
      cache: 'no-cache',
      mode: 'cors',
      timeout: 10000,
      descriptionLength: 750,
      ensureSecureImageRequest: true,
      includeResponseBody: false
    },
    // options passed in override defaults
    options
  )

  const requestOpts = {
    method: 'GET',
    headers: opts.requestHeaders,
    cache: opts.cache,
    mode: opts.mode,
    timeout: opts.timeout,
    redirect: 'follow'
  }

  return fetch(url, requestOpts)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`response code ${response.status}`)
      }

      // rewrite url if our request had to follow redirects to resolve the
      // final link destination (for example: links shortened by bit.ly)
      if (response.url) url = response.url

      const contentType = response.headers.get('content-type')
      const isText = contentType && contentType.startsWith('text')
      const isHTML = contentType && contentType.includes('html')

      if (!isText || !isHTML) {
        throw new Error(`unsupported content type: ${contentType}`)
      }

      return response.text()
    })
    .then((body) => {
      return parse(url, body, opts)
    })
}
