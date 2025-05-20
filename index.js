const nodeFetch = require('node-fetch')
const requestFilteringAgent = require('request-filtering-agent')
const main = require('./main')

module.exports = function (url, options) {
  // In Node.js, use `node-fetch` module with SSRF protection
  const _fetch = nodeFetch
  const useAgent = requestFilteringAgent.useAgent

  return main(url, options, _fetch, useAgent)
}
