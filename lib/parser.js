const cheerio = require('cheerio')
const MetadataFields = require('./metadata-fields')
const extractMetaTags = require('./extract-meta-tags')
const sourceMappings = require('./source-mappings')

module.exports = function (url, html, options) {
  const $ = cheerio.load(html)
  const $title = $('title')
  const $youtubeUsername = $('.yt-user-info a')
  const scrapedMetaTags = extractMetaTags($('meta'))
  const metadata = new MetadataFields(options)
                      .configureType(scrapedMetaTags['og:type'])
                      .lockKeys()
                      .set(scrapedMetaTags)
                      .set({url: url})

  // derive the page title; default to `og:title` tag, failover to DOM title tag
  if (metadata.get('og:title')) {
    metadata.set({title: metadata['og:title']})
  } else if ($title && $title[0] && $title[0].children && $title[0].children[0] && $title[0].children[0].data) {
    metadata.set({title: $title[0].children[0].data})
  }

  // derive author
  if (!metadata.get('author')) {
    const author = metadata.get('article:author') || metadata.get('og:article:author') || ''
    metadata.set({author: author})
  }

  // derive `source` field from url host by default
  metadata.set({source: url.split('://')[1].split('/')[0]})

  // check if we need to overwrite `source` field for youtube urls
  if ($youtubeUsername && $youtubeUsername[0] && $youtubeUsername[0].children && $youtubeUsername[0].children[0] && $youtubeUsername[0].children[0].data) {
    const source = sourceMappings($youtubeUsername[0].children[0].data)
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
