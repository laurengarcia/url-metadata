const cheerio = require('cheerio')
const MetadataFields = require('./metadata-fields')
const extractMetaTags = require('./extract-meta-tags')
const extractJsonLd = require('./extract-json-ld')
const mapSources = require('./map-sources')

module.exports = function (url, body, options) {
  const $ = cheerio.load(body)
  const scrapedMetaTags = extractMetaTags($)
  const scrapedJsonLd = extractJsonLd($)
  const metadata = new MetadataFields(options)
    .configureType(scrapedMetaTags['og:type'])
    .lockKeys()
    .set(scrapedMetaTags)
    .set({ 'url': url })
    .set({ 'jsonld': scrapedJsonLd })

  // derive canonical url
  if (!metadata.get('canonical')) {
    $('link').each(function (index, el) {
      if (el.attribs && el.attribs.rel === 'canonical' && el.attribs.href) {
        metadata.set({ 'canonical': el.attribs.href })
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
    metadata.set({ author: author })
  }

  // derive `source` field from url host by default,
  // then check if we need to overwrite `source` field
  // as specified in options object passed into this module via `sourceMap`
  metadata.set({ source: url.split('://')[1].split('/')[0] })

  // overwrite source field for youtube.com urls
  // NOTE: this is derived from youtube's video player DOM.
  // It may change and/or move over time and need updating.
  const ytPlayerHtml = $('#player').html() || ''
  const ytUsernameRgx = /"author":"(.*?)"/mi.exec(ytPlayerHtml)
  if (ytUsernameRgx && ytUsernameRgx.length > 0) {
    const source = mapSources(ytUsernameRgx[1], options.sourceMap)
    if (source) metadata.set({ source: source })
  }

  // derive description
  if (!metadata.get('description')) {
    const description = metadata.get('og:description') || ''
    metadata.set({ description: description })
  }

  // derive image
  if (!metadata.get('image')) {
    const image = metadata.get('og:image:secure_url') || metadata.get('og:image') || ''
    metadata.set({ image: image })
  }

  // optionally encode all metadata fields and return them
  return metadata.clean().finalize()
}
