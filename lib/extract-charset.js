module.exports = function (contentTypeHeader, responseBuffer) {
  // TODO:
  // First, try extracting charset from `Content-Type` header
  // Per spec, charset in header should take precedent

  // TODO:
  // If none found, try extracting charset from meta tag
  // ex: <meta http-equiv="Content-Type" content="text/html; charset=windows-1251" />
}
