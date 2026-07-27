module.exports = {

  cleanTitleString: function (value) {
    if (typeof value !== 'string') return value
    // remove any newline characters, replace with space:
    value = value.replace(/\n|\r/gm, ' ')
    // remove double (or more) spaces, replace with single space:
    value = value.replace(/( {2,})/gm, ' ')
    return value
  },

  truncate: function (value, length) {
    if (typeof value !== 'string') return ''
    if (value.length <= length) return value
    return value.substring(0, length)
  },

  stripNewlines: function (value) {
    if (typeof value !== 'string') return value
    // remove any newline characters, replace with space:
    return value.replace(/\n|\r/gm, ' ')
  },

  ensureSecureImageRequest: function (src) {
    // data URI's pass thru untouched
    if (src && src.indexOf('data:') === 0) {
      return src
    }
    // handle `http://` cases
    if (src && src.indexOf('http://') === 0) {
      const arr = src.split('//')
      arr[0] = 'https:'
      src = arr.join('//')
    // handle `//:` protocol-relative cases with no scheme
    } else if (src && src.indexOf('//') === 0) {
      src = 'https:' + src
    }
    return src
  },

  /**
   * True for values `omitEmpty` should drop: `undefined`, `null`, empty
   * string, empty array [], empty object {}. Shallow — top-level fields only, no
   * recursion into nested objects (ex: `performance`, `redirects`), which are
   * dropped only when they have zero own keys.
   */
  isEmpty: function (value) {
    if (value === undefined || value === null || value === '') return true
    if (Array.isArray(value)) return value.length === 0
    if (typeof value === 'object') return Object.keys(value).length === 0
    return false
  }

}
