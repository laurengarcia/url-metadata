module.exports = function (string, sourceMap) {
  return sourceMap[string.toLowerCase()]
}
