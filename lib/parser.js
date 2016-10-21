const cheerio = require('cheerio')
const utils = require('./utils')
const MetadataFields = require('./metadata-fields')
const sourceMappings = require('./source-mappings')

module.exports = function (url, html, options) {
  var metadata = new MetadataFields(url) // init the object to return
  var $ = cheerio.load(html)
  var $htmlMetatags = $('meta')
  var htmlMetatags = {}
  var $title = $('title')
  var $youtubeUsername = $('.yt-user-info a')

  // extract meta tags from cheerio object and map them into more usable
  // `htmlMetatags` object
  if ($htmlMetatags) {
    // create a manageable htmlMetatags object where keys are meta tag
    // properties and values come from url metatag content
    $htmlMetatags.forEach(function (meta) {
      if (meta.attribs && meta.attribs.name && meta.attribs.content) {
        htmlMetatags[meta.attribs.name] = meta.attribs.content
      }
      if (meta.attribs && meta.attribs.property && meta.attribs.content) {
        htmlMetatags[meta.attribs.property] = meta.attribs.content
      }
    })

    // add empty fields according to the url's `og:type` meta tag
    if (htmlMetatags['og:type']) metadata = metadata.setType(htmlMetatags['og:type'])

    // now get all (empty) metadata fields to be filled in by htmlMetatags
    metadata = metadata.get()

    // freeze the keys on the metadata object
    Object.seal(metadata)

    // fill in the metadata object with url's metatag info
    var keys = Object.keys(metadata)
    keys.forEach(function (key) {
      // truncate description fields before encoding
      if (key === 'description' || key === 'og:description') {
        var length = options.descriptionLength || 750
        htmlMetatags[key] = utils.truncate(htmlMetatags[key], length)
      }
      if (key === 'og:title') {
        htmlMetatags[key] = utils.cleanTitleString(htmlMetatags[key])
      }
      if (key === 'og:image:secure_url' || key === 'og:image') {
        if (!options.ensureSecureImageRequest) {
          htmlMetatags[key] = htmlMetatags[key]
        } else {
          htmlMetatags[key] = utils.ensureSecureImageRequest(htmlMetatags[key])
        }
      }
      if (htmlMetatags[key]) metadata[key] = utils.encode(htmlMetatags[key])
    })
  }

  // derive the page title from DOM's title tag
  if ($title && $title[0] && $title[0].children && $title[0].children[0] && $title[0].children[0].data) {
    metadata.title = utils.encode(utils.cleanTitleString($title[0].children[0].data))
  } else if (metadata['og:title']) { // failover to `og:title` if available
    metadata.title = metadata['og:title']
  }

  // derive image src
  metadata.image = metadata['og:image:secure_url'] || metadata['og:image'] || ''

  // derive author
  if (!metadata.author) metadata.author = metadata['article:author'] || metadata['og:article:author'] || ''

  // derive description
  if (!metadata.description) metadata.description = metadata['og:description'] || ''

  // derive our custom `source` field from `url` param by default:
  metadata.source = url.split('://')[1].split('/')[0]

  // check if we need to overwrite custom `source` field for sites like youtube:
  if ($youtubeUsername && $youtubeUsername[0] && $youtubeUsername[0].children && $youtubeUsername[0].children[0] && $youtubeUsername[0].children[0].data) {
    var mappedSourceField = sourceMappings($youtubeUsername[0].children[0].data)
    if (mappedSourceField) metadata.source = mappedSourceField
  }

  return metadata
}
