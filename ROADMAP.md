3.0+ Roadmap

[X] remove package-lock.json
[X] remove deprecated sourceMap option
[X] audit deps for licensing issues
[X] update all deps
[X] remove deps: `request`, `q`, etc libs
    - [X] ensure native fetch is used with correct version of node 18
          ex: https://github.com/jonbern/fetch-retry/blob/master/index.js
    - [X] convert to async/ await syntax
[X] review all open issues, fix & add /test where appropriate
    - [X] add option to return url body that is scraped
    - [X] add customHeaders option
    - [X] `twitter:description`, `twitter:url` missing
    - [X] set package.json `types` prop to `index.d.ts`

[X] add test framework to examples
[X] simplify index.d.ts
[X] husky pre-commit hook runs linter, tests example code
[X] add template for issues that includes steps to reproduce bugs
[X] decode EUC-JP test
[X] auto-decoding via rules in extract-charset.js
[X] return html tag lang="en-US" attribute
[X] return <h1> - <h6> tags
[X] handle multiple meta tags with same key, diff values
[X] bug: fix meta tag charset
[X] remove MetadataFields.configureType (unnecessary now)
[X] headings: strip newlines and extra spaces
[X] return requestUrl
[X] return imgTags on page (obey `ensureSecureImageRequest` opt)

[ ] add drips funding.json
      https://twitter.com/wevm_dev/status/1752132002952741018
[ ] bug: test (fix?) jsonld in this example & ensure it conforms to TS def:
    https://moz.com/learn/seo/robots-meta-directives
      jsonld: {
          '@context': 'http://schema.org',
          '@graph': [ [Object], [Object], [Object], [Object] ]
        },
[ ] add github actions that run test library automatically
