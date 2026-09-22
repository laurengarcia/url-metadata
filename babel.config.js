// Used by Jest only (via babel-jest) to compile ESM-only dep
// `request-filtering-agent` v3 to CommonJS for the test runner.
// Jest compat depends on @babel/preset-env & package.json line:
// "transformIgnorePatterns": ["/node_modules/(?!request-filtering-agent/)"]
// Not published: excluded by the `files` whitelist in package.json.
module.exports = {
  presets: [['@babel/preset-env', { targets: { node: 'current' } }]]
}
