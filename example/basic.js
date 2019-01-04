const urlMetadata = require('./../index')

urlMetadata('https://www.npmjs.com/package/url-metadata').then(
  function (metadata) { // success callback
    console.log(metadata)
  },
  function (error) { // failure callback
    console.log(error)
  })
