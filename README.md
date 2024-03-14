# url-metadata

Request a url and scrape the metadata from its HTML using Node.js or the browser. Has an alternate mode that lets you pass in your own `Response` object as well (see `Options`).

Includes:
- meta tags
- favicons
- citations, per the Google Scholar spec
- [Open Graph Protocol (og:) Tags](http://ogp.me/)
- [Twitter Card Tags](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup)
- [JSON-LD](https://moz.com/blog/json-ld-for-beginners)
- h1-h6 tags
- img tags
- automatic charset detection & decoding (optional)
- the full response body as a string of html (optional)

More details in the `Returns` section below.

To report a bug or request a feature please open an issue or pull request in [GitHub](https://github.com/laurengarcia/url-metadata). Please read the `Troublehsooting` section below *before* filing a bug.


## Usage
Works with Node.js version `>=18.0.0` or in the browser when bundled with Webpack or Parcel (see `/example-typescript`). Under the hood, this package does some post-request processing on top of the js-native `fetch` API. Use previous version `2.5.0` which uses the (now-deprecated) `request` module if you don't have access to `fetch` API in your target environment.

Install in your project:
```
$ npm install url-metadata --save
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
  // custom request headers
  requestHeaders: {
    'User-Agent': 'url-metadata/3.0 (npm module)',
    'From': 'example@example.com'
  },

  // `fetch` API cache setting for request
  cache: 'no-cache',

  // `fetch` API mode (ex: 'cors', 'no-cors', 'same-origin', etc)
  mode: 'cors',

  // charset to decode response with (ex: 'auto', 'utf-8', 'EUC-JP')
  // defaults to auto-detect in `Content-Type` header or meta tag
  // if none found, default `auto` option falls back to `utf-8`
  // override by passing in charset here (ex: 'windows-1251'):
  decode: 'auto',

  // timeout in milliseconds, default is 10 seconds
  timeout: 10000,

  // number of characters to truncate description to
  descriptionLength: 750,

  // force image urls in selected tags to use https,
  // valid for images & favicons with full paths
  ensureSecureImageRequest: true,

  // return raw response body as string
  includeResponseBody: false,

  // alternate use-case: pass in `Response` object here to be parsed
  // see example below
  parseResponseObject: null,
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
  const metadata = await urlMetadata(null, { parseResponseObject: response });
  console.log(metadata);
} catch (err) {
  console.log(err);
}
// ...If instead you need to parse a string of html you can create a response object and pass the html string into it. See example in test/options.test.js file.
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

**Issue:** `Response status code 0` or `CORS errors`. The `fetch` request failed at either the network or protocol level. Possible causes:
- CORS errors. Try changing the mode option (ex: `cors`, `no-cors`, `same-origin`, etc) or setting the `Access-Control-Allow-Origin` header on the server response from the url you are requesting if you have access to it.
- Trying to access an `https` resource that has invalid certificate, or trying to access an `http` resource from a page with an `https` origin.
- A browser plugin such as an ad-blocker or privacy protector.

**Issue:** `fetch is not defined`. Error thrown in a Node.js or browser environment that doesn't have `fetch` method available. Try upgrading your environment (Node.js version `>=18.0.0`), or you can use an earlier version of this package (version 2.5.0).

**Issue:** Request returns `404`, `403` errors or a CAPTCHA form. Your request may have been blocked by the server because it suspects you are a bot or scraper. Check [this list](https://dev.to/princepeterhansen/7-ways-to-avoid-getting-blocked-or-blacklisted-when-web-scraping-45ii) to ensure you're not triggering a block.
