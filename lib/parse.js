const cheerio = require('cheerio')
const MetadataFields = require('./metadata-fields')
const extractMetaTags = require('./extract-meta-tags')
const extractHreflang = require('./extract-hreflang')
const extractCanonical = require('./extract-canonical')
const extractFavicons = require('./extract-favicons')
const extractJsonLd = require('./extract-json-ld')
const extractHeadings = require('./extract-headings')
const extractImgTags = require('./extract-img-tags')
const extractHeaders = require('./extract-headers')
const utils = require('./utils')
const { selectFields } = require('./resolve-fields')

module.exports = function (
  requestUrl,
  redirects,
  perf,
  destinationUrl,
  body,
  responseStatusCode,
  responseHeaders,
  options
) {
  const $ = cheerio.load(body)
  const title = $('head title').text()
  const lang = $('html').attr('lang') || ''
  const scrapedHreflang = extractHreflang($)
  const scrapedCanonical = extractCanonical($)
  const scrapedMetaTags = extractMetaTags($)
  const scrapedJsonLd = extractJsonLd($)
  const scrapedFavicons = extractFavicons($)
  const headings = extractHeadings($)
  const imgTags = extractImgTags($)

  const metadata = new MetadataFields(options)
    // requestUrl echoes the url param verbatim, incl falsy values in
    // parseResponseObject mode ('', undefined, null). Deliberate.
    .set({ requestUrl })
    .set({ redirects })
    .set({ performance: perf })
    .set({ url: destinationUrl })
    .set(scrapedMetaTags)
    .set({ hreflang: scrapedHreflang })
    .set({ canonicalUrls: scrapedCanonical.canonicalUrls })
    .set({ favicons: scrapedFavicons })
    .set({ title })
    .set({ lang })
    .set({ jsonld: scrapedJsonLd })
    .set({ headings })
    .set({ imgTags })
    .set({ responseStatusCode })
    .set({ responseHeaders: extractHeaders(responseHeaders) })

  // canonical: prefer an explicit metadata-fields/options value if one was
  // already set; otherwise fall back to the first <link rel="canonical">
  // found in document order (see extract-canonical.js for rationale)
  if (!metadata.get('canonical') && scrapedCanonical.canonical) {
    metadata.set({ canonical: scrapedCanonical.canonical })
  }

  // attach body as string if option is true
  if (options.includeResponseBody) {
    metadata.set({ responseBody: body })
  }

  // clean up all metadata fields
  const cleaned = metadata.clean()

  // filter to the selected `fields`, if any (full output otherwise)
  return options.fields ? selectFields(cleaned, options.fields) : cleaned
}

/**
 * Assembles a header-only (`network`) result: transport fields available
 * from the response headers, without reading or parsing the body. Used when
 * `fields` selects only header-available data — skips cheerio & all
 * extractors. Filters to `requestedKeys` (plus `responseBody` when
 * `includeResponseBody` is set) and honors `omitEmpty`.
 *
 * @param {string} requestUrl
 * @param {object} redirects
 * @param {object} perf - performance timing (responseTimeMs stays undefined; body unread)
 * @param {string} destinationUrl - final url in the request chain
 * @param {number} responseStatusCode
 * @param {*} responseHeaders - Headers-like object (whitelisted by extractHeaders)
 * @param {Set<string>} requestedKeys - the network field keys to return
 * @param {string|undefined} body - raw body, only when includeResponseBody
 * @param {object} options
 * @returns {object} filtered header-only metadata
 */
module.exports.headerOnly = function (
  requestUrl,
  redirects,
  perf,
  destinationUrl,
  responseStatusCode,
  responseHeaders,
  requestedKeys,
  body,
  options
) {
  const raw = {
    requestUrl,
    redirects,
    url: destinationUrl,
    responseStatusCode,
    responseHeaders: extractHeaders(responseHeaders),
    performance: perf
  }
  if (options.includeResponseBody) raw.responseBody = body

  const keys = new Set(requestedKeys)
  if (options.includeResponseBody) keys.add('responseBody')

  const result = {}
  Object.keys(raw).forEach(function (key) {
    if (!keys.has(key)) return
    if (options.omitEmpty && utils.isEmpty(raw[key])) return
    result[key] = raw[key]
  })
  return result
}
