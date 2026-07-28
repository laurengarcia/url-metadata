const MetadataFields = require('./metadata-fields')

// Valid atomic field keys, derived from the seed object (single source of
// truth in metadata-fields.js) so this list can never drift from what the
// parser actually produces.
const atomicKeys = new Set(Object.keys(new MetadataFields({}).fields))

// Legal named-group tokens. Their expansion to atomic keys is handled in a
// later step; validation only needs to know these names are legal.
const groupNames = new Set(['network', 'og', 'twitter', 'meta'])

/**
 * Validates `options.fields` eagerly (before any network round-trip).
 *
 * Bare tokens are strict: each must be a known atomic field key from
 * /lib/metadata-fields.js or group name, else it throws.
 *
 * Page-specific meta tags that aren't on the whitelist are reachable via
 * the `meta:<name>` escape hatch — the remainder after the `meta:` prefix
 * is the literal tag name (never split on `:`, so names with colons like
 * `al:ios:url` work; known suffixes like `meta:og:title` are allowed and
 * redundant). The arbitrary name itself can't be validated pre-fetch, so
 * a `meta:`-prefixed token always passes shape validation.
 *
 * @param {string[]|undefined} fields - array of atomic field keys, group
 *   names, and/or `meta:<name>` selectors; undefined for the default
 *   (full, unfiltered) result.
 * @returns {string[]|null} the validated tokens, or null when `fields` is
 *   undefined (signal: no filtering, return the full default result).
 * @throws {Error} on a non-array, an empty array, a non-string token, a
 *   `meta:` selector with no name, or an unknown bare token.
 */
function resolveFields (fields) {
  if (fields === undefined) return null

  if (!Array.isArray(fields)) {
    throw new Error('`fields` option must be an array of strings')
  }
  if (fields.length === 0) {
    throw new Error('`fields` option cannot be an empty array')
  }

  fields.forEach(function (token) {
    if (typeof token !== 'string') {
      throw new Error('`fields` tokens must be strings')
    }

    // `meta:<name>` escape hatch for page-specific meta tags not on the
    // whitelist. Strip the 5-char `meta:` prefix; the whole remainder is the
    // literal tag name (no `:` split). The name can't be validated pre-fetch,
    // so any non-empty suffix passes.
    if (token.startsWith('meta:')) {
      if (token.slice(5) === '') {
        throw new Error('`fields` token `meta:` is missing a tag name')
      }
      return
    }

    // Bare tokens are strict: known atomic key or group name only.
    if (!atomicKeys.has(token) && !groupNames.has(token)) {
      throw new Error(`unknown \`fields\` token: '${token}' (for a page-specific meta tag, prefix with 'meta:')`)
    }
  })

  return fields
}

module.exports = resolveFields
