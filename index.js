// In all versions of Node.js v >=18.17, use `node-fetch` module
// with SSRF protection from `request-filtering-agent`.
// We're using `node-fetch` bc Node.js's native `fetch` does
// not support `request-filtering-agent` SSRF protection.
const nodeFetch = require('node-fetch')
const requestFilteringAgent = require('request-filtering-agent')
const main = require('./main')
const resolveFields = require('./lib/resolve-fields')

module.exports = function (url, options) {
  // Handle Next.js bundler converting CommonJS `node-fetch` to ES module structure
  const _fetch = typeof nodeFetch === 'function' ? nodeFetch : nodeFetch.default
  const useAgent = requestFilteringAgent.useAgent

  // Ensure we have a working fetch
  if (!_fetch) {
    throw new Error('No fetch implementation found. Ensure node-fetch is installed.')
  }

  return main(url, options, _fetch, useAgent)
}

// Result-shaping helpers, exposed on the public surface so consumers can
// filter an already-parsed result without re-fetching (single source of
// truth; used internally by the parser too):
//   resolveFields(fields) -> validate a `fields` selection (throws on bad input)
//   selectFields(metadata, fields) -> project a full result to the selection
//   isEmpty(value) -> the `omitEmpty` predicate
module.exports.resolveFields = resolveFields
module.exports.selectFields = resolveFields.selectFields
module.exports.isEmpty = resolveFields.isEmpty
