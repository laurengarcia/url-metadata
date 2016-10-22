const urlMetadata = require('./../index')

urlMetadata('http://bit.ly/2ePIrDy').then(
  function (metadata) { // success callback
    console.log(metadata)
  },
  function (error) { // failure callback
    console.log(error)
  })
