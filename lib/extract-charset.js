module.exports = function (contentTypeHeader, responseBuffer) {
  // default to `utf-8` per html5 spec
  let charset = 'utf-8'

  // First, try extracting charset from `Content-Type` response header
  // Per spec, charset in header should take precedent
  // ex: "Content-Type": "text/html; charset=utf-8"
  if (contentTypeHeader) {
    const headerMatch = contentTypeHeader.match(/charset=([\w-]+)/)
    if (headerMatch && headerMatch[1]) {
      charset = headerMatch[1]
      return charset
    }
  }

  // If no charset found, try extracting charset from meta tags in html body
  // Convert the responseBuffer to a string temporarily using `utf-8`
  // Then use regex to get charset from meta tags
  const decoder = new TextDecoder('utf-8')
  const text = decoder.decode(responseBuffer)

  // <meta charset="windows-1251">
  const charsetMetaRegex = /<meta\s+charset=['"]?([^\s'"]+)['"]?\s*\/?>/i
  const charsetMetaMatch = text.match(charsetMetaRegex)
  if (charsetMetaMatch && charsetMetaMatch[1]) {
    charset = charsetMetaMatch[1]
    return charset
  }

  // <meta http-equiv="Content-Type" content="text/html; charset=windows-1251" />
  const httpEquivCharsetRegex = /<meta\s+[^>]*\bhttp-equiv\s*=\s*["']?Content-Type["']?[^>]*\bcharset\s*=\s*["']?([^'"\s>]+)["']?[^>]*>/i

  const httpEquivCharsetMatch = text.match(httpEquivCharsetRegex)
  if (httpEquivCharsetMatch && httpEquivCharsetMatch[1]) {
    charset = httpEquivCharsetMatch[1]
    return charset
  }

  // return default `utf-8` if none of the above found
  return charset
}
