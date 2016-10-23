const urlMetadata = require('./../index')

const options = {
  sourceMap: {'boiling frogs post': 'boilingfrogspost.com'}
}
urlMetadata('https://www.youtube.com/watch?v=g4RkiiW-gtc', options).then(
  function (metadata) { // success callback
    // result:
    // notice the metadata's source field --
    // the youtube username `boiling frogs post` is mapped into the source
    // field as `boilingfrogspost.com`
    console.log(metadata)
  },
  function (error) { // failure callback
    console.log(error)
  })
