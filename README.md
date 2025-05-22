# url-metadata

Request a url and scrape the metadata from its HTML using Node.js or the browser. Has an alternate mode that lets you pass in your own `Response` object as well (see `Options` section below).

Includes:

- meta tags
- favicons
- citations, per the Google Scholar spec
- [Open Graph Protocol (og:) Tags](http://ogp.me/)
- [Twitter Card Tags](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup)
- [JSON-LD](https://moz.com/blog/json-ld-for-beginners)
- h1-h6 tags
- img tags
- relevant response headers
- automatic charset detection & decoding (optional)
- the full response body as a string of html (optional)

More details in the `Returns` section below.

v5.1.0+ Protects against:
- Infinite redirect loops
- SSRF attacks via [request-filtering-agent](https://www.npmjs.com/package/request-filtering-agent) in Node.js v18+ (custom options available)

Other new features:
- Automatic environment detection: package now detects whether it's running in Node.js or a browser
- These changes reduce the bundle size on the browser
- Dedicated entry points for different environments
```
// in package.json:
{
  "main": "index.js",      // For Node.js
  "browser": "browser.js", // For browsers
  "exports": {
    "node": "./index.js",
    "browser": "./browser.js",
    "default": "./index.js"
  }
}
```
- These changes are fully compatible with all modern bundlers (Webpack, Rollup, Vite, Parcel) and require no code changes in your application. See /example directories included in package.
- Added two new options:
  - `size`: set a max size for the response in Node.js envs
  - `compress`: support gzip/deflate content encoding in Node.js

To report a bug or request a feature please open an issue or pull request in [GitHub](https://github.com/laurengarcia/url-metadata). Please read the `Troubleshooting` section below *before* filing a bug.


## Usage
Works with Node.js versions `>=6.0.0` or in the browser when bundled with Webpack (see `/example-typescript`) or Vite (see `/example-vite`). Use previous version `2.5.0` which uses the (now-deprecated) `request` module if you don't have access to `fetch` or Node.js version 6.0+ in your target environment.

Install in your project:
```
npm install url-metadata --save
```

In your project file:
```javascript
const urlMetadata = require('url-metadata');

try {
  const url = 'https://www.npmjs.com/package/url-metadata';
  const metadata = await urlMetadata(url);
  console.log(metadata);
} catch (err) {
  console.log(err);
}
```

### Options & Defaults
The default options are the values below. To override the default options, pass in a second options argument.
```javascript
const options = {

  // Customize these default request headers:
  requestHeaders: {
    'User-Agent': 'url-metadata (+https://www.npmjs.com/package/url-metadata)',
    From: 'example@example.com'
  },

  // Node.js v18+ only; other envs (browser) ignore silently.
  // To prevent SSRF attacks, the default option below blocks
  // requests to private network & reserved IP addresses via:
  // https://www.npmjs.com/package/request-filtering-agent
  // Browser security policies prevent SSRF automatically.
  requestFilteringAgentOptions: undefined,

  // Browser only: `fetch` API cache setting for request
  cache: 'no-cache',

  // Browser only: `fetch` API mode (ex: 'cors', 'same-origin', etc)
  mode: 'cors',

  // Maximum redirects in request chain, defaults to 10
  maxRedirects: 10,

  // Fetch timeout in milliseconds, default is 10 seconds
  timeout: 10000,

  // Node.js v6+ only: max size of response in bytes (uncompressed)
  // Default set to 0 to disable max size
  size: 0,

  // Node.js v6+ only; defaults to true
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

// Basic usage
try {
  const url = 'https://www.npmjs.com/package/url-metadata';
  const metadata = await urlMetadata(url, options);
  console.log(metadata);
} catch (err) {
  console.log(err);
}

// Alternate use-case: parse a Response object instead
try {
  // fetch the url in your own code
  const response = await fetch('https://www.npmjs.com/package/url-metadata');
  // ... do other stuff with it...
  // pass the `response` object to be parsed for its metadata
  const metadata = await urlMetadata(null, {
    parseResponseObject: response
  });
  console.log(metadata);
} catch (err) {
  console.log(err);
}

// Similarly, if you have a string of html you can create
// a response object and pass the html string into it.
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
Returns a promise resolved with an object. Note that the `url` field returned will be the last hop in the request chain. If you pass in a url from a url shortener you'll get back the final destination as the `url`.

The returned `metadata` object consists of key/value pairs that are all strings, with a few exceptions:
- `favicons` returns an array of objects containing key/value pairs (strings)
- `jsonld` returns an array of objects
- all meta tags that begin with `citation_` (ex: `citation_author`) return with keys as strings and values that are an array of strings to conform to the [Google Scholar spec](https://www.google.com/intl/en/scholar/inclusion.html#indexing) which allows for multiple citation meta tags with different content values. So if the html contains:
```
<meta name="citation_author" content="Arlitsch, Kenning">
<meta name="citation_author" content="OBrien, Patrick">
```
... this module will return:
```
'citation_author': ["Arlitsch, Kenning", "OBrien, Patrick"],
```

A basic template for the returned metadata object can be found in `lib/metadata-fields.js`. Any additional meta tags found on the page are appended as new fields to the object.

### Troubleshooting

**Issue:** `DNS Lookup` errors. The SSRF filtering agent defaults on this package prevent calls to private ip addresses, link-local addresses and reserved ip addresses. To change or disable this feature you need to pass custom `requestFilteringAgentOptions`. More info [here](https://www.npmjs.com/package/request-filtering-agent).

**Issue:** `No fetch implementation available`. You're in either an older browser that doesn't have the native `fetch` API or a Node.js environment that doesn't support `node-fetch` (Node.js < v6). Try dowgrading to `url-metadata` version 2.5.0 which uses the now-deprecated `request` module.

**Issue:** `Response status code 0` or `CORS` errors. The `fetch` request failed at either the network or protocol level. Possible causes:

- CORS errors. Try changing the mode option (ex: `cors`, `same-origin`, etc) or setting the `Access-Control-Allow-Origin` header on the server response from the url you are requesting if you have access to it.

- Trying to access an `https` resource that has invalid certificate, or trying to access an `http` resource from a page with an `https` origin.

- A browser plugin such as an ad-blocker or privacy protector.

**Issue:** Request returns `404`, `403` errors or a CAPTCHA form. Your request may have been blocked by the server because it suspects you are a bot or scraper. Check [this list](https://dev.to/princepeterhansen/7-ways-to-avoid-getting-blocked-or-blacklisted-when-web-scraping-45ii) to ensure you're not triggering a block.
