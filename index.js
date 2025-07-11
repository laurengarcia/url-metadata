// In all versions of Node.js >v6.0, use `node-fetch` module
// with SSRF protection from `request-filtering-agent`.
// We're using `node-fetch` bc Node.js's native `fetch` does
// not support `request-filtering-agent` SSRF protection.
const nodeFetch = require('node-fetch')
const requestFilteringAgent = require('request-filtering-agent')
const main = require('./main')

module.exports = function (url, options) {
  // Handle Next.js bundler converting CommonJS `node-fetch` to ES module structure
  const _fetch = typeof nodeFetch === 'function' ? nodeFetch : nodeFetch.default;
  const useAgent = requestFilteringAgent.useAgent

  // Ensure we have a working fetch
  if (!_fetch) {
    throw new Error('No fetch implementation found. Ensure node-fetch is installed.')
  }

  return main(url, options, _fetch, useAgent)
}
