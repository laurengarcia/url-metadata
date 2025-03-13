const urlMetadata = require('./../index')

// NEW FEATURE? Or out of scope?
// Microdata support for global attributes:
//   https://developer.mozilla.org/en-US/docs/Web/HTML/Microdata

//   - `itemprop` global attr can be added to any element in document, not just <meta>
//      - `value` can be set as its own attribute on same tag
//      - value could also be the inner content of the element
//      - value could also be another attr w arbitrary attr name, ex: "datetime"
//      - if `itemprop` is added to a `a` tag the value is the `href`
//      - if `itemprop` is added to a `img` tag the value is the `href`
//      - ... or other elements that link to  or embed external resources
//   - `itemscope` attr
//        - ...& if `itemprop = "url"` the `content` value can't stomp document's metadata `url`
//   - `itemtype` attr points to a Thing - https://schema.org/Thing
//   - `itemid`
//         - can only be specified for els w both `itemscope` and `itemtype`
//         - the WHATWG definition specifies that an itemid must be a URL
//         - however, a URN may also be used
//         - this inconsistency reflects the incomplete nature of the Microdata spec
//   - `itemref`
//        - properties that arent descendants of an el w `itemscope` attr can be associated w item using `itemref`
//        - itemref provides a list of element IDs (not `itemid`s!)
//        - itemref attr is NOT part of the microdata data model

test('handle <meta> tags w itemprop in <head>, ignore <meta> tags w itemprop in <body>', async () => {
  // StackOverflow.com pages have overloaded meta tags like the one in the <head> of this ex:
  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
  <meta name="twitter:description" property="og:description" itemprop="description" content="this is a sample description" />
  </head>
  <body>
  <div class="box less-space hero-image-wrapper" itemprop="image" itemscope itemtype="https://schema.org/ImageObject">
     <img src="https://cdn.mos.cms.futurecdn.net/GqMegaDvjg6v4hVKvJ4a83-320-80.png">
     <meta itemprop="url" content="https://cdn.mos.cms.futurecdn.net/GqMegaDvjg6v4hVKvJ4a83.png">
     <meta itemprop="description" content="this is a sample image"
     <meta itemprop="height" content="600">
     <meta itemprop="width" content="338">
  </div>
  </body>
  </html>
  `
  const response = new Response(html, {
    headers: {
      'Content-Type': 'text/html'
    }
  })

  try {
    const metadata = await urlMetadata(null, { parseResponseObject: response })
    expect(metadata.url).toBe('') // ignores <meta> tag w `itemprop="url"` in body
    const correct = 'this is a sample description'
    expect(metadata.description).toBe(correct)
    expect(metadata['og:description']).toBe(correct)
    expect(metadata['twitter:description']).toBe(correct)
  } catch (e) {
    expect(e).toBe(undefined)
  }
})

// TODO: re-use this for json-ld tests & fix the bug in jsonld
test('ignore `itemprop` attributes outside of meta tags in head tag', async () => {
  // example adapted from:
  // https://www.pcgamer.com/games/strategy/i-tracked-down-the-guy-who-gave-a-negative-review-to-battlezone-98-redux-after-playing-for-over-8-000-hours-and-came-away-convinced-he-was-right/

  /* eslint-disable */
  const html = `
  <!DOCTYPE html>
  <html lang="en" dir="ltr" data-locale="US" class="pcgamer ">
  <head>
  <!-- [METATAGS - critical] -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
  <title>I tracked down the guy who gave a negative review to Battlezone 98 Redux after playing for over 8,000 hours, and came away convinced he was right | PC Gamer</title>
  <meta name="pub_date" content="2024-10-31T15:32:29+00:00">
  <meta name="description" content="Scott Smith is a kind of living Battlezone encyclopaedia. Obviously, I had to speak to him.">
  <link rel="canonical" href="https://www.pcgamer.com/games/strategy/i-tracked-down-the-guy-who-gave-a-negative-review-to-battlezone-98-redux-after-playing-for-over-8-000-hours-and-came-away-convinced-he-was-right/">
  <meta name="robots" content="max-image-preview:large">
  <link rel="apple-touch-icon" href="https://vanilla.futurecdn.net/pcgamer/1201310/apple-touch-icon.png">
  <meta name="msapplication-TileColor" content="#000000">
  <meta name="msapplication-TileImage" content="https://vanilla.futurecdn.net/pcgamer/1201310/apple-touch-icon.png">
  <link rel="icon" href="https://vanilla.futurecdn.net/pcgamer/1201310/favicon.ico" size="16x16">
  <link rel="icon" href="https://vanilla.futurecdn.net/pcgamer/1201310/apple-touch-icon.png" size="120x120">
  <meta property="og:site_name" content="pcgamer">
  <meta property="og:image" content="https://cdn.mos.cms.futurecdn.net/GqMegaDvjg6v4hVKvJ4a83-1200-80.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:type" content="article">
  <meta property="article:publisher" content="https://www.facebook.com/pcgamermagazine">
  <meta property="og:title" content="I tracked down the guy who gave a negative review to Battlezone 98 Redux after playing for over 8,000 hours, and came away convinced he was right">
  <meta property="og:url" content="https://www.pcgamer.com/games/strategy/i-tracked-down-the-guy-who-gave-a-negative-review-to-battlezone-98-redux-after-playing-for-over-8-000-hours-and-came-away-convinced-he-was-right/">
  <meta property="og:description" content="Scott Smith is a kind of living Battlezone encyclopaedia. Obviously, I had to speak to him.">
  <meta property="article:published_time" content="2024-10-31T15:32:29Z">
  <meta property="article:modified_time" content="2024-10-31T15:32:29Z">
  <!-- [/METATAGS - critical] -->
  <!-- [METATAGS] -->
  <script type="application/ld+json">
  {
  "@context": "https://schema.org",
  "@type": "Article",
  "name": "I tracked down the guy who gave a negative review to Battlezone 98 Redux after playing for over 8,000 hours, and came&hellip;",
  "headline": "I tracked down the guy who gave a negative review to Battlezone 98 Redux after playing for over 8,000 hours, and came away convinced he was right",
  "alternativeHeadline": "Scott Smith is a kind of living Battlezone encyclopaedia. Obviously, I had to speak to him.",
  "datePublished": "2024-10-31T15:32:29+00:00",
  "url": "https://www.pcgamer.com/games/strategy/i-tracked-down-the-guy-who-gave-a-negative-review-to-battlezone-98-redux-after-playing-for-over-8-000-hours-and-came-away-convinced-he-was-right/",
  "thumbnailUrl": "https://cdn.mos.cms.futurecdn.net/GqMegaDvjg6v4hVKvJ4a83-1200-80.png",
  "articleSection": "Strategy",
  "speakable": {
  "@context": "https://schema.org",
  "@type": "SpeakableSpecification",
  "xpath": [
  "/html/head/title",
  "/html/head/meta[@name=\"description\"]/@content"
  ]
  },
  "publisher": {
  "@type": "Organization",
  "name": "PC Gamer",
  "url": "https://www.pcgamer.com",
  "logo": {
  "@context": "https://schema.org",
  "@type": "ImageObject",
  "url": "https://vanilla.futurecdn.net/pcgamer/media/img/pcgamer_logo.png",
  "caption": "PC Gamer logo"
  }
  },
  "image": {
  "@context": "https://schema.org",
  "@type": "ImageObject",
  "url": "https://cdn.mos.cms.futurecdn.net/GqMegaDvjg6v4hVKvJ4a83.png",
  "caption": "Art from Battlezone 1998, showing a frozen Soviet cosmonaut trapped in the ice of an alien planet, staring into the camera through a broken helmet.",
  "height": "689",
  "width": "1225"
  },
  "creator": {
  "@type": "Person",
  "name": "Joshua Wolens",
  "url": "https://www.pcgamer.com/author/joshua-wolens/",
  "description": "One of Josh's first memories is of playing Quake 2 on the family computer when he was much too young to be doing that, and he's been irreparably game-brained ever since. His writing has been featured in Vice, Fanbyte, and the Financial Times. He'll play pretty much anything, and has written far too much on everything from visual novels to Assassin's Creed. His most profound loves are for CRPGs, immersive sims, and any game whose ambition outstrips its budget. He thinks you're all far too mean about Deus Ex: Invisible War.",
  "jobTitle": "News Writer",
  "image": {
  "@type": "ImageObject",
  "url": "https://cdn.mos.cms.futurecdn.net/SXuALfFkYbTT9o5tjJroaV.png",
  "caption": "Joshua Wolens"
  },
  "sameAs": [
  "https://www.twitter.com/@joshuawolens"
  ]
  },
  "author": {
  "@type": "Person",
  "name": "Joshua Wolens",
  "url": "https://www.pcgamer.com/author/joshua-wolens/",
  "description": "One of Josh's first memories is of playing Quake 2 on the family computer when he was much too young to be doing that, and he's been irreparably game-brained ever since. His writing has been featured in Vice, Fanbyte, and the Financial Times. He'll play pretty much anything, and has written far too much on everything from visual novels to Assassin's Creed. His most profound loves are for CRPGs, immersive sims, and any game whose ambition outstrips its budget. He thinks you're all far too mean about Deus Ex: Invisible War.",
  "jobTitle": "News Writer",
  "image": {
  "@type": "ImageObject",
  "url": "https://cdn.mos.cms.futurecdn.net/SXuALfFkYbTT9o5tjJroaV.png",
  "caption": "Joshua Wolens"
  },
  "sameAs": [
  "https://www.twitter.com/@joshuawolens"
  ]
  },
  "dateModified": "2024-10-31T15:32:29+00:00"
  }
  </script>
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@context":"https://schema.org","@type":"ListItem","position":1,"item":{"@id":"https://www.pcgamer.com/games/","name":"Games"}},{"@context":"https://schema.org","@type":"ListItem","position":2,"item":{"@id":"https://www.pcgamer.com/games/strategy/","name":"Strategy"}},{"@context":"https://schema.org","@type":"ListItem","position":3,"item":{"@id":"https://www.pcgamer.com/battlezone-98-redux/","name":"Battlezone 98 Redux"}}]}</script>
  <script type="application/ld+json">
  {
  "@context": "https://schema.org",
  "@graph": [
  {
  "@type": "SiteNavigationElement",
  "name": "home",
  "url": "/",
  "@id": "#navigation"
  },
  {
  "@type": "SiteNavigationElement",
  "name": "Games",
  "url": "/games/",
  "@id": "#navigation"
  },
  {
  "@type": "SiteNavigationElement",
  "name": "Hardware",
  "url": "/hardware/",
  "@id": "#navigation"
  },
  {
  "@type": "SiteNavigationElement",
  "name": "Industry",
  "url": "/gaming-industry/",
  "@id": "#navigation"
  },
  {
  "@type": "SiteNavigationElement",
  "name": "News",
  "url": "/news/",
  "@id": "#navigation"
  },
  {
  "@type": "SiteNavigationElement",
  "name": "Reviews",
  "url": "/games/reviews/",
  "@id": "#navigation"
  },
  {
  "@type": "SiteNavigationElement",
  "name": "Forum",
  "url": "https://forums.pcgamer.com/",
  "@id": "#navigation"
  }
  ]
  }
  </script>
  <script type="application/ld+json">
  {
  "@context": "https://schema.org",
  "@graph": [
  {
  "@type": "SiteNavigationElement",
  "name": "Monster Hunter Wilds",
  "url": "https://www.pcgamer.com/games/live/news/monster-hunter-wilds-live-launch-coverage-servers-news-release-day/",
  "@id": "#trending"
  },
  {
  "@type": "SiteNavigationElement",
  "name": "Nvidia RTX 5090",
  "url": "https://www.pcgamer.com/hardware/graphics-cards/nvidia-geforce-rtx-5090-fe-review/",
  "@id": "#trending"
  },
  {
  "@type": "SiteNavigationElement",
  "name": "Avowed",
  "url": "https://www.pcgamer.com/avowed/",
  "@id": "#trending"
  },
  {
  "@type": "SiteNavigationElement",
  "name": "GTA 5",
  "url": "https://www.pcgamer.com/grand-theft-auto-5/",
  "@id": "#trending"
  },
  {
  "@type": "SiteNavigationElement",
  "name": "Marvel Rivals",
  "url": "https://www.pcgamer.com/marvel-rivals/",
  "@id": "#trending"
  }
  ]
  }
  </script>

  </head>
  <body class="limit-width news-page flexi-news flexi-page default default_page_layout_news responsive no-taboola no-mid-article-taboola sticky-navigation standard-template articletype-feature">

  <figcaption itemprop="caption description" class=" inline-layout">
  <span class="credit" itemprop="copyrightHolder">(Image credit: Rebellion)</span>
  </figcaption>

  <figcaption itemprop="caption description" class=" inline-layout">
  <span class="credit" itemprop="copyrightHolder">(Image credit: Rebellion)</span>
  </figcaption>

  <figcaption itemprop="caption description" class=" inline-layout">
  <span class="credit" itemprop="copyrightHolder">(Image credit: Rebellion)</span>
  </figcaption>

  <figcaption itemprop="caption description" class=" inline-layout">
  <span class="credit" itemprop="copyrightHolder">(Image credit: Rebellion)</span>
  </figcaption>

  <figcaption itemprop="caption description" class=" inline-layout">
  <span class="credit" itemprop="copyrightHolder">(Image credit: Rebellion)</span>
  </figcaption>

  <figcaption itemprop="caption description" class=" inline-layout">
  <span class="credit" itemprop="copyrightHolder">(Image credit: Rebellion)</span>
  </figcaption>

  <figcaption itemprop="caption description" class=" inline-layout">
  <span class="credit" itemprop="copyrightHolder">(Image credit: Rebellion)</span>
  </figcaption>

  <figcaption itemprop="caption description" class=" inline-layout">
  <span class="credit" itemprop="copyrightHolder">(Image credit: Rebellion)</span>
  </figcaption>

  <figcaption itemprop="caption description" class=" inline-layout">
  <span class="credit" itemprop="copyrightHolder">(Image credit: Rebellion)</span>
  </figcaption>

  </body>
  </html>`
  /* eslint-enable */

  const response = new Response(html, {
    headers: {
      'Content-Type': 'text/html'
    }
  })

  try {
    const metadata = await urlMetadata(null, { parseResponseObject: response })
    console.log(metadata)
    // expect(metadata.jsonld.length).toBe(3)
    // expect(metadata.jsonld[0]['@type']).toBe('Organization')
    // expect(metadata.jsonld[1]['@type']).toBe('VideoObject')
    // expect(metadata.jsonld[2]['@type']).toBe('TVSeries')
  } catch (e) {
    expect(e).toBe(undefined)
  }
})
