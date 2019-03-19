const urlMetadata = require('./../index')

const options = {
  encode: function (value) {
    return encodeURIComponent(value).replace(/['*]/g, escape)
  }
}
urlMetadata('https://www.npmjs.com/package/url-metadata', options).then(
  function (metadata) { // success callback
    console.log(metadata)
  },
  function (error) { // failure callback
    console.log(error)
  })
