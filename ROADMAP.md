# 5.0+ Roadmap

- [ ] extract-img-tags.js: return svg's on the page

- [ ] handle duplicate meta tags with different lang attrs
      <meta name="application-name" content="Weather Wizard" lang="en" />
      <meta name="application-name" content="Mago del Clima" lang="es" />

- [ ] og:tags order preference given to TOP tag not bottom in conflicts
      per https://ogp.me/
       <meta property="og:image" content="https://example.com/rock.jpg" />
       <meta property="og:image" content="https://example.com/rock2.jpg" />

- [X] use `node-fetch` v2 for now to get SSRF support
      - [X] README: clearly demarcate browser vs. node-only options
      - [X] request headers:
            - [X] check our default vs custom headers against
            https://www.npmjs.com/package/node-fetch/v/2.7.0#default-headers
            - [X] use options.compress = true, pass to our users from node-fetch
            - [X] set custom `User-Agent`, keep `From` otherwise some hosts in the test suite serve response.status 400+
      - [X] pass max `size` option to our users from node-fetch
      - [X] pass `useAgent` thru to node-fetch
      - [X] remove `decode` from request obj in `main.js`
      - [X] handle all errors properly incl cleanup fetch requests
      - [X] split index.js into index.js & browser.js, test in both /example-* dirs w package.json "browser" field
      - [X] add `agent` option

- [X] issue #97: prevent SSRF attacks
- [X] issue #97: prevent infinite redirect loops
- [X] fix issue #90: temporarily remove itemprop meta support
- [X] fix issue #90: implement itemprop support correctly for meta tags in head


## BACKLOG:

- [ ] basic pdf support
      - [ ] /Info fields
      - [ ] XMP fields
