const cheerio = require('cheerio')
const MetadataFields = require('./metadata-fields')
const extractMetaTags = require('./extract-meta-tags')
const mapSources = require('./map-sources')

module.exports = function (url, html, options) {
  const $ = cheerio.load(html)
  const scrapedMetaTags = extractMetaTags($)
  const metadata = new MetadataFields(options)
                      .configureType(scrapedMetaTags['og:type'])
                      .lockKeys()
                      .set(scrapedMetaTags)
                      .set({url: url})

  // derive canonical url
  if (!metadata.get('canonical')) {
    $('link').each(function (index, el) {
      if (el.attribs && el.attribs.rel === 'canonical' && el.attribs.href) {
        metadata.set({'canonical': el.attribs.href})
      }
    })
  }

  // derive the page title; default to `og:title` tag, failover to DOM title tag
  if (metadata.get('og:title')) {
    metadata.set({title: metadata.get('og:title')})
  } else {
    metadata.set({title: $('title').html()})
  }

  // derive author
  if (!metadata.get('author')) {
    const author = metadata.get('article:author') || metadata.get('og:article:author') || ''
    metadata.set({author: author})
  }

  // derive `source` field from url host by default
  metadata.set({source: url.split('://')[1].split('/')[0]})

  // check if we need to overwrite `source` field for youtube urls
  const youTubeUsername = $('.yt-user-info a').html()
  if (youTubeUsername) {
    const source = mapSources(youTubeUsername, options.sourceMap)
    if (source) metadata.set({source: source})
  }

  // derive description
  if (!metadata.get('description')) {
    const description = metadata.get('og:description') || ''
    metadata.set({description: description})
  }

  // derive image
  if (!metadata.get('image')) {
    const image = metadata.get('og:image:secure_url') || metadata.get('og:image') || ''
    metadata.set({image: image})
  }

  // optionally encode all metadata fields and return them
  return metadata.clean().finalize()
}
