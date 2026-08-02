const MetadataFields = require('./metadata-fields')
const { isEmpty } = require('./utils')

// Valid atomic field keys, derived from the seed object (single source of
// truth in metadata-fields.js) so this list can never drift from what the
// parser actually produces.
const atomicKeys = new Set(Object.keys(new MetadataFields({}).fields))

// Named-group tokens. Expansion to atomic keys is handled in a
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

// The `network` group: transport fields available once response headers
// arrive, without reading the body. Single source of truth for both the
// group's membership and the body-skip optimization in main.js.
const NETWORK_FIELDS = ['requestUrl', 'redirects', 'url', 'responseStatusCode', 'responseHeaders', 'performance']
const networkFieldSet = new Set(NETWORK_FIELDS)

/**
 * True when every requested token can be satisfied from response headers
 * alone (the `network` group or any subset of its atomic fields), so the
 * body read can be skipped. False for null/undefined or any selection that
 * includes a body-dependent field.
 * @param {string[]|null|undefined} fields
 * @returns {boolean}
 */
function isHeaderOnly (fields) {
  if (!fields) return false
  return fields.every(function (token) {
    return token === 'network' || networkFieldSet.has(token)
  })
}

/**
 * Expands a header-only selection to the concrete set of requested network
 * field keys (`network` -> all six; atomic network fields -> themselves).
 * Only meaningful when `isHeaderOnly(fields)` is true.
 * @param {string[]} fields
 * @returns {Set<string>}
 */
function expandHeaderSelection (fields) {
  const set = new Set()
  fields.forEach(function (token) {
    if (token === 'network') NETWORK_FIELDS.forEach(function (f) { set.add(f) })
    else set.add(token)
  })
  return set
}

/**
 * True when the `network` group token is present. Used to guard
 * `parseResponseObject` mode, where the group is not meaningful.
 * @param {string[]|null|undefined} fields
 * @returns {boolean}
 */
function hasNetworkGroup (fields) {
  return !!fields && fields.includes('network')
}

// Structural (non-meta-tag) seed keys. Everything else in the result is
// meta-tag-sourced (whitelisted or arbitrary), so the `meta` group is defined
// as its complement. A denylist (vs a meta allowlist) is smaller, more
// stable, and drift-friendly: newly-whitelisted meta fields are `meta` for
// free; only new *structural* fields need to be added here (see drift test).
// Note: `charset` is intentionally NOT here — `<meta charset>` is a meta tag.
const NON_META_KEYS = new Set([
  'requestUrl', 'redirects', 'url', 'responseStatusCode', 'responseHeaders',
  'performance', 'canonical', 'canonicalUrls', 'lang', 'hreflang', 'title',
  'favicons', 'jsonld', 'headings', 'imgTags', 'responseBody'
])

/**
 * Filters a fully-parsed metadata object down to the selected `fields`.
 * Groups expand against the object's own keys, so empty whitelisted keys are
 * kept (selection is orthogonal to `omitEmpty`, which is the only knob that
 * drops empties). Only keys actually present in `metadata` are returned, so a
 * `meta:<name>` for a tag the page lacks is simply absent.
 *
 * - `network`        -> the six transport fields
 * - `og` / `twitter` -> keys with that prefix
 * - `meta`           -> every non-structural key (whitelisted + arbitrary tags)
 * - `meta:<name>`    -> the literal key `<name>`
 * - anything else    -> an atomic key
 *
 * @param {object} metadata - the cleaned, full result object
 * @param {string[]} fields - validated selection tokens
 * @returns {object} a new object with only the selected keys (insertion order preserved)
 */
function selectFields (metadata, fields) {
  const metadataKeys = Object.keys(metadata)
  const keep = new Set()

  fields.forEach(function (token) {
    if (token === 'network') {
      NETWORK_FIELDS.forEach(function (k) { keep.add(k) })
    } else if (token === 'og') {
      metadataKeys.forEach(function (k) { if (k.startsWith('og:')) keep.add(k) })
    } else if (token === 'twitter') {
      metadataKeys.forEach(function (k) { if (k.startsWith('twitter:')) keep.add(k) })
    } else if (token === 'meta') {
      metadataKeys.forEach(function (k) { if (!NON_META_KEYS.has(k)) keep.add(k) })
    } else if (token.startsWith('meta:')) {
      keep.add(token.slice(5))
    } else {
      keep.add(token) // atomic key
    }
  })

  const result = {}
  metadataKeys.forEach(function (k) { if (keep.has(k)) result[k] = metadata[k] })
  return result
}

/**
 * Static (pre-parse) test for whether a selection would include field `name`.
 * Mirrors selectFields' resolution but on tokens alone, so extractors can be
 * gated before the metadata object exists.
 * @param {string[]} fields - validated selection tokens
 * @param {string} name - a field key
 * @returns {boolean}
 */
function selectionIncludes (fields, name) {
  return fields.some(function (token) {
    if (token === name) return true
    if (token === 'og') return name.startsWith('og:')
    if (token === 'twitter') return name.startsWith('twitter:')
    if (token === 'network') return networkFieldSet.has(name)
    if (token === 'meta') return !NON_META_KEYS.has(name)
    if (token.startsWith('meta:')) return token.slice(5) === name
    return false
  })
}

/**
 * True when a selection could include any meta-tag-sourced field, so the
 * single-pass meta-tag extractor must run. Covers the `meta`/`og`/`twitter`
 * groups, `meta:<name>` selectors, and atomic meta keys.
 * @param {string[]} fields
 * @returns {boolean}
 */
function needsMetaTags (fields) {
  return fields.some(function (token) {
    if (token === 'meta' || token === 'og' || token === 'twitter') return true
    if (token.startsWith('meta:')) return true
    return atomicKeys.has(token) && !NON_META_KEYS.has(token)
  })
}

module.exports = resolveFields
module.exports.NETWORK_FIELDS = NETWORK_FIELDS
module.exports.NON_META_KEYS = NON_META_KEYS
module.exports.isHeaderOnly = isHeaderOnly
module.exports.expandHeaderSelection = expandHeaderSelection
module.exports.hasNetworkGroup = hasNetworkGroup
module.exports.selectFields = selectFields
module.exports.selectionIncludes = selectionIncludes
module.exports.needsMetaTags = needsMetaTags
// Re-exported from ./utils so the public result-shaping trio
// (resolveFields, selectFields, isEmpty) lives on one module.
module.exports.isEmpty = isEmpty
