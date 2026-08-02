const main = require('./main')
const resolveFields = require('./lib/resolve-fields')

module.exports = function (url, options) {
  // In browser, use native fetch
  const _fetch = window.fetch.bind(window)
  // No-op `useAgent` in browser
  const useAgent = () => undefined

  // Ensure we have a working fetch
  if (!_fetch) {
    throw new Error('No fetch implementation found.')
  }

  return main(url, options, _fetch, useAgent)
}

// Mirror of index.js: expose the result-shaping helpers on the browser
// entry too, so bundled consumers get parity. The resolve-fields chain is
// pure/isomorphic (no node-only deps), so this is browser-safe.
module.exports.resolveFields = resolveFields
module.exports.selectFields = resolveFields.selectFields
module.exports.isEmpty = resolveFields.isEmpty
