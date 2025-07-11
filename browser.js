const main = require('./main')

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
