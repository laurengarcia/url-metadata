const urlMetadata = require('./../index')

urlMetadata('https://moz.com/learn/seo/robots-meta-directives').then(
  function (metadata) { // success callback
    console.log(metadata)
  },
  function (error) { // failure callback
    console.log(error)
  })
