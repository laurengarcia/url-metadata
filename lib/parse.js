const cheerio = require('cheerio')
const MetadataFields = require('./metadata-fields')
const extractMetaTags = require('./extract-meta-tags')
const extractJsonLd = require('./extract-json-ld')

module.exports = function (url, body, options) {
  const $ = cheerio.load(body)
  const scrapedMetaTags = extractMetaTags($)
  const scrapedJsonLd = extractJsonLd($)
  const metadata = new MetadataFields(options)
    .configureType(scrapedMetaTags['og:type'])
    .lockKeys()
    .set(scrapedMetaTags)
    .set({ url })
    .set({ jsonld: scrapedJsonLd })

  // derive canonical url
  if (!metadata.get('canonical')) {
    $('link').each(function (index, el) {
      if (el.attribs && el.attribs.rel === 'canonical' && el.attribs.href) {
        metadata.set({ canonical: el.attribs.href })
      }
    })
  }

  // derive the page title; default to `og:title` tag, failover to DOM title tag
  if (metadata.get('og:title')) {
    metadata.set({ title: metadata.get('og:title') })
  } else {
    metadata.set({ title: $('title').html() })
  }

  // derive author
  if (!metadata.get('author')) {
    const author = metadata.get('article:author') || metadata.get('og:article:author') || ''
    metadata.set({ author })
  }

  // derive description
  if (!metadata.get('description')) {
    const description = metadata.get('og:description') || ''
    metadata.set({ description })
  }

  // derive image
  if (!metadata.get('image')) {
    const image = metadata.get('og:image:secure_url') || metadata.get('og:image') || ''
    metadata.set({ image })
  }

  // attach body as string if option is true
  if (options.includeBody) {
    metadata.set({ body })
  }

  // clean up and return all metadata fields
  return metadata.clean()
}
