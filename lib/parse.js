const cheerio = require('cheerio')
const MetadataFields = require('./metadata-fields')
const extractMetaTags = require('./extract-meta-tags')
const extractHreflang = require('./extract-hreflang')
const extractFavicons = require('./extract-favicons')
const extractJsonLd = require('./extract-json-ld')
const extractHeadings = require('./extract-headings')
const extractImgTags = require('./extract-img-tags')
const extractHeaders = require('./extract-headers')

module.exports = function (
  requestUrl,
  destinationUrl,
  body,
  responseHeaders,
  options
) {
  const $ = cheerio.load(body)
  const title = $('head title').text()
  const lang = $('html').attr('lang')
  const scrapedHreflang = extractHreflang($)
  const scrapedMetaTags = extractMetaTags($)
  const scrapedJsonLd = extractJsonLd($)
  const scrapedFavicons = extractFavicons($)
  const headings = extractHeadings($)
  const imgTags = extractImgTags($)

  const metadata = new MetadataFields(options)
    .set({ requestUrl })
    .set({ url: destinationUrl })
    .set(scrapedMetaTags)
    .set({ hreflang: scrapedHreflang })
    .set({ favicons: scrapedFavicons })
    .set({ title })
    .set({ lang })
    .set({ jsonld: scrapedJsonLd })
    .set({ headings })
    .set({ imgTags })
    .set({ responseHeaders: extractHeaders(responseHeaders) })

  // derive canonical url
  if (!metadata.get('canonical')) {
    $('link').each(function (index, el) {
      if (el.attribs && el.attribs.rel === 'canonical' && el.attribs.href) {
        metadata.set({ canonical: el.attribs.href })
      }
    })
  }

  // attach body as string if option is true
  if (options.includeResponseBody) {
    metadata.set({ responseBody: body })
  }

  // clean up and return all metadata fields
  return metadata.clean()
}
