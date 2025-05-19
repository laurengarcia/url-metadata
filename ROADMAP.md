5.0+ Roadmap

- [X] use `node-fetch` v2 for now to get SSRF support
      - [X] README: clearly demarcate browser vs. node-only options
      - [X] request headers:
            - [X] check our default vs custom headers against
            https://www.npmjs.com/package/node-fetch/v/2.7.0#default-headers
            - [X] use options.compress = true, pass to our users from node-fetch
            - [X] set custom `User-Agent`, keep `From` otherwise some hosts in the test suite serve response.status 400+
      - [X] pass max `size` option to our users from node-fetch
      - [X] pass `useAgent` thru to node-fetch
      - [X] use raw buffer bc res.text() & res.json() decode to utf8 automatically --> otherwise: failing i18n tests!
      - [X] remove `decode` from request obj in `index.js`
      - [X] ensure no relative or protocol-relative urls
      - [X] handle all errors properly

- [ ] basic pdf support
      - [ ] /Info fields
      - [ ] XMP fields

- [X] issue #97: prevent SSRF attacks
- [X] issue #97: prevent infinite redirect loops
- [X] fix issue #90: temporarily remove itemprop meta support
- [X] fix issue #90: implement itemprop support correctly for meta tags in head


