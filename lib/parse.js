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
    // any falsy url ('', undefined, null) means parseResponseObject mode
    // was used; normalize to null so `requestUrl === null` is a reliable
    // signal for parse mode & the field honors its string|null contract
    .set({ requestUrl: requestUrl || null })
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

  // clean up and return all metadata fields
  return metadata.clean()
}
