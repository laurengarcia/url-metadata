/**
 * Drift protection: the KnownFieldsStrict interface in index.d.ts must
 * stay in sync with the runtime seed object in lib/metadata-fields.js.
 * Two-source invariant — if you add/remove a field in one, update the other.
 *
 * Parses index.d.ts textually (skip TypeScript tooling) by
 * extracting top-level keys from the KnownFieldsStrict block.
 */
const fs = require('fs')
const path = require('path')
const MetadataFields = require('../lib/metadata-fields')

/**
 * Extracts top-level property names from the KnownFieldsStrict interface.
 * Matches keys at exactly 4-space indent (nested object props sit at 6+),
 * both bare (requestUrl) and quoted ('og:url') forms.
 * @returns {string[]}
 */
function extractDtsKeys () {
  const dts = fs.readFileSync(path.join(__dirname, '..', 'index.d.ts'), 'utf8')

  const start = dts.indexOf('interface KnownFieldsStrict {')
  expect(start).toBeGreaterThan(-1) // interface renamed/removed? update this test

  // block ends at the first closing brace at 2-space indent after start
  const end = dts.indexOf('\n  }', start)
  expect(end).toBeGreaterThan(start)

  const block = dts.slice(start, end)
  const keyPattern = /^ {4}(?:'([^']+)'|([A-Za-z][\w-]*))\??:/
  const keys = []

  block.split('\n').forEach(function (line) {
    const match = line.match(keyPattern)
    if (match) keys.push(match[1] || match[2])
  })

  return keys
}

test('index.d.ts KnownFieldsStrict matches lib/metadata-fields.js seed object', () => {
  const dtsKeys = extractDtsKeys().sort()
  const runtimeKeys = Object.keys(new MetadataFields({}).fields).sort()

  // sanity: the parser actually found the catalog, not an empty block
  expect(dtsKeys.length).toBeGreaterThan(30)

  // symmetric diff via array equality — jest prints the exact delta on failure
  expect(dtsKeys).toEqual(runtimeKeys)
})
