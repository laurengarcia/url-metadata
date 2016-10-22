const q = require('q')
const request = require('request')
const parser = require('./lib/parser')

module.exports = function (url, options) {
  const dfd = q.defer()
  var opts = options || {}
  const requestOpts = {
    url: url,
    headers: {
      'User-Agent': opts.userAgent || 'LevelBot',
      'From': opts.fromEmail || 'vision@levelnews.org'
    },
    maxRedirects: opts.maxRedirects || 8,
    encoding: opts.encoding || 'utf8',
    timeout: opts.timeout || 10000
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
      return dfd.resolve(parser(url, body, opts))
    }
  })

  return dfd.promise
}
