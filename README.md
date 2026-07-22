# url-metadata

Fetch a URL and scrape its metadata using Node.js or the browser. Has optional mode to parse metadata from HTML strings or `Response` objects instead. First-class configurable security options available. Content is returned raw by design; sanitize your own output (so you control processing efficiency).

---
<div>
  👉 <i><strong>Looking for a quick hosted solution?</i> <a href="https://minifetch.com">Minifetch</a></strong> is an SEO toolkit built on top of this package by the same author/ maintainer. Get started free:
  <a href="https://www.npmjs.com/package/minifetch-api">npm install minifetch-api</a>
</div>

---
## **Features**
- proxy mode for routing thru unblocking service (optional)
- headless javascript rendering (in proxy mode)
- screenshots (in proxy mode)
- parser mode - pass in an html string or Response object (optional)
- automatic charset detection & decoding (optional)
- [x402](https://www.x402.org/) errors return payment requirements
- [Discord](https://discord.gg/BqVBeeGsc5) support channel

**Extracts:**
- redirects
- response headers
- performance metrics
- meta tags
- hreflang
- favicons
- citations, per the Google Scholar spec
- [Open Graph Protocol (og:) Tags](http://ogp.me/)
- [Twitter Card Tags](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup)
- [JSON-LD](https://moz.com/blog/json-ld-for-beginners)
- h1-h6 tags
- img tags
- the full response body as a string of html (optional)

**Security** - v5.1.0+ Protects against:
- Infinite redirect loops: `maxRedirects` option defaults to 10.
- SSRF attacks via [request-filtering-agent](https://www.npmjs.com/package/request-filtering-agent) in Node.js v18+ (custom options also available)
- Memory-exhaustion attacks (gzip bombs, oversized responses): set `size` option. Pair with `timeout` to prevent slow/connection-holding responses.
- Leaking sensitive headers (auth, cookies) if target URL redirects to a diff host.

More details below. To report a bug or request a feature please open an issue or pull request in [GitHub](https://github.com/laurengarcia/url-metadata). Please read the `Troubleshooting` section below *before* filing a bug.


## Install
Works with Node.js versions `>=18.17` or in the browser when bundled. Example build configs available in the [GitHub repo](https://github.com/laurengarcia/url-metadata) `/example-*` dirs: Next.js, Vite and Webpack (see `/example-typescript`).

```
npm install url-metadata --save
```

## Usage
In your project file:
```js
// Use 'import' in .mjs/ .ts files or if your package.json
// has "type": "module", otherwise use 'require'.
// This package supports both:
import urlMetadata from 'url-metadata';
// const urlMetadata = require('url-metadata');

async function getMetadata(url) {
  try {
    return await urlMetadata(url); // pass options as 2nd argument
  } catch (err) {
    console.error(err);
  }
}

const metadata = await getMetadata('https://en.wikipedia.org/wiki/WHATWG');
```

### Options & Defaults
To override the default options, pass in a second options argument. The default options are the values below.
```javascript
const options = {

  // Customize the default request headers:
  requestHeaders: {
    'User-Agent': 'url-metadata (+https://www.npmjs.com/package/url-metadata)',
    From: 'example@example.com'
  },

  // Route the fetch through a proxy/ unblocking service.
  // In proxy mode, other fetch-related options will be
  // silently ignored. Details in  "Proxy Mode" section below.
  // Presence of proxyUrl alone triggers proxy mode.
  proxyUrl: undefined,
  // Optional vendor-specific query params passed thru as-is,
  // exactly as named in their docs. Get residential proxies,
  // headless javascript rendering, and screenshots.
  proxyParams: undefined,

  // Alternate use-case: pass `Response` object to be parsed
  // See example usage below
  parseResponseObject: undefined,

  // (Node.js v18.17+ only)
  // To prevent SSRF attacks, the default option blocks fetch
  // requests to private network & reserved IP addresses via:
  // https://www.npmjs.com/package/request-filtering-agent
  // Browser security policies prevent SSRF automatically.
  requestFilteringAgentOptions: undefined,

  // (Node.js v18.17+ only)
  // Pass in your own custom `agent` to override the
  // built-in request filtering agent above
  // https://www.npmjs.com/package/node-fetch/v/2.7.0#custom-agent
  agent: undefined,

  // Maximum redirects in request chain, defaults to 10
  maxRedirects: 10,

  // `fetch` timeout in milliseconds, default is 10 seconds.
  // Time-bounds slow and connection-holding (Slowloris-class) responses.
  // Auto-bumped to 60 seconds in proxy mode (see "Proxy mode" below)
  // unless you explicitly pass your own `timeout`.
  timeout: 10000,

  // (Node.js v18.17+ only) max size of response in bytes (decompressed).
  // Aborts before limit is exceeded so oversized upstreams can't
  // exhaust process memory. Pair with `timeout` option above.
  // Default set to 0 disables max size:
  size: 0,

  // (Node.js v18.17+ only) compression defaults to true
  // Support gzip/deflate content encoding, set `false` to disable
  compress: true,

  // Force-rewrites favicon and img url strings returned to use https://,
  // valid for images with absolute & protocol-relative urls.
  // Relative urls pass thru untouched:
  ensureSecureImageRequest: true,

  // Charset to decode response with (ex: 'auto', 'utf-8', 'EUC-JP')
  // defaults to auto-detect in `Content-Type` header or meta tag
  // if none found, default `auto` option falls back to `utf-8`
  // override by passing in charset here (ex: 'windows-1251'):
  decode: 'auto',

  // (Browser only) `fetch` API cache setting
  cache: 'no-cache',

  // (Browser only) `fetch` API mode (ex: 'cors', 'same-origin', etc)
  mode: 'cors',

  // Number of characters to truncate description to
  descriptionLength: 750,

  // Include raw response body as string
  includeResponseBody: false
};

// Options usage:
const metadata = await urlMetadata(url, options);

// Alternately, parse a Response object instead:
try {
  // fetch the URL in your own code
  const response = await fetch('https://en.wikipedia.org/wiki/WHATWG');
  // ...do your own thing
  // then pass the `response` object to be parsed for metadata:
  const metadata = await urlMetadata(null, {
    parseResponseObject: response
  });
  console.log(metadata);
} catch (err) {
  console.error(err);
}

// Similarly, if you have a string of html you can create
// a Response object and pass the html string into it:
const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Metadata page</title>
    <meta name="author" content="foobar">
    <meta name="keywords" content="HTML, CSS, JavaScript">
  </head>
  <body>
    <h1>Metadata page</h1>
  </body>
</html>
`;
const response = new Response(html, {
  headers: {
    'Content-Type': 'text/html'
  }
});
const metadata = await urlMetadata(null, {
  parseResponseObject: response
});
console.log(metadata);
```

#### Proxy mode
For reaching web pages that are blocked. This package is vendor-neutral — any proxy/unblocking service works via `proxyUrl` + `proxyParams`. Recommended vendors below support the author via affiliate links. Have another vendor you'd like documented here? Ask in the [Discord support channel](https://discord.gg/BqVBeeGsc5).

- [ScraperAPI](https://docs.scraperapi.com/getting-started/quick-start/grab-your-api-key?fp_ref=lauren37) (affiliate link)
- [ScrapingAnt](https://scrapingant.com/) (affiliate link pending)

`proxyUrl` triggers proxy mode. Proxy calls route through a third party doing its own upstream fetch, which takes longer than a direct fetch — so `options.timeout` defaults to 60 seconds in instead of the usual 10, or you can customize.

`proxyParams` is a flat passthru, sent verbatim as query params exactly as named in your vendor's docs - no allowlist, no translation on our side. Some vendors authenticate via a header instead of a query param (ex: an `x-api-key` header) — for those, pass it in `requestHeaders` instead and skip `proxyParams` entirely if the vendor needs no other params.

In proxy mode, `requestHeaders` are sent to the proxy vendor, not the target URL — the vendor makes its own request to the target URL and won't include them unless it has a passthrough param for it (ex: ScraperAPI's `keep_headers: true`).

**Note:** Some vendors offer structured-data or merchant-specific endpoints that return JSON or CSV, not HTML — this package can't parse those and will throw `unsupported content type` if `proxyUrl` is pointed at one. That's expected; those are a different kind of tool than web page metadata extraction. Stick to each vendor's plain HTML-fetching endpoint (ex: ScraperAPI's https://api.scraperapi.com/, ScrapingAnt's https://api.scrapingant.com/v2/general).

#### ScraperAPI.com

[ScraperAPI's proxy params list](https://docs.scraperapi.com/control-and-optimization/supported-parameters?fp_ref=lauren37) offers headless javascript rendering via `render: true`, also supports `screenshot: true`. Activate residential and mobile IPs by setting `premium: true`, and `ultra_premium: true` activates advanced bypassing mechanisms.

```javascript
const metadata = await urlMetadata('https://hardto.get', {
  proxyUrl: 'https://api.scraperapi.com/',
  proxyParams: {
    api_key: '<YOUR_API_KEY>'
  }
});
// To find out how many credits the request cost you:
console.log(metadata.responseHeaders['sa-credit-cost']);
// To get screenshot when you set `proxyParams: { screenshot: true }`
console.log(metadata.responseHeaders['sa-screenshot']);
```
[ScraperAPI status codes and errors](https://docs.scraperapi.com/ai-parser/status-codes-and-errors?fp_ref=lauren37) list is here.

##### ScrapingAnt.com

ScrapingAnt works the same way, just with its own `proxyUrl` and query params:
```javascript
const metadata = await urlMetadata('https://hardto.get', {
  proxyUrl: 'https://api.scrapingant.com/v2/general',
  proxyParams: {
    'x-api-key': '<YOUR_API_KEY>'
  }
});
```
TODO: swap out for affiliate link! [ScrapingAnt's proxy params list](https://docs.scrapingant.com/request-response-format#available-parameters) offers headless javascript rendering by default. Set `browser: false` to turn it off. You may pass your API key as proxy param `x-api-key` or send it as a header for extra security.

TODO swap for affiliate link[ScrapingAnt status codes and errors](https://docs.scrapingant.com/errors) list is here.

### Returns
Returns a promise resolved with a JSON object. Note that the returned `url` field will be the last hop in the request chain if there are redirects.

A basic template for the object can be found in `lib/metadata-fields.js`. Any additional meta tags found on the page are appended as new fields to the object. Extractor details live in `/lib/extract-*`.

Content is returned raw, by design, as found on the page without sanitizing it. Only you know its output context, so sanitization is your call (e.g. DOMPurify before rendering to a DOM; parameterized queries when storing to SQL). Treat all extracted values as untrusted.

The object consists of key/value pairs as strings, with exceptions:
- `redirects` is an object with `count` (number) and `chain` (array of `{ order, url, statusCode }`)
- `canonical` is a string, and returns the first `<link rel="canonical">` found on the page (empty string if none). The raw href of every canonical tag found — including if there's only one, or none, or many — is also returned as `canonicalUrls`, an array of strings in the order encountered while parsing the page, so you can reason about this yourself (e.g. detect and fix multiples).
- `hreflang`, `favicons`, and `responseHeaders` is an array of objects containing key/value pairs of strings
- `jsonld` is an array of objects
- `meta` tags with multiple or duplicate tags on the page are returned as strings with comma-separated values since these tags don't typically contain commas, except:
- meta tags that begin with `citation_` (ex: `citation_author`) return with keys as strings and values that are an array of strings conforming to the [Google Scholar spec](https://scholar.google.com/intl/en/scholar/inclusion.html#indexing) which allows for multiple citation meta tags with different content values, including commas. So if the html contains:
```
<meta name="citation_author" content="Arlitsch, Kenning">
<meta name="citation_author" content="OBrien, Patrick">
```
... it will return as:
```
'citation_author': ["Arlitsch, Kenning", "OBrien, Patrick"],
```


### TypeScript
The default return type `Result` is intentionally loose (collapses to `any`) so that existing codebases, mocks, and defensive scraping code compile untouched. If you want a documented, autocompleting shape, opt in with a cast. No runtime change needed:

```ts
import urlMetadata from 'url-metadata';

// Known fields fully typed; any extra page-specific
// meta tags fall through to `any`:
const metadata = await urlMetadata(url) as urlMetadata.KnownFields;
metadata.title;      // string
metadata.favicons;   // FaviconTag[]
metadata.redirects;  // { count: number, chain: RedirectHop[] }
metadata.foobar;     // any (arbitrary meta tag found on page; mostly returns as string)

// Strictest variant: known fields ONLY, closed shape.
// Catches typos at compile time, but arbitrary page-specific
// meta tags (incl. `citation_*`) are compile errors:
const strict = await urlMetadata(url) as urlMetadata.KnownFieldsStrict;
```

See `index.d.ts` for the full field catalog and the other exported interfaces: `Options`, `HreflangTag`, `FaviconTag`, `Heading`, `ImgTag`, `RedirectHop`, and `UrlMetadataError`.


### Troubleshooting

**Issue:** Request returns `404`, `403` errors or a CAPTCHA form. Your fetch request may have been blocked by the target server because it suspects you are a bot or scraper. This package has a built-in proxy mode you can use for hard-to-get pages, see "Proxy Mode" section above.

**Issue:** Proxy mode throws `unsupported content type` errors. This is expected behavior when you use a proxy url or proxy params that produce anything other than HTML. See "Proxy Mode" section above.

**Issue:** Proxy mode with `render: true` param (headless browser rendering) throws `unsupported content type: text/x-component`. Some JS-rendered sites (esp Next.js App Router sites) can return a React Server Component payload — a serialized component tree — instead of the rendered HTML page. This package can't parse that as HTML, so it throws instead of returning corrupted metadata. This is a quirk of the target site (and sometimes intermittent, tied to CDN/caching behavior), not something fixable from this package's side; retry or test without `render: true`. You may also try a different proxy.

**Issue:** `No fetch implementation found`. You're in either an older browser that doesn't have the native `fetch` API or a Node.js environment that doesn't support `node-fetch` (Node.js <18.17). File a GitHub issue or try dowgrading to `url-metadata` version 2.5.0 which uses the now-deprecated `request` module.

**Issue:** `DNS Lookup` errors. The SSRF filtering agent defaults on this package prevent calls to private ip addresses, link-local addresses and reserved ip addresses. To change or disable this feature you need to pass custom `requestFilteringAgentOptions`. More info [here](https://www.npmjs.com/package/request-filtering-agent).

**Issue:** `Response status code 0` or `CORS` errors. The `fetch` request failed at either the network or protocol level. Possible causes:

- CORS errors. Try changing the mode option (ex: `cors`, `same-origin`, etc) or setting the `Access-Control-Allow-Origin` header on the server response from the url you are requesting if you have access to it.

- Trying to access an `https` resource that has invalid certificate, or trying to access an `http` resource from a page with an `https` origin.

- A browser plugin such as an ad-blocker or privacy protector.

You may also want to try the hosted version of this package: [Minifetch](https://www.npmjs.com/package/minifetch-api).
