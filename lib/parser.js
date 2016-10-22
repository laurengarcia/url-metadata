const cheerio = require('cheerio')
const utils = require('./utils')
const MetadataFields = require('./metadata-fields')
const extractMetaTags = require('./extract-meta-tags')
const sourceMappings = require('./source-mappings')

module.exports = function (url, html, options) {
  var $ = cheerio.load(html)
  var scrapedMetaTags = extractMetaTags($('meta'))
  var $title = $('title')
  var $youtubeUsername = $('.yt-user-info a')
  var encode = options.encodeFields ? utils.encode : function (value) { return value }

  // configure empty fields on metadata object that we'll return
  var metadata = new MetadataFields()
  if (scrapedMetaTags['og:type']) metadata = metadata.setType(scrapedMetaTags['og:type'])
  metadata = metadata.get()
  Object.seal(metadata)  // freeze the keys

  // fill in the metadata object with scraped meta tag data from url response
  Object.keys(metadata).forEach(function (key) {
    // truncate description fields before encoding
    if (key === 'description' || key === 'og:description') {
      var length = options.descriptionLength || 750
      scrapedMetaTags[key] = utils.truncate(scrapedMetaTags[key], length)
    }
    if (key === 'og:title') {
      scrapedMetaTags[key] = utils.cleanTitleString(scrapedMetaTags[key])
    }
    if (key === 'og:image:secure_url' || key === 'og:image') {
      if (!options.ensureSecureImageRequest) {
        scrapedMetaTags[key] = scrapedMetaTags[key]
      } else {
        scrapedMetaTags[key] = utils.ensureSecureImageRequest(scrapedMetaTags[key])
      }
    }
    if (scrapedMetaTags[key]) metadata[key] = encode(scrapedMetaTags[key])
  })

  // set url
  metadata.url = encode(url)

  // derive the page title
  // if there's no `og:title` tag, use the DOM's <title> tag as a failover
  if (metadata['og:title']) {
    metadata.title = metadata['og:title']
  } else if ($title && $title[0] && $title[0].children && $title[0].children[0] && $title[0].children[0].data) {
    metadata.title = encode(utils.cleanTitleString($title[0].children[0].data))
  }

  // derive our custom `source` field from `url` param by default:
  metadata.source = encode(url.split('://')[1].split('/')[0])

  // check if we need to overwrite custom `source` field for youtube urls:
  if ($youtubeUsername && $youtubeUsername[0] && $youtubeUsername[0].children && $youtubeUsername[0].children[0] && $youtubeUsername[0].children[0].data) {
    var mappedSourceField = sourceMappings($youtubeUsername[0].children[0].data)
    if (mappedSourceField) metadata.source = encode(mappedSourceField)
  }

  // derive image src
  metadata.image = metadata['og:image:secure_url'] || metadata['og:image'] || ''

  // derive author
  if (!metadata.author) metadata.author = metadata['article:author'] || metadata['og:article:author'] || ''

  // derive description
  if (!metadata.description) metadata.description = metadata['og:description'] || ''

  // return result
  return metadata
}
