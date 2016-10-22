# [wip] url-metadata
Request an http url and scrape its metadata.

## Usage

### Install via npm to use in Node.js project
`npm install url-metadata --save`

Then in your project:
```
const urlMetadata = require('urlMetadata')
urlMetadata('http://bit.ly/2ePIrDy', options).then(
  function (metadata) { // success handler
    console.log(metadata)
  },
  function (error) { // failure handler
    console.log(error)
  })
```

### Options
Defaults to values below:
```
{
  userAgent: 'LevelBot', // name the bot that will make url request
  fromEmail: 'vision@levelnews.org', // your email
  maxRedirects: 8,
  encoding: 'utf8',
  timeout: 10000, // 10 seconds
  descriptionLength: 750, // number of chars to truncate description to
  ensureSecureImageRequest: true,
  encodeFields: false
}
```

### Returns
Returns a promise that gets resolved with url metadata.
```
{
  'url'                  : '', // encoded final destination of url
  'title'                : '',
  'image'                : '',
  'author'               : '',
  'description'          : '',
  'source'               : '',
  'og:url'               : '',
  'og:locale'            : '',
  'og:locale:alternate'  : '',
  'og:title'             : '',
  'og:type'              : '',
  'og:description'       : '',
  'description'          : '',
  'og:determiner'        : '',
  'og:site_name'         : '',
  'og:image'             : '',
  'og:image:secure_url'  : '',
  'og:image:type'        : '',
  'og:image:width'       : '',
  'og:image:height'      : ''
}
```

Additional fields are also returned if the url has an `og:type` set to `article`. These fields are:
```
'article' : {
  'article:published_time'     : null,
  'article:modified_time'      : null,
  'article:expiration_time'    : null,
  'article:author'             : '',
  'article:section'            : '',
  'article:tag'                : '',
  'og:article:published_time'  : null, // datetime iso8601
  'og:article:modified_time'   : null, // datetime iso8601
  'og:article:expiration_time' : null, // datetime iso8601
  'og:article:author'          : '',
  'og:article:section'         : '',
  'og:article:tag'             : ''
}
```
