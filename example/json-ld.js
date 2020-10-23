const urlMetadata = require('./../index')

urlMetadata('https://www.coindesk.com/twitter-systemically-important-financial-regulators').then(
  function (metadata) { // success callback
    console.log(metadata)
  },
  function (error) { // failure callback
    console.log(error)
  })
