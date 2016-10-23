const q = require('q')
const request = require('request')
const parse = require('./lib/parse')

module.exports = function (url, options) {
  const dfd = q.defer()
  if (!options || typeof options !== 'object') options = {}
  const opts = {
    userAgent: options.userAgent || 'MetadataScraper',
    fromEmail: options.fromEmail || 'example@example.com',
    maxRedirects: options.maxRedirects || 10,
    timeout: options.timeout || 10000,
    descriptionLength: options.descriptionLength || 750,
    ensureSecureImageRequest: options.ensureSecureImageRequest || true,
    sourceMap: options.sourceMap || {},
    encode: options.encode || undefined
  }

  const requestOpts = {
    url: url,
    headers: {
      'User-Agent': opts.userAgent,
      'From': opts.fromEmail
    },
    maxRedirects: opts.maxRedirects,
    encoding: 'utf8',
    timeout: opts.timeout
  }
  request.get(requestOpts, function (err, response, body) {
    if (err || !response) {
      return dfd.reject(err)
    }
    if (!response.statusCode && response.statusCode !== 200) {
      return dfd.reject({Error: 'response code ' + response.statusCode})
    }
    if (response.statusCode && response.statusCode === 200) {
      // rewrite url if our request had to follow redirects to resolve the
      // final link destination (for example: links shortened by bit.ly)
      if (response.request.uri.href) url = response.request.uri.href
      return dfd.resolve(parse(url, body, opts))
    }
  })

  return dfd.promise
}
