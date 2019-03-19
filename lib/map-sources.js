module.exports = function (string, sourceMap) {
  const _sourceMap = normalizeSourceMap(sourceMap)
  return _sourceMap[string.toLowerCase()]
}

function normalizeSourceMap (sourceMap) {
  const result = {}
  // lowercase sourceMap keys
  const keys = Object.keys(sourceMap)
  keys.forEach((key) => {
    result[key.toLowerCase()] = sourceMap[key]
  })
  return result
}
