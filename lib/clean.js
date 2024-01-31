const utils = require('./utils')

module.exports = function (key, value, options) {
  if (key === 'description' || key === 'og:description') {
    value = utils.truncate(value, options.descriptionLength)
  }
  if (key === 'og:title' || key === 'title') {
    value = utils.cleanTitleString(value)
  }
  if (key === 'image' ||
      key === 'og:image' ||
      key === 'og:image:secure_url' ||
      key === 'twitter:image'
  ) {
    if (options.ensureSecureImageRequest) value = utils.ensureSecureImageRequest(value)
  }
  if (key === 'favicons') {
    if (options.ensureSecureImageRequest) {
      value.forEach(function (favicon) {
        favicon.href = utils.ensureSecureImageRequest(favicon.href)
      })
    }
  }
  if (key === 'imgTags') {
    if (options.ensureSecureImageRequest) {
      value.forEach(function (img) {
        if (img.src) {
          img.src = utils.ensureSecureImageRequest(img.src)
        }
      })
    }
  }
  return value
}
