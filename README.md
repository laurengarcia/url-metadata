# url-metadata

Request a url and scrape the metadata from its HTML using Node.js or the browser. Has an optional mode that lets you pass in a string of html or a `Response` object as well (see `Options` section below).

---
<div>
  👉 <i><strong>Looking for a quick hosted solution?</i> <a href="https://minifetch.com">Minifetch</a></strong> is an SEO toolkit built on top of this package by the same author/ maintainer. Get started free:
  <a href="https://www.npmjs.com/package/minifetch-api">npm install minifetch-api</a>
</div>

---
## **Includes:**
- response headers
- redirects
- meta tags
- hreflang
- favicons
- citations, per the Google Scholar spec
- [Open Graph Protocol (og:) Tags](http://ogp.me/)
- [Twitter Card Tags](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup)
- [JSON-LD](https://moz.com/blog/json-ld-for-beginners)
- h1-h6 tags
- img tags
- automatic charset detection & decoding (optional)
- the full response body as a string of html (optional)
- [x402](https://www.x402.org/) "payment required" error support

**Security** - v5.1.0+ Protects against:
- Infinite redirect loops
- SSRF attacks via [request-filtering-agent](https://www.npmjs.com/package/request-filtering-agent) in Node.js v18+ (custom options also available)

More details below. To report a bug or request a feature please open an issue or pull request in [GitHub](https://github.com/laurengarcia/url-metadata). Please read the `Troubleshooting` section below *before* filing a bug.


## Install
Works with Node.js versions `>=6.0.0` or in the browser when bundled. Example build configs available in the [GitHub repo](https://github.com/laurengarcia/url-metadata) `/example-*` dirs: Next.js, Vite and Webpack (see `/example-typescript`).

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
    return await urlMetadata(url);
  } catch (err) {
    console.error(err);
  }
}

const metadata = await getMetadata('https://en.wikipedia.org/wiki/Server-side_request_forgery');
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

  // (Node.js v18+ only)
  // To prevent SSRF attacks, the default option below blocks
  // requests to private network & reserved IP addresses via:
  // https://www.npmjs.com/package/request-filtering-agent
  // Browser security policies prevent SSRF automatically.
  requestFilteringAgentOptions: undefined,

  // (Node.js v6+ only)
  // Pass in your own custom `agent` to override the
  // built-in request filtering agent above
  // https://www.npmjs.com/package/node-fetch/v/2.7.0#custom-agent
  agent: undefined,

  // (Browser only) `fetch` API cache setting
  cache: 'no-cache',

  // (Browser only) `fetch` API mode (ex: 'cors', 'same-origin', etc)
  mode: 'cors',

  // Maximum redirects in request chain, defaults to 10
  maxRedirects: 10,

  // `fetch` timeout in milliseconds, default is 10 seconds
  timeout: 10000,

  // (Node.js v6+ only) max size of response in bytes (uncompressed)
  // Default set to 0 to disable max size
  size: 0,

  // (Node.js v6+ only) compression defaults to true
  // Support gzip/deflate content encoding, set `false` to disable
  compress: true,

  // Charset to decode response with (ex: 'auto', 'utf-8', 'EUC-JP')
  // defaults to auto-detect in `Content-Type` header or meta tag
  // if none found, default `auto` option falls back to `utf-8`
  // override by passing in charset here (ex: 'windows-1251'):
  decode: 'auto',

  // Number of characters to truncate description to
  descriptionLength: 750,

  // Force image urls in selected tags to use https,
  // valid for images & favicons with full paths
  ensureSecureImageRequest: true,

  // Include raw response body as string
  includeResponseBody: false,

  // Alternate use-case: pass in `Response` object here to be parsed
  // see example below
  parseResponseObject: undefined
};

// Basic options usage
try {
  const url = 'https://en.wikipedia.org/wiki/Server-side_request_forgery';
  const metadata = await urlMetadata(url, options);
  console.log(metadata);
} catch (err) {
  console.error(err);
  // Optional: handle x402 "payment required" responses
  if (err.paymentRequired && err.x402) {
    // Handle x402 payment details
  }
}

// Alternate use-case: parse a Response object instead:
try {
  // fetch the url in your own code
  const response = await fetch('https://en.wikipedia.org/wiki/Server-side_request_forgery');
  // pass the `response` object to be parsed for its metadata
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

### Returns
Returns a promise resolved with a JSON object. Note that the returned `url` field will be the last hop in the request chain if there are redirects.

A basic template for the object can be found in `lib/metadata-fields.js`. Any additional meta tags found on the page are appended as new fields.

The object consists of key/value pairs as strings, with exceptions:
- `redirects` is an object with `count` (number) and `chain` (array of `{ order, url, statusCode }`)
- `hreflang`, `favicons`, and `responseHeaders` is an array of objects containing key/value pairs of strings
- `jsonld` is an array of objects
- all meta tags that begin with `citation_` (ex: `citation_author`) return with keys as strings and values that are an array of strings conforming to the [Google Scholar spec](https://www.google.com/intl/en/scholar/inclusion.html#indexing) which allows for multiple citation meta tags with different content values. So if the html contains:
```
<meta name="citation_author" content="Arlitsch, Kenning">
<meta name="citation_author" content="OBrien, Patrick">
```
... it will return as:
```
'citation_author': ["Arlitsch, Kenning", "OBrien, Patrick"],
```

### Troubleshooting

**Issue:** Request returns `404`, `403` errors or a CAPTCHA form. Your request may have been blocked by the server because it suspects you are a bot or scraper. Check [this list](https://dev.to/princepeterhansen/7-ways-to-avoid-getting-blocked-or-blacklisted-when-web-scraping-45ii) to ensure you're not triggering a block.

**Issue:** `No fetch implementation found`. You're in either an older browser that doesn't have the native `fetch` API or a Node.js environment that doesn't support `node-fetch` (Node.js < v6). File a GitHub issue or try dowgrading to `url-metadata` version 2.5.0 which uses the now-deprecated `request` module.

**Issue:** `DNS Lookup` errors. The SSRF filtering agent defaults on this package prevent calls to private ip addresses, link-local addresses and reserved ip addresses. To change or disable this feature you need to pass custom `requestFilteringAgentOptions`. More info [here](https://www.npmjs.com/package/request-filtering-agent).

**Issue:** `Response status code 0` or `CORS` errors. The `fetch` request failed at either the network or protocol level. Possible causes:

- CORS errors. Try changing the mode option (ex: `cors`, `same-origin`, etc) or setting the `Access-Control-Allow-Origin` header on the server response from the url you are requesting if you have access to it.

- Trying to access an `https` resource that has invalid certificate, or trying to access an `http` resource from a page with an `https` origin.

- A browser plugin such as an ad-blocker or privacy protector.

You may also want to try the hosted version of this package: [Minifetch](https://www.npmjs.com/package/minifetch-api).
