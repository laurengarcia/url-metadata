const utils = require('./utils')

module.exports = function (key, value, options) {
  if (key === 'description' || key === 'og:description') {
    var length = options.descriptionLength || 750
    value = utils.truncate(value, length)
  }
  if (key === 'og:title' || key === 'title') {
    value = utils.cleanTitleString(value)
  }
  if (key === 'image' || key === 'og:image:secure_url' || key === 'og:image') {
    if (options.ensureSecureImageRequest) {
      value = utils.ensureSecureImageRequest(value)
    }
  }

  return value
}
