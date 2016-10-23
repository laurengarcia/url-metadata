const urlMetadata = require('./../index')

urlMetadata('https://www.youtube.com/watch?v=g4RkiiW-gtc').then(
  function (metadata) { // success callback
    console.log(metadata)
  },
  function (error) { // failure callback
    console.log(error)
  })
