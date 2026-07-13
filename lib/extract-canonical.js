/**
 * Collects raw href values from every <link rel="canonical"> tag on the
 * page, in document order, and derives a single best-guess `canonical`
 * value from them.
 *
 * canonicalUrls is a raw extraction: it does not dedupe, validate, or
 * otherwise form an opinion about multiple or malformed canonical tags.
 * Deciding whether multiple canonicals is a WARN/FAIL is the SEO audit
 * layer's job, not this package's.
 *
 * canonical is derived as the first occurrence in document order. This
 * matches what a browser's `document.querySelector('link[rel="canonical"]')`
 * would return, and is the closest thing to a de facto standard: there is
 * no formal spec dictating parser tie-break behavior when multiple
 * canonical tags exist, and Google's own resolution in that case is
 * undocumented/unreliable, so we don't try to out-guess it here.
 *
 * @param $ cheerio instance
 * @returns {{ canonical: string, canonicalUrls: string[] }}
 */
module.exports = function ($) {
  const canonicalUrls = []

  $('link').each(function (index, el) {
    if (el.attribs && el.attribs.rel === 'canonical' && el.attribs.href) {
      canonicalUrls.push(el.attribs.href)
    }
  })

  const canonical = canonicalUrls.length ? canonicalUrls[0] : ''

  return { canonical, canonicalUrls }
}
