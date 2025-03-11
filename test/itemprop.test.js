const urlMetadata = require('./../index')

test('scoped itemprop', async () => {
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
  <meta name="parsely-type" content="post">
  <meta name="parsely-post-id" content="o8nqHsjbsfS5vh5Ho4XPie">
  <meta name="parsely-pub-date" content="2024-10-31T15:32:29Z">
  <meta name="parsely-title" content="I tracked down the guy who gave a negative review to Battlezone 98 Redux after playing for over 8,000 hours, and came away convinced he was right">
  <meta name="parsely-link" content="https://www.pcgamer.com/games/strategy/i-tracked-down-the-guy-who-gave-a-negative-review-to-battlezone-98-redux-after-playing-for-over-8-000-hours-and-came-away-convinced-he-was-right/">
  <meta name="parsely-image-url" content="https://cdn.mos.cms.futurecdn.net/GqMegaDvjg6v4hVKvJ4a83.png">
  <meta name="parsely-section" content="Strategy">
  <meta name="parsely-tags" content="Category: Strategy,Category: Games,Category: Gaming software,Category: Feature,Rebellion,Big Boat Interactive,Battlezone 98 Redux,channel_gaming_software,type_other,serversidehawk,van-enable-adviser-more-about">
  <meta name="parsely-author" content="Joshua Wolens">
  <meta property="fb:app_id" content="235441786508054">
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:site" content="@pcgamer">
  <meta property="twitter:title" content="I tracked down the guy who gave a negative review to Battlezone 98 Redux after playing for over 8,000 hours, and came away convinced he was right">
  <meta property="twitter:description" content="Scott Smith is a kind of living Battlezone encyclopaedia. Obviously, I had to speak to him.">
  <meta property="twitter:creator" content="@pcgamer">
  <meta property="twitter:image" content="https://cdn.mos.cms.futurecdn.net/GqMegaDvjg6v4hVKvJ4a83-1200-80.png">
  <meta property="twitter:account_id" content="15560223">
  <meta name="google-site-verification" content="nEMWGpFpnijlLQ_wncYhmsfYlcPGMIyI2uRKCDpKKIM">
  <meta name="p:domain_verify" content="10329f1fd4d0a2cd5c0d3b3b809cb4cd">
  <meta property="taboola:url" content="https://www.pcgamer.com/games/strategy/i-tracked-down-the-guy-who-gave-a-negative-review-to-battlezone-98-redux-after-playing-for-over-8-000-hours-and-came-away-convinced-he-was-right/">
  <meta name="msvalidate.01" content="CC462E6DF91492086145CA5EBDCB615E">
  <meta name="theme-color" content="#dc191b">
  <link rel="alternate" type="application/rss+xml" href="https://www.pcgamer.com/feeds/articletype/features/">
  <link rel="alternate" type="application/rss+xml" href="https://www.pcgamer.com/feeds/tag/strategy/">
  <link rel="alternate" type="application/rss+xml" href="https://www.pcgamer.com/feeds.xml">
  <!-- [/METATAGS] -->
  <!-- tag factory //-->
  </head>
  <body class="limit-width news-page flexi-news flexi-page default default_page_layout_news responsive no-taboola no-mid-article-taboola sticky-navigation standard-template articletype-feature
  ">
  <a href="#main" class="skip-to-main-content" style="position:absolute;">Skip to main content</a>
  <div id="widgetArea100" class="widget-area widget-area-g-md-1-1 widget-area-g-lg-1-1 widget-area-g-xl-1-1 page-widget-area-100"></div>
  <nav class="primary-nav" aria-label="Main Navigation">
  <input type="radio" name="burgerbar-expand" class="burgerbar-none-radio" id="burgerbar-none" checked>
  <input type="radio" name="burgerbar-expand" class="burgerbar-radio" id="burgerbar">
  <div class="burgerbar ">
  <div class="legacy-container full burgerbar-small">
  <label class="button-menu unchecked menu-hamburger" for="burgerbar" onclick tabindex="0" aria-label="Open menu" role="button"><span class="sr-only">Open menu</span></label>
  <label class="button-menu checked menu-hamburger" for="burgerbar-none" onclick tabindex="0" aria-label="Close menu" role="button"><span class="sr-only">Close menu</span></label>
  <div id="publisherDetails">
  <div class="logo" data-analytics-id="site-logo">
  <a href="https://www.pcgamer.com/" data-before-rewrite-localise="/">
  <span class="site-logo">
  <svg role="img" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="164" height="31" overflow="visible" viewbox="0 0 164 31"><title>PC Gamer</title><defs><path id="a" d="M0 0h163.88v31H0z"></path></defs><clippath id="b"><use xlink:href="#a" overflow="visible"></use></clippath><path clip-path="url(#b)" fill="#D60F15" d="M1.8 0S0 0 0 1.8v27.4S0 31 1.8 31h46.72s1.8 0 1.8-1.8V1.8s0-1.8-1.8-1.8H1.8z"></path><path clip-path="url(#b)" fill="#0F1618" d="M163.88 29.2V1.8s0-1.8-1.8-1.8H47.24v31h114.82s1.81 0 1.81-1.8"></path><path clip-path="url(#b)" fill="#FFF" d="M34.27 28.1c6.54 0 9.29-3.59 10.46-8.51L38.6 18.2c-.75 3.02-1.78 4.63-4.3 4.63-3.21 0-4.8-2.9-4.8-7.36 0-4.53 1.52-7.2 4.73-7.2 2.5 0 3.4 1.85 4.04 4.18l6.12-1.84c-1-4.34-3.6-7.75-10.13-7.75-6.08 0-11.23 3.7-11.23 12.61S27.96 28.1 34.27 28.1M9.7 14.89V8.65h2.79c3 0 3.82 1.28 3.82 3.12s-.81 3.12-3.82 3.12h-2.8zM3.3 27.64h6.4v-7.76h2.56c4.7 0 10.36-1.08 10.36-8.28s-5.24-8.27-10.36-8.27H3.3v24.3zM154.64 11.4c0 2.04-1.16 2.8-3.82 2.8h-2.78V8.65h2.78c2.66 0 3.82.72 3.82 2.76m6.31-.17c0-5.84-3.75-7.91-9.9-7.91h-9.35v24.3h6.34V19.2h1.33l4.63 8.45h6.86l-4.99-9.07c3.14-1.09 5.08-3.52 5.08-7.33"></path><path fill="#FFF" d="M129.34 8.78h11.2V3.33h-17.67v24.3h17.64v-5.28h-11.17v-4.5h7.58v-5.13h-7.58z"></path><defs><path id="c" d="M0 0h163.88v31H0z"></path></defs><clippath id="d"><use xlink:href="#c" overflow="visible"></use></clippath><path clip-path="url(#d)" fill="#FFF" d="M115.49 27.64h6.18V3.33h-8.77l-3.79 16.49h-.06l-4.2-16.5h-8.59v24.32h5.76V12.26h.07c.52 3.19.8 4.27 1.36 6.24l2.46 9.14h5.7l2.52-9.14c.52-1.87.9-3.41 1.3-5.91h.06v15.05z"></path><path fill="#FFF" d="M86.3 18.44h-4.57l2.3-6.74h.07l2.2 6.74zm9.45 9.2L87.3 3.35h-6.1l-8.44 24.29h5.89l1.55-4.54h7.54l1.46 4.54h6.54z"></path><defs><path id="e" d="M0 0h163.88v31H0z"></path></defs><clippath id="f"><use xlink:href="#e" overflow="visible"></use></clippath><path clip-path="url(#f)" fill="#FFF" d="M67.12 27.64h5.08V15.12h-9.64v4.8h3.5a4.3 4.3 0 0 1-4.21 2.92c-1.72 0-5.02-.76-5.02-7.56 0-6.83 3.69-7 4.73-7 1.87 0 3.26 1.06 4.2 4.18l5.93-1.68C70 4.41 66.12 2.87 61.59 2.87c-7.12 0-11.27 4.9-11.27 12.51 0 7.33 3.08 12.72 10.72 12.72 3.59 0 5.7-2.5 6.02-3.68h.06v3.22zm92.79-23.71c0 .08-.04.12-.16.12h-.16V3.8h.17c.1 0 .15.05.15.13m.25.64l-.24-.39a.26.26 0 0 0 .17-.25c0-.18-.1-.3-.34-.3h-.35v.94h.19v-.36h.13l.01.03.2.33h.23zm.28-.46a.67.67 0 1 1-1.34 0 .67.67 0 0 1 1.34 0m.18 0a.84.84 0 1 0-1.7 0 .84.84 0 0 0 1.7 0"></path></svg>
  </span>
  <span class="hidden-header">PC Gamer</span> <span class="strapline">THE GLOBAL AUTHORITY ON PC GAMES</span>
  </a>
  </div>
  </div>
  <input type="checkbox" name="burgerbar-expand" class="search-checkbox" id="search-checkbox">
  <label class="button-search masthead-item " for="search-checkbox" onclick="" tabindex="0" aria-label="Search" role="button" data-analytics-id="search" onkeydown="if(event.key === 'Enter') { event.preventDefault(); this.click() }">
  <span class="desktop-text">Search</span>
  <span class="search-icon">
  <svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 1000 1000"><path d="M720 124a422 422 0 1 0-73 654l221 222 132-131-222-222a422 422 0 0 0-58-523zm-92 504a291 291 0 1 1-412-412 291 291 0 0 1 412 411z"></path></svg> </span>
  </label>
  <form class="search-box" action="https://www.pcgamer.com/search/" method="GET" data-analytics-id="search-submit" data-before-rewrite-localise="/search/">
  <label for="search-input" class="sr-only">Search PC Gamer</label>
  <input tabindex="0" type="search" name="searchTerm" placeholder="Search PC Gamer" class="search-input" id="search-input">
  <button type="submit" class="search-submit" aria-label="Search">
  <span class="search-icon">
  <svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 1000 1000"><path d="M720 124a422 422 0 1 0-73 654l221 222 132-131-222-222a422 422 0 0 0-58-523zm-92 504a291 291 0 1 1-412-412 291 291 0 0 1 412 411z"></path></svg> </span>
  </button>
  </form>
  <div x-data class="masthead-item [&amp;_svg]:text-[var(--tray-bell-initial-color)] flex items-center absolute top-0 sm:static sm:pl-2 sm:pr-1 h-full text-lg sm:w-12 z-50 viafoura-tray-bell right-[var(--tray-bell-right-offset)] [&amp;_svg]:hover:text-primary-500" data-component-name="Viafoura:Notification:TrayBell" style="--default-color:transparent;
  --background-color:transparent;
  --light-text-on-default-color: #fff;
  --dark-text-on-default-color: #fff;
  --tray-bell-right-offset: 200px;
  --tray-bell-initial-color: #fff;
  " id="viafoura-tray-bell">
  <div class="viafoura" x-cloak x-show="$store.Viafoura.showWidgets">
  <vf-tray-trigger></vf-tray-trigger>
  </div>
  </div>
  <!-- include 'components/auth-placeholder.twig' here -->
  <div id="auth-in-nav-header" data-analytics-id="sign-in" tabindex="0">
  <span id="auth-in-nav-header-text">Sign in</span>
  <span id="auth-in-nav-header-svg-block">
  <svg width="20" height="20" viewbox="0 0 21 21" xmlns="http://www.w3.org/2000/svg"><path d="M10.446 0c5.76 0 10.446 4.452 10.446 9.924 0 5.472-4.686 9.923-10.446 9.923S0 15.396 0 9.924 4.686 0 10.446 0zm0 1.228c-5.047 0-9.154 3.9-9.154 8.696 0 2.642 1.248 5.01 3.212 6.607.337-2.01 1.756-3.678 3.678-4.436a5.554 5.554 0 004.678 0c1.887.745 3.292 2.364 3.662 4.326 1.886-1.594 3.078-3.915 3.078-6.497 0-4.795-4.107-8.696-9.154-8.696zm.076 2.885c1.983 0 3.592 1.529 3.592 3.413 0 1.885-1.609 3.413-3.592 3.413-1.984 0-3.593-1.528-3.593-3.413 0-1.884 1.609-3.413 3.593-3.413z" fill-rule="evenodd"></path></svg>
  </span>
  <div id="auth-in-nav-header-menu" class="auth-in-nav-header-menu">
  <ul>
  <li id="auth-in-nav-header-menu-email">
  </li><li id="auth-in-nav-header-profile">View Profile</li>
  <li id="auth-in-nav-header-sign-out">
  <span class="auth-in-nav-header-sign-out-text">Sign out</span>
  <svg width="20" height="20" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" title="Logout">
  <path d="m17 7-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" fill-rule="evenodd">
  </path>
  </svg>
  </li>
  </ul>
  </div>
  </div>
  <div class="nav-subscribe">
  <button class="subscribe-text">Subscribe<span><svg class="svg-arrow-down" width="16" preserveaspectratio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 1000 1000"><path d="M1000 100L500 900 0 100h1000z"></path></svg></span></button>
  </div>
  <div class="buttons-social masthead-item" data-testid="buttons-social">
  <a target="_blank" rel="noopener" href="http://steamcommunity.com/groups/pcgamer" class="circle-icon steam-icon" aria-label="Visit us on Steam" data-analytics-id="nav-social">
  <svg class="icon-svg" height="24" viewbox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="12"></circle><path d="m18.22 8.9a2.269 2.269 0 1 1 -2.27-2.265 2.267 2.267 0 0 1 2.27 2.265zm2.258.005a4.534 4.534 0 0 1 -4.533 4.526h-.1l-4.087 2.911v.161a3.4 3.4 0 0 1 -6.74.669l-4.549-1.879c-.032-.109-.057-.219-.085-.329a11.973 11.973 0 0 1 -.384-2.964c0-.214.02-.423.032-.635 0-.1.008-.206.016-.308l6.394 2.643a3.385 3.385 0 0 1 1.915-.591c.065 0 .127 0 .191.005l2.865-4.145v-.062a4.533 4.533 0 0 1 9.066 0zm-9.763 6.618a2.55 2.55 0 0 0 -3.262-1.411l1.525.63a1.877 1.877 0 1 1 -1.446 3.464l-1.475-.606a2.529 2.529 0 0 0 1.315 1.25 2.559 2.559 0 0 0 3.339-1.374 2.526 2.526 0 0 0 .004-1.951zm8.251-6.618a3.021 3.021 0 1 0 -3.021 3.015 3.022 3.022 0 0 0 3.021-3.013z" fill="#fff"></path></svg> </a>
  <a target="_blank" rel="noopener" href="https://www.facebook.com/pcgamermagazine" class="circle-icon facebook-icon" aria-label="Visit us on Facebook" data-analytics-id="nav-social">
  <svg class="icon-svg" height="24" viewbox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" fill="#3b5998" r="12"></circle><path d="m13.079 19h-2.9v-7h-1.441v-2.408h1.442v-1.456c0-1.96.813-3.136 3.136-3.136h1.933v2.408h-1.2c-.91 0-.965.35-.965.966v1.218h2.183l-.257 2.408h-1.931z" fill="#fff"></path></svg> </a>
  <a target="_blank" rel="noopener" href="https://twitter.com/pcgamer" class="circle-icon twitter-icon" aria-label=" Visit us on Twitter" data-analytics-id="nav-social">
  <svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#0F1618" viewbox="0 0 375 375"><g><path fill="#000" d="M187 7a180 180 0 1 0 0 361 180 180 0 0 0 0-361"></path></g><g transform="translate(90 85)"><svg xmlns="http://www.w3.org/2000/svg" width="199.8" height="199.8" class="icon-svg" viewbox="0 0 24 24"><path fill="#fff" d="M18 2h4l-8 9 9 11h-7l-5-7-6 7H2l7-9L1 2h7l5 6zm-1 18h2L7 4H5z"></path></svg></g></svg> </a>
  <a target="_blank" rel="noopener" href="https://www.instagram.com/pcgamer_mag/?hl=en" class="circle-icon instagram-icon" aria-label="Visit us on Instagram" data-analytics-id="nav-social">
  <svg class="icon-svg" height="24" viewbox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" fill="#de3073" r="12"></circle><path d="m18.958 9.116a5.121 5.121 0 0 0 -.336-1.708 3.557 3.557 0 0 0 -2.044-2.044 5.12 5.12 0 0 0 -1.694-.322c-.742-.028-.994-.042-2.884-.042s-2.142.014-2.884.042a5.213 5.213 0 0 0 -1.708.322 3.665 3.665 0 0 0 -2.044 2.044 5.213 5.213 0 0 0 -.322 1.708c-.028.742-.042.984-.042 2.884s.014 2.142.042 2.884a5.12 5.12 0 0 0 .322 1.694 3.44 3.44 0 0 0 .812 1.246 3.4 3.4 0 0 0 1.232.8 5.175 5.175 0 0 0 1.708.336c.742.028.98.042 2.884.042s2.142-.014 2.884-.042a5.082 5.082 0 0 0 1.694-.336 3.456 3.456 0 0 0 2.044-2.044 5.006 5.006 0 0 0 .336-1.694c.028-.744.042-.986.042-2.886s-.014-2.142-.042-2.884zm-1.258 5.712a3.946 3.946 0 0 1 -.252 1.3 2.189 2.189 0 0 1 -.518.8 2.165 2.165 0 0 1 -.8.532 4.641 4.641 0 0 1 -1.3.238c-.742.028-.966.042-2.828.042s-2.1-.014-2.828-.042a3.837 3.837 0 0 1 -1.3-.252 2.258 2.258 0 0 1 -1.334-1.316 3.91 3.91 0 0 1 -.238-1.3c-.028-.742-.042-.966-.042-2.828s.014-2.086.042-2.828a3.787 3.787 0 0 1 .238-1.3 2.445 2.445 0 0 1 1.33-1.334 3.856 3.856 0 0 1 1.3-.238c.742-.028.952-.042 2.828-.042s2.086.014 2.828.042a3.787 3.787 0 0 1 1.3.238 2.445 2.445 0 0 1 1.33 1.33 4.641 4.641 0 0 1 .238 1.3c.027.742.042.952.042 2.828s-.011 2.088-.036 2.83zm-5.7-6.428a3.6 3.6 0 1 0 3.6 3.6 3.6 3.6 0 0 0 -3.6-3.6zm.181 5.929a2.338 2.338 0 0 1 -.362-4.662 2.43 2.43 0 0 1 .362 0 2.338 2.338 0 0 1 0 4.662zm3.557-6.909a.84.84 0 1 1 -.84.84.84.84 0 0 1 .84-.838z" fill="#fff"></path></svg> </a>
  <a target="_blank" rel="noopener" href="https://www.youtube.com/user/pcgamer" class="circle-icon youtube-icon" aria-label="Visit us on YouTube" data-analytics-id="nav-social">
  <svg class="icon-svg" height="24" viewbox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" fill="#cd201f" r="12"></circle><path d="m19.351 8.978a3.281 3.281 0 0 0 -.6-1.5 2.081 2.081 0 0 0 -1.5-.645c-2.101-.15-5.251-.15-5.251-.15h-.016s-3.134 0-5.25.149a2.19 2.19 0 0 0 -1.485.645 3.275 3.275 0 0 0 -.6 1.5 22.8 22.8 0 0 0 -.15 2.445v1.139a22.854 22.854 0 0 0 .15 2.446 3.263 3.263 0 0 0 .6 1.5 2.437 2.437 0 0 0 1.65.645c1.2.12 5.1.165 5.1.165s3.149 0 5.249-.165a2.072 2.072 0 0 0 1.5-.645 3.268 3.268 0 0 0 .6-1.5 23 23 0 0 0 .149-2.446v-1.138a22.949 22.949 0 0 0 -.146-2.445zm-9.331 5.549v-5.127l4.8 2.52z" fill="#fff"></path></svg> </a>
  <a target="_blank" rel="noopener" href="https://www.twitch.tv/pcgamer" class="icon icon-circle icon-twitch" aria-label="Visit us on Twitch" data-analytics-id="nav-social"></a>
  <a target="_blank" rel="noopener" href="https://flipboard.com/@PC_Gamer_" class="circle-icon flipboard-icon" aria-label="Visit us on Flipboard" data-analytics-id="nav-social">
  <svg class="icon-svg" height="24" viewbox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="m24 12a12 12 0 1 1 -12-12 12 12 0 0 1 12 12z" fill="#f52828"></path><path d="m19 11h-4v4h-4v4h-4v-12h12z" fill="#fff"></path></svg> </a>
  <a target="_blank" rel="noopener" href="https://www.tiktok.com/@pcgamer_mag?lang=en" class="circle-icon tiktok-icon" aria-label="Visit us on TikTok" data-analytics-id="nav-social">
  <svg class="icon-svg" height="24" viewbox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="m24 12a12 12 0 1 1 -12-12 12 12 0 0 1 12 12z" fill="#fe2c55"></path><path d="m12.308 5.012c.763-.012 1.522 0 2.281-.012a3.636 3.636 0 0 0 1.02 2.434 4.12 4.12 0 0 0 2.473 1.043v2.349a6.177 6.177 0 0 1 -2.449-.564 7.207 7.207 0 0 1 -.947-.543c0 1.705.008 3.406-.01 5.105a4.442 4.442 0 0 1 -.789 2.3 4.343 4.343 0 0 1 -3.448 1.872 4.254 4.254 0 0 1 -2.379-.6 4.393 4.393 0 0 1 -2.127-3.331c-.014-.292-.019-.584-.007-.868a4.395 4.395 0 0 1 5.091-3.9c.013.864-.021 1.727-.021 2.591a2.007 2.007 0 0 0 -2.558 1.237 2.316 2.316 0 0 0 -.079.939 1.992 1.992 0 0 0 3.658.736 1.39 1.39 0 0 0 .239-.62c.057-1.043.034-2.082.041-3.126.006-2.351-.007-4.7.011-7.041z" fill="#fff"></path></svg> </a>
  </div>
  <div id="slice-container-localeSelector" class="slice-container locale-selector-slice localeSelector slice-container-localeSelector"><div data-hydrate="true" class="locale-selector"><button data-hydrate="true" type="button" class="locale-selector__trigger" data-analytics-id="locale-flag-dropdown"><span class="locale-selector__text">US Edition</span><div class="locale-selector__icon--flag"><img src="https://vanilla.futurecdn.net/pcgamer/media/shared/img/flags/nosize/US.svg" alt="flag of US" loading="eager"></div><div class="locale-selector__icon--chevron-down"></div></button><div class="locale-selector__dropdown" style="display:none"><div class="locale-selector__dropdown__continents"><div class="locale-selector__dropdown__columns"><a data-hydrate="true" data-ignore-redirects="true" data-analytics-id="locale-flag" class="locale-selector__option"><div class="locale-selector__option__icon-container"><div class="locale-selector__option__icon locale-selector__option__icon--flag"><img class="locale-selector__image" src="https://vanilla.futurecdn.net/pcgamer/media/shared/img/flags/nosize/GB.svg" alt="flag of UK" loading="lazy"></div><span class="locale-selector__option__name ">UK</span></div><div class="
            locale-selector__option__icon locale-selector__option__icon--tick
            "><svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 32 32"><path d="M26.744 3L11.419 18.423l-6.163-6.201L0 17.509 11.419 29 32 8.289z"></path></svg></div></a><a data-hydrate="true" data-ignore-redirects="true" data-analytics-id="locale-flag" class="locale-selector__option"><div class="locale-selector__option__icon-container"><div class="locale-selector__option__icon locale-selector__option__icon--flag"><img class="locale-selector__image" src="https://vanilla.futurecdn.net/pcgamer/media/shared/img/flags/nosize/US.svg" alt="flag of US" loading="lazy"></div><span class="locale-selector__option__name  locale-selector__option__name--active">US</span></div><div class="
            locale-selector__option__icon locale-selector__option__icon--tick
             locale-selector__option__icon--visible"><svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 32 32"><path d="M26.744 3L11.419 18.423l-6.163-6.201L0 17.509 11.419 29 32 8.289z"></path></svg></div></a><a data-hydrate="true" data-ignore-redirects="true" data-analytics-id="locale-flag" class="locale-selector__option"><div class="locale-selector__option__icon-container"><div class="locale-selector__option__icon locale-selector__option__icon--flag"><img class="locale-selector__image" src="https://vanilla.futurecdn.net/pcgamer/media/shared/img/flags/nosize/CA.svg" alt="flag of Canada" loading="lazy"></div><span class="locale-selector__option__name ">Canada</span></div><div class="
            locale-selector__option__icon locale-selector__option__icon--tick
            "><svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 32 32"><path d="M26.744 3L11.419 18.423l-6.163-6.201L0 17.509 11.419 29 32 8.289z"></path></svg></div></a><a data-hydrate="true" data-ignore-redirects="true" data-analytics-id="locale-flag" class="locale-selector__option"><div class="locale-selector__option__icon-container"><div class="locale-selector__option__icon locale-selector__option__icon--flag"><img class="locale-selector__image" src="https://vanilla.futurecdn.net/pcgamer/media/shared/img/flags/nosize/AU.svg" alt="flag of Australia" loading="lazy"></div><span class="locale-selector__option__name ">Australia</span></div><div class="
            locale-selector__option__icon locale-selector__option__icon--tick
            "><svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 32 32"><path d="M26.744 3L11.419 18.423l-6.163-6.201L0 17.509 11.419 29 32 8.289z"></path></svg></div></a></div></div></div></div></div>
  <div class="desktop-chatbot-container hidden w-fit sm:flex sm:visible items-center sm:h-[100px] float-right" data-analytics-id="chatbot-link">
  </div>
  </div>
  </div>
  <div class="mobile-chatbot-container justify-center flex sm:hidden">
  </div>
  <div class="wrapper">
  <div class="menuitems legacy-container full">
  <ul class="nav-list" data-analytics-id="nav-item">
  <li class="menu-item menu-item-home">
  <a class="home" href="https://www.pcgamer.com/" aria-label="home" data-before-rewrite-localise="/">
  <i class="icon icon-home"></i> </a>
  </li>
  <li class="menu-item menu-item-games menu-level-1
  primary-style ">
  <a href="https://www.pcgamer.com/games/" aria-label="Games" data-before-rewrite-localise="/games/">
  Games
  </a>
  </li>
  <li class="menu-item menu-item-hardware menu-level-1
  primary-style ">
  <a href="https://www.pcgamer.com/hardware/" aria-label="Hardware" data-before-rewrite-localise="/hardware/">
  Hardware
  </a>
  </li>
  <li class="menu-item menu-item-industry menu-level-1
  primary-style ">
  <a href="https://www.pcgamer.com/gaming-industry/" aria-label="Industry" data-before-rewrite-localise="/gaming-industry/">
  Industry
  </a>
  </li>
  <li class="menu-item menu-item-news menu-level-1
  primary-style ">
  <a href="https://www.pcgamer.com/news/" aria-label="News" data-before-rewrite-localise="/news/">
  News
  </a>
  </li>
  <li class="menu-item menu-item-reviews menu-level-1
  primary-style ">
  <a href="https://www.pcgamer.com/games/reviews/" aria-label="Reviews" data-before-rewrite-localise="/games/reviews/">
  Reviews
  </a>
  </li>
  <li class="menu-item menu-item-forum menu-level-1
  primary-style ">
  <a href="https://forums.pcgamer.com/" aria-label="Forum">
  Forum
  </a>
  </li>
  <li class="menu-item menu-item-more menu-level-1
  has-submenu menu-item-hover-reveal primary-style ">
  <span tabindex="0">More <i class="icon icon-arrow-down"></i><i class="icon icon-arrow-right"></i></span>
  <ul class="sub-menu">
  <li class="sub-menu-item menu-level-2 primary-style">
  <a href="https://www.pcgamingshow.com/" aria-label="PC Gaming Show">PC Gaming Show</a>
  </li>
  <li class="sub-menu-item menu-level-2 primary-style">
  <a href="https://www.pcgamer.com/software/" aria-label="Software" data-before-rewrite-localise="/software/">Software</a>
  </li>
  <li class="sub-menu-item menu-level-2 primary-style">
  <a href="https://www.pcgamer.com/movies-tv/" aria-label="Movies &amp; TV" data-before-rewrite-localise="/movies-tv/">Movies &amp; TV</a>
  </li>
  <li class="sub-menu-item menu-level-2 primary-style">
  <a href="/coupons/" aria-label="Coupons">Coupons</a>
  </li>
  <li class="sub-menu-item menu-level-2 primary-style">
  <a href="https://www.pcgamer.com/pc-gamer-print-magazine/" aria-label="Magazine" data-before-rewrite-localise="/pc-gamer-print-magazine/">Magazine</a>
  </li>
  <li class="sub-menu-item menu-level-2 primary-style">
  <a href="https://www.pcgamer.com/sign-up-for-the-pc-gamer-newsletter/" aria-label="Newsletter" data-before-rewrite-localise="/sign-up-for-the-pc-gamer-newsletter/">Newsletter</a>
  </li>
  <li class="sub-menu-item menu-level-2 primary-style">
  <a href="https://www.pcgamer.com/commenting-rules-and-guidelines/" aria-label="Community guidelines" data-before-rewrite-localise="/commenting-rules-and-guidelines/">Community guidelines</a>
  </li>
  <li class="sub-menu-item menu-level-2 primary-style">
  <a href="https://www.pcgamer.com/a-note-on-affiliate-links/" aria-label="Affiliate links" data-before-rewrite-localise="/a-note-on-affiliate-links/">Affiliate links</a>
  </li>
  <li class="sub-menu-item menu-level-2 primary-style">
  <a href="https://www.pcgamer.com/meet-the-team/" aria-label="Meet the team" data-before-rewrite-localise="/meet-the-team/">Meet the team</a>
  </li>
  <li class="sub-menu-item menu-level-2 primary-style">
  <a href="https://www.pcgamer.com/about-pc-gamer/" aria-label="About PC Gamer" data-before-rewrite-localise="/about-pc-gamer/">About PC Gamer</a>
  </li>
  </ul>
  </li>
  </ul>
  </div>
  </div> </nav>
  <div class="nav-subscribe-widget-container">
  <div class="container-inner">
  <aside class="hawk-base" data-model-name="PC Gamer Magazine" data-name="Promotion widget" data-render-type="fte" data-widget-type="promotion"><div class="hawk-master-widget-hawk-base-wrapper"><div class="hawk-promotion-main-container" data-editorial="0"><div class="hawk-promotion-item-container"><a data-google-interstitial="false" aria-label="View PC Gamer Magazine on Magazines Direct" href="https://www.awin1.com/awclick.php?awinmid=2961&amp;awinaffid=103504&amp;clickref=pcg-us-5151260561979372597&amp;p=https%3A%2F%2Fwww.magazinesdirect.com%2FPCU-brandsite" referrerpolicy="no-referrer-when-downgrade" class="hawk-affiliate-link-container" data-product-key="131350-641876757" data-url="https://www.awin1.com/awclick.php?awinmid=2961&amp;awinaffid=103504&amp;clickref=pcg-us-5151260561979372597&amp;p=https%3A%2F%2Fwww.magazinesdirect.com%2FPCU-brandsite" data-model-id="696946" data-match-id="2065023" data-product-type="1000" data-link-merchant="Magazines Direct" data-merchant-id="6539" data-merchant-name="Magazines Direct" data-merchant-url="http://www.magazinesdirect.com/" rel="sponsored noopener" target="_blank" role="link" tabindex="0"><div class="hawk-display-name-container hawk-promotion-item-display-name">PC Gamer Magazine Subscription</div></a><div class="hawk-promotion-item-innerContainer"><a data-google-interstitial="false" aria-label="View PC Gamer Magazine on Magazines Direct" href="https://www.awin1.com/awclick.php?awinmid=2961&amp;awinaffid=103504&amp;clickref=pcg-us-5151260561979372597&amp;p=https%3A%2F%2Fwww.magazinesdirect.com%2FPCU-brandsite" referrerpolicy="no-referrer-when-downgrade" data-product-key="131350-641876757" data-url="https://www.awin1.com/awclick.php?awinmid=2961&amp;awinaffid=103504&amp;clickref=pcg-us-5151260561979372597&amp;p=https%3A%2F%2Fwww.magazinesdirect.com%2FPCU-brandsite" data-model-id="696946" data-match-id="2065023" data-product-type="1000" data-link-merchant="Magazines Direct" data-merchant-id="6539" data-merchant-name="Magazines Direct" data-merchant-url="http://www.magazinesdirect.com/" rel="sponsored noopener" target="_blank" role="link" tabindex="0"><img src="https://images.fie.futurecdn.net/equydmzioses9k6u-17108574360803-250-80.png.webp" alt="PC Gamer Magazine Subscription" title="PC Gamer Magazine Subscription" class="hawk-lazy-image-promotion" draggable="false" loading="lazy" width="250" height="250"></a><div class="hawk-promotion-item-pros-deal-container"><div class="hawk-promotion-pros-container"><div class="hawk-promotion-pros-heading">Why subscribe?</div><ul class="hawk-promotion-pros-list"><li class="hawk-promotion-pros-item">Subscribe to the world's #1 PC gaming mag</li><li class="hawk-promotion-pros-item">Try a single issue or save on a subscription</li><li class="hawk-promotion-pros-item">Issues delivered straight to your door or device</li></ul></div><div class="hawk-promotion-deal-container"><div class="hawk-promotion-deal-main"><a data-google-interstitial="false" aria-label="View PC Gamer Magazine on Magazines Direct" href="https://www.awin1.com/awclick.php?awinmid=2961&amp;awinaffid=103504&amp;clickref=pcg-us-5151260561979372597&amp;p=https%3A%2F%2Fwww.magazinesdirect.com%2FPCU-brandsite" referrerpolicy="no-referrer-when-downgrade" data-product-key="131350-641876757" data-url="https://www.awin1.com/awclick.php?awinmid=2961&amp;awinaffid=103504&amp;clickref=pcg-us-5151260561979372597&amp;p=https%3A%2F%2Fwww.magazinesdirect.com%2FPCU-brandsite" data-model-id="696946" data-match-id="2065023" data-product-type="1000" data-link-merchant="Magazines Direct" data-merchant-id="6539" data-merchant-name="Magazines Direct" data-merchant-url="http://www.magazinesdirect.com/" rel="sponsored noopener" target="_blank" role="link" tabindex="0"><span class="hawk-display-price-promotion" data-type="retail"> <span class="hawk-display-price-label">From</span><span class="hawk-display-price-price">$32.49</span></span></a></div><a data-google-interstitial="false" aria-label="View PC Gamer Magazine on Magazines Direct" href="https://www.awin1.com/awclick.php?awinmid=2961&amp;awinaffid=103504&amp;clickref=pcg-us-5151260561979372597&amp;p=https%3A%2F%2Fwww.magazinesdirect.com%2FPCU-brandsite" referrerpolicy="no-referrer-when-downgrade" class="hawk-affiliate-link-promotion-button" data-product-key="131350-641876757" data-url="https://www.awin1.com/awclick.php?awinmid=2961&amp;awinaffid=103504&amp;clickref=pcg-us-5151260561979372597&amp;p=https%3A%2F%2Fwww.magazinesdirect.com%2FPCU-brandsite" data-model-id="696946" data-match-id="2065023" data-product-type="1000" data-link-merchant="Magazines Direct" data-merchant-id="6539" data-merchant-name="Magazines Direct" data-merchant-url="http://www.magazinesdirect.com/" rel="sponsored noopener" target="_blank" role="link" tabindex="0">View</a></div></div></div></div></div></div></aside>
  </div>
  </div>
  <div class="dfp-leaderboard-container">
  <div class="dfp-leaderboard-background"></div>
  </div> <div id="widgetArea0" class="widget-area widget-area-g-md-1-1 widget-area-g-lg-1-1 widget-area-g-xl-1-1 page-widget-area-0"></div>
  <script data-id="vanilla-slice-regionRedirectBanner-hydrate" type="text/javascript">
      if (window.sliceHydrationLazy) {
          window.sliceHydrationLazy("regionRedirectBanner", "regionRedirectBanner", JSON.stringify({"currentEdition":"US","translations":[]}), "https://slice.vanilla.futurecdn.net/13-2-0/js/regionRedirectBanner.js");
      } else {
          console.error('%c FTE ','background: #9306F9; color: #ffffff','no lazy slice hydration function available');
      }
  </script><div id="slice-container-regionRedirectBanner" class="slice-container region-redirect-banner-slice regionRedirectBanner slice-container-regionRedirectBanner"></div>
  <div id="main" role="main" class="legacy-container full " tabindex="-1">
  <div id="slice-container-trendingbar" class="slice-container trending-bar-container trendingbar slice-container-trending"><div class="trending__wrapper  "><nav aria-labelledby="trending-items" class="trending__nav"><span class="trending__label" id="trending-items">Popular</span><ul class="trending__list"><li class="trending__item" data-analytics-id="trending-bar" data-testid="trending-item"><a class="trending__link" href="https://www.pcgamer.com/games/live/news/monster-hunter-wilds-live-launch-coverage-servers-news-release-day/" data-before-rewrite-localise="https://www.pcgamer.com/games/live/news/monster-hunter-wilds-live-launch-coverage-servers-news-release-day/">Monster Hunter Wilds</a></li><li class="trending__item" data-analytics-id="trending-bar" data-testid="trending-item"><a class="trending__link" href="https://www.pcgamer.com/hardware/graphics-cards/nvidia-geforce-rtx-5090-fe-review/" data-before-rewrite-localise="https://www.pcgamer.com/hardware/graphics-cards/nvidia-geforce-rtx-5090-fe-review/">Nvidia RTX 5090</a></li><li class="trending__item" data-analytics-id="trending-bar" data-testid="trending-item"><a class="trending__link" href="https://www.pcgamer.com/avowed/" data-before-rewrite-localise="https://www.pcgamer.com/avowed/">Avowed</a></li><li class="trending__item" data-analytics-id="trending-bar" data-testid="trending-item"><a class="trending__link" href="https://www.pcgamer.com/grand-theft-auto-5/" data-before-rewrite-localise="https://www.pcgamer.com/grand-theft-auto-5/">GTA 5</a></li><li class="trending__item" data-analytics-id="trending-bar" data-testid="trending-item"><a class="trending__link" href="https://www.pcgamer.com/marvel-rivals/" data-before-rewrite-localise="https://www.pcgamer.com/marvel-rivals/">Marvel Rivals</a></li></ul></nav></div></div>
  <div id="slice-container-newsletterForm-exitIntent" class="slice-container newsletter-slice newsletterForm-exitIntent slice-container-newsletterForm"></div>
  <div id="top-leaderboard" class="ad-unit"></div>
  <article class="page-content-onecol flex-1
  news-article article
  ">
  <div class="widget-area-group widget-area-group-2col p-g p-g-bbs">
  <div id="widgetArea16" class="widget-area p-u-1 p-u-md-2-3 p-u-lg-2-3 widget-area-g-md-vp-2-3 widget-area-g-lg-vp-2-3 widget-area-g-xl-vp-2-3 page-widget-area-16">
  <div data-widget-type="hero" id="hero" class="clear-both widget widget-hero widget-hero widget-hero-hero widget-hero widget-hero-fter-news">
  <div class="clear-both widget-header">
  </div>
  <div class="news-article">
  <header>
  <nav class="breadcrumb" aria-label="Breadcrumbs">
  <ol>
  <li>
  <a href="https://www.pcgamer.com/games/" aria-label="Return to Games" data-before-rewrite-localise="/games">Games</a>
  </li>
  <li>
  <a href="https://www.pcgamer.com/games/strategy/" aria-label="Return to Strategy" data-before-rewrite-localise="/games/strategy">Strategy</a>
  </li>
  <li>
  <a href="https://www.pcgamer.com/battlezone-98-redux/" aria-label="Return to Battlezone 98 Redux" data-before-rewrite-localise="/battlezone-98-redux">Battlezone 98 Redux</a>
  </li>
  </ol>
  </nav>
  <h1>I tracked down the guy who gave a negative review to Battlezone 98 Redux after playing for over 8,000 hours, and came away convinced he was right</h1>
  <div class="byline-social">
  <div class="byline">
  <a href="https://www.pcgamer.com/features/" class="byline-article-type" data-before-rewrite-localise="https://www.pcgamer.com/features/">Features</a>
  <div id="slice-container-authorByline-o8nqHsjbsfS5vh5Ho4XPie" class="slice-container slice-author-byline authorByline-o8nqHsjbsfS5vh5Ho4XPie slice-container-authorByline"><div class="author-byline author-byline--basic-layout"><div class="author-byline__authors">By <span class="author-byline__author-name"><a href="https://www.pcgamer.com/author/joshua-wolens/" target="_self" rel="author" class="link author-byline__link" data-before-rewrite-localise="https://www.pcgamer.com/author/joshua-wolens/">Joshua Wolens</a></span></div><span> published <span class="author-byline__date"><span class="date-relative"><time class="relative-date" datetime="2024-10-31T15:32:29Z" style="font-weight:400">31 October 2024</time> </span></span></span></div></div>
  </div>
  <p class="strapline">Scott Smith is a kind of living Battlezone encyclopaedia. Obviously, I had to speak to him.</p>
  <nav class="socialite-widget box less-space " data-contexturl="https://www.pcgamer.com/games/strategy/i-tracked-down-the-guy-who-gave-a-negative-review-to-battlezone-98-redux-after-playing-for-over-8-000-hours-and-came-away-convinced-he-was-right/">
  <ul class="socialite-widget-ul">
  <li class="socialite-widget-item">
  <a href="https://www.facebook.com/sharer/sharer.php?u=https://www.pcgamer.com/games/strategy/i-tracked-down-the-guy-who-gave-a-negative-review-to-battlezone-98-redux-after-playing-for-over-8-000-hours-and-came-away-convinced-he-was-right/" data-platform="facebook" target="_blank" class="facebook socialite" data-action="share" aria-label="Share this page on Facebook" data-analytics-id="article-social">
  <svg class="icon-svg" height="24" viewbox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" fill="#3b5998" r="12"></circle><path d="m13.079 19h-2.9v-7h-1.441v-2.408h1.442v-1.456c0-1.96.813-3.136 3.136-3.136h1.933v2.408h-1.2c-.91 0-.965.35-.965.966v1.218h2.183l-.257 2.408h-1.931z" fill="#fff"></path></svg> </a>
  </li>
  <li class="socialite-widget-item">
  <a href="https://twitter.com/intent/tweet?text=I%20tracked%20down%20the%20guy%20who%20gave%20a%20negative%20review%20to%20Battlezone%2098%20Redux%20after%20playing%20for%20over%208%2C000%20hours%2C%20and%20came%20away%20convinced%20he%20was%20right&amp;url=https://www.pcgamer.com/games/strategy/i-tracked-down-the-guy-who-gave-a-negative-review-to-battlezone-98-redux-after-playing-for-over-8-000-hours-and-came-away-convinced-he-was-right/" data-platform="twitter" target="_blank" class="twitter socialite" data-action="tweet" aria-label=" Share this page on Twitter" data-analytics-id="article-social">
  <svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#0F1618" viewbox="0 0 375 375"><g><path fill="#000" d="M187 7a180 180 0 1 0 0 361 180 180 0 0 0 0-361"></path></g><g transform="translate(90 85)"><svg xmlns="http://www.w3.org/2000/svg" width="199.8" height="199.8" class="icon-svg" viewbox="0 0 24 24"><path fill="#fff" d="M18 2h4l-8 9 9 11h-7l-5-7-6 7H2l7-9L1 2h7l5 6zm-1 18h2L7 4H5z"></path></svg></g></svg> </a>
  </li>
  <li class="socialite-widget-item mobile-only">
  <a href="whatsapp://send?text=I%20tracked%20down%20the%20guy%20who%20gave%20a%20negative%20review%20to%20Battlezone%2098%20Redux%20after%20playing%20for%20over%208,000%20hours,%20and%20came%20away%20convinced%20he%20was%20righthttps://www.pcgamer.com/games/strategy/i-tracked-down-the-guy-who-gave-a-negative-review-to-battlezone-98-redux-after-playing-for-over-8-000-hours-and-came-away-convinced-he-was-right/?fwa" data-platform="whatsapp" class="whatsapp socialite" data-action="message" aria-label="Share this page on WhatsApp" data-analytics-id="article-social">
  <svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 1000 1000"><path d="M509 0A489 489 0 0 0 18 487a482 482 0 0 0 71 252L0 1000l272-86a493 493 0 0 0 237 60c271 0 491-218 491-487S780 0 509 0zm0 893a409 409 0 0 1-225-67l-157 49 51-150a401 401 0 0 1-78-238 408 408 0 0 1 818 0c0 224-184 406-409 406zm230-295a2222 2222 0 0 0-84-44c-11-4-20-7-28 5a748 748 0 0 1-42 48c-7 8-15 8-27 2-12-7-52-22-99-66a372 372 0 0 1-66-88c-7-13 0-20 7-26l19-21c7-7 9-12 13-20 5-8 3-15 0-22l-35-94c-9-25-20-21-27-21l-24-2c-8 0-22 2-34 14s-46 41-48 102 40 122 46 131c6 8 82 141 207 195 126 55 126 38 149 37 24-1 76-27 87-56 12-29 13-54 10-59s-11-9-24-15z"></path></svg> </a>
  </li>
  <li class="socialite-widget-item">
  <a href="https://www.reddit.com/submit?url=https://www.pcgamer.com/games/strategy/i-tracked-down-the-guy-who-gave-a-negative-review-to-battlezone-98-redux-after-playing-for-over-8-000-hours-and-came-away-convinced-he-was-right/&amp;title=I%20tracked%20down%20the%20guy%20who%20gave%20a%20negative%20review%20to%20Battlezone%2098%20Redux%20after%20playing%20for%20over%208,000%20hours,%20and%20came%20away%20convinced%20he%20was%20right" data-platform="reddit" target="_blank" class="reddit socialite" data-action="submit" aria-label="Share this page on Reddit" data-analytics-id="article-social">
  <i class="icon icon-reddit"></i>
  </a>
  </li>
  <li class="socialite-widget-item">
  <a href="https://pinterest.com/pin/create/button/?url=https://www.pcgamer.com/games/strategy/i-tracked-down-the-guy-who-gave-a-negative-review-to-battlezone-98-redux-after-playing-for-over-8-000-hours-and-came-away-convinced-he-was-right/&amp;media=https://cdn.mos.cms.futurecdn.net/GqMegaDvjg6v4hVKvJ4a83-1200-80.png" data-platform="pinterest" target="_blank" class="pinterest socialite" data-action="pin" aria-label="Share this page on Pinterest" data-analytics-id="article-social">
  <svg class="icon-svg" height="24" viewbox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" fill="#bd081c" r="12"></circle><path d="m12.336 5c-3.822 0-5.754 2.744-5.754 5.025a3.065 3.065 0 0 0 1.652 3.066.279.279 0 0 0 .407-.2l.154-.644a.373.373 0 0 0 -.113-.448 2.341 2.341 0 0 1 -.532-1.582 3.812 3.812 0 0 1 3.961-3.849 3.009 3.009 0 0 1 3.346 3.08c0 2.323-1.022 4.283-2.547 4.283a1.253 1.253 0 0 1 -1.273-1.554 17.616 17.616 0 0 0 .713-2.856 1.081 1.081 0 0 0 -1.092-1.2c-.854 0-1.553.881-1.553 2.071a2.954 2.954 0 0 0 .266 1.274l-1.038 4.383a9.389 9.389 0 0 0 -.027 3.065.109.109 0 0 0 .2.042 8.737 8.737 0 0 0 1.457-2.631l.561-2.212a2.3 2.3 0 0 0 1.959 1.008c2.59 0 4.34-2.366 4.34-5.516a4.8 4.8 0 0 0 -5.087-4.605z" fill="#fff"></path></svg> </a>
  </li>
  <li class="socialite-widget-item">
  <a href="https://share.flipboard.com/bookmarklet/popout?title=I%20tracked%20down%20the%20guy%20who%20gave%20a%20negative%20review%20to%20Battlezone%2098%20Redux%20after%20playing%20for%20over%208%2C000%20hours%2C%20and%20came%20away%20convinced%20he%20was%20right&amp;url=https%3A%2F%2Fwww.pcgamer.com%2Fgames%2Fstrategy%2Fi-tracked-down-the-guy-who-gave-a-negative-review-to-battlezone-98-redux-after-playing-for-over-8-000-hours-and-came-away-convinced-he-was-right%2F" data-platform="flipboard" target="_blank" class="flipboard socialite" data-action="flip" aria-label="Share this page on Flipboard" data-analytics-id="article-social">
  <svg class="icon-svg" height="24" viewbox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="m24 12a12 12 0 1 1 -12-12 12 12 0 0 1 12 12z" fill="#f52828"></path><path d="m19 11h-4v4h-4v4h-4v-12h12z" fill="#fff"></path></svg> </a>
  </li>
  <li class="socialite-widget-item">
  <a href="mailto:?subject=I%20found%20this%20webpage&amp;body=Hi,%20I%20found%20this%20webpage%20and%20thought%20you%20might%20like%20it%20https://www.pcgamer.com/games/strategy/i-tracked-down-the-guy-who-gave-a-negative-review-to-battlezone-98-redux-after-playing-for-over-8-000-hours-and-came-away-convinced-he-was-right/" class="email socialite" data-platform="email" aria-label="Share this page on your Email" data-analytics-id="article-social">
  <i class="icon icon-envelope-solid"></i>
  </a>
  </li>
  </ul>
  </nav>
  </div>
  <aside class="mx-auto mb-4 flex items-center justify-start mx-0 my-5" id="affiliate-disclaimer" data-component-name="AffiliateDisclaimer">
  <p class="text-700 mb-2 text-[12px] leading-[18px] md:text-[13px] [&amp;&gt;a]:text-gray-700 [&amp;&gt;a]:underline">
  When you purchase through links on our site, we may earn an affiliate commission. <a href="https://www.pcgamer.com/about-pc-gamer/#section-affiliate-advertising-disclosure" data-before-rewrite-localise="https://www.pcgamer.com/uk/about-pc-gamer/#section-affiliate-advertising-disclosure">Here&rsquo;s how it works</a>.
  </p>
  </aside>
  </header> </div>
  </div>
  <div data-widget-type="contentparsed" id="content" class="clear-both widget widget-contentparsed widget-content widget-contentparsed-content widget-content-parsed widget-content-parsed-content_document ">
  <div class="wcp-item-content">
  <script type="text/javascript" id="infinite-scroll-articles-data">
  window.vanilla.infiniteArticlesData = [];
  </script>
  <section class="content-wrapper">
  <div class="box less-space hero-image-wrapper">
  <div style="position:relative;width:100%;">
  <div class="hero-image-padding-wrap padding-on">
  <div class="hero-image-padding" style="padding-top:56.27%;">
  <picture data-new-v2-image="true">
  <source type="image/webp" srcset="https://cdn.mos.cms.futurecdn.net/GqMegaDvjg6v4hVKvJ4a83-1674-80.png.webp 1920w, https://cdn.mos.cms.futurecdn.net/GqMegaDvjg6v4hVKvJ4a83-1200-80.png.webp 1200w, https://cdn.mos.cms.futurecdn.net/GqMegaDvjg6v4hVKvJ4a83-1024-80.png.webp 1024w, https://cdn.mos.cms.futurecdn.net/GqMegaDvjg6v4hVKvJ4a83-970-80.png.webp 970w, https://cdn.mos.cms.futurecdn.net/GqMegaDvjg6v4hVKvJ4a83-650-80.png.webp 650w, https://cdn.mos.cms.futurecdn.net/GqMegaDvjg6v4hVKvJ4a83-480-80.png.webp 480w, https://cdn.mos.cms.futurecdn.net/GqMegaDvjg6v4hVKvJ4a83-320-80.png.webp 320w" sizes="(min-width: 1000px) 600px, calc(100vw - 40px)"></source>
  <img src="https://cdn.mos.cms.futurecdn.net/GqMegaDvjg6v4hVKvJ4a83-1200-80.png" alt="Art from Battlezone 1998, showing a frozen Soviet cosmonaut trapped in the ice of an alien planet, staring into the camera through a broken helmet." srcset="https://cdn.mos.cms.futurecdn.net/GqMegaDvjg6v4hVKvJ4a83-1674-80.png 1920w, https://cdn.mos.cms.futurecdn.net/GqMegaDvjg6v4hVKvJ4a83-1200-80.png 1200w, https://cdn.mos.cms.futurecdn.net/GqMegaDvjg6v4hVKvJ4a83-1024-80.png 1024w, https://cdn.mos.cms.futurecdn.net/GqMegaDvjg6v4hVKvJ4a83-970-80.png 970w, https://cdn.mos.cms.futurecdn.net/GqMegaDvjg6v4hVKvJ4a83-650-80.png 650w, https://cdn.mos.cms.futurecdn.net/GqMegaDvjg6v4hVKvJ4a83-480-80.png 480w, https://cdn.mos.cms.futurecdn.net/GqMegaDvjg6v4hVKvJ4a83-320-80.png 320w" sizes="(min-width: 1000px) 600px, calc(100vw - 40px)" data-original-mos="https://cdn.mos.cms.futurecdn.net/GqMegaDvjg6v4hVKvJ4a83.png" data-pin-media="https://cdn.mos.cms.futurecdn.net/GqMegaDvjg6v4hVKvJ4a83.png" class="block-image-ads hero-image" data-pin-nopin="true" fetchpriority="high">
  </picture>
  </div>
  </div>
  </div>
  <figcaption>
  <span class="credit">(Image credit: Rebellion)</span>
  </figcaption>
  </div>
  <div class="left-rail-area"></div>
  <div id="article-body" class="text-copy bodyCopy auto">
  <p>No one is as vicious about a game as its most dedicated player. Take a jaunt over to the forums for WoW, or CoD, or Overwatch sometime and you'll see what I mean: Scores of people who play almost nothing but the game in question but have almost nothing positive to say about it.</p><div id="ad-unit-1" class="ad-unit"></div><p>But not a single irritated MMO player is a patch on my own personal icon of this genre: Herp McDerperson&mdash;real name Scott Smith&mdash;who I discovered one day when I stumbled on the <a data-analytics-id="inline-link" href="https://steamcommunity.com/id/herpmcderperson/recommended/301650/" target="_blank" data-url="https://steamcommunity.com/id/herpmcderperson/recommended/301650/" referrerpolicy="no-referrer-when-downgrade" data-hl-processed="none">negative review</a> he left on Steam for Battlezone 98 Redux (BZ98R), Rebellion's 2016 remaster of the original RTS/FPS hybrid from 1998. A negative review which he left, says Steam, after 8,461.1 hours of playtime, then followed up with 600 more.</p><a target="_blank" data-url="" href="" data-hl-processed="none"><figure class="van-image-figure inline-layout" data-bordeaux-image-check=""><div class="image-full-width-wrapper"><div class="image-widthsetter" style="max-width:1920px;"><p class="vanilla-image-block" style="padding-top:56.25%;"><picture><source type="image/webp" srcset="https://cdn.mos.cms.futurecdn.net/z7VBBtpbgfNi4jpne6jwmX-320-80.jpg.webp 320w, https://cdn.mos.cms.futurecdn.net/z7VBBtpbgfNi4jpne6jwmX-480-80.jpg.webp 480w, https://cdn.mos.cms.futurecdn.net/z7VBBtpbgfNi4jpne6jwmX-650-80.jpg.webp 650w, https://cdn.mos.cms.futurecdn.net/z7VBBtpbgfNi4jpne6jwmX-970-80.jpg.webp 970w, https://cdn.mos.cms.futurecdn.net/z7VBBtpbgfNi4jpne6jwmX-1024-80.jpg.webp 1024w, https://cdn.mos.cms.futurecdn.net/z7VBBtpbgfNi4jpne6jwmX-1200-80.jpg.webp 1200w" sizes="(min-width: 1000px) 970px, calc(100vw - 40px)"></source><img src="https://cdn.mos.cms.futurecdn.net/z7VBBtpbgfNi4jpne6jwmX-320-80.jpg" alt="Space tanks explode in combat." srcset="https://cdn.mos.cms.futurecdn.net/z7VBBtpbgfNi4jpne6jwmX-320-80.jpg 320w, https://cdn.mos.cms.futurecdn.net/z7VBBtpbgfNi4jpne6jwmX-480-80.jpg 480w, https://cdn.mos.cms.futurecdn.net/z7VBBtpbgfNi4jpne6jwmX-650-80.jpg 650w, https://cdn.mos.cms.futurecdn.net/z7VBBtpbgfNi4jpne6jwmX-970-80.jpg 970w, https://cdn.mos.cms.futurecdn.net/z7VBBtpbgfNi4jpne6jwmX-1024-80.jpg 1024w, https://cdn.mos.cms.futurecdn.net/z7VBBtpbgfNi4jpne6jwmX-1200-80.jpg 1200w" sizes="(min-width: 1000px) 970px, calc(100vw - 40px)" loading="lazy" data-original-mos="https://cdn.mos.cms.futurecdn.net/z7VBBtpbgfNi4jpne6jwmX.jpg" data-pin-media="https://cdn.mos.cms.futurecdn.net/z7VBBtpbgfNi4jpne6jwmX.jpg"></picture></p></div></div><figcaption itemprop="caption description" class=" inline-layout"><span class="credit" itemprop="copyrightHolder">(Image credit: Rebellion)</span></figcaption></figure></a><p>I've been curious about Smith since before I even began writing about games&mdash;a product of both the disparity between his hour-count and his attitude and the authoritative tone of his review (it pretty much kicks off with the statement "This review involves numerous statements of objective fact"). It's a relationship with a single piece of art that I can't really fathom. My favourite game of all time is Morrowind and I've poured a paltry few hundred hours into that. My most-played, according to Steam? Fallout: New Vegas with 650ish hours, a mere 7% of Smith's total in BZ98R. I have only positive things to say about either. Naturally, I had to leverage my position as a PCG writer to reach out to Smith and see if he'd chat about what makes him tick.</p><div class="van_vid_carousel"><div class="van_vid_carousel__padding"><div class="van_vid_carousel__container"></div></div></div><div data-component-name="Recirculation:ArticleRiver">
  <span class="bg-secondary-500 text-secondary-50 text-lg font-bold uppercase py-1 px-2 leading-[1.625rem] sm:leading-[6px] sm:text-sm">
  You may like
  </span>
  <ul class="flex flex-col mt-3 list-outside ms-5 bg-none" data-analytics-id="more-about-inline">
  <li class="m-0 mb-2" name="more-about-inline" data-analytics-id="more-about-inline-0">
  <a class="text-base font-bold text-[#333]" href="https://www.pcgamer.com/games/action/crashing-servers-flame-wars-and-a-60-day-path-to-redemption-the-utterly-chaotic-first-year-of-helldivers-2-has-been-a-democratic-doozy/" data-before-rewrite-localise="https://www.pcgamer.com/games/action/crashing-servers-flame-wars-and-a-60-day-path-to-redemption-the-utterly-chaotic-first-year-of-helldivers-2-has-been-a-democratic-doozy/">
  Crashing servers, flame wars, and a 60-day path to redemption&mdash;the utterly chaotic first year of Helldivers 2 has been a democratic doozy
  </a>
  </li>
  <li class="m-0 mb-2" name="more-about-inline" data-analytics-id="more-about-inline-1">
  <a class="text-base font-bold text-[#333]" href="https://www.pcgamer.com/games/action/a-renewed-obsession-for-british-tv-show-robot-wars-led-me-on-a-wild-goose-chase-to-find-a-good-robot-fighting-game/" data-before-rewrite-localise="https://www.pcgamer.com/games/action/a-renewed-obsession-for-british-tv-show-robot-wars-led-me-on-a-wild-goose-chase-to-find-a-good-robot-fighting-game/">
  A renewed obsession for British TV show Robot Wars led me on a wild goose chase to find a good robot fighting game
  </a>
  </li>
  </ul>
  </div><h2 id="moon-units-3">Moon units</h2><aside class="hawk-base" data-block-type="embed" data-render-type="fte" data-skip="dealsy" data-widget-type="seasonal"><div class="hawk-master-widget-hawk-base-wrapper"></div></aside><p>"I don't blame people for thinking that something is wrong with me after playing over 8,000 hours of a game only to leave a negative review," says Smith. "Anyone who came back to either BZ1 or BZ2 after a decade or more, specifically the multiplayer, and also sticks around to this day, has something seriously wrong with them."</p><div id="ad-unit-2" class="ad-unit"></div><p>But Smith clearly still lives and breathes the game, even if he's long-since fallen off the BZ98R train. His chatter is peppered with references to obscure devs, infamous community figures, niche bugs, and a litany of grievances. "I believe that I received Battlezone along with a handful of other games from my mother for Christmas in 1999&hellip; I can tell you that I still had 56k [dial-up internet] as I remember downloading the 1.31 and 1.4 patches&hellip; and suffering."</p><a target="_blank" data-url="" href="" data-hl-processed="none"><figure class="van-image-figure inline-layout" data-bordeaux-image-check=""><div class="image-full-width-wrapper"><div class="image-widthsetter" style="max-width:1920px;"><p class="vanilla-image-block" style="padding-top:56.25%;"><picture><source type="image/webp" srcset="https://cdn.mos.cms.futurecdn.net/rfY97SDZ99KitqogqYDaoX-320-80.jpg.webp 320w, https://cdn.mos.cms.futurecdn.net/rfY97SDZ99KitqogqYDaoX-480-80.jpg.webp 480w, https://cdn.mos.cms.futurecdn.net/rfY97SDZ99KitqogqYDaoX-650-80.jpg.webp 650w, https://cdn.mos.cms.futurecdn.net/rfY97SDZ99KitqogqYDaoX-970-80.jpg.webp 970w, https://cdn.mos.cms.futurecdn.net/rfY97SDZ99KitqogqYDaoX-1024-80.jpg.webp 1024w, https://cdn.mos.cms.futurecdn.net/rfY97SDZ99KitqogqYDaoX-1200-80.jpg.webp 1200w" sizes="(min-width: 1000px) 970px, calc(100vw - 40px)"></source><img src="https://cdn.mos.cms.futurecdn.net/rfY97SDZ99KitqogqYDaoX-320-80.jpg" alt="Assaulting a base." srcset="https://cdn.mos.cms.futurecdn.net/rfY97SDZ99KitqogqYDaoX-320-80.jpg 320w, https://cdn.mos.cms.futurecdn.net/rfY97SDZ99KitqogqYDaoX-480-80.jpg 480w, https://cdn.mos.cms.futurecdn.net/rfY97SDZ99KitqogqYDaoX-650-80.jpg 650w, https://cdn.mos.cms.futurecdn.net/rfY97SDZ99KitqogqYDaoX-970-80.jpg 970w, https://cdn.mos.cms.futurecdn.net/rfY97SDZ99KitqogqYDaoX-1024-80.jpg 1024w, https://cdn.mos.cms.futurecdn.net/rfY97SDZ99KitqogqYDaoX-1200-80.jpg 1200w" sizes="(min-width: 1000px) 970px, calc(100vw - 40px)" loading="lazy" data-original-mos="https://cdn.mos.cms.futurecdn.net/rfY97SDZ99KitqogqYDaoX.jpg" data-pin-media="https://cdn.mos.cms.futurecdn.net/rfY97SDZ99KitqogqYDaoX.jpg"></picture></p></div></div><figcaption itemprop="caption description" class=" inline-layout"><span class="credit" itemprop="copyrightHolder">(Image credit: Rebellion)</span></figcaption></figure></a><p>Those were the Battlezone salad days. Before Rebellion, before the remaster, perhaps even before the "ever-present malignant force" of a player Smith remembers as "Captain Choes"&mdash;"he's a troll who, I think, has always been there. There may have been some gaps, but there's reports of him being around in '98, '99.</p><p>"He's not very smart, obviously, because he can't spell 'chaos,' [although] he spells it correctly now." Per Smith, Choes' reign of terror is so pervasive and enduring that there are players who only play skirmish matches "alone in passworded games" to this day, the better to ensure he doesn't pop up and start ruining their fun.</p><script data-id="vanilla-slice-newsletterForm-articleInbodyContent-o8nqHsjbsfS5vh5Ho4XPie-hydrate" type="text/javascript">
      window.sliceComponents = window.sliceComponents || {};

      externalsScriptLoaded.then(() => {
          window.reliablePageLoad.then(() => {
              var componentContainer = document.querySelector("#slice-container-newsletterForm-articleInbodyContent-o8nqHsjbsfS5vh5Ho4XPie");

              if (componentContainer) {
                  var data = {"layout":"inbodyContent","header":"The biggest gaming news, reviews and hardware deals","tagline":"Keep up to date with the most important stories and the best deals, as picked by the PC Gamer team.","formFooterText":"By submitting your information you agree to the <a href=\"https:\/\/futureplc.com\/terms-conditions\/\" target=\"_blank\">Terms & Conditions<\/a> and <a href=\"https:\/\/futureplc.com\/privacy-policy\/\" target=\"_blank\">Privacy Policy<\/a> and are aged 16 or over.","successMessage":{"body":"Thank you for signing up. You will receive a confirmation email shortly."},"failureMessage":"There was a problem. Please refresh the page and try again.","method":"POST","inputs":[{"type":"hidden","name":"NAME"},{"type":"email","name":"MAIL","placeholder":"Your Email Address","required":true},{"type":"hidden","name":"NEWSLETTER_CODE","value":"XPG-X"},{"type":"hidden","name":"LANG","value":"EN"},{"type":"hidden","name":"SOURCE","value":"60"},{"type":"hidden","name":"COUNTRY"},{"type":"checkbox","name":"CONTACT_OTHER_BRANDS","label":{"text":"Contact me with news and offers from other Future brands"}},{"type":"checkbox","name":"CONTACT_PARTNERS","label":{"text":"Receive email from us on behalf of our trusted partners or sponsors"}},{"type":"submit","value":"Sign me up","required":true}],"endpoint":"https:\/\/newsletter-subscribe.futureplc.com\/v2\/submission\/submit","analytics":[{"analyticsType":"widgetViewed"}],"ariaLabels":{}};

                  var triggerHydrate = function() {
                      window.sliceComponents.newsletterForm.hydrate(data, componentContainer);
                  }

                  if (window.lazyObserveElement) {
                      window.lazyObserveElement(componentContainer, triggerHydrate);
                  } else {
                      triggerHydrate();
                  }
              }
          }).catch(err => console.error('%c FTE ','background: #9306F9; color: #ffffff','Hydration Script has failed for newsletterForm-articleInbodyContent-o8nqHsjbsfS5vh5Ho4XPie Slice', err));
      }).catch(err => console.error('%c FTE ','background: #9306F9; color: #ffffff','Externals script failed to load', err));
  </script><div id="slice-container-newsletterForm-articleInbodyContent-o8nqHsjbsfS5vh5Ho4XPie" class="slice-container newsletter-inbodyContent-slice newsletterForm-articleInbodyContent-o8nqHsjbsfS5vh5Ho4XPie slice-container-newsletterForm"><div data-hydrate="true" class="newsletter-form__wrapper newsletter-form__wrapper--inbodyContent"><div class="newsletter-form__container"><section class="newsletter-form__top-bar"><h2 class="newsletter-form__header">The biggest gaming news, reviews and hardware deals</h2></section><section class="newsletter-form__main-section"><p class="newsletter-form__strapline">Keep up to date with the most important stories and the best deals, as picked by the PC Gamer team.</p><form data-hydrate="true" class="newsletter-form__form newsletter-form__form--inbodyContent" method="POST" action="https://newsletter-subscribe.futureplc.com/v2/submission/submit"><input data-hydrate="true" type="hidden" class="form__hidden-input form_input form__hidden-input form__hidden-input--inbodyContent" name="NAME"><input data-hydrate="true" type="email" class="form__email-input form_input form__email-input form__email-input--inbodyContent" name="MAIL" required="" placeholder="Your Email Address"><input data-hydrate="true" type="hidden" class="form__hidden-input form_input form__hidden-input form__hidden-input--inbodyContent" name="NEWSLETTER_CODE" value="XPG-X"><input data-hydrate="true" type="hidden" class="form__hidden-input form_input form__hidden-input form__hidden-input--inbodyContent" name="LANG" value="EN"><input data-hydrate="true" type="hidden" class="form__hidden-input form_input form__hidden-input form__hidden-input--inbodyContent" name="SOURCE" value="60"><input data-hydrate="true" type="hidden" class="form__hidden-input form_input form__hidden-input form__hidden-input--inbodyContent" name="COUNTRY"><label class="form__checkbox-label"><input data-hydrate="true" type="checkbox" class="form__checkbox-input form_input form__checkbox-input form__checkbox-input--inbodyContent" name="CONTACT_OTHER_BRANDS">Contact me with news and offers from other Future brands</label><label class="form__checkbox-label"><input data-hydrate="true" type="checkbox" class="form__checkbox-input form_input form__checkbox-input form__checkbox-input--inbodyContent" name="CONTACT_PARTNERS">Receive email from us on behalf of our trusted partners or sponsors</label><input data-hydrate="true" type="submit" class="form__submit-input form_input form__submit-input form__submit-input--inbodyContent" required="" value="Sign me up"></form><footer class="newsletter-form__footer">By submitting your information you agree to the <a href="https://futureplc.com/terms-conditions/" target="_blank">Terms &amp; Conditions</a> and <a href="https://futureplc.com/privacy-policy/" target="_blank">Privacy Policy</a> and are aged 16 or over.</footer></section></div></div></div><figure><blockquote class="vanilla-quoteblock"><p>"He's not very smart, obviously, because he can't spell 'chaos.'"</p><figcaption><cite>Scott Smith, on Captain Choes</cite></figcaption></blockquote></figure><p>But Choes/Chaos wasn't as infamous in '99, and besides, Smith was "single-player only" for years before he fell off the game altogether for a while. Besides a brief dalliance in 2008, it was only around 2012&mdash;when he discovered the <a data-analytics-id="inline-link" href="https://battlezone.fandom.com/wiki/1.5_Patch" data-url="https://battlezone.fandom.com/wiki/1.5_Patch" target="_blank" referrerpolicy="no-referrer-when-downgrade" data-hl-processed="none">1.5 unofficial patch</a> for the original game&mdash;that Smith resumed playing "pretty consistently." The original Battlezone never got a Steam release, of course, meaning none of that play is even factored into his legendary hour-count.</p><h2 id="redux-undo-3">Redux, undo</h2><p>"When BZ98R came out, it was something I flat-out DID NOT WANT," says Smith. "When I first heard about it, one of the first things I did was email Rebellion in a panic regarding the future of 1.5 and whether they'd interfere with its continued existence.</p><p>"(They did not respond)."</p><a target="_blank" data-url="" href="" data-hl-processed="none"><figure class="van-image-figure inline-layout" data-bordeaux-image-check=""><div class="image-full-width-wrapper"><div class="image-widthsetter" style="max-width:1920px;"><p class="vanilla-image-block" style="padding-top:56.25%;"><picture><source type="image/webp" srcset="https://cdn.mos.cms.futurecdn.net/Nsz9mLLBGw4bamNDikg3oX-320-80.jpg.webp 320w, https://cdn.mos.cms.futurecdn.net/Nsz9mLLBGw4bamNDikg3oX-480-80.jpg.webp 480w, https://cdn.mos.cms.futurecdn.net/Nsz9mLLBGw4bamNDikg3oX-650-80.jpg.webp 650w, https://cdn.mos.cms.futurecdn.net/Nsz9mLLBGw4bamNDikg3oX-970-80.jpg.webp 970w, https://cdn.mos.cms.futurecdn.net/Nsz9mLLBGw4bamNDikg3oX-1024-80.jpg.webp 1024w, https://cdn.mos.cms.futurecdn.net/Nsz9mLLBGw4bamNDikg3oX-1200-80.jpg.webp 1200w" sizes="(min-width: 1000px) 970px, calc(100vw - 40px)"></source><img src="https://cdn.mos.cms.futurecdn.net/Nsz9mLLBGw4bamNDikg3oX-320-80.jpg" alt="An army of space-based forces." srcset="https://cdn.mos.cms.futurecdn.net/Nsz9mLLBGw4bamNDikg3oX-320-80.jpg 320w, https://cdn.mos.cms.futurecdn.net/Nsz9mLLBGw4bamNDikg3oX-480-80.jpg 480w, https://cdn.mos.cms.futurecdn.net/Nsz9mLLBGw4bamNDikg3oX-650-80.jpg 650w, https://cdn.mos.cms.futurecdn.net/Nsz9mLLBGw4bamNDikg3oX-970-80.jpg 970w, https://cdn.mos.cms.futurecdn.net/Nsz9mLLBGw4bamNDikg3oX-1024-80.jpg 1024w, https://cdn.mos.cms.futurecdn.net/Nsz9mLLBGw4bamNDikg3oX-1200-80.jpg 1200w" sizes="(min-width: 1000px) 970px, calc(100vw - 40px)" loading="lazy" data-original-mos="https://cdn.mos.cms.futurecdn.net/Nsz9mLLBGw4bamNDikg3oX.jpg" data-pin-media="https://cdn.mos.cms.futurecdn.net/Nsz9mLLBGw4bamNDikg3oX.jpg"></picture></p></div></div><figcaption itemprop="caption description" class=" inline-layout"><span class="credit" itemprop="copyrightHolder">(Image credit: Rebellion)</span></figcaption></figure></a><p>But the answer soon became clear anyway: The existence of an 'official' modernised, dolled-up version of the original Battlezone was pretty much the apocalypse for the existing community scene. "[BZ98R's] release largely killed 1.5's multiplayer scene," says Smith, "It's very very dead now." That's one of the key reasons he migrated over to Rebellion's version of the game in spite of his misgivings (the other was, admittedly, the studio had made some "QoL changes I couldn't really give up again.")</p><p>When he got there, he didn't like what he found. Smith's "list of grievances" with BZ98R is long and detailed, both in his original review and in the elaboration he provided me over email. They range from seemingly niche and obscure&mdash;at least to a Battlezone neophyte like me&mdash;to downright "DAMNING," in Smith's words.</p><a target="_blank" data-url="" href="" data-hl-processed="none"><figure class="van-image-figure inline-layout" data-bordeaux-image-check=""><div class="image-full-width-wrapper"><div class="image-widthsetter" style="max-width:1920px;"><p class="vanilla-image-block" style="padding-top:56.25%;"><picture><source type="image/webp" srcset="https://cdn.mos.cms.futurecdn.net/fhFWxnafnVu3XLP2FnGBpX-320-80.jpg.webp 320w, https://cdn.mos.cms.futurecdn.net/fhFWxnafnVu3XLP2FnGBpX-480-80.jpg.webp 480w, https://cdn.mos.cms.futurecdn.net/fhFWxnafnVu3XLP2FnGBpX-650-80.jpg.webp 650w, https://cdn.mos.cms.futurecdn.net/fhFWxnafnVu3XLP2FnGBpX-970-80.jpg.webp 970w, https://cdn.mos.cms.futurecdn.net/fhFWxnafnVu3XLP2FnGBpX-1024-80.jpg.webp 1024w, https://cdn.mos.cms.futurecdn.net/fhFWxnafnVu3XLP2FnGBpX-1200-80.jpg.webp 1200w" sizes="(min-width: 1000px) 970px, calc(100vw - 40px)"></source><img src="https://cdn.mos.cms.futurecdn.net/fhFWxnafnVu3XLP2FnGBpX-320-80.jpg" alt="Giving orders to allies." srcset="https://cdn.mos.cms.futurecdn.net/fhFWxnafnVu3XLP2FnGBpX-320-80.jpg 320w, https://cdn.mos.cms.futurecdn.net/fhFWxnafnVu3XLP2FnGBpX-480-80.jpg 480w, https://cdn.mos.cms.futurecdn.net/fhFWxnafnVu3XLP2FnGBpX-650-80.jpg 650w, https://cdn.mos.cms.futurecdn.net/fhFWxnafnVu3XLP2FnGBpX-970-80.jpg 970w, https://cdn.mos.cms.futurecdn.net/fhFWxnafnVu3XLP2FnGBpX-1024-80.jpg 1024w, https://cdn.mos.cms.futurecdn.net/fhFWxnafnVu3XLP2FnGBpX-1200-80.jpg 1200w" sizes="(min-width: 1000px) 970px, calc(100vw - 40px)" loading="lazy" data-original-mos="https://cdn.mos.cms.futurecdn.net/fhFWxnafnVu3XLP2FnGBpX.jpg" data-pin-media="https://cdn.mos.cms.futurecdn.net/fhFWxnafnVu3XLP2FnGBpX.jpg"></picture></p></div></div><figcaption itemprop="caption description" class=" inline-layout"><span class="credit" itemprop="copyrightHolder">(Image credit: Rebellion)</span></figcaption></figure></a><p>Although he's imbued with the experience that only nearly a full year of playtime could endow, some of Smith's complaints seem like peccadillos. Jump sniping in the remaster, for instance, is inauthentic to this day. "It took some skill to abuse this aspect of the [original] game," says Smith, detailing a process whereby players would have to repeatedly bunny-hop while undeploying their snipers before they touched the ground and became rooted in place. In BZ98R it's a walk in the park: "You can just hold the jump key with the sniper rifle deployed indefinitely without having to worry about it."</p><p>The kind of bug that might annoy an old-timer, sure, but you probably wouldn't warn new players away for it. But others are worse. One bug lets players detonate a specific kind of bomb in their own base without taking damage themselves, providing a hacky way to vaporise invaders. Another? The remaster's minimap reveals everything where the original only showed the areas your radar covered&mdash;essentially abolishing fog of war from the game's RTS layer.</p><p>There are plenty more besides, but Smith's most trenchant criticisms go back to the multiplayer. His number one complaint is the netcode. Community legend holds, says Smith, that BZ98R's multiplayer code was ginned up "'in about a week'," though he isn't sure if that's really true.</p><a target="_blank" data-url="" href="" data-hl-processed="none"><figure class="van-image-figure inline-layout" data-bordeaux-image-check=""><div class="image-full-width-wrapper"><div class="image-widthsetter" style="max-width:1920px;"><p class="vanilla-image-block" style="padding-top:56.25%;"><picture><source type="image/webp" srcset="https://cdn.mos.cms.futurecdn.net/r6EHy3riVWJ4HosmvcVdnX-320-80.jpg.webp 320w, https://cdn.mos.cms.futurecdn.net/r6EHy3riVWJ4HosmvcVdnX-480-80.jpg.webp 480w, https://cdn.mos.cms.futurecdn.net/r6EHy3riVWJ4HosmvcVdnX-650-80.jpg.webp 650w, https://cdn.mos.cms.futurecdn.net/r6EHy3riVWJ4HosmvcVdnX-970-80.jpg.webp 970w, https://cdn.mos.cms.futurecdn.net/r6EHy3riVWJ4HosmvcVdnX-1024-80.jpg.webp 1024w, https://cdn.mos.cms.futurecdn.net/r6EHy3riVWJ4HosmvcVdnX-1200-80.jpg.webp 1200w" sizes="(min-width: 1000px) 970px, calc(100vw - 40px)"></source><img src="https://cdn.mos.cms.futurecdn.net/r6EHy3riVWJ4HosmvcVdnX-320-80.jpg" alt="A loading screen showing a close-up of a speedy space tank." srcset="https://cdn.mos.cms.futurecdn.net/r6EHy3riVWJ4HosmvcVdnX-320-80.jpg 320w, https://cdn.mos.cms.futurecdn.net/r6EHy3riVWJ4HosmvcVdnX-480-80.jpg 480w, https://cdn.mos.cms.futurecdn.net/r6EHy3riVWJ4HosmvcVdnX-650-80.jpg 650w, https://cdn.mos.cms.futurecdn.net/r6EHy3riVWJ4HosmvcVdnX-970-80.jpg 970w, https://cdn.mos.cms.futurecdn.net/r6EHy3riVWJ4HosmvcVdnX-1024-80.jpg 1024w, https://cdn.mos.cms.futurecdn.net/r6EHy3riVWJ4HosmvcVdnX-1200-80.jpg 1200w" sizes="(min-width: 1000px) 970px, calc(100vw - 40px)" loading="lazy" data-original-mos="https://cdn.mos.cms.futurecdn.net/r6EHy3riVWJ4HosmvcVdnX.jpg" data-pin-media="https://cdn.mos.cms.futurecdn.net/r6EHy3riVWJ4HosmvcVdnX.jpg"></picture></p></div></div><figcaption itemprop="caption description" class=" inline-layout"><span class="credit" itemprop="copyrightHolder">(Image credit: Rebellion)</span></figcaption></figure></a><p>Still, the fact it <em>could</em> be believed says a lot. "Players get disconnected too easily and it often has nothing to do with the quality of their internet connection&hellip; In the past, both Battlezone remasters had repeat issues with their multiplayer servers and I was DEEPLY involved in trying to get that addressed. Rebellion was often VERY slow to address these kinds of problems&hellip; As a result of my interactions, I have an adversarial relationship with one of them (who I will not name). Naturally, I blame the other party for this."</p><h2 id="detective-mode-3">Detective mode</h2><p>Smith's unnamed nemesis isn't the only acrimonious relationship he has with members of the BZ98R team. After expanding on the various bugs and design changes in the remaster that went into shaping his negative review of the game, he references a story he considers both emblematic of the project and of his relationship with (some of) its creators: "The BZ98R Bot Fiasco."</p><p>Over the course of an hour-long call including time-stamped chat logs and audio files from the game, which Smith has unpacked on his computer, he tells the tale of the time he played Discord detective, rubbing some feathers the wrong way and&mdash;if such a thing were possible&mdash;perhaps souring him even further on the remaster.</p><a target="_blank" data-url="" href="" data-hl-processed="none"><figure class="van-image-figure inline-layout" data-bordeaux-image-check=""><div class="image-full-width-wrapper"><div class="image-widthsetter" style="max-width:1920px;"><p class="vanilla-image-block" style="padding-top:56.25%;"><picture><source type="image/webp" srcset="https://cdn.mos.cms.futurecdn.net/NKNKY24dZ98FTHjiRyxCpX-320-80.jpg.webp 320w, https://cdn.mos.cms.futurecdn.net/NKNKY24dZ98FTHjiRyxCpX-480-80.jpg.webp 480w, https://cdn.mos.cms.futurecdn.net/NKNKY24dZ98FTHjiRyxCpX-650-80.jpg.webp 650w, https://cdn.mos.cms.futurecdn.net/NKNKY24dZ98FTHjiRyxCpX-970-80.jpg.webp 970w, https://cdn.mos.cms.futurecdn.net/NKNKY24dZ98FTHjiRyxCpX-1024-80.jpg.webp 1024w, https://cdn.mos.cms.futurecdn.net/NKNKY24dZ98FTHjiRyxCpX-1200-80.jpg.webp 1200w" sizes="(min-width: 1000px) 970px, calc(100vw - 40px)"></source><img src="https://cdn.mos.cms.futurecdn.net/NKNKY24dZ98FTHjiRyxCpX-320-80.jpg" alt="Placing structures." srcset="https://cdn.mos.cms.futurecdn.net/NKNKY24dZ98FTHjiRyxCpX-320-80.jpg 320w, https://cdn.mos.cms.futurecdn.net/NKNKY24dZ98FTHjiRyxCpX-480-80.jpg 480w, https://cdn.mos.cms.futurecdn.net/NKNKY24dZ98FTHjiRyxCpX-650-80.jpg 650w, https://cdn.mos.cms.futurecdn.net/NKNKY24dZ98FTHjiRyxCpX-970-80.jpg 970w, https://cdn.mos.cms.futurecdn.net/NKNKY24dZ98FTHjiRyxCpX-1024-80.jpg 1024w, https://cdn.mos.cms.futurecdn.net/NKNKY24dZ98FTHjiRyxCpX-1200-80.jpg 1200w" sizes="(min-width: 1000px) 970px, calc(100vw - 40px)" loading="lazy" data-original-mos="https://cdn.mos.cms.futurecdn.net/NKNKY24dZ98FTHjiRyxCpX.jpg" data-pin-media="https://cdn.mos.cms.futurecdn.net/NKNKY24dZ98FTHjiRyxCpX.jpg"></picture></p></div></div><figcaption itemprop="caption description" class=" inline-layout"><span class="credit" itemprop="copyrightHolder">(Image credit: Rebellion)</span></figcaption></figure></a><p>In essence, the game's official Discord had a channel which showed when multiplayer games began and ended. "What we started to notice is that there were players in there that didn't talk, had really weird names, and one would create a game that was locked, and a bunch of them would filter in there, and then, at some point, the game would end."</p><p>Phantom players playing phantom games. In other words: A mystery. Smith dimly recalls someone telling the community&mdash;after complaints about this weirdness&mdash;that the players were "Indian beta testers." Unsurprisingly, that explanation didn't fly.</p><p>Smith decided to do something about it. He sent support requests, but they were closed without answer. He took a look at the players themselves and, where usually a tag would list if a player was on Steam or GOG, theirs would just say "Other."</p><a target="_blank" data-url="" href="" data-hl-processed="none"><figure class="van-image-figure inline-layout" data-bordeaux-image-check=""><div class="image-full-width-wrapper"><div class="image-widthsetter" style="max-width:1920px;"><p class="vanilla-image-block" style="padding-top:56.25%;"><picture><source type="image/webp" srcset="https://cdn.mos.cms.futurecdn.net/AHWzcvNgHmm9tJqYBaE8nX-320-80.jpg.webp 320w, https://cdn.mos.cms.futurecdn.net/AHWzcvNgHmm9tJqYBaE8nX-480-80.jpg.webp 480w, https://cdn.mos.cms.futurecdn.net/AHWzcvNgHmm9tJqYBaE8nX-650-80.jpg.webp 650w, https://cdn.mos.cms.futurecdn.net/AHWzcvNgHmm9tJqYBaE8nX-970-80.jpg.webp 970w, https://cdn.mos.cms.futurecdn.net/AHWzcvNgHmm9tJqYBaE8nX-1024-80.jpg.webp 1024w, https://cdn.mos.cms.futurecdn.net/AHWzcvNgHmm9tJqYBaE8nX-1200-80.jpg.webp 1200w" sizes="(min-width: 1000px) 970px, calc(100vw - 40px)"></source><img src="https://cdn.mos.cms.futurecdn.net/AHWzcvNgHmm9tJqYBaE8nX-320-80.jpg" alt="An overhead view of a battle between space tanks." srcset="https://cdn.mos.cms.futurecdn.net/AHWzcvNgHmm9tJqYBaE8nX-320-80.jpg 320w, https://cdn.mos.cms.futurecdn.net/AHWzcvNgHmm9tJqYBaE8nX-480-80.jpg 480w, https://cdn.mos.cms.futurecdn.net/AHWzcvNgHmm9tJqYBaE8nX-650-80.jpg 650w, https://cdn.mos.cms.futurecdn.net/AHWzcvNgHmm9tJqYBaE8nX-970-80.jpg 970w, https://cdn.mos.cms.futurecdn.net/AHWzcvNgHmm9tJqYBaE8nX-1024-80.jpg 1024w, https://cdn.mos.cms.futurecdn.net/AHWzcvNgHmm9tJqYBaE8nX-1200-80.jpg 1200w" sizes="(min-width: 1000px) 970px, calc(100vw - 40px)" loading="lazy" data-original-mos="https://cdn.mos.cms.futurecdn.net/AHWzcvNgHmm9tJqYBaE8nX.jpg" data-pin-media="https://cdn.mos.cms.futurecdn.net/AHWzcvNgHmm9tJqYBaE8nX.jpg"></picture></p></div></div><figcaption itemprop="caption description" class=" inline-layout"><span class="credit" itemprop="copyrightHolder">(Image credit: Rebellion)</span></figcaption></figure></a><p>"They sit in the lobby, and then the game closes, and that's when things started getting pretty obvious that something was going on."</p><p>Smith operated in gumshoe mode for a year, "collecting all this information," and eventually settled on a theory. Some of the phantom players used names&mdash;or variations of names&mdash;historically associated with some of the devs. His conclusion? These were bots spun up to generate a "false sense of activity" in the game's multiplayer&mdash;multiplayer that was, in Smith's eyes, rife with newly created problems that weren't present in the old game and that had been built on the razed foundations of the previous community scene.</p><figure><blockquote class="vanilla-quoteblock"><p>"They sit in the lobby, and then the game closes, and that's when things started getting pretty obvious that something was going on."</p><figcaption><cite>Scott Smith</cite></figcaption></blockquote></figure><p>Is that accurate? The community never got a firm answer, but the whole episode seems emblematic of Smith's relationship with BZ98R: A lack of trust and communication, and a feeling that something that had once been the domain of a passionate and active few had been taken over and puppeted by outside forces.</p><h2 id="and-i-would-play-600-more-3">And I would play 600 more</h2><p>Smith says he no longer plays BZ98R, though he does boot up the remaster of the sequel&mdash;Battlezone: Combat Commander&mdash;from time to time. He wrote his review in August 2021, five years after the remaster came out. "I don't think anything in particular triggered me to finally write my review. I had meant to do so for YEARS," he says. He just happened to get around to it (it is quite lengthy) at that time.</p><p>But the question remains: Steam the eternal tattle-tale says that, even after he wrote that review, Smith poured almost 600 extra hours into BZ98R, a game that had destroyed the multiplayer scene he was part of and that was still riddled with bugs he considered unforgivable. Why?</p><a target="_blank" data-url="" href="" data-hl-processed="none"><figure class="van-image-figure inline-layout" data-bordeaux-image-check=""><div class="image-full-width-wrapper"><div class="image-widthsetter" style="max-width:1920px;"><p class="vanilla-image-block" style="padding-top:56.25%;"><picture><source type="image/webp" srcset="https://cdn.mos.cms.futurecdn.net/cf3anb5ZXdDdz7RwEk8xnX-320-80.jpg.webp 320w, https://cdn.mos.cms.futurecdn.net/cf3anb5ZXdDdz7RwEk8xnX-480-80.jpg.webp 480w, https://cdn.mos.cms.futurecdn.net/cf3anb5ZXdDdz7RwEk8xnX-650-80.jpg.webp 650w, https://cdn.mos.cms.futurecdn.net/cf3anb5ZXdDdz7RwEk8xnX-970-80.jpg.webp 970w, https://cdn.mos.cms.futurecdn.net/cf3anb5ZXdDdz7RwEk8xnX-1024-80.jpg.webp 1024w, https://cdn.mos.cms.futurecdn.net/cf3anb5ZXdDdz7RwEk8xnX-1200-80.jpg.webp 1200w" sizes="(min-width: 1000px) 970px, calc(100vw - 40px)"></source><img src="https://cdn.mos.cms.futurecdn.net/cf3anb5ZXdDdz7RwEk8xnX-320-80.jpg" alt="A first-person view from a space tank, showing Jupiter on the horizon." srcset="https://cdn.mos.cms.futurecdn.net/cf3anb5ZXdDdz7RwEk8xnX-320-80.jpg 320w, https://cdn.mos.cms.futurecdn.net/cf3anb5ZXdDdz7RwEk8xnX-480-80.jpg 480w, https://cdn.mos.cms.futurecdn.net/cf3anb5ZXdDdz7RwEk8xnX-650-80.jpg 650w, https://cdn.mos.cms.futurecdn.net/cf3anb5ZXdDdz7RwEk8xnX-970-80.jpg 970w, https://cdn.mos.cms.futurecdn.net/cf3anb5ZXdDdz7RwEk8xnX-1024-80.jpg 1024w, https://cdn.mos.cms.futurecdn.net/cf3anb5ZXdDdz7RwEk8xnX-1200-80.jpg 1200w" sizes="(min-width: 1000px) 970px, calc(100vw - 40px)" loading="lazy" data-original-mos="https://cdn.mos.cms.futurecdn.net/cf3anb5ZXdDdz7RwEk8xnX.jpg" data-pin-media="https://cdn.mos.cms.futurecdn.net/cf3anb5ZXdDdz7RwEk8xnX.jpg"></picture></p></div></div><figcaption itemprop="caption description" class=" inline-layout"><span class="credit" itemprop="copyrightHolder">(Image credit: Rebellion)</span></figcaption></figure></a><p>Turns out the answer is pretty wholesome. "For a long time now, I've only opened the game to help someone, usually modders, with problems. I possess(ed) some rare institutional knowledge and I like helping people with what I know. I've spent easily a couple dozen hours doing tech support," says Smith.</p><p>I think that kind of gets to the root of it. I admit it, when I first considered writing this, I never imagined I'd truly <em>get</em> Smith's point of view. It felt like he and I simply played games too differently to bridge that gulf of understanding; I'd never really parse how you could play 8,000 hours of a thing and then say it's bad.</p><a target="_blank" data-url="" href="" data-hl-processed="none"><figure class="van-image-figure inline-layout" data-bordeaux-image-check=""><div class="image-full-width-wrapper"><div class="image-widthsetter" style="max-width:1920px;"><p class="vanilla-image-block" style="padding-top:56.25%;"><picture><source type="image/webp" srcset="https://cdn.mos.cms.futurecdn.net/S4ZYmqKUw2V6nnFVt6mbmX-320-80.jpg.webp 320w, https://cdn.mos.cms.futurecdn.net/S4ZYmqKUw2V6nnFVt6mbmX-480-80.jpg.webp 480w, https://cdn.mos.cms.futurecdn.net/S4ZYmqKUw2V6nnFVt6mbmX-650-80.jpg.webp 650w, https://cdn.mos.cms.futurecdn.net/S4ZYmqKUw2V6nnFVt6mbmX-970-80.jpg.webp 970w, https://cdn.mos.cms.futurecdn.net/S4ZYmqKUw2V6nnFVt6mbmX-1024-80.jpg.webp 1024w, https://cdn.mos.cms.futurecdn.net/S4ZYmqKUw2V6nnFVt6mbmX-1200-80.jpg.webp 1200w" sizes="(min-width: 1000px) 970px, calc(100vw - 40px)"></source><img src="https://cdn.mos.cms.futurecdn.net/S4ZYmqKUw2V6nnFVt6mbmX-320-80.jpg" alt="Firing at an enemy." srcset="https://cdn.mos.cms.futurecdn.net/S4ZYmqKUw2V6nnFVt6mbmX-320-80.jpg 320w, https://cdn.mos.cms.futurecdn.net/S4ZYmqKUw2V6nnFVt6mbmX-480-80.jpg 480w, https://cdn.mos.cms.futurecdn.net/S4ZYmqKUw2V6nnFVt6mbmX-650-80.jpg 650w, https://cdn.mos.cms.futurecdn.net/S4ZYmqKUw2V6nnFVt6mbmX-970-80.jpg 970w, https://cdn.mos.cms.futurecdn.net/S4ZYmqKUw2V6nnFVt6mbmX-1024-80.jpg 1024w, https://cdn.mos.cms.futurecdn.net/S4ZYmqKUw2V6nnFVt6mbmX-1200-80.jpg 1200w" sizes="(min-width: 1000px) 970px, calc(100vw - 40px)" loading="lazy" data-original-mos="https://cdn.mos.cms.futurecdn.net/S4ZYmqKUw2V6nnFVt6mbmX.jpg" data-pin-media="https://cdn.mos.cms.futurecdn.net/S4ZYmqKUw2V6nnFVt6mbmX.jpg"></picture></p></div></div><figcaption itemprop="caption description" class=" inline-layout"><span class="credit" itemprop="copyrightHolder">(Image credit: Rebellion)</span></figcaption></figure></a><p>But I think the gold thread running through everything Smith says is a mourning for the Battlezone community as it was, and that was disintegrated when the remaster arrived on the scene. That I understand better than anything, and dipping back into a game you don't really like very much in order to help out whatever embers of a community remain? That makes sense too. As someone who still dips into the dying MMOs of his youth to relive thinning and faded memories, I get it.</p><p>Plus, I have to admit, some of those bugs really do seem unforgivable.</p>
  </div>
  <div id="this-will-be-used-for-mpu-2"></div>
  <div id="slice-container-authorBio-o8nqHsjbsfS5vh5Ho4XPie" class="slice-container slice-author-bio authorBio-o8nqHsjbsfS5vh5Ho4XPie slice-container-authorBio"><div class="author author__default-layout author--separator"><div class="author__header"><div class="author__avatar-block"><figure class="image-wrapped__wrapper" data-bordeaux-image-check="false"><div class="image-wrapped__widthsetter" style="max-width:none"><div class="image-wrapped__aspect-padding" style="padding-bottom:56.25%"><div style="display:contents"><picture data-hydrate="false"><source class="author__avatar image-wrapped__image image__image" type="image/webp" srcset="https://cdn.mos.cms.futurecdn.net/SXuALfFkYbTT9o5tjJroaV-140-80.png.webp 140w" sizes="99vw" data-normal="https://vanilla.futurecdn.net/cyclingnews/media/img/missing-image.svg" data-original-mos="https://cdn.mos.cms.futurecdn.net/SXuALfFkYbTT9o5tjJroaV.png" data-pin-media="https://cdn.mos.cms.futurecdn.net/SXuALfFkYbTT9o5tjJroaV.png" data-pin-nopin="true" data-slice-image="true"></source><source class="author__avatar image-wrapped__image image__image" type="image/png" srcset="https://cdn.mos.cms.futurecdn.net/SXuALfFkYbTT9o5tjJroaV-140-80.png 140w" sizes="99vw" data-normal="https://vanilla.futurecdn.net/cyclingnews/media/img/missing-image.svg" data-original-mos="https://cdn.mos.cms.futurecdn.net/SXuALfFkYbTT9o5tjJroaV.png" data-pin-media="https://cdn.mos.cms.futurecdn.net/SXuALfFkYbTT9o5tjJroaV.png" data-pin-nopin="true" data-slice-image="true"></source><img src="https://vanilla.futurecdn.net/cyclingnews/media/img/missing-image.svg" alt="Joshua Wolens" sizes="99vw" class="author__avatar image-wrapped__image image__image" loading="lazy" data-normal="https://vanilla.futurecdn.net/cyclingnews/media/img/missing-image.svg" data-original-mos="https://cdn.mos.cms.futurecdn.net/SXuALfFkYbTT9o5tjJroaV.png" data-pin-media="https://cdn.mos.cms.futurecdn.net/SXuALfFkYbTT9o5tjJroaV.png" data-pin-nopin="true" data-slice-image="true"></picture></div></div></div></figure></div><div class="author__heading"><div class="author__name"><a href="https://www.pcgamer.com/author/joshua-wolens/" target="_self" class="link author__name_link" data-before-rewrite-localise="https://www.pcgamer.com/author/joshua-wolens/">Joshua Wolens</a></div><div class="author__social"><nav class="button-social-group author__social-buttons" aria-labelledby="button-social-group- author__social-buttons"><div id="button-social-group- author__social-buttons" style="display:none">Social Links Navigation</div><a class="button-social   " href="https://www.twitter.com/@joshuawolens" target="_self" aria-label="TWITTER"><span class="button-social__icon"><svg class="icon_twitter" height="24" viewbox="0 0 375 375" width="24" xmlns="http://www.w3.org/2000/svg" fill="0F1618"><g><path fill="#000" d="M187 7a180 180 0 1 0 0 361 180 180 0 0 0 0-361"></path></g><g transform="translate(90 85)"><svg xmlns="http://www.w3.org/2000/svg" width="199.8" height="199.8" class="icon-svg" viewbox="0 0 24 24"><path fill="#fff" d="M18 2h4l-8 9 9 11h-7l-5-7-6 7H2l7-9L1 2h7l5 6zm-1 18h2L7 4H5z"></path></svg></g></svg></span></a></nav></div><div class="author__role">News Writer</div></div></div><div class="author__biography"><p>One of Josh's first memories is of playing Quake 2 on the family computer when he was much too young to be doing that, and he's been irreparably game-brained ever since. His writing has been featured in Vice, Fanbyte, and the Financial Times. He'll play pretty much anything, and has written far too much on everything from visual novels to Assassin's Creed. His most profound loves are for CRPGs, immersive sims, and any game whose ambition outstrips its budget. He thinks you're all far too mean about Deus Ex: Invisible War.</p></div></div></div>
  </section>
  <div class="infinite-container">
  <div class="infinite-trigger" style="height:20px;" aria-hidden="true"></div>
  </div>
  <section class="mx-2 my-5">
  <div class="w-full">
  <div data-recirc-id="article-river-stacked-adviser:related">
  <div class="text-white py-4 px-3 mb-4 bg-[#333] uppercase font-bold">Read more</div>
  <div class="grid grid-cols-1 gap-4 my-4">
  <a href="https://www.pcgamer.com/games/action/crashing-servers-flame-wars-and-a-60-day-path-to-redemption-the-utterly-chaotic-first-year-of-helldivers-2-has-been-a-democratic-doozy/" data-analytics-id="more-about-latest-article" data-before-rewrite-localise="https://www.pcgamer.com/games/action/crashing-servers-flame-wars-and-a-60-day-path-to-redemption-the-utterly-chaotic-first-year-of-helldivers-2-has-been-a-democratic-doozy/">
  <div class="pt-[56.25%] relative [&amp;_img]:absolute [&amp;_img]:top-0 [&amp;_img]:object-cover [&amp;_img]:w-full [&amp;_img]:h-full">
  <picture data-new-v2-image="true">
  <source type="image/webp" srcset="https://cdn.mos.cms.futurecdn.net/cAXtN7SoHS2NscEKkgaJi-840-80.png.webp 840w, https://cdn.mos.cms.futurecdn.net/cAXtN7SoHS2NscEKkgaJi-650-80.png.webp 650w, https://cdn.mos.cms.futurecdn.net/cAXtN7SoHS2NscEKkgaJi-500-80.png.webp 500w, https://cdn.mos.cms.futurecdn.net/cAXtN7SoHS2NscEKkgaJi-450-80.png.webp 450w, https://cdn.mos.cms.futurecdn.net/cAXtN7SoHS2NscEKkgaJi-320-80.png.webp 320w" sizes="(min-width: 900px) 925px, (min-width: 700px) 450px, calc(100vw - 48px)"></source>
  <img src="https://cdn.mos.cms.futurecdn.net/cAXtN7SoHS2NscEKkgaJi-840-80.png" alt=" " srcset="https://cdn.mos.cms.futurecdn.net/cAXtN7SoHS2NscEKkgaJi-840-80.png 840w, https://cdn.mos.cms.futurecdn.net/cAXtN7SoHS2NscEKkgaJi-650-80.png 650w, https://cdn.mos.cms.futurecdn.net/cAXtN7SoHS2NscEKkgaJi-500-80.png 500w, https://cdn.mos.cms.futurecdn.net/cAXtN7SoHS2NscEKkgaJi-450-80.png 450w, https://cdn.mos.cms.futurecdn.net/cAXtN7SoHS2NscEKkgaJi-320-80.png 320w" sizes="(min-width: 900px) 925px, (min-width: 700px) 450px, calc(100vw - 48px)" loading="lazy" data-original-mos="https://cdn.mos.cms.futurecdn.net/cAXtN7SoHS2NscEKkgaJi.png" data-pin-media="https://cdn.mos.cms.futurecdn.net/cAXtN7SoHS2NscEKkgaJi.png">
  </picture>
  </div>
  <span class="text-base text-black font-bold mx-0 my-2.5 p-0">Crashing servers, flame wars, and a 60-day path to redemption&mdash;the utterly chaotic first year of Helldivers 2 has been a democratic doozy</span>
  </a>
  <div class="relative recirc-feed sponsored-card" data-recirc-id="article-river-stacked-ads:native-cards">
  <div class="sponsored-post"></div>
  <script type="text/html" class="sponsored-post-template" style="display:none!important;">
  <a style="position: relative!important;" href="SPONSORED_LINK_URL">
  <picture>
  <source srcset="SPONSORED_IMAGE_URL.webp" type="image/webp" />
  <img src="SPONSORED_IMAGE_URL" alt="SPONSORED_HEADLINE" loading="lazy"/>
  </picture>
  <span class="text-base text-black font-bold mx-0 my-2.5 p-0">SPONSORED_HEADLINE</span>
  </a>
  </script>
  </div>
  <a href="https://www.pcgamer.com/games/action/a-renewed-obsession-for-british-tv-show-robot-wars-led-me-on-a-wild-goose-chase-to-find-a-good-robot-fighting-game/" data-analytics-id="more-about-latest-article" data-before-rewrite-localise="https://www.pcgamer.com/games/action/a-renewed-obsession-for-british-tv-show-robot-wars-led-me-on-a-wild-goose-chase-to-find-a-good-robot-fighting-game/">
  <div class="pt-[56.25%] relative [&amp;_img]:absolute [&amp;_img]:top-0 [&amp;_img]:object-cover [&amp;_img]:w-full [&amp;_img]:h-full">
  <picture data-new-v2-image="true">
  <source type="image/webp" srcset="https://cdn.mos.cms.futurecdn.net/gNvRm4UzZxdodErPrYcQHi-840-80.jpg.webp 840w, https://cdn.mos.cms.futurecdn.net/gNvRm4UzZxdodErPrYcQHi-650-80.jpg.webp 650w, https://cdn.mos.cms.futurecdn.net/gNvRm4UzZxdodErPrYcQHi-500-80.jpg.webp 500w, https://cdn.mos.cms.futurecdn.net/gNvRm4UzZxdodErPrYcQHi-450-80.jpg.webp 450w, https://cdn.mos.cms.futurecdn.net/gNvRm4UzZxdodErPrYcQHi-320-80.jpg.webp 320w" sizes="(min-width: 900px) 925px, (min-width: 700px) 450px, calc(100vw - 48px)"></source>
  <img src="https://cdn.mos.cms.futurecdn.net/gNvRm4UzZxdodErPrYcQHi-840-80.jpg" alt="Two robots fighting in a battle arena." srcset="https://cdn.mos.cms.futurecdn.net/gNvRm4UzZxdodErPrYcQHi-840-80.jpg 840w, https://cdn.mos.cms.futurecdn.net/gNvRm4UzZxdodErPrYcQHi-650-80.jpg 650w, https://cdn.mos.cms.futurecdn.net/gNvRm4UzZxdodErPrYcQHi-500-80.jpg 500w, https://cdn.mos.cms.futurecdn.net/gNvRm4UzZxdodErPrYcQHi-450-80.jpg 450w, https://cdn.mos.cms.futurecdn.net/gNvRm4UzZxdodErPrYcQHi-320-80.jpg 320w" sizes="(min-width: 900px) 925px, (min-width: 700px) 450px, calc(100vw - 48px)" loading="lazy" data-original-mos="https://cdn.mos.cms.futurecdn.net/gNvRm4UzZxdodErPrYcQHi.jpg" data-pin-media="https://cdn.mos.cms.futurecdn.net/gNvRm4UzZxdodErPrYcQHi.jpg">
  </picture>
  </div>
  <span class="text-base text-black font-bold mx-0 my-2.5 p-0">A renewed obsession for British TV show Robot Wars led me on a wild goose chase to find a good robot fighting game</span>
  </a>
  <div class="relative recirc-feed sponsored-card" data-recirc-id="article-river-stacked-ads:native-cards">
  <div class="sponsored-post"></div>
  <script type="text/html" class="sponsored-post-template" style="display:none!important;">
  <a style="position: relative!important;" href="SPONSORED_LINK_URL">
  <picture>
  <source srcset="SPONSORED_IMAGE_URL.webp" type="image/webp" />
  <img src="SPONSORED_IMAGE_URL" alt="SPONSORED_HEADLINE" loading="lazy"/>
  </picture>
  <span class="text-base text-black font-bold mx-0 my-2.5 p-0">SPONSORED_HEADLINE</span>
  </a>
  </script>
  </div>
  <a href="https://www.pcgamer.com/games/baldurs-gate/2024-was-still-the-year-of-baldurs-gate-3-why-were-all-still-playing-larians-once-in-a-decade-rpg-16-months-later/" data-analytics-id="more-about-latest-article" data-before-rewrite-localise="https://www.pcgamer.com/games/baldurs-gate/2024-was-still-the-year-of-baldurs-gate-3-why-were-all-still-playing-larians-once-in-a-decade-rpg-16-months-later/">
  <div class="pt-[56.25%] relative [&amp;_img]:absolute [&amp;_img]:top-0 [&amp;_img]:object-cover [&amp;_img]:w-full [&amp;_img]:h-full">
  <picture data-new-v2-image="true">
  <source type="image/webp" srcset="https://cdn.mos.cms.futurecdn.net/toMQV9ccBYTxwycAVpcr2Y-840-80.jpg.webp 840w, https://cdn.mos.cms.futurecdn.net/toMQV9ccBYTxwycAVpcr2Y-650-80.jpg.webp 650w, https://cdn.mos.cms.futurecdn.net/toMQV9ccBYTxwycAVpcr2Y-500-80.jpg.webp 500w, https://cdn.mos.cms.futurecdn.net/toMQV9ccBYTxwycAVpcr2Y-450-80.jpg.webp 450w, https://cdn.mos.cms.futurecdn.net/toMQV9ccBYTxwycAVpcr2Y-320-80.jpg.webp 320w" sizes="(min-width: 900px) 925px, (min-width: 700px) 450px, calc(100vw - 48px)"></source>
  <img src="https://cdn.mos.cms.futurecdn.net/toMQV9ccBYTxwycAVpcr2Y-840-80.jpg" alt="Baldur&amp;#039;s Gate 3" srcset="https://cdn.mos.cms.futurecdn.net/toMQV9ccBYTxwycAVpcr2Y-840-80.jpg 840w, https://cdn.mos.cms.futurecdn.net/toMQV9ccBYTxwycAVpcr2Y-650-80.jpg 650w, https://cdn.mos.cms.futurecdn.net/toMQV9ccBYTxwycAVpcr2Y-500-80.jpg 500w, https://cdn.mos.cms.futurecdn.net/toMQV9ccBYTxwycAVpcr2Y-450-80.jpg 450w, https://cdn.mos.cms.futurecdn.net/toMQV9ccBYTxwycAVpcr2Y-320-80.jpg 320w" sizes="(min-width: 900px) 925px, (min-width: 700px) 450px, calc(100vw - 48px)" loading="lazy" data-original-mos="https://cdn.mos.cms.futurecdn.net/toMQV9ccBYTxwycAVpcr2Y.jpg" data-pin-media="https://cdn.mos.cms.futurecdn.net/toMQV9ccBYTxwycAVpcr2Y.jpg">
  </picture>
  </div>
  <span class="text-base text-black font-bold mx-0 my-2.5 p-0">2024 was still the year of Baldur's Gate 3: Why we're all still playing Larian's once-in-a-decade RPG 16 months later</span>
  </a>
  <div class="relative recirc-feed sponsored-card" data-recirc-id="article-river-stacked-ads:native-cards">
  <div class="sponsored-post"></div>
  </div>
  <a href="https://www.pcgamer.com/games/strategy/brutal-survival-rts-age-of-darkness-kept-me-up-until-4-am-this-morning-as-i-tried-to-perfect-the-formula-to-halt-the-end-of-the-world/" data-analytics-id="more-about-latest-article" data-before-rewrite-localise="https://www.pcgamer.com/games/strategy/brutal-survival-rts-age-of-darkness-kept-me-up-until-4-am-this-morning-as-i-tried-to-perfect-the-formula-to-halt-the-end-of-the-world/">
  <div class="pt-[56.25%] relative [&amp;_img]:absolute [&amp;_img]:top-0 [&amp;_img]:object-cover [&amp;_img]:w-full [&amp;_img]:h-full">
  <picture data-new-v2-image="true">
  <source type="image/webp" srcset="https://cdn.mos.cms.futurecdn.net/73YNUyTJtrvkQCXtu35TpG-840-80.jpg.webp 840w, https://cdn.mos.cms.futurecdn.net/73YNUyTJtrvkQCXtu35TpG-650-80.jpg.webp 650w, https://cdn.mos.cms.futurecdn.net/73YNUyTJtrvkQCXtu35TpG-500-80.jpg.webp 500w, https://cdn.mos.cms.futurecdn.net/73YNUyTJtrvkQCXtu35TpG-450-80.jpg.webp 450w, https://cdn.mos.cms.futurecdn.net/73YNUyTJtrvkQCXtu35TpG-320-80.jpg.webp 320w" sizes="(min-width: 900px) 925px, (min-width: 700px) 450px, calc(100vw - 48px)"></source>
  <img src="https://cdn.mos.cms.futurecdn.net/73YNUyTJtrvkQCXtu35TpG-840-80.jpg" alt="Age of Darkness: Final Stand" srcset="https://cdn.mos.cms.futurecdn.net/73YNUyTJtrvkQCXtu35TpG-840-80.jpg 840w, https://cdn.mos.cms.futurecdn.net/73YNUyTJtrvkQCXtu35TpG-650-80.jpg 650w, https://cdn.mos.cms.futurecdn.net/73YNUyTJtrvkQCXtu35TpG-500-80.jpg 500w, https://cdn.mos.cms.futurecdn.net/73YNUyTJtrvkQCXtu35TpG-450-80.jpg 450w, https://cdn.mos.cms.futurecdn.net/73YNUyTJtrvkQCXtu35TpG-320-80.jpg 320w" sizes="(min-width: 900px) 925px, (min-width: 700px) 450px, calc(100vw - 48px)" loading="lazy" data-original-mos="https://cdn.mos.cms.futurecdn.net/73YNUyTJtrvkQCXtu35TpG.jpg" data-pin-media="https://cdn.mos.cms.futurecdn.net/73YNUyTJtrvkQCXtu35TpG.jpg">
  </picture>
  </div>
  <span class="text-base text-black font-bold mx-0 my-2.5 p-0">Brutal survival RTS Age of Darkness kept me up until 4 am this morning as I tried to perfect the formula to halt the end of the world </span>
  </a>
  <div class="relative recirc-feed sponsored-card" data-recirc-id="article-river-stacked-ads:native-cards">
  <div class="sponsored-post"></div>
  <script type="text/html" class="sponsored-post-template" style="display:none!important;">
  <a style="position: relative!important;" href="SPONSORED_LINK_URL">
  <picture>
  <source srcset="SPONSORED_IMAGE_URL.webp" type="image/webp" />
  <img src="SPONSORED_IMAGE_URL" alt="SPONSORED_HEADLINE" loading="lazy"/>
  </picture>
  <span class="text-base text-black font-bold mx-0 my-2.5 p-0">SPONSORED_HEADLINE</span>
  </a>
  </script>
  </div>
  <a href="https://www.pcgamer.com/games/most-of-my-favourite-games-of-2024-didnt-come-out-in-2024/" data-analytics-id="more-about-latest-article" data-before-rewrite-localise="https://www.pcgamer.com/games/most-of-my-favourite-games-of-2024-didnt-come-out-in-2024/">
  <div class="pt-[56.25%] relative [&amp;_img]:absolute [&amp;_img]:top-0 [&amp;_img]:object-cover [&amp;_img]:w-full [&amp;_img]:h-full">
  <picture data-new-v2-image="true">
  <source type="image/webp" srcset="https://cdn.mos.cms.futurecdn.net/cesdNy6YFF2oCVCD2J7Cdj-840-80.jpg.webp 840w, https://cdn.mos.cms.futurecdn.net/cesdNy6YFF2oCVCD2J7Cdj-650-80.jpg.webp 650w, https://cdn.mos.cms.futurecdn.net/cesdNy6YFF2oCVCD2J7Cdj-500-80.jpg.webp 500w, https://cdn.mos.cms.futurecdn.net/cesdNy6YFF2oCVCD2J7Cdj-450-80.jpg.webp 450w, https://cdn.mos.cms.futurecdn.net/cesdNy6YFF2oCVCD2J7Cdj-320-80.jpg.webp 320w" sizes="(min-width: 900px) 925px, (min-width: 700px) 450px, calc(100vw - 48px)"></source>
  <img src="https://cdn.mos.cms.futurecdn.net/cesdNy6YFF2oCVCD2J7Cdj-840-80.jpg" alt="Disco Elysium hero smiling at the viewer and giving a double thumbs up gesture" srcset="https://cdn.mos.cms.futurecdn.net/cesdNy6YFF2oCVCD2J7Cdj-840-80.jpg 840w, https://cdn.mos.cms.futurecdn.net/cesdNy6YFF2oCVCD2J7Cdj-650-80.jpg 650w, https://cdn.mos.cms.futurecdn.net/cesdNy6YFF2oCVCD2J7Cdj-500-80.jpg 500w, https://cdn.mos.cms.futurecdn.net/cesdNy6YFF2oCVCD2J7Cdj-450-80.jpg 450w, https://cdn.mos.cms.futurecdn.net/cesdNy6YFF2oCVCD2J7Cdj-320-80.jpg 320w" sizes="(min-width: 900px) 925px, (min-width: 700px) 450px, calc(100vw - 48px)" loading="lazy" data-original-mos="https://cdn.mos.cms.futurecdn.net/cesdNy6YFF2oCVCD2J7Cdj.jpg" data-pin-media="https://cdn.mos.cms.futurecdn.net/cesdNy6YFF2oCVCD2J7Cdj.jpg">
  </picture>
  </div>
  <span class="text-base text-black font-bold mx-0 my-2.5 p-0">Most of my favourite games of 2024 didn't come out in 2024</span>
  </a>
  <div class="relative recirc-feed sponsored-card" data-recirc-id="article-river-stacked-ads:native-cards">
  <div class="sponsored-post"></div>
  <script type="text/html" class="sponsored-post-template" style="display:none!important;">
  <a style="position: relative!important;" href="SPONSORED_LINK_URL">
  <picture>
  <source srcset="SPONSORED_IMAGE_URL.webp" type="image/webp" />
  <img src="SPONSORED_IMAGE_URL" alt="SPONSORED_HEADLINE" loading="lazy"/>
  </picture>
  <span class="text-base text-black font-bold mx-0 my-2.5 p-0">SPONSORED_HEADLINE</span>
  </a>
  </script>
  </div>
  <a href="https://www.pcgamer.com/games/action/helldivers-2s-illuminate-invasion-is-the-cherry-on-top-of-one-of-the-best-first-years-a-live-service-game-has-ever-had/" data-analytics-id="more-about-latest-article" data-before-rewrite-localise="https://www.pcgamer.com/games/action/helldivers-2s-illuminate-invasion-is-the-cherry-on-top-of-one-of-the-best-first-years-a-live-service-game-has-ever-had/">
  <div class="pt-[56.25%] relative [&amp;_img]:absolute [&amp;_img]:top-0 [&amp;_img]:object-cover [&amp;_img]:w-full [&amp;_img]:h-full">
  <picture data-new-v2-image="true">
  <source type="image/webp" srcset="https://cdn.mos.cms.futurecdn.net/5dcsnBFwEvCXCwwM8T9Vq7-840-80.png.webp 840w, https://cdn.mos.cms.futurecdn.net/5dcsnBFwEvCXCwwM8T9Vq7-650-80.png.webp 650w, https://cdn.mos.cms.futurecdn.net/5dcsnBFwEvCXCwwM8T9Vq7-500-80.png.webp 500w, https://cdn.mos.cms.futurecdn.net/5dcsnBFwEvCXCwwM8T9Vq7-450-80.png.webp 450w, https://cdn.mos.cms.futurecdn.net/5dcsnBFwEvCXCwwM8T9Vq7-320-80.png.webp 320w" sizes="(min-width: 900px) 925px, (min-width: 700px) 450px, calc(100vw - 48px)"></source>
  <img src="https://cdn.mos.cms.futurecdn.net/5dcsnBFwEvCXCwwM8T9Vq7-840-80.png" alt="A helldiver, obscured by a halo of white light, stands victorious against a Super Earth flag in Helldivers 2." srcset="https://cdn.mos.cms.futurecdn.net/5dcsnBFwEvCXCwwM8T9Vq7-840-80.png 840w, https://cdn.mos.cms.futurecdn.net/5dcsnBFwEvCXCwwM8T9Vq7-650-80.png 650w, https://cdn.mos.cms.futurecdn.net/5dcsnBFwEvCXCwwM8T9Vq7-500-80.png 500w, https://cdn.mos.cms.futurecdn.net/5dcsnBFwEvCXCwwM8T9Vq7-450-80.png 450w, https://cdn.mos.cms.futurecdn.net/5dcsnBFwEvCXCwwM8T9Vq7-320-80.png 320w" sizes="(min-width: 900px) 925px, (min-width: 700px) 450px, calc(100vw - 48px)" loading="lazy" data-original-mos="https://cdn.mos.cms.futurecdn.net/5dcsnBFwEvCXCwwM8T9Vq7.png" data-pin-media="https://cdn.mos.cms.futurecdn.net/5dcsnBFwEvCXCwwM8T9Vq7.png">
  </picture>
  </div>
  <span class="text-base text-black font-bold mx-0 my-2.5 p-0">Helldivers 2's Illuminate invasion is the cherry on top of one of the best first years a live service game has ever had</span>
  </a>
  <div class="relative recirc-feed sponsored-card" data-recirc-id="article-river-stacked-ads:native-cards">
  <div class="sponsored-post"></div>
  <script type="text/html" class="sponsored-post-template" style="display:none!important;">
  <a style="position: relative!important;" href="SPONSORED_LINK_URL">
  <picture>
  <source srcset="SPONSORED_IMAGE_URL.webp" type="image/webp" />
  <img src="SPONSORED_IMAGE_URL" alt="SPONSORED_HEADLINE" loading="lazy"/>
  </picture>
  <span class="text-base text-black font-bold mx-0 my-2.5 p-0">SPONSORED_HEADLINE</span>
  </a>
  </script>
  </div>
  </div>
  </div>
  </div>
  <div class="w-full">
  <div data-recirc-id="article-river-stacked-solr:latest-category">
  <div class="text-white py-4 px-3 mb-4 bg-[#333] uppercase font-bold">Latest in Strategy</div>
  <div class="grid grid-cols-1 gap-4 my-4">
  <a href="https://www.pcgamer.com/games/strategy/firaxis-says-its-entering-our-sukritact-age-as-it-hires-popular-modder-to-work-on-civilization-7/" data-analytics-id="more-about-latest-article" data-before-rewrite-localise="https://www.pcgamer.com/games/strategy/firaxis-says-its-entering-our-sukritact-age-as-it-hires-popular-modder-to-work-on-civilization-7/">
  <div class="pt-[56.25%] relative [&amp;_img]:absolute [&amp;_img]:top-0 [&amp;_img]:object-cover [&amp;_img]:w-full [&amp;_img]:h-full">
  <picture data-new-v2-image="true">
  <source type="image/webp" srcset="https://cdn.mos.cms.futurecdn.net/Y4dm5xEQLebAigY7gqUaQA-840-80.jpg.webp 840w, https://cdn.mos.cms.futurecdn.net/Y4dm5xEQLebAigY7gqUaQA-650-80.jpg.webp 650w, https://cdn.mos.cms.futurecdn.net/Y4dm5xEQLebAigY7gqUaQA-500-80.jpg.webp 500w, https://cdn.mos.cms.futurecdn.net/Y4dm5xEQLebAigY7gqUaQA-450-80.jpg.webp 450w, https://cdn.mos.cms.futurecdn.net/Y4dm5xEQLebAigY7gqUaQA-320-80.jpg.webp 320w" sizes="(min-width: 900px) 925px, (min-width: 700px) 450px, calc(100vw - 48px)"></source>
  <img src="https://cdn.mos.cms.futurecdn.net/Y4dm5xEQLebAigY7gqUaQA-840-80.jpg" alt="Civilization 7 victory guide" srcset="https://cdn.mos.cms.futurecdn.net/Y4dm5xEQLebAigY7gqUaQA-840-80.jpg 840w, https://cdn.mos.cms.futurecdn.net/Y4dm5xEQLebAigY7gqUaQA-650-80.jpg 650w, https://cdn.mos.cms.futurecdn.net/Y4dm5xEQLebAigY7gqUaQA-500-80.jpg 500w, https://cdn.mos.cms.futurecdn.net/Y4dm5xEQLebAigY7gqUaQA-450-80.jpg 450w, https://cdn.mos.cms.futurecdn.net/Y4dm5xEQLebAigY7gqUaQA-320-80.jpg 320w" sizes="(min-width: 900px) 925px, (min-width: 700px) 450px, calc(100vw - 48px)" loading="lazy" data-original-mos="https://cdn.mos.cms.futurecdn.net/Y4dm5xEQLebAigY7gqUaQA.jpg" data-pin-media="https://cdn.mos.cms.futurecdn.net/Y4dm5xEQLebAigY7gqUaQA.jpg">
  </picture>
  </div>
  <span class="text-base text-black font-bold mx-0 my-2.5 p-0">Firaxis says it's 'entering our Sukritact Age' as it hires popular modder to work on Civilization 7</span>
  </a>
  <div class="relative recirc-feed sponsored-card" data-recirc-id="article-river-stacked-ads:native-cards">
  <div class="sponsored-post"></div>
  <script type="text/html" class="sponsored-post-template" style="display:none!important;">
  <a style="position: relative!important;" href="SPONSORED_LINK_URL">
  <picture>
  <source srcset="SPONSORED_IMAGE_URL.webp" type="image/webp" />
  <img src="SPONSORED_IMAGE_URL" alt="SPONSORED_HEADLINE" loading="lazy"/>
  </picture>
  <span class="text-base text-black font-bold mx-0 my-2.5 p-0">SPONSORED_HEADLINE</span>
  </a>
  </script>
  </div>
  <a href="https://www.pcgamer.com/games/strategy/civilization-7s-first-major-update-tweaks-balance-and-fixes-some-ui-issues-but-dont-expect-an-overhaul/" data-analytics-id="more-about-latest-article" data-before-rewrite-localise="https://www.pcgamer.com/games/strategy/civilization-7s-first-major-update-tweaks-balance-and-fixes-some-ui-issues-but-dont-expect-an-overhaul/">
  <div class="pt-[56.25%] relative [&amp;_img]:absolute [&amp;_img]:top-0 [&amp;_img]:object-cover [&amp;_img]:w-full [&amp;_img]:h-full">
  <picture data-new-v2-image="true">
  <source type="image/webp" srcset="https://cdn.mos.cms.futurecdn.net/Fyi6wHaYKN2XyfDaucMrSU-840-80.jpg.webp 840w, https://cdn.mos.cms.futurecdn.net/Fyi6wHaYKN2XyfDaucMrSU-650-80.jpg.webp 650w, https://cdn.mos.cms.futurecdn.net/Fyi6wHaYKN2XyfDaucMrSU-500-80.jpg.webp 500w, https://cdn.mos.cms.futurecdn.net/Fyi6wHaYKN2XyfDaucMrSU-450-80.jpg.webp 450w, https://cdn.mos.cms.futurecdn.net/Fyi6wHaYKN2XyfDaucMrSU-320-80.jpg.webp 320w" sizes="(min-width: 900px) 925px, (min-width: 700px) 450px, calc(100vw - 48px)"></source>
  <img src="https://cdn.mos.cms.futurecdn.net/Fyi6wHaYKN2XyfDaucMrSU-840-80.jpg" alt="Image of Tecumseh in Civilization 7" srcset="https://cdn.mos.cms.futurecdn.net/Fyi6wHaYKN2XyfDaucMrSU-840-80.jpg 840w, https://cdn.mos.cms.futurecdn.net/Fyi6wHaYKN2XyfDaucMrSU-650-80.jpg 650w, https://cdn.mos.cms.futurecdn.net/Fyi6wHaYKN2XyfDaucMrSU-500-80.jpg 500w, https://cdn.mos.cms.futurecdn.net/Fyi6wHaYKN2XyfDaucMrSU-450-80.jpg 450w, https://cdn.mos.cms.futurecdn.net/Fyi6wHaYKN2XyfDaucMrSU-320-80.jpg 320w" sizes="(min-width: 900px) 925px, (min-width: 700px) 450px, calc(100vw - 48px)" loading="lazy" data-original-mos="https://cdn.mos.cms.futurecdn.net/Fyi6wHaYKN2XyfDaucMrSU.jpg" data-pin-media="https://cdn.mos.cms.futurecdn.net/Fyi6wHaYKN2XyfDaucMrSU.jpg">
  </picture>
  </div>
  <span class="text-base text-black font-bold mx-0 my-2.5 p-0">Civilization 7's 'first major update' tweaks balance and fixes some UI issues, but don't expect an overhaul</span>
  </a>
  <div class="relative recirc-feed sponsored-card" data-recirc-id="article-river-stacked-ads:native-cards">
  <div class="sponsored-post"></div>
  <script type="text/html" class="sponsored-post-template" style="display:none!important;">
  <a style="position: relative!important;" href="SPONSORED_LINK_URL">
  <picture>
  <source srcset="SPONSORED_IMAGE_URL.webp" type="image/webp" />
  <img src="SPONSORED_IMAGE_URL" alt="SPONSORED_HEADLINE" loading="lazy"/>
  </picture>
  <span class="text-base text-black font-bold mx-0 my-2.5 p-0">SPONSORED_HEADLINE</span>
  </a>
  </script>
  </div>
  <a href="https://www.pcgamer.com/games/strategy/civilization-7-guide-to-unexplained-systems-faq/" data-analytics-id="more-about-latest-article" data-before-rewrite-localise="https://www.pcgamer.com/games/strategy/civilization-7-guide-to-unexplained-systems-faq/">
  <div class="pt-[56.25%] relative [&amp;_img]:absolute [&amp;_img]:top-0 [&amp;_img]:object-cover [&amp;_img]:w-full [&amp;_img]:h-full">
  <picture data-new-v2-image="true">
  <source type="image/webp" srcset="https://cdn.mos.cms.futurecdn.net/nVBVYxC85294seQiwMyvPP-840-80.jpg.webp 840w, https://cdn.mos.cms.futurecdn.net/nVBVYxC85294seQiwMyvPP-650-80.jpg.webp 650w, https://cdn.mos.cms.futurecdn.net/nVBVYxC85294seQiwMyvPP-500-80.jpg.webp 500w, https://cdn.mos.cms.futurecdn.net/nVBVYxC85294seQiwMyvPP-450-80.jpg.webp 450w, https://cdn.mos.cms.futurecdn.net/nVBVYxC85294seQiwMyvPP-320-80.jpg.webp 320w" sizes="(min-width: 900px) 925px, (min-width: 700px) 450px, calc(100vw - 48px)"></source>
  <img src="https://cdn.mos.cms.futurecdn.net/nVBVYxC85294seQiwMyvPP-840-80.jpg" alt="Civilization 7 leader " srcset="https://cdn.mos.cms.futurecdn.net/nVBVYxC85294seQiwMyvPP-840-80.jpg 840w, https://cdn.mos.cms.futurecdn.net/nVBVYxC85294seQiwMyvPP-650-80.jpg 650w, https://cdn.mos.cms.futurecdn.net/nVBVYxC85294seQiwMyvPP-500-80.jpg 500w, https://cdn.mos.cms.futurecdn.net/nVBVYxC85294seQiwMyvPP-450-80.jpg 450w, https://cdn.mos.cms.futurecdn.net/nVBVYxC85294seQiwMyvPP-320-80.jpg 320w" sizes="(min-width: 900px) 925px, (min-width: 700px) 450px, calc(100vw - 48px)" loading="lazy" data-original-mos="https://cdn.mos.cms.futurecdn.net/nVBVYxC85294seQiwMyvPP.jpg" data-pin-media="https://cdn.mos.cms.futurecdn.net/nVBVYxC85294seQiwMyvPP.jpg">
  </picture>
  </div>
  <span class="text-base text-black font-bold mx-0 my-2.5 p-0">The unofficial Civilization 7 manual: everything Civ 7 doesn't tell you about its rules and systems</span>
  </a>
  <div class="relative recirc-feed sponsored-card" data-recirc-id="article-river-stacked-ads:native-cards">
  <div class="sponsored-post"></div>
  <script type="text/html" class="sponsored-post-template" style="display:none!important;">
  <a style="position: relative!important;" href="SPONSORED_LINK_URL">
  <picture>
  <source srcset="SPONSORED_IMAGE_URL.webp" type="image/webp" />
  <img src="SPONSORED_IMAGE_URL" alt="SPONSORED_HEADLINE" loading="lazy"/>
  </picture>
  <span class="text-base text-black font-bold mx-0 my-2.5 p-0">SPONSORED_HEADLINE</span>
  </a>
  </script>
  </div>
  <a href="https://www.pcgamer.com/games/strategy/civilization-7-what-we-want-expansions/" data-analytics-id="more-about-latest-article" data-before-rewrite-localise="https://www.pcgamer.com/games/strategy/civilization-7-what-we-want-expansions/">
  <div class="pt-[56.25%] relative [&amp;_img]:absolute [&amp;_img]:top-0 [&amp;_img]:object-cover [&amp;_img]:w-full [&amp;_img]:h-full">
  <picture data-new-v2-image="true">
  <source type="image/webp" srcset="https://cdn.mos.cms.futurecdn.net/PveVoTPEUS4f9viFi6vxNP-840-80.jpg.webp 840w, https://cdn.mos.cms.futurecdn.net/PveVoTPEUS4f9viFi6vxNP-650-80.jpg.webp 650w, https://cdn.mos.cms.futurecdn.net/PveVoTPEUS4f9viFi6vxNP-500-80.jpg.webp 500w, https://cdn.mos.cms.futurecdn.net/PveVoTPEUS4f9viFi6vxNP-450-80.jpg.webp 450w, https://cdn.mos.cms.futurecdn.net/PveVoTPEUS4f9viFi6vxNP-320-80.jpg.webp 320w" sizes="(min-width: 900px) 925px, (min-width: 700px) 450px, calc(100vw - 48px)"></source>
  <img src="https://cdn.mos.cms.futurecdn.net/PveVoTPEUS4f9viFi6vxNP-840-80.jpg" alt="Civilization 7 leader " srcset="https://cdn.mos.cms.futurecdn.net/PveVoTPEUS4f9viFi6vxNP-840-80.jpg 840w, https://cdn.mos.cms.futurecdn.net/PveVoTPEUS4f9viFi6vxNP-650-80.jpg 650w, https://cdn.mos.cms.futurecdn.net/PveVoTPEUS4f9viFi6vxNP-500-80.jpg 500w, https://cdn.mos.cms.futurecdn.net/PveVoTPEUS4f9viFi6vxNP-450-80.jpg 450w, https://cdn.mos.cms.futurecdn.net/PveVoTPEUS4f9viFi6vxNP-320-80.jpg 320w" sizes="(min-width: 900px) 925px, (min-width: 700px) 450px, calc(100vw - 48px)" loading="lazy" data-original-mos="https://cdn.mos.cms.futurecdn.net/PveVoTPEUS4f9viFi6vxNP.jpg" data-pin-media="https://cdn.mos.cms.futurecdn.net/PveVoTPEUS4f9viFi6vxNP.jpg">
  </picture>
  </div>
  <span class="text-base text-black font-bold mx-0 my-2.5 p-0">Civilization 7 needs some big expansions to feel complete, and I'd start with one that adds the years after 1950</span>
  </a>
  <div class="relative recirc-feed sponsored-card" data-recirc-id="article-river-stacked-ads:native-cards">
  <div class="sponsored-post"></div>
  <script type="text/html" class="sponsored-post-template" style="display:none!important;">
  <a style="position: relative!important;" href="SPONSORED_LINK_URL">
  <picture>
  <source srcset="SPONSORED_IMAGE_URL.webp" type="image/webp" />
  <img src="SPONSORED_IMAGE_URL" alt="SPONSORED_HEADLINE" loading="lazy"/>
  </picture>
  <span class="text-base text-black font-bold mx-0 my-2.5 p-0">SPONSORED_HEADLINE</span>
  </a>
  </script>
  </div>
  <a href="https://www.pcgamer.com/games/strategy/i-did-not-expect-the-most-promising-turn-based-tactics-game-of-steam-next-fest-to-star-the-teenage-mutant-ninja-turtles-but-here-we-are/" data-analytics-id="more-about-latest-article" data-before-rewrite-localise="https://www.pcgamer.com/games/strategy/i-did-not-expect-the-most-promising-turn-based-tactics-game-of-steam-next-fest-to-star-the-teenage-mutant-ninja-turtles-but-here-we-are/">
  <div class="pt-[56.25%] relative [&amp;_img]:absolute [&amp;_img]:top-0 [&amp;_img]:object-cover [&amp;_img]:w-full [&amp;_img]:h-full">
  <picture data-new-v2-image="true">
  <source type="image/webp" srcset="https://cdn.mos.cms.futurecdn.net/YM3RqtWGLzSRbbQjWavrDc-840-80.png.webp 840w, https://cdn.mos.cms.futurecdn.net/YM3RqtWGLzSRbbQjWavrDc-650-80.png.webp 650w, https://cdn.mos.cms.futurecdn.net/YM3RqtWGLzSRbbQjWavrDc-500-80.png.webp 500w, https://cdn.mos.cms.futurecdn.net/YM3RqtWGLzSRbbQjWavrDc-450-80.png.webp 450w, https://cdn.mos.cms.futurecdn.net/YM3RqtWGLzSRbbQjWavrDc-320-80.png.webp 320w" sizes="(min-width: 900px) 925px, (min-width: 700px) 450px, calc(100vw - 48px)"></source>
  <img src="https://cdn.mos.cms.futurecdn.net/YM3RqtWGLzSRbbQjWavrDc-840-80.png" alt="The four Teenage Mutant Ninja Turtles posing while Karai looks down at them in Teenage Mutant Ninja Turtles: Tactical Takedown." srcset="https://cdn.mos.cms.futurecdn.net/YM3RqtWGLzSRbbQjWavrDc-840-80.png 840w, https://cdn.mos.cms.futurecdn.net/YM3RqtWGLzSRbbQjWavrDc-650-80.png 650w, https://cdn.mos.cms.futurecdn.net/YM3RqtWGLzSRbbQjWavrDc-500-80.png 500w, https://cdn.mos.cms.futurecdn.net/YM3RqtWGLzSRbbQjWavrDc-450-80.png 450w, https://cdn.mos.cms.futurecdn.net/YM3RqtWGLzSRbbQjWavrDc-320-80.png 320w" sizes="(min-width: 900px) 925px, (min-width: 700px) 450px, calc(100vw - 48px)" loading="lazy" data-original-mos="https://cdn.mos.cms.futurecdn.net/YM3RqtWGLzSRbbQjWavrDc.png" data-pin-media="https://cdn.mos.cms.futurecdn.net/YM3RqtWGLzSRbbQjWavrDc.png">
  </picture>
  </div>
  <span class="text-base text-black font-bold mx-0 my-2.5 p-0">I did not expect the most promising turn-based tactics game of Steam Next Fest to star the Teenage Mutant Ninja Turtles, but here we are</span>
  </a>
  <div class="relative recirc-feed sponsored-card" data-recirc-id="article-river-stacked-ads:native-cards">
  <div class="sponsored-post"></div>
  <script type="text/html" class="sponsored-post-template" style="display:none!important;">
  <a style="position: relative!important;" href="SPONSORED_LINK_URL">
  <picture>
  <source srcset="SPONSORED_IMAGE_URL.webp" type="image/webp" />
  <img src="SPONSORED_IMAGE_URL" alt="SPONSORED_HEADLINE" loading="lazy"/>
  </picture>
  <span class="text-base text-black font-bold mx-0 my-2.5 p-0">SPONSORED_HEADLINE</span>
  </a>
  </script>
  </div>
  <a href="https://www.pcgamer.com/games/strategy/total-war-warhammer-3s-next-patch-will-overhaul-its-kislev-faction-which-creative-assembly-has-identified-as-the-most-in-need-of-a-deep-review-and-rethink/" data-analytics-id="more-about-latest-article" data-before-rewrite-localise="https://www.pcgamer.com/games/strategy/total-war-warhammer-3s-next-patch-will-overhaul-its-kislev-faction-which-creative-assembly-has-identified-as-the-most-in-need-of-a-deep-review-and-rethink/">
  <div class="pt-[56.25%] relative [&amp;_img]:absolute [&amp;_img]:top-0 [&amp;_img]:object-cover [&amp;_img]:w-full [&amp;_img]:h-full">
  <picture data-new-v2-image="true">
  <source type="image/webp" srcset="https://cdn.mos.cms.futurecdn.net/dvbkTpXY2pNp3J9TxNJcZh-840-80.jpg.webp 840w, https://cdn.mos.cms.futurecdn.net/dvbkTpXY2pNp3J9TxNJcZh-650-80.jpg.webp 650w, https://cdn.mos.cms.futurecdn.net/dvbkTpXY2pNp3J9TxNJcZh-500-80.jpg.webp 500w, https://cdn.mos.cms.futurecdn.net/dvbkTpXY2pNp3J9TxNJcZh-450-80.jpg.webp 450w, https://cdn.mos.cms.futurecdn.net/dvbkTpXY2pNp3J9TxNJcZh-320-80.jpg.webp 320w" sizes="(min-width: 900px) 925px, (min-width: 700px) 450px, calc(100vw - 48px)"></source>
  <img src="https://cdn.mos.cms.futurecdn.net/dvbkTpXY2pNp3J9TxNJcZh-840-80.jpg" alt="Kislev" srcset="https://cdn.mos.cms.futurecdn.net/dvbkTpXY2pNp3J9TxNJcZh-840-80.jpg 840w, https://cdn.mos.cms.futurecdn.net/dvbkTpXY2pNp3J9TxNJcZh-650-80.jpg 650w, https://cdn.mos.cms.futurecdn.net/dvbkTpXY2pNp3J9TxNJcZh-500-80.jpg 500w, https://cdn.mos.cms.futurecdn.net/dvbkTpXY2pNp3J9TxNJcZh-450-80.jpg 450w, https://cdn.mos.cms.futurecdn.net/dvbkTpXY2pNp3J9TxNJcZh-320-80.jpg 320w" sizes="(min-width: 900px) 925px, (min-width: 700px) 450px, calc(100vw - 48px)" loading="lazy" data-original-mos="https://cdn.mos.cms.futurecdn.net/dvbkTpXY2pNp3J9TxNJcZh.jpg" data-pin-media="https://cdn.mos.cms.futurecdn.net/dvbkTpXY2pNp3J9TxNJcZh.jpg">
  </picture>
  </div>
  <span class="text-base text-black font-bold mx-0 my-2.5 p-0">Total War: Warhammer 3's next patch will overhaul its Kislev faction, which Creative Assembly has 'identified as the most in need of a deep review and rethink'</span>
  </a>
  <div class="relative recirc-feed sponsored-card" data-recirc-id="article-river-stacked-ads:native-cards">
  <div class="sponsored-post"></div>
  <script type="text/html" class="sponsored-post-template" style="display:none!important;">
  <a style="position: relative!important;" href="SPONSORED_LINK_URL">
  <picture>
  <source srcset="SPONSORED_IMAGE_URL.webp" type="image/webp" />
  <img src="SPONSORED_IMAGE_URL" alt="SPONSORED_HEADLINE" loading="lazy"/>
  </picture>
  <span class="text-base text-black font-bold mx-0 my-2.5 p-0">SPONSORED_HEADLINE</span>
  </a>
  </script>
  </div>
  </div>
  </div>
  </div>
  <div class="w-full">
  <div data-recirc-id="article-river-stacked-solr:latest-articletype">
  <div class="text-white py-4 px-3 mb-4 bg-[#333] uppercase font-bold">Latest in Features</div>
  <div class="grid grid-cols-1 gap-4 my-4">
  <a href="https://www.pcgamer.com/games/horror/r-e-p-o-is-my-new-favourite-co-op-horror-game-which-combines-lethal-companys-looting-loop-with-content-warnings-zany-monsters/" data-analytics-id="more-about-latest-article" data-before-rewrite-localise="https://www.pcgamer.com/games/horror/r-e-p-o-is-my-new-favourite-co-op-horror-game-which-combines-lethal-companys-looting-loop-with-content-warnings-zany-monsters/">
  <div class="pt-[56.25%] relative [&amp;_img]:absolute [&amp;_img]:top-0 [&amp;_img]:object-cover [&amp;_img]:w-full [&amp;_img]:h-full">
  <picture data-new-v2-image="true">
  <source type="image/webp" srcset="https://cdn.mos.cms.futurecdn.net/7rGzXkGFideKrahTG5UPif-840-80.jpg.webp 840w, https://cdn.mos.cms.futurecdn.net/7rGzXkGFideKrahTG5UPif-650-80.jpg.webp 650w, https://cdn.mos.cms.futurecdn.net/7rGzXkGFideKrahTG5UPif-500-80.jpg.webp 500w, https://cdn.mos.cms.futurecdn.net/7rGzXkGFideKrahTG5UPif-450-80.jpg.webp 450w, https://cdn.mos.cms.futurecdn.net/7rGzXkGFideKrahTG5UPif-320-80.jpg.webp 320w" sizes="(min-width: 900px) 925px, (min-width: 700px) 450px, calc(100vw - 48px)"></source>
  <img src="https://cdn.mos.cms.futurecdn.net/7rGzXkGFideKrahTG5UPif-840-80.jpg" alt="R.E.P.O. screenshots" srcset="https://cdn.mos.cms.futurecdn.net/7rGzXkGFideKrahTG5UPif-840-80.jpg 840w, https://cdn.mos.cms.futurecdn.net/7rGzXkGFideKrahTG5UPif-650-80.jpg 650w, https://cdn.mos.cms.futurecdn.net/7rGzXkGFideKrahTG5UPif-500-80.jpg 500w, https://cdn.mos.cms.futurecdn.net/7rGzXkGFideKrahTG5UPif-450-80.jpg 450w, https://cdn.mos.cms.futurecdn.net/7rGzXkGFideKrahTG5UPif-320-80.jpg 320w" sizes="(min-width: 900px) 925px, (min-width: 700px) 450px, calc(100vw - 48px)" loading="lazy" data-original-mos="https://cdn.mos.cms.futurecdn.net/7rGzXkGFideKrahTG5UPif.jpg" data-pin-media="https://cdn.mos.cms.futurecdn.net/7rGzXkGFideKrahTG5UPif.jpg">
  </picture>
  </div>
  <span class="text-base text-black font-bold mx-0 my-2.5 p-0">REPO is my new favourite co-op horror game, which combines Lethal Company's looting loop with Content Warning's zany monsters</span>
  </a>
  <div class="relative recirc-feed sponsored-card" data-recirc-id="article-river-stacked-ads:native-cards">
  <div class="sponsored-post"></div>
  <script type="text/html" class="sponsored-post-template" style="display:none!important;">
  <a style="position: relative!important;" href="SPONSORED_LINK_URL">
  <picture>
  <source srcset="SPONSORED_IMAGE_URL.webp" type="image/webp" />
  <img src="SPONSORED_IMAGE_URL" alt="SPONSORED_HEADLINE" loading="lazy"/>
  </picture>
  <span class="text-base text-black font-bold mx-0 my-2.5 p-0">SPONSORED_HEADLINE</span>
  </a>
  </script>
  </div>
  <a href="https://www.pcgamer.com/games/action/capcom-cooked-up-some-extremely-cursed-palico-outfits-in-monster-hunter-wilds/" data-analytics-id="more-about-latest-article" data-before-rewrite-localise="https://www.pcgamer.com/games/action/capcom-cooked-up-some-extremely-cursed-palico-outfits-in-monster-hunter-wilds/">
  <div class="pt-[56.25%] relative [&amp;_img]:absolute [&amp;_img]:top-0 [&amp;_img]:object-cover [&amp;_img]:w-full [&amp;_img]:h-full">
  <picture data-new-v2-image="true">
  <source type="image/webp" srcset="https://cdn.mos.cms.futurecdn.net/nDc9gFQXSBYVL7UAtC3KGT-840-80.jpg.webp 840w, https://cdn.mos.cms.futurecdn.net/nDc9gFQXSBYVL7UAtC3KGT-650-80.jpg.webp 650w, https://cdn.mos.cms.futurecdn.net/nDc9gFQXSBYVL7UAtC3KGT-500-80.jpg.webp 500w, https://cdn.mos.cms.futurecdn.net/nDc9gFQXSBYVL7UAtC3KGT-450-80.jpg.webp 450w, https://cdn.mos.cms.futurecdn.net/nDc9gFQXSBYVL7UAtC3KGT-320-80.jpg.webp 320w" sizes="(min-width: 900px) 925px, (min-width: 700px) 450px, calc(100vw - 48px)"></source>
  <img src="https://cdn.mos.cms.futurecdn.net/nDc9gFQXSBYVL7UAtC3KGT-840-80.jpg" alt="Monster Hunter Wilds weird Palico outfits - Artian" srcset="https://cdn.mos.cms.futurecdn.net/nDc9gFQXSBYVL7UAtC3KGT-840-80.jpg 840w, https://cdn.mos.cms.futurecdn.net/nDc9gFQXSBYVL7UAtC3KGT-650-80.jpg 650w, https://cdn.mos.cms.futurecdn.net/nDc9gFQXSBYVL7UAtC3KGT-500-80.jpg 500w, https://cdn.mos.cms.futurecdn.net/nDc9gFQXSBYVL7UAtC3KGT-450-80.jpg 450w, https://cdn.mos.cms.futurecdn.net/nDc9gFQXSBYVL7UAtC3KGT-320-80.jpg 320w" sizes="(min-width: 900px) 925px, (min-width: 700px) 450px, calc(100vw - 48px)" loading="lazy" data-original-mos="https://cdn.mos.cms.futurecdn.net/nDc9gFQXSBYVL7UAtC3KGT.jpg" data-pin-media="https://cdn.mos.cms.futurecdn.net/nDc9gFQXSBYVL7UAtC3KGT.jpg">
  </picture>
  </div>
  <span class="text-base text-black font-bold mx-0 my-2.5 p-0">Capcom cooked up some extremely cursed Palico outfits in Monster Hunter Wilds</span>
  </a>
  <div class="relative recirc-feed sponsored-card" data-recirc-id="article-river-stacked-ads:native-cards">
  <div class="sponsored-post"></div>
  <script type="text/html" class="sponsored-post-template" style="display:none!important;">
  <a style="position: relative!important;" href="SPONSORED_LINK_URL">
  <picture>
  <source srcset="SPONSORED_IMAGE_URL.webp" type="image/webp" />
  <img src="SPONSORED_IMAGE_URL" alt="SPONSORED_HEADLINE" loading="lazy"/>
  </picture>
  <span class="text-base text-black font-bold mx-0 my-2.5 p-0">SPONSORED_HEADLINE</span>
  </a>
  </script>
  </div>
  <a href="https://www.pcgamer.com/games/grand-theft-auto/grand-theft-auto-5-enhanced-review/" data-analytics-id="more-about-latest-article" data-before-rewrite-localise="https://www.pcgamer.com/games/grand-theft-auto/grand-theft-auto-5-enhanced-review/">
  <div class="pt-[56.25%] relative [&amp;_img]:absolute [&amp;_img]:top-0 [&amp;_img]:object-cover [&amp;_img]:w-full [&amp;_img]:h-full">
  <picture data-new-v2-image="true">
  <source type="image/webp" srcset="https://cdn.mos.cms.futurecdn.net/ArDuGkYyaAf2cFPDteuYQo-840-80.jpg.webp 840w, https://cdn.mos.cms.futurecdn.net/ArDuGkYyaAf2cFPDteuYQo-650-80.jpg.webp 650w, https://cdn.mos.cms.futurecdn.net/ArDuGkYyaAf2cFPDteuYQo-500-80.jpg.webp 500w, https://cdn.mos.cms.futurecdn.net/ArDuGkYyaAf2cFPDteuYQo-450-80.jpg.webp 450w, https://cdn.mos.cms.futurecdn.net/ArDuGkYyaAf2cFPDteuYQo-320-80.jpg.webp 320w" sizes="(min-width: 900px) 925px, (min-width: 700px) 450px, calc(100vw - 48px)"></source>
  <img src="https://cdn.mos.cms.futurecdn.net/ArDuGkYyaAf2cFPDteuYQo-840-80.jpg" alt="GTA 5 Enhanced" srcset="https://cdn.mos.cms.futurecdn.net/ArDuGkYyaAf2cFPDteuYQo-840-80.jpg 840w, https://cdn.mos.cms.futurecdn.net/ArDuGkYyaAf2cFPDteuYQo-650-80.jpg 650w, https://cdn.mos.cms.futurecdn.net/ArDuGkYyaAf2cFPDteuYQo-500-80.jpg 500w, https://cdn.mos.cms.futurecdn.net/ArDuGkYyaAf2cFPDteuYQo-450-80.jpg 450w, https://cdn.mos.cms.futurecdn.net/ArDuGkYyaAf2cFPDteuYQo-320-80.jpg 320w" sizes="(min-width: 900px) 925px, (min-width: 700px) 450px, calc(100vw - 48px)" loading="lazy" data-original-mos="https://cdn.mos.cms.futurecdn.net/ArDuGkYyaAf2cFPDteuYQo.jpg" data-pin-media="https://cdn.mos.cms.futurecdn.net/ArDuGkYyaAf2cFPDteuYQo.jpg">
  </picture>
  </div>
  <span class="text-base text-black font-bold mx-0 my-2.5 p-0">Grand Theft Auto 5 Enhanced is a bitter-sweet return to Rockstar's money-making machine</span>
  </a>
  <div class="relative recirc-feed sponsored-card" data-recirc-id="article-river-stacked-ads:native-cards">
  <div class="sponsored-post"></div>
  <script type="text/html" class="sponsored-post-template" style="display:none!important;">
  <a style="position: relative!important;" href="SPONSORED_LINK_URL">
  <picture>
  <source srcset="SPONSORED_IMAGE_URL.webp" type="image/webp" />
  <img src="SPONSORED_IMAGE_URL" alt="SPONSORED_HEADLINE" loading="lazy"/>
  </picture>
  <span class="text-base text-black font-bold mx-0 my-2.5 p-0">SPONSORED_HEADLINE</span>
  </a>
  </script>
  </div>
  <a href="https://www.pcgamer.com/games/fps/as-a-stalker-sicko-the-2-hours-i-just-spent-with-atomfall-have-made-it-one-of-my-most-anticipated-games-this-year/" data-analytics-id="more-about-latest-article" data-before-rewrite-localise="https://www.pcgamer.com/games/fps/as-a-stalker-sicko-the-2-hours-i-just-spent-with-atomfall-have-made-it-one-of-my-most-anticipated-games-this-year/">
  <div class="pt-[56.25%] relative [&amp;_img]:absolute [&amp;_img]:top-0 [&amp;_img]:object-cover [&amp;_img]:w-full [&amp;_img]:h-full">
  <picture data-new-v2-image="true">
  <source type="image/webp" srcset="https://cdn.mos.cms.futurecdn.net/85QjBM6VGa8peyFrttNrMR-840-80.png.webp 840w, https://cdn.mos.cms.futurecdn.net/85QjBM6VGa8peyFrttNrMR-650-80.png.webp 650w, https://cdn.mos.cms.futurecdn.net/85QjBM6VGa8peyFrttNrMR-500-80.png.webp 500w, https://cdn.mos.cms.futurecdn.net/85QjBM6VGa8peyFrttNrMR-450-80.png.webp 450w, https://cdn.mos.cms.futurecdn.net/85QjBM6VGa8peyFrttNrMR-320-80.png.webp 320w" sizes="(min-width: 900px) 925px, (min-width: 700px) 450px, calc(100vw - 48px)"></source>
  <img src="https://cdn.mos.cms.futurecdn.net/85QjBM6VGa8peyFrttNrMR-840-80.png" alt="An enemy druid dodges a stab from the player." srcset="https://cdn.mos.cms.futurecdn.net/85QjBM6VGa8peyFrttNrMR-840-80.png 840w, https://cdn.mos.cms.futurecdn.net/85QjBM6VGa8peyFrttNrMR-650-80.png 650w, https://cdn.mos.cms.futurecdn.net/85QjBM6VGa8peyFrttNrMR-500-80.png 500w, https://cdn.mos.cms.futurecdn.net/85QjBM6VGa8peyFrttNrMR-450-80.png 450w, https://cdn.mos.cms.futurecdn.net/85QjBM6VGa8peyFrttNrMR-320-80.png 320w" sizes="(min-width: 900px) 925px, (min-width: 700px) 450px, calc(100vw - 48px)" loading="lazy" data-original-mos="https://cdn.mos.cms.futurecdn.net/85QjBM6VGa8peyFrttNrMR.png" data-pin-media="https://cdn.mos.cms.futurecdn.net/85QjBM6VGa8peyFrttNrMR.png">
  </picture>
  </div>
  <span class="text-base text-black font-bold mx-0 my-2.5 p-0">As a Stalker sicko, the 2 hours I just spent with Atomfall have made it one of my most-anticipated games this year</span>
  </a>
  <div class="relative recirc-feed sponsored-card" data-recirc-id="article-river-stacked-ads:native-cards">
  <div class="sponsored-post"></div>
  <script type="text/html" class="sponsored-post-template" style="display:none!important;">
  <a style="position: relative!important;" href="SPONSORED_LINK_URL">
  <picture>
  <source srcset="SPONSORED_IMAGE_URL.webp" type="image/webp" />
  <img src="SPONSORED_IMAGE_URL" alt="SPONSORED_HEADLINE" loading="lazy"/>
  </picture>
  <span class="text-base text-black font-bold mx-0 my-2.5 p-0">SPONSORED_HEADLINE</span>
  </a>
  </script>
  </div>
  <a href="https://www.pcgamer.com/hardware/gta-5-enhanced-performance-analysis-forget-max-settings-my-advice-is-to-enable-very-high-rt-and-enjoy-the-show/" data-analytics-id="more-about-latest-article" data-before-rewrite-localise="https://www.pcgamer.com/hardware/gta-5-enhanced-performance-analysis-forget-max-settings-my-advice-is-to-enable-very-high-rt-and-enjoy-the-show/">
  <div class="pt-[56.25%] relative [&amp;_img]:absolute [&amp;_img]:top-0 [&amp;_img]:object-cover [&amp;_img]:w-full [&amp;_img]:h-full">
  <picture data-new-v2-image="true">
  <source type="image/webp" srcset="https://cdn.mos.cms.futurecdn.net/L4PUuqLGHg53whs8U8s2zN-840-80.jpg.webp 840w, https://cdn.mos.cms.futurecdn.net/L4PUuqLGHg53whs8U8s2zN-650-80.jpg.webp 650w, https://cdn.mos.cms.futurecdn.net/L4PUuqLGHg53whs8U8s2zN-500-80.jpg.webp 500w, https://cdn.mos.cms.futurecdn.net/L4PUuqLGHg53whs8U8s2zN-450-80.jpg.webp 450w, https://cdn.mos.cms.futurecdn.net/L4PUuqLGHg53whs8U8s2zN-320-80.jpg.webp 320w" sizes="(min-width: 900px) 925px, (min-width: 700px) 450px, calc(100vw - 48px)"></source>
  <img src="https://cdn.mos.cms.futurecdn.net/L4PUuqLGHg53whs8U8s2zN-840-80.jpg" alt="A red car on a Los Santos hilltop in GTA 5 Enhanced" srcset="https://cdn.mos.cms.futurecdn.net/L4PUuqLGHg53whs8U8s2zN-840-80.jpg 840w, https://cdn.mos.cms.futurecdn.net/L4PUuqLGHg53whs8U8s2zN-650-80.jpg 650w, https://cdn.mos.cms.futurecdn.net/L4PUuqLGHg53whs8U8s2zN-500-80.jpg 500w, https://cdn.mos.cms.futurecdn.net/L4PUuqLGHg53whs8U8s2zN-450-80.jpg 450w, https://cdn.mos.cms.futurecdn.net/L4PUuqLGHg53whs8U8s2zN-320-80.jpg 320w" sizes="(min-width: 900px) 925px, (min-width: 700px) 450px, calc(100vw - 48px)" loading="lazy" data-original-mos="https://cdn.mos.cms.futurecdn.net/L4PUuqLGHg53whs8U8s2zN.jpg" data-pin-media="https://cdn.mos.cms.futurecdn.net/L4PUuqLGHg53whs8U8s2zN.jpg">
  </picture>
  </div>
  <span class="text-base text-black font-bold mx-0 my-2.5 p-0">GTA 5 Enhanced performance analysis: Forget max settings, my advice is to enable Very High RT and enjoy the show</span>
  </a>
  <div class="relative recirc-feed sponsored-card" data-recirc-id="article-river-stacked-ads:native-cards">
  <div class="sponsored-post"></div>
  <script type="text/html" class="sponsored-post-template" style="display:none!important;">
  <a style="position: relative!important;" href="SPONSORED_LINK_URL">
  <picture>
  <source srcset="SPONSORED_IMAGE_URL.webp" type="image/webp" />
  <img src="SPONSORED_IMAGE_URL" alt="SPONSORED_HEADLINE" loading="lazy"/>
  </picture>
  <span class="text-base text-black font-bold mx-0 my-2.5 p-0">SPONSORED_HEADLINE</span>
  </a>
  </script>
  </div>
  <a href="https://www.pcgamer.com/hardware/we-all-deserve-better-than-this/" data-analytics-id="more-about-latest-article" data-before-rewrite-localise="https://www.pcgamer.com/hardware/we-all-deserve-better-than-this/">
  <div class="pt-[56.25%] relative [&amp;_img]:absolute [&amp;_img]:top-0 [&amp;_img]:object-cover [&amp;_img]:w-full [&amp;_img]:h-full">
  <picture data-new-v2-image="true">
  <source type="image/webp" srcset="https://cdn.mos.cms.futurecdn.net/7D6oF7dGnSERdg64e7W7cY-840-80.jpg.webp 840w, https://cdn.mos.cms.futurecdn.net/7D6oF7dGnSERdg64e7W7cY-650-80.jpg.webp 650w, https://cdn.mos.cms.futurecdn.net/7D6oF7dGnSERdg64e7W7cY-500-80.jpg.webp 500w, https://cdn.mos.cms.futurecdn.net/7D6oF7dGnSERdg64e7W7cY-450-80.jpg.webp 450w, https://cdn.mos.cms.futurecdn.net/7D6oF7dGnSERdg64e7W7cY-320-80.jpg.webp 320w" sizes="(min-width: 900px) 925px, (min-width: 700px) 450px, calc(100vw - 48px)"></source>
  <img src="https://cdn.mos.cms.futurecdn.net/7D6oF7dGnSERdg64e7W7cY-840-80.jpg" alt="Radeon RX 9070 XT cards all X&amp;#039;d out, out of stock" srcset="https://cdn.mos.cms.futurecdn.net/7D6oF7dGnSERdg64e7W7cY-840-80.jpg 840w, https://cdn.mos.cms.futurecdn.net/7D6oF7dGnSERdg64e7W7cY-650-80.jpg 650w, https://cdn.mos.cms.futurecdn.net/7D6oF7dGnSERdg64e7W7cY-500-80.jpg 500w, https://cdn.mos.cms.futurecdn.net/7D6oF7dGnSERdg64e7W7cY-450-80.jpg 450w, https://cdn.mos.cms.futurecdn.net/7D6oF7dGnSERdg64e7W7cY-320-80.jpg 320w" sizes="(min-width: 900px) 925px, (min-width: 700px) 450px, calc(100vw - 48px)" loading="lazy" data-original-mos="https://cdn.mos.cms.futurecdn.net/7D6oF7dGnSERdg64e7W7cY.jpg" data-pin-media="https://cdn.mos.cms.futurecdn.net/7D6oF7dGnSERdg64e7W7cY.jpg">
  </picture>
  </div>
  <span class="text-base text-black font-bold mx-0 my-2.5 p-0">We all deserve better than this</span>
  </a>
  <div class="relative recirc-feed sponsored-card" data-recirc-id="article-river-stacked-ads:native-cards">
  <div class="sponsored-post"></div>
  <script type="text/html" class="sponsored-post-template" style="display:none!important;">
  <a style="position: relative!important;" href="SPONSORED_LINK_URL">
  <picture>
  <source srcset="SPONSORED_IMAGE_URL.webp" type="image/webp" />
  <img src="SPONSORED_IMAGE_URL" alt="SPONSORED_HEADLINE" loading="lazy"/>
  </picture>
  <span class="text-base text-black font-bold mx-0 my-2.5 p-0">SPONSORED_HEADLINE</span>
  </a>
  </script>
  </div>
  </div>
  </div>
  </div>
  </section>
  <div class="xs:flex">
  <div data-test-id="more-about" class="text-lg sm:text-sm text-white font-bold flex flex-col justify-between xs:w-2/3">
  <div class="uppercase p-3 bg-zinc-800 block">More about strategy</div>
  <div class="h-full xs:flex py-5 sm:py-1 ">
  <a class="flex flex-row flex-1 pb-4 xs:flex-col xs:p-3 no-underline" href="https://www.pcgamer.com/games/strategy/firaxis-says-its-entering-our-sukritact-age-as-it-hires-popular-modder-to-work-on-civilization-7/" data-analytics-id="more-about-related-article" data-before-rewrite-localise="/games/strategy/firaxis-says-its-entering-our-sukritact-age-as-it-hires-popular-modder-to-work-on-civilization-7">
  <div class="w-1/2 xs:w-full">
  <picture data-new-v2-image="true">
  <source type="image/webp" srcset="https://cdn.mos.cms.futurecdn.net/Y4dm5xEQLebAigY7gqUaQA-840-80.jpg.webp 840w, https://cdn.mos.cms.futurecdn.net/Y4dm5xEQLebAigY7gqUaQA-650-80.jpg.webp 650w, https://cdn.mos.cms.futurecdn.net/Y4dm5xEQLebAigY7gqUaQA-500-80.jpg.webp 500w, https://cdn.mos.cms.futurecdn.net/Y4dm5xEQLebAigY7gqUaQA-450-80.jpg.webp 450w, https://cdn.mos.cms.futurecdn.net/Y4dm5xEQLebAigY7gqUaQA-320-80.jpg.webp 320w" sizes="(min-width: 900px) 925px, (min-width: 700px) 450px, calc(100vw - 48px)"></source>
  <img src="https://cdn.mos.cms.futurecdn.net/Y4dm5xEQLebAigY7gqUaQA-840-80.jpg" alt="Civilization 7 victory guide" srcset="https://cdn.mos.cms.futurecdn.net/Y4dm5xEQLebAigY7gqUaQA-840-80.jpg 840w, https://cdn.mos.cms.futurecdn.net/Y4dm5xEQLebAigY7gqUaQA-650-80.jpg 650w, https://cdn.mos.cms.futurecdn.net/Y4dm5xEQLebAigY7gqUaQA-500-80.jpg 500w, https://cdn.mos.cms.futurecdn.net/Y4dm5xEQLebAigY7gqUaQA-450-80.jpg 450w, https://cdn.mos.cms.futurecdn.net/Y4dm5xEQLebAigY7gqUaQA-320-80.jpg 320w" sizes="(min-width: 900px) 925px, (min-width: 700px) 450px, calc(100vw - 48px)" loading="lazy" data-original-mos="https://cdn.mos.cms.futurecdn.net/Y4dm5xEQLebAigY7gqUaQA.jpg" data-pin-media="https://cdn.mos.cms.futurecdn.net/Y4dm5xEQLebAigY7gqUaQA.jpg">
  </picture>
  </div>
  <p class="w-1/2 xs:w-full sm:text-base no-underline text-neutral-800 ml-3 xs:mx-0 xs:mt-2 leading-[1.625rem]">Firaxis says it's 'entering our Sukritact Age' as it hires popular modder to work on Civilization 7</p>
  </a>
  <a class="flex flex-row flex-1 pb-4 xs:flex-col xs:p-3 no-underline" href="https://www.pcgamer.com/games/strategy/civilization-7-guide-to-unexplained-systems-faq/" data-analytics-id="more-about-related-article" data-before-rewrite-localise="/games/strategy/civilization-7-guide-to-unexplained-systems-faq">
  <div class="w-1/2 xs:w-full">
  <picture data-new-v2-image="true">
  <source type="image/webp" srcset="https://cdn.mos.cms.futurecdn.net/nVBVYxC85294seQiwMyvPP-840-80.jpg.webp 840w, https://cdn.mos.cms.futurecdn.net/nVBVYxC85294seQiwMyvPP-650-80.jpg.webp 650w, https://cdn.mos.cms.futurecdn.net/nVBVYxC85294seQiwMyvPP-500-80.jpg.webp 500w, https://cdn.mos.cms.futurecdn.net/nVBVYxC85294seQiwMyvPP-450-80.jpg.webp 450w, https://cdn.mos.cms.futurecdn.net/nVBVYxC85294seQiwMyvPP-320-80.jpg.webp 320w" sizes="(min-width: 900px) 925px, (min-width: 700px) 450px, calc(100vw - 48px)"></source>
  <img src="https://cdn.mos.cms.futurecdn.net/nVBVYxC85294seQiwMyvPP-840-80.jpg" alt="Civilization 7 leader " srcset="https://cdn.mos.cms.futurecdn.net/nVBVYxC85294seQiwMyvPP-840-80.jpg 840w, https://cdn.mos.cms.futurecdn.net/nVBVYxC85294seQiwMyvPP-650-80.jpg 650w, https://cdn.mos.cms.futurecdn.net/nVBVYxC85294seQiwMyvPP-500-80.jpg 500w, https://cdn.mos.cms.futurecdn.net/nVBVYxC85294seQiwMyvPP-450-80.jpg 450w, https://cdn.mos.cms.futurecdn.net/nVBVYxC85294seQiwMyvPP-320-80.jpg 320w" sizes="(min-width: 900px) 925px, (min-width: 700px) 450px, calc(100vw - 48px)" loading="lazy" data-original-mos="https://cdn.mos.cms.futurecdn.net/nVBVYxC85294seQiwMyvPP.jpg" data-pin-media="https://cdn.mos.cms.futurecdn.net/nVBVYxC85294seQiwMyvPP.jpg">
  </picture>
  </div>
  <p class="w-1/2 xs:w-full sm:text-base no-underline text-neutral-800 ml-3 xs:mx-0 xs:mt-2 leading-[1.625rem]">The unofficial Civilization 7 manual: everything Civ 7 doesn't tell you about its rules and systems</p>
  </a>
  </div>
  <div class="bg-zinc-800 sm:h-[58px] xs:h-[73px] h-[52px] xs:block xs:visible hidden">
  </div>
  </div>
  <div data-test-id="more-about" class="text-lg sm:text-sm text-white font-bold flex flex-col justify-between xs:flex-1">
  <div class="uppercase p-3 bg-neutral-500 xs:block xs:visible hidden">Latest</div>
  <div class="h-full xs:flex py-5 sm:py-1 bg-zinc-300">
  <a class="flex flex-row flex-1 pb-4 xs:flex-col xs:p-3 no-underline" href="https://www.pcgamer.com/games/action/the-next-monster-hunter-wilds-update-is-set-to-launch-on-march-10-and-will-ensure-that-when-you-chop-off-monster-parts-the-right-monster-parts-get-chopped-off/" data-analytics-id="more-about-latest-article" data-before-rewrite-localise="/games/action/the-next-monster-hunter-wilds-update-is-set-to-launch-on-march-10-and-will-ensure-that-when-you-chop-off-monster-parts-the-right-monster-parts-get-chopped-off">
  <div class="w-1/2 xs:w-full">
  <picture data-new-v2-image="true">
  <source type="image/webp" srcset="https://cdn.mos.cms.futurecdn.net/VGM8MLmWR5236UdpQ9j6mX-840-80.jpg.webp 840w, https://cdn.mos.cms.futurecdn.net/VGM8MLmWR5236UdpQ9j6mX-650-80.jpg.webp 650w, https://cdn.mos.cms.futurecdn.net/VGM8MLmWR5236UdpQ9j6mX-500-80.jpg.webp 500w, https://cdn.mos.cms.futurecdn.net/VGM8MLmWR5236UdpQ9j6mX-450-80.jpg.webp 450w, https://cdn.mos.cms.futurecdn.net/VGM8MLmWR5236UdpQ9j6mX-320-80.jpg.webp 320w" sizes="(min-width: 900px) 925px, (min-width: 700px) 450px, calc(100vw - 48px)"></source>
  <img src="https://cdn.mos.cms.futurecdn.net/VGM8MLmWR5236UdpQ9j6mX-840-80.jpg" alt="Monster Hunter Wilds palico" srcset="https://cdn.mos.cms.futurecdn.net/VGM8MLmWR5236UdpQ9j6mX-840-80.jpg 840w, https://cdn.mos.cms.futurecdn.net/VGM8MLmWR5236UdpQ9j6mX-650-80.jpg 650w, https://cdn.mos.cms.futurecdn.net/VGM8MLmWR5236UdpQ9j6mX-500-80.jpg 500w, https://cdn.mos.cms.futurecdn.net/VGM8MLmWR5236UdpQ9j6mX-450-80.jpg 450w, https://cdn.mos.cms.futurecdn.net/VGM8MLmWR5236UdpQ9j6mX-320-80.jpg 320w" sizes="(min-width: 900px) 925px, (min-width: 700px) 450px, calc(100vw - 48px)" loading="lazy" data-original-mos="https://cdn.mos.cms.futurecdn.net/VGM8MLmWR5236UdpQ9j6mX.jpg" data-pin-media="https://cdn.mos.cms.futurecdn.net/VGM8MLmWR5236UdpQ9j6mX.jpg">
  </picture>
  </div>
  <p class="w-1/2 xs:w-full sm:text-base no-underline text-neutral-800 ml-3 xs:mx-0 xs:mt-2 leading-[1.625rem]">The next Monster Hunter Wilds update is set to launch on March 10 and will ensure that when you chop off monster parts, the right monster parts get chopped off</p>
  </a>
  </div>
  <div class="bg-neutral-500 sm:h-[58px] xs:h-[73px] h-[52px] flex order-first xs:order-last">
  <a class="uppercase text-white p-3 bg-neutral-500 no-underline" href="https://www.pcgamer.com/news/" data-before-rewrite-redirect="/news" data-before-rewrite-localise="https://www.pcgamer.com/news/">See more latest</a>
  </div>
  </div>
  </div>
  <div class="related-articles-block">
  <div>
  <div class="sm:text-base text-lg my-5 flex items-center text-white font-inherit font-bold h-12 sm:justify-center justify-left px-4 uppercase bg-zinc-800">Most Popular</div>
  <div class="h-64 mb-6 relative">
  <a class="[&amp;&gt;picture&gt;img]:h-full [&amp;&gt;picture&gt;img]:w-full [&amp;&gt;picture&gt;img]:object-cover" href="https://www.pcgamer.com/hardware/we-all-deserve-better-than-this/" data-analytics-id="related-article" data-before-rewrite-localise="/hardware/we-all-deserve-better-than-this">
  <picture data-new-v2-image="true">
  <source type="image/webp" srcset="https://cdn.mos.cms.futurecdn.net/7D6oF7dGnSERdg64e7W7cY-840-80.jpg.webp 840w, https://cdn.mos.cms.futurecdn.net/7D6oF7dGnSERdg64e7W7cY-650-80.jpg.webp 650w, https://cdn.mos.cms.futurecdn.net/7D6oF7dGnSERdg64e7W7cY-500-80.jpg.webp 500w, https://cdn.mos.cms.futurecdn.net/7D6oF7dGnSERdg64e7W7cY-450-80.jpg.webp 450w, https://cdn.mos.cms.futurecdn.net/7D6oF7dGnSERdg64e7W7cY-320-80.jpg.webp 320w" sizes="(min-width: 900px) 925px, (min-width: 700px) 450px, calc(100vw - 48px)"></source>
  <img src="https://cdn.mos.cms.futurecdn.net/7D6oF7dGnSERdg64e7W7cY-840-80.jpg" alt="Radeon RX 9070 XT cards all X&amp;#039;d out, out of stock" srcset="https://cdn.mos.cms.futurecdn.net/7D6oF7dGnSERdg64e7W7cY-840-80.jpg 840w, https://cdn.mos.cms.futurecdn.net/7D6oF7dGnSERdg64e7W7cY-650-80.jpg 650w, https://cdn.mos.cms.futurecdn.net/7D6oF7dGnSERdg64e7W7cY-500-80.jpg 500w, https://cdn.mos.cms.futurecdn.net/7D6oF7dGnSERdg64e7W7cY-450-80.jpg 450w, https://cdn.mos.cms.futurecdn.net/7D6oF7dGnSERdg64e7W7cY-320-80.jpg 320w" sizes="(min-width: 900px) 925px, (min-width: 700px) 450px, calc(100vw - 48px)" data-original-mos="https://cdn.mos.cms.futurecdn.net/7D6oF7dGnSERdg64e7W7cY.jpg" data-pin-media="https://cdn.mos.cms.futurecdn.net/7D6oF7dGnSERdg64e7W7cY.jpg">
  </picture>
  <header class="absolute bottom-0 w-full text-neutral-100 p-2.5 m-0 bg-black/80 text-lg sm:text-2xl font-bold">We all deserve better than this</header>
  </a>
  </div>
  <div class="h-64 mb-6 relative">
  <a class="[&amp;&gt;picture&gt;img]:h-full [&amp;&gt;picture&gt;img]:w-full [&amp;&gt;picture&gt;img]:object-cover" href="https://www.pcgamer.com/games/card-games/hearthstone-card-reveal-if-its-wrong-to-love-a-magic-blue-owl-then-i-dont-want-to-be-right/" data-analytics-id="related-article" data-before-rewrite-localise="/games/card-games/hearthstone-card-reveal-if-its-wrong-to-love-a-magic-blue-owl-then-i-dont-want-to-be-right">
  <picture data-new-v2-image="true">
  <source type="image/webp" srcset="https://cdn.mos.cms.futurecdn.net/EA2PfiVZ5EDC2hvyoF94am-840-80.jpg.webp 840w, https://cdn.mos.cms.futurecdn.net/EA2PfiVZ5EDC2hvyoF94am-650-80.jpg.webp 650w, https://cdn.mos.cms.futurecdn.net/EA2PfiVZ5EDC2hvyoF94am-500-80.jpg.webp 500w, https://cdn.mos.cms.futurecdn.net/EA2PfiVZ5EDC2hvyoF94am-450-80.jpg.webp 450w, https://cdn.mos.cms.futurecdn.net/EA2PfiVZ5EDC2hvyoF94am-320-80.jpg.webp 320w" sizes="(min-width: 900px) 925px, (min-width: 700px) 450px, calc(100vw - 48px)"></source>
  <img src="https://cdn.mos.cms.futurecdn.net/EA2PfiVZ5EDC2hvyoF94am-840-80.jpg" alt="Mage cards from Hearthstone&amp;#039;s Into the Emerald Dream expansion." srcset="https://cdn.mos.cms.futurecdn.net/EA2PfiVZ5EDC2hvyoF94am-840-80.jpg 840w, https://cdn.mos.cms.futurecdn.net/EA2PfiVZ5EDC2hvyoF94am-650-80.jpg 650w, https://cdn.mos.cms.futurecdn.net/EA2PfiVZ5EDC2hvyoF94am-500-80.jpg 500w, https://cdn.mos.cms.futurecdn.net/EA2PfiVZ5EDC2hvyoF94am-450-80.jpg 450w, https://cdn.mos.cms.futurecdn.net/EA2PfiVZ5EDC2hvyoF94am-320-80.jpg 320w" sizes="(min-width: 900px) 925px, (min-width: 700px) 450px, calc(100vw - 48px)" data-original-mos="https://cdn.mos.cms.futurecdn.net/EA2PfiVZ5EDC2hvyoF94am.jpg" data-pin-media="https://cdn.mos.cms.futurecdn.net/EA2PfiVZ5EDC2hvyoF94am.jpg">
  </picture>
  <header class="absolute bottom-0 w-full text-neutral-100 p-2.5 m-0 bg-black/80 text-lg sm:text-2xl font-bold">Hearthstone card reveal: If it's wrong to love a magic blue owl, I don't want to be right</header>
  </a>
  </div>
  <div class="h-64 mb-6 relative">
  <a class="[&amp;&gt;picture&gt;img]:h-full [&amp;&gt;picture&gt;img]:w-full [&amp;&gt;picture&gt;img]:object-cover" href="https://www.pcgamer.com/games/horror/r-e-p-o-is-my-new-favourite-co-op-horror-game-which-combines-lethal-companys-looting-loop-with-content-warnings-zany-monsters/" data-analytics-id="related-article" data-before-rewrite-localise="/games/horror/r-e-p-o-is-my-new-favourite-co-op-horror-game-which-combines-lethal-companys-looting-loop-with-content-warnings-zany-monsters">
  <picture data-new-v2-image="true">
  <source type="image/webp" srcset="https://cdn.mos.cms.futurecdn.net/7rGzXkGFideKrahTG5UPif-840-80.jpg.webp 840w, https://cdn.mos.cms.futurecdn.net/7rGzXkGFideKrahTG5UPif-650-80.jpg.webp 650w, https://cdn.mos.cms.futurecdn.net/7rGzXkGFideKrahTG5UPif-500-80.jpg.webp 500w, https://cdn.mos.cms.futurecdn.net/7rGzXkGFideKrahTG5UPif-450-80.jpg.webp 450w, https://cdn.mos.cms.futurecdn.net/7rGzXkGFideKrahTG5UPif-320-80.jpg.webp 320w" sizes="(min-width: 900px) 925px, (min-width: 700px) 450px, calc(100vw - 48px)"></source>
  <img src="https://cdn.mos.cms.futurecdn.net/7rGzXkGFideKrahTG5UPif-840-80.jpg" alt="R.E.P.O. screenshots" srcset="https://cdn.mos.cms.futurecdn.net/7rGzXkGFideKrahTG5UPif-840-80.jpg 840w, https://cdn.mos.cms.futurecdn.net/7rGzXkGFideKrahTG5UPif-650-80.jpg 650w, https://cdn.mos.cms.futurecdn.net/7rGzXkGFideKrahTG5UPif-500-80.jpg 500w, https://cdn.mos.cms.futurecdn.net/7rGzXkGFideKrahTG5UPif-450-80.jpg 450w, https://cdn.mos.cms.futurecdn.net/7rGzXkGFideKrahTG5UPif-320-80.jpg 320w" sizes="(min-width: 900px) 925px, (min-width: 700px) 450px, calc(100vw - 48px)" data-original-mos="https://cdn.mos.cms.futurecdn.net/7rGzXkGFideKrahTG5UPif.jpg" data-pin-media="https://cdn.mos.cms.futurecdn.net/7rGzXkGFideKrahTG5UPif.jpg">
  </picture>
  <header class="absolute bottom-0 w-full text-neutral-100 p-2.5 m-0 bg-black/80 text-lg sm:text-2xl font-bold">REPO is my new favourite co-op horror game, which combines Lethal Company's looting loop with Content Warning's zany monsters</header>
  </a>
  </div>
  <div class="h-64 mb-6 relative">
  <a class="[&amp;&gt;picture&gt;img]:h-full [&amp;&gt;picture&gt;img]:w-full [&amp;&gt;picture&gt;img]:object-cover" href="https://www.pcgamer.com/games/action/capcom-cooked-up-some-extremely-cursed-palico-outfits-in-monster-hunter-wilds/" data-analytics-id="related-article" data-before-rewrite-localise="/games/action/capcom-cooked-up-some-extremely-cursed-palico-outfits-in-monster-hunter-wilds">
  <picture data-new-v2-image="true">
  <source type="image/webp" srcset="https://cdn.mos.cms.futurecdn.net/nDc9gFQXSBYVL7UAtC3KGT-840-80.jpg.webp 840w, https://cdn.mos.cms.futurecdn.net/nDc9gFQXSBYVL7UAtC3KGT-650-80.jpg.webp 650w, https://cdn.mos.cms.futurecdn.net/nDc9gFQXSBYVL7UAtC3KGT-500-80.jpg.webp 500w, https://cdn.mos.cms.futurecdn.net/nDc9gFQXSBYVL7UAtC3KGT-450-80.jpg.webp 450w, https://cdn.mos.cms.futurecdn.net/nDc9gFQXSBYVL7UAtC3KGT-320-80.jpg.webp 320w" sizes="(min-width: 900px) 925px, (min-width: 700px) 450px, calc(100vw - 48px)"></source>
  <img src="https://cdn.mos.cms.futurecdn.net/nDc9gFQXSBYVL7UAtC3KGT-840-80.jpg" alt="Monster Hunter Wilds weird Palico outfits - Artian" srcset="https://cdn.mos.cms.futurecdn.net/nDc9gFQXSBYVL7UAtC3KGT-840-80.jpg 840w, https://cdn.mos.cms.futurecdn.net/nDc9gFQXSBYVL7UAtC3KGT-650-80.jpg 650w, https://cdn.mos.cms.futurecdn.net/nDc9gFQXSBYVL7UAtC3KGT-500-80.jpg 500w, https://cdn.mos.cms.futurecdn.net/nDc9gFQXSBYVL7UAtC3KGT-450-80.jpg 450w, https://cdn.mos.cms.futurecdn.net/nDc9gFQXSBYVL7UAtC3KGT-320-80.jpg 320w" sizes="(min-width: 900px) 925px, (min-width: 700px) 450px, calc(100vw - 48px)" data-original-mos="https://cdn.mos.cms.futurecdn.net/nDc9gFQXSBYVL7UAtC3KGT.jpg" data-pin-media="https://cdn.mos.cms.futurecdn.net/nDc9gFQXSBYVL7UAtC3KGT.jpg">
  </picture>
  <header class="absolute bottom-0 w-full text-neutral-100 p-2.5 m-0 bg-black/80 text-lg sm:text-2xl font-bold">Capcom cooked up some extremely cursed Palico outfits in Monster Hunter Wilds</header>
  </a>
  </div>
  <div class="h-64 mb-6 relative">
  <a class="[&amp;&gt;picture&gt;img]:h-full [&amp;&gt;picture&gt;img]:w-full [&amp;&gt;picture&gt;img]:object-cover" href="https://www.pcgamer.com/games/grand-theft-auto/grand-theft-auto-5-enhanced-review/" data-analytics-id="related-article" data-before-rewrite-localise="/games/grand-theft-auto/grand-theft-auto-5-enhanced-review">
  <picture data-new-v2-image="true">
  <source type="image/webp" srcset="https://cdn.mos.cms.futurecdn.net/ArDuGkYyaAf2cFPDteuYQo-840-80.jpg.webp 840w, https://cdn.mos.cms.futurecdn.net/ArDuGkYyaAf2cFPDteuYQo-650-80.jpg.webp 650w, https://cdn.mos.cms.futurecdn.net/ArDuGkYyaAf2cFPDteuYQo-500-80.jpg.webp 500w, https://cdn.mos.cms.futurecdn.net/ArDuGkYyaAf2cFPDteuYQo-450-80.jpg.webp 450w, https://cdn.mos.cms.futurecdn.net/ArDuGkYyaAf2cFPDteuYQo-320-80.jpg.webp 320w" sizes="(min-width: 900px) 925px, (min-width: 700px) 450px, calc(100vw - 48px)"></source>
  <img src="https://cdn.mos.cms.futurecdn.net/ArDuGkYyaAf2cFPDteuYQo-840-80.jpg" alt="GTA 5 Enhanced" srcset="https://cdn.mos.cms.futurecdn.net/ArDuGkYyaAf2cFPDteuYQo-840-80.jpg 840w, https://cdn.mos.cms.futurecdn.net/ArDuGkYyaAf2cFPDteuYQo-650-80.jpg 650w, https://cdn.mos.cms.futurecdn.net/ArDuGkYyaAf2cFPDteuYQo-500-80.jpg 500w, https://cdn.mos.cms.futurecdn.net/ArDuGkYyaAf2cFPDteuYQo-450-80.jpg 450w, https://cdn.mos.cms.futurecdn.net/ArDuGkYyaAf2cFPDteuYQo-320-80.jpg 320w" sizes="(min-width: 900px) 925px, (min-width: 700px) 450px, calc(100vw - 48px)" data-original-mos="https://cdn.mos.cms.futurecdn.net/ArDuGkYyaAf2cFPDteuYQo.jpg" data-pin-media="https://cdn.mos.cms.futurecdn.net/ArDuGkYyaAf2cFPDteuYQo.jpg">
  </picture>
  <header class="absolute bottom-0 w-full text-neutral-100 p-2.5 m-0 bg-black/80 text-lg sm:text-2xl font-bold">Grand Theft Auto 5 Enhanced is a bitter-sweet return to Rockstar's money-making machine</header>
  </a>
  </div>
  <div class="h-64 mb-6 relative">
  <a class="[&amp;&gt;picture&gt;img]:h-full [&amp;&gt;picture&gt;img]:w-full [&amp;&gt;picture&gt;img]:object-cover" href="https://www.pcgamer.com/hardware/gta-5-enhanced-performance-analysis-forget-max-settings-my-advice-is-to-enable-very-high-rt-and-enjoy-the-show/" data-analytics-id="related-article" data-before-rewrite-localise="/hardware/gta-5-enhanced-performance-analysis-forget-max-settings-my-advice-is-to-enable-very-high-rt-and-enjoy-the-show">
  <picture data-new-v2-image="true">
  <source type="image/webp" srcset="https://cdn.mos.cms.futurecdn.net/L4PUuqLGHg53whs8U8s2zN-840-80.jpg.webp 840w, https://cdn.mos.cms.futurecdn.net/L4PUuqLGHg53whs8U8s2zN-650-80.jpg.webp 650w, https://cdn.mos.cms.futurecdn.net/L4PUuqLGHg53whs8U8s2zN-500-80.jpg.webp 500w, https://cdn.mos.cms.futurecdn.net/L4PUuqLGHg53whs8U8s2zN-450-80.jpg.webp 450w, https://cdn.mos.cms.futurecdn.net/L4PUuqLGHg53whs8U8s2zN-320-80.jpg.webp 320w" sizes="(min-width: 900px) 925px, (min-width: 700px) 450px, calc(100vw - 48px)"></source>
  <img src="https://cdn.mos.cms.futurecdn.net/L4PUuqLGHg53whs8U8s2zN-840-80.jpg" alt="A red car on a Los Santos hilltop in GTA 5 Enhanced" srcset="https://cdn.mos.cms.futurecdn.net/L4PUuqLGHg53whs8U8s2zN-840-80.jpg 840w, https://cdn.mos.cms.futurecdn.net/L4PUuqLGHg53whs8U8s2zN-650-80.jpg 650w, https://cdn.mos.cms.futurecdn.net/L4PUuqLGHg53whs8U8s2zN-500-80.jpg 500w, https://cdn.mos.cms.futurecdn.net/L4PUuqLGHg53whs8U8s2zN-450-80.jpg 450w, https://cdn.mos.cms.futurecdn.net/L4PUuqLGHg53whs8U8s2zN-320-80.jpg 320w" sizes="(min-width: 900px) 925px, (min-width: 700px) 450px, calc(100vw - 48px)" data-original-mos="https://cdn.mos.cms.futurecdn.net/L4PUuqLGHg53whs8U8s2zN.jpg" data-pin-media="https://cdn.mos.cms.futurecdn.net/L4PUuqLGHg53whs8U8s2zN.jpg">
  </picture>
  <header class="absolute bottom-0 w-full text-neutral-100 p-2.5 m-0 bg-black/80 text-lg sm:text-2xl font-bold">GTA 5 Enhanced performance analysis: Forget max settings, my advice is to enable Very High RT and enjoy the show</header>
  </a>
  </div>
  <div class="h-64 mb-6 relative">
  <a class="[&amp;&gt;picture&gt;img]:h-full [&amp;&gt;picture&gt;img]:w-full [&amp;&gt;picture&gt;img]:object-cover" href="https://www.pcgamer.com/games/fps/as-a-stalker-sicko-the-2-hours-i-just-spent-with-atomfall-have-made-it-one-of-my-most-anticipated-games-this-year/" data-analytics-id="related-article" data-before-rewrite-localise="/games/fps/as-a-stalker-sicko-the-2-hours-i-just-spent-with-atomfall-have-made-it-one-of-my-most-anticipated-games-this-year">
  <picture data-new-v2-image="true">
  <source type="image/webp" srcset="https://cdn.mos.cms.futurecdn.net/85QjBM6VGa8peyFrttNrMR-840-80.png.webp 840w, https://cdn.mos.cms.futurecdn.net/85QjBM6VGa8peyFrttNrMR-650-80.png.webp 650w, https://cdn.mos.cms.futurecdn.net/85QjBM6VGa8peyFrttNrMR-500-80.png.webp 500w, https://cdn.mos.cms.futurecdn.net/85QjBM6VGa8peyFrttNrMR-450-80.png.webp 450w, https://cdn.mos.cms.futurecdn.net/85QjBM6VGa8peyFrttNrMR-320-80.png.webp 320w" sizes="(min-width: 900px) 925px, (min-width: 700px) 450px, calc(100vw - 48px)"></source>
  <img src="https://cdn.mos.cms.futurecdn.net/85QjBM6VGa8peyFrttNrMR-840-80.png" alt="An enemy druid dodges a stab from the player." srcset="https://cdn.mos.cms.futurecdn.net/85QjBM6VGa8peyFrttNrMR-840-80.png 840w, https://cdn.mos.cms.futurecdn.net/85QjBM6VGa8peyFrttNrMR-650-80.png 650w, https://cdn.mos.cms.futurecdn.net/85QjBM6VGa8peyFrttNrMR-500-80.png 500w, https://cdn.mos.cms.futurecdn.net/85QjBM6VGa8peyFrttNrMR-450-80.png 450w, https://cdn.mos.cms.futurecdn.net/85QjBM6VGa8peyFrttNrMR-320-80.png 320w" sizes="(min-width: 900px) 925px, (min-width: 700px) 450px, calc(100vw - 48px)" data-original-mos="https://cdn.mos.cms.futurecdn.net/85QjBM6VGa8peyFrttNrMR.png" data-pin-media="https://cdn.mos.cms.futurecdn.net/85QjBM6VGa8peyFrttNrMR.png">
  </picture>
  <header class="absolute bottom-0 w-full text-neutral-100 p-2.5 m-0 bg-black/80 text-lg sm:text-2xl font-bold">As a Stalker sicko, the 2 hours I just spent with Atomfall have made it one of my most-anticipated games this year</header>
  </a>
  </div>
  <div class="h-64 mb-6 relative">
  <a class="[&amp;&gt;picture&gt;img]:h-full [&amp;&gt;picture&gt;img]:w-full [&amp;&gt;picture&gt;img]:object-cover" href="https://www.pcgamer.com/games/action/monster-hunter-wilds-true-difficulty-isnt-the-battles-its-navigating-the-horrible-menus/" data-analytics-id="related-article" data-before-rewrite-localise="/games/action/monster-hunter-wilds-true-difficulty-isnt-the-battles-its-navigating-the-horrible-menus">
  <picture data-new-v2-image="true">
  <source type="image/webp" srcset="https://cdn.mos.cms.futurecdn.net/2pVBNeddSKAob79sUSD4xK-840-80.jpg.webp 840w, https://cdn.mos.cms.futurecdn.net/2pVBNeddSKAob79sUSD4xK-650-80.jpg.webp 650w, https://cdn.mos.cms.futurecdn.net/2pVBNeddSKAob79sUSD4xK-500-80.jpg.webp 500w, https://cdn.mos.cms.futurecdn.net/2pVBNeddSKAob79sUSD4xK-450-80.jpg.webp 450w, https://cdn.mos.cms.futurecdn.net/2pVBNeddSKAob79sUSD4xK-320-80.jpg.webp 320w" sizes="(min-width: 900px) 925px, (min-width: 700px) 450px, calc(100vw - 48px)"></source>
  <img src="https://cdn.mos.cms.futurecdn.net/2pVBNeddSKAob79sUSD4xK-840-80.jpg" alt="Monster Hunter Wilds - a player yells in despair with their arms out, kneeling on the ground." srcset="https://cdn.mos.cms.futurecdn.net/2pVBNeddSKAob79sUSD4xK-840-80.jpg 840w, https://cdn.mos.cms.futurecdn.net/2pVBNeddSKAob79sUSD4xK-650-80.jpg 650w, https://cdn.mos.cms.futurecdn.net/2pVBNeddSKAob79sUSD4xK-500-80.jpg 500w, https://cdn.mos.cms.futurecdn.net/2pVBNeddSKAob79sUSD4xK-450-80.jpg 450w, https://cdn.mos.cms.futurecdn.net/2pVBNeddSKAob79sUSD4xK-320-80.jpg 320w" sizes="(min-width: 900px) 925px, (min-width: 700px) 450px, calc(100vw - 48px)" data-original-mos="https://cdn.mos.cms.futurecdn.net/2pVBNeddSKAob79sUSD4xK.jpg" data-pin-media="https://cdn.mos.cms.futurecdn.net/2pVBNeddSKAob79sUSD4xK.jpg">
  </picture>
  <header class="absolute bottom-0 w-full text-neutral-100 p-2.5 m-0 bg-black/80 text-lg sm:text-2xl font-bold">Monster Hunter Wilds' true difficulty isn't the battles: it's navigating the horrible menus</header>
  </a>
  </div>
  <div class="h-64 mb-6 relative">
  <a class="[&amp;&gt;picture&gt;img]:h-full [&amp;&gt;picture&gt;img]:w-full [&amp;&gt;picture&gt;img]:object-cover" href="https://www.pcgamer.com/games/rpg/baldurs-gate-3-and-kingdom-come-deliverance-2-show-that-the-future-of-rpgs-is-in-games-way-more-ambitious-weird-and-unexpected-than-anything-bethesda-and-bioware-have-to-offer/" data-analytics-id="related-article" data-before-rewrite-localise="/games/rpg/baldurs-gate-3-and-kingdom-come-deliverance-2-show-that-the-future-of-rpgs-is-in-games-way-more-ambitious-weird-and-unexpected-than-anything-bethesda-and-bioware-have-to-offer">
  <picture data-new-v2-image="true">
  <source type="image/webp" srcset="https://cdn.mos.cms.futurecdn.net/eSYvg5oSiFkBcEbWnACspT-840-80.jpg.webp 840w, https://cdn.mos.cms.futurecdn.net/eSYvg5oSiFkBcEbWnACspT-650-80.jpg.webp 650w, https://cdn.mos.cms.futurecdn.net/eSYvg5oSiFkBcEbWnACspT-500-80.jpg.webp 500w, https://cdn.mos.cms.futurecdn.net/eSYvg5oSiFkBcEbWnACspT-450-80.jpg.webp 450w, https://cdn.mos.cms.futurecdn.net/eSYvg5oSiFkBcEbWnACspT-320-80.jpg.webp 320w" sizes="(min-width: 900px) 925px, (min-width: 700px) 450px, calc(100vw - 48px)"></source>
  <img src="https://cdn.mos.cms.futurecdn.net/eSYvg5oSiFkBcEbWnACspT-840-80.jpg" alt="A man shouting while waving his sword in Kingdom Come: Deliverance 2." srcset="https://cdn.mos.cms.futurecdn.net/eSYvg5oSiFkBcEbWnACspT-840-80.jpg 840w, https://cdn.mos.cms.futurecdn.net/eSYvg5oSiFkBcEbWnACspT-650-80.jpg 650w, https://cdn.mos.cms.futurecdn.net/eSYvg5oSiFkBcEbWnACspT-500-80.jpg 500w, https://cdn.mos.cms.futurecdn.net/eSYvg5oSiFkBcEbWnACspT-450-80.jpg 450w, https://cdn.mos.cms.futurecdn.net/eSYvg5oSiFkBcEbWnACspT-320-80.jpg 320w" sizes="(min-width: 900px) 925px, (min-width: 700px) 450px, calc(100vw - 48px)" data-original-mos="https://cdn.mos.cms.futurecdn.net/eSYvg5oSiFkBcEbWnACspT.jpg" data-pin-media="https://cdn.mos.cms.futurecdn.net/eSYvg5oSiFkBcEbWnACspT.jpg">
  </picture>
  <header class="absolute bottom-0 w-full text-neutral-100 p-2.5 m-0 bg-black/80 text-lg sm:text-2xl font-bold">Baldur's Gate 3 and Kingdom Come: Deliverance 2 show that the future of RPGs is in games way more ambitious, weird and unexpected than anything Bethesda and BioWare have to offer</header>
  </a>
  </div>
  <div class="h-64 mb-6 relative">
  <a class="[&amp;&gt;picture&gt;img]:h-full [&amp;&gt;picture&gt;img]:w-full [&amp;&gt;picture&gt;img]:object-cover" href="https://www.pcgamer.com/games/action/capcom-is-punishing-me-for-wanting-to-play-monster-hunter-wilds-with-my-friends/" data-analytics-id="related-article" data-before-rewrite-localise="/games/action/capcom-is-punishing-me-for-wanting-to-play-monster-hunter-wilds-with-my-friends">
  <picture data-new-v2-image="true">
  <source type="image/webp" srcset="https://cdn.mos.cms.futurecdn.net/6pvLhAdFqG9VnunaAiRYf7-840-80.jpg.webp 840w, https://cdn.mos.cms.futurecdn.net/6pvLhAdFqG9VnunaAiRYf7-650-80.jpg.webp 650w, https://cdn.mos.cms.futurecdn.net/6pvLhAdFqG9VnunaAiRYf7-500-80.jpg.webp 500w, https://cdn.mos.cms.futurecdn.net/6pvLhAdFqG9VnunaAiRYf7-450-80.jpg.webp 450w, https://cdn.mos.cms.futurecdn.net/6pvLhAdFqG9VnunaAiRYf7-320-80.jpg.webp 320w" sizes="(min-width: 900px) 925px, (min-width: 700px) 450px, calc(100vw - 48px)"></source>
  <img src="https://cdn.mos.cms.futurecdn.net/6pvLhAdFqG9VnunaAiRYf7-840-80.jpg" alt="Olivia, Alma and a palico" srcset="https://cdn.mos.cms.futurecdn.net/6pvLhAdFqG9VnunaAiRYf7-840-80.jpg 840w, https://cdn.mos.cms.futurecdn.net/6pvLhAdFqG9VnunaAiRYf7-650-80.jpg 650w, https://cdn.mos.cms.futurecdn.net/6pvLhAdFqG9VnunaAiRYf7-500-80.jpg 500w, https://cdn.mos.cms.futurecdn.net/6pvLhAdFqG9VnunaAiRYf7-450-80.jpg 450w, https://cdn.mos.cms.futurecdn.net/6pvLhAdFqG9VnunaAiRYf7-320-80.jpg 320w" sizes="(min-width: 900px) 925px, (min-width: 700px) 450px, calc(100vw - 48px)" data-original-mos="https://cdn.mos.cms.futurecdn.net/6pvLhAdFqG9VnunaAiRYf7.jpg" data-pin-media="https://cdn.mos.cms.futurecdn.net/6pvLhAdFqG9VnunaAiRYf7.jpg">
  </picture>
  <header class="absolute bottom-0 w-full text-neutral-100 p-2.5 m-0 bg-black/80 text-lg sm:text-2xl font-bold">Capcom is punishing me for wanting to play Monster Hunter Wilds with my friends</header>
  </a>
  </div>
  </div>
  </div>
  <footer id="comment-jump">
  </footer>
  </div>
  </div>
  <div data-widget-type="ads" id="ads-middle-1" class="clear-both widget widget-ads widget-ads-middle-1 widget-ads-ads-middle-1 widget-no-data widget-ads-flexi_ads_middle1">
  <div id="bdx_flexi_ads_middle1" data-type="ads" data-ads-type="bordeaux" class="flexi_ads_middle1"></div>
  </div>
  </div>
  <div id="widgetArea17" class="widget-area p-u-1 p-u-md-1-3 p-u-lg-1-3 widget-area-g-md-vp-1-3 widget-area-g-lg-vp-1-3 widget-area-g-xl-vp-1-3 page-widget-area-17">
  <div data-widget-type="empty" id="sidebar" class="clear-both widget widget-empty widget-sidebar widget-empty-sidebar widget-no-data widget-empty">
  </div>
  <div data-widget-type="empty" id="sidebar-top" class="clear-both widget widget-empty widget-sidebar-top widget-empty-sidebar-top ad-unit widget-no-data widget-empty">
  </div>
  <div data-widget-type="contentparsed" id="follow-us-on-google-news" class="clear-both widget widget-contentparsed widget-follow-us-on-google-news widget-contentparsed-follow-us-on-google-news widget-content-parsed widget-content-parsed-curated ">
  <div class="wcp-item-content">
  </div>
  </div>
  <div data-widget-type="empty" id="sidebar-popular-top" class="clear-both widget widget-empty widget-sidebar-popular-top widget-empty-sidebar-popular-top ad-unit widget-no-data widget-empty">
  </div>
  <div data-widget-type="dynamic" id="popular-data" class="clear-both widget widget-dynamic widget-popular-data widget-dynamic-popular-data widget-dynamic-fter-popular-box">
  <div class="clear-both widget-header">
  </div>
  <div class="wdn-fte-pb pos-relative space-t20
  ">
  <script data-id="vanilla-slice-popularBox-hydrate" type="text/javascript">
      if (window.sliceHydrationLazy) {
          window.sliceHydrationLazy("popularBox", "popularBox", JSON.stringify({"tabs":[{"tabName":"Hardware Buying Guides","articles":[{"href":"\/hardware\/handheld-gaming-pcs\/best-steam-deck-accessories-in-australia-for-year-heres-what-you-need-ahead-of-the-handhelds-imminent-launch\/","heading":"Best Steam Deck accessories in Australia for 2025: Our favorite docks, powerbanks and gamepads","image":{"src":"https:\/\/cdn.mos.cms.futurecdn.net\/GPKLkEMoKdRQ3rmKKrEzaP.jpg","alt":"A bunch of the best Steam Deck accessories on a blue background.","fullscreen":false,"lazyLoading":true,"dataHydrate":true,"addSEOMetaData":false}},{"href":"\/hardware\/gaming-laptops\/best-graphics-card-for-laptop\/","heading":"Best graphics card for laptops in 2025: the mobile GPUs I'd want in my next gaming laptop","image":{"src":"https:\/\/cdn.mos.cms.futurecdn.net\/MQJA2XZQ9gy29P57d87bqa.jpg","alt":"Asus Zephyrus G16 gaming laptop, and Nvidia Ada GPU","fullscreen":false,"lazyLoading":true,"dataHydrate":true,"addSEOMetaData":false}},{"href":"\/hardware\/gaming-pcs\/best-mini-pcs-for-gaming\/","heading":"Best mini PCs in 2025: The compact computers I love the most ","image":{"src":"https:\/\/cdn.mos.cms.futurecdn.net\/24bDLxqsYRb6RhGZ5cTQkX.jpg","alt":"Minisforum AtomMan G7 PT mini PC and AtomMan Venus UM790 mini PCs","fullscreen":false,"lazyLoading":true,"dataHydrate":true,"addSEOMetaData":false}},{"href":"\/hardware\/gaming-laptops\/best-14-inch-gaming-laptop-the-best-compact-gaming-laptops-ive-held-in-these-hands\/","heading":"Best 14-inch gaming laptop in 2025: The top compact gaming laptops I've held in these hands","image":{"src":"https:\/\/cdn.mos.cms.futurecdn.net\/x2ozJQaPBfVRMpw5CYNkVU.jpg","alt":"Asus Zephyrus G14 and TUF A14 gaming laptops","fullscreen":false,"lazyLoading":true,"dataHydrate":true,"addSEOMetaData":false}},{"href":"\/hardware\/motherboards\/best-mini-itx-motherboards\/","heading":"Best Mini-ITX motherboards in 2025: My pick from all the mini mobo marvels I've tested ","image":{"src":"https:\/\/cdn.mos.cms.futurecdn.net\/DyFgbrJFanDX8AgmeQ2uwS.jpg","alt":"Asus and ASRock Mini-ITX motherboards","fullscreen":false,"lazyLoading":true,"dataHydrate":true,"addSEOMetaData":false}}]},{"tabName":"Latest Game Reviews","articles":[{"href":"\/hardware\/graphics-cards\/amd-radeon-rx-9700-xt-review-asus-prime-oc\/","heading":"AMD Radeon RX 9070 XT review","image":{"src":"https:\/\/cdn.mos.cms.futurecdn.net\/eNLaQjvpwTwVSAtDHJiyMB.jpg","alt":"Asus Prime RX 9070 XT graphics card","fullscreen":false,"lazyLoading":true,"dataHydrate":true,"addSEOMetaData":false}},{"href":"\/games\/rpg\/suikoden-1-and-2-hd-remaster-review\/","heading":"Suikoden 1&2 HD Remaster review: Fantastic RPGs wrapped up in a middling remaster","image":{"src":"https:\/\/cdn.mos.cms.futurecdn.net\/e8dJEAP4zWVDB84Zh2xCkd.png","alt":"Suikoden 1&2 Remastered","fullscreen":false,"lazyLoading":true,"dataHydrate":true,"addSEOMetaData":false}},{"href":"\/games\/adventure\/split-fiction-review\/","heading":"Split Fiction review: A relentless parade of surprises, and one of the best co-op games around","image":{"src":"https:\/\/cdn.mos.cms.futurecdn.net\/xHbcbLorzQgRMtNsfdhTUa.jpg","alt":"Zoe showing off in front of Mio","fullscreen":false,"lazyLoading":true,"dataHydrate":true,"addSEOMetaData":false}},{"href":"\/games\/roguelike\/knights-in-tight-spaces-review\/","heading":"Knights in Tight Spaces review: John Wick meets D&D in this brutal turn-based strategy roguelike","image":{"src":"https:\/\/cdn.mos.cms.futurecdn.net\/aZyBaKBELN6ezAYWv7brE7.jpg","alt":"Three adventurers readying for battle in Knights in Tight Spaces.","fullscreen":false,"lazyLoading":true,"dataHydrate":true,"addSEOMetaData":false}},{"href":"\/hardware\/motherboards\/asrock-z890-taichi-lite-review\/","heading":"ASRock Z890 Taichi Lite motherboard review","image":{"src":"https:\/\/cdn.mos.cms.futurecdn.net\/WUteiBitZnrX4HZw8yK8Zd.jpg","alt":"A photo of an ASRock Z890 Taichi Lite motherboard","fullscreen":false,"lazyLoading":true,"dataHydrate":true,"addSEOMetaData":false}}]}]}), "https://slice.vanilla.futurecdn.net/13-2-0/js/popularBox.js");
      } else {
          console.error('%c FTE ','background: #9306F9; color: #ffffff','no lazy slice hydration function available');
      }
  </script><div id="slice-container-popularBox" class="slice-container popular-box-slice popularBox slice-container-popularBox"><section data-hydrate="true" class="popular-box"><div class="popular-box__label"><button class="popular-box__label__tab popular-box__label__tab--active" data-hydrate="true" type="button" disabled>HARDWARE BUYING GUIDES</button><button class="popular-box__label__tab " data-hydrate="true" type="button">LATEST GAME REVIEWS</button></div><ol class="popular-box__articles-list popular-box__articles-list--active"><li class="popular-box__article-list"><div class="popular-box__article-list__container"><a title="Best Steam Deck accessories in Australia for 2025: Our favorite docks, powerbanks and gamepads" class="popular-box__article-list__link" href="https://www.pcgamer.com/best-steam-deck-accessories-right-now/" data-analytics-id="popular-list" data-before-rewrite-localise="/hardware/handheld-gaming-pcs/best-steam-deck-accessories-in-australia-for-year-heres-what-you-need-ahead-of-the-handhelds-imminent-launch/"><div class="popular-box__article-list__image-wrapper"><div style="display:contents"><picture data-hydrate="true"><source class="popular-box__article-list__image image__image" type="image/webp" srcset="https://cdn.mos.cms.futurecdn.net/GPKLkEMoKdRQ3rmKKrEzaP-320-80.jpg.webp 320w, https://cdn.mos.cms.futurecdn.net/GPKLkEMoKdRQ3rmKKrEzaP-640-80.jpg.webp 640w, https://cdn.mos.cms.futurecdn.net/GPKLkEMoKdRQ3rmKKrEzaP-720-80.jpg.webp 720w, https://cdn.mos.cms.futurecdn.net/GPKLkEMoKdRQ3rmKKrEzaP-1280-80.jpg.webp 1280w" sizes="99vw" data-normal="https://vanilla.futurecdn.net/cyclingnews/media/img/missing-image.svg" data-original-mos="https://cdn.mos.cms.futurecdn.net/GPKLkEMoKdRQ3rmKKrEzaP.jpg" data-pin-media="https://cdn.mos.cms.futurecdn.net/GPKLkEMoKdRQ3rmKKrEzaP.jpg" data-pin-nopin="true" data-slice-image="true"></source><source class="popular-box__article-list__image image__image" type="image/jpeg" srcset="https://cdn.mos.cms.futurecdn.net/GPKLkEMoKdRQ3rmKKrEzaP-320-80.jpg 320w, https://cdn.mos.cms.futurecdn.net/GPKLkEMoKdRQ3rmKKrEzaP-640-80.jpg 640w, https://cdn.mos.cms.futurecdn.net/GPKLkEMoKdRQ3rmKKrEzaP-720-80.jpg 720w, https://cdn.mos.cms.futurecdn.net/GPKLkEMoKdRQ3rmKKrEzaP-1280-80.jpg 1280w" sizes="99vw" data-normal="https://vanilla.futurecdn.net/cyclingnews/media/img/missing-image.svg" data-original-mos="https://cdn.mos.cms.futurecdn.net/GPKLkEMoKdRQ3rmKKrEzaP.jpg" data-pin-media="https://cdn.mos.cms.futurecdn.net/GPKLkEMoKdRQ3rmKKrEzaP.jpg" data-pin-nopin="true" data-slice-image="true"></source><img src="https://vanilla.futurecdn.net/cyclingnews/media/img/missing-image.svg" alt="A bunch of the best Steam Deck accessories on a blue background." sizes="99vw" class="popular-box__article-list__image image__image" loading="lazy" data-normal="https://vanilla.futurecdn.net/cyclingnews/media/img/missing-image.svg" data-original-mos="https://cdn.mos.cms.futurecdn.net/GPKLkEMoKdRQ3rmKKrEzaP.jpg" data-pin-media="https://cdn.mos.cms.futurecdn.net/GPKLkEMoKdRQ3rmKKrEzaP.jpg" data-pin-nopin="true" data-slice-image="true"></picture></div></div></a><div class="popular-box__article-list__content"><div class="popular-box__article-list__number-text">1</div><div class="popular-box__article-list__heading"><a class="popular-box__article-list__link" href="https://www.pcgamer.com/best-steam-deck-accessories-right-now/" data-analytics-id="popular-list" data-before-rewrite-localise="/hardware/handheld-gaming-pcs/best-steam-deck-accessories-in-australia-for-year-heres-what-you-need-ahead-of-the-handhelds-imminent-launch/">Best Steam Deck accessories in Australia for 2025: Our favorite docks, powerbanks and gamepads</a></div></div></div></li><li class="popular-box__article-list"><div class="popular-box__article-list__container"><div class="popular-box__article-list__content" style="position:unset"><div class="popular-box__article-list__number-text">2</div><div class="popular-box__article-list__heading"><a class="popular-box__article-list__link" href="https://www.pcgamer.com/hardware/gaming-laptops/best-graphics-card-for-laptop/" data-analytics-id="popular-list" data-before-rewrite-localise="/hardware/gaming-laptops/best-graphics-card-for-laptop/">Best graphics card for laptops in 2025: the mobile GPUs I'd want in my next gaming laptop</a></div></div></div></li><li class="popular-box__article-list"><div class="popular-box__article-list__container"><div class="popular-box__article-list__content" style="position:unset"><div class="popular-box__article-list__number-text">3</div><div class="popular-box__article-list__heading"><a class="popular-box__article-list__link" href="https://www.pcgamer.com/hardware/gaming-pcs/best-mini-pcs-for-gaming/" data-analytics-id="popular-list" data-before-rewrite-localise="/hardware/gaming-pcs/best-mini-pcs-for-gaming/">Best mini PCs in 2025: The compact computers I love the most </a></div></div></div></li><li class="popular-box__article-list"><div class="popular-box__article-list__container"><div class="popular-box__article-list__content" style="position:unset"><div class="popular-box__article-list__number-text">4</div><div class="popular-box__article-list__heading"><a class="popular-box__article-list__link" href="https://www.pcgamer.com/hardware/gaming-laptops/best-14-inch-gaming-laptop-the-best-compact-gaming-laptops-ive-held-in-these-hands/" data-analytics-id="popular-list" data-before-rewrite-localise="/hardware/gaming-laptops/best-14-inch-gaming-laptop-the-best-compact-gaming-laptops-ive-held-in-these-hands/">Best 14-inch gaming laptop in 2025: The top compact gaming laptops I've held in these hands</a></div></div></div></li><li class="popular-box__article-list"><div class="popular-box__article-list__container"><div class="popular-box__article-list__content" style="position:unset"><div class="popular-box__article-list__number-text">5</div><div class="popular-box__article-list__heading"><a class="popular-box__article-list__link" href="https://www.pcgamer.com/hardware/motherboards/best-mini-itx-motherboards/" data-analytics-id="popular-list" data-before-rewrite-localise="/hardware/motherboards/best-mini-itx-motherboards/">Best Mini-ITX motherboards in 2025: My pick from all the mini mobo marvels I've tested </a></div></div></div></li></ol><ol class="popular-box__articles-list "><li class="popular-box__article-list"><div class="popular-box__article-list__container"><a title="AMD Radeon RX 9070 XT review" class="popular-box__article-list__link" href="https://www.pcgamer.com/hardware/graphics-cards/amd-radeon-rx-9700-xt-review-asus-prime-oc/" data-analytics-id="popular-list" data-before-rewrite-localise="/hardware/graphics-cards/amd-radeon-rx-9700-xt-review-asus-prime-oc/"><div class="popular-box__article-list__image-wrapper"><div style="display:contents"><picture data-hydrate="true"><source class="popular-box__article-list__image image__image" type="image/webp" srcset="https://cdn.mos.cms.futurecdn.net/eNLaQjvpwTwVSAtDHJiyMB-320-80.jpg.webp 320w, https://cdn.mos.cms.futurecdn.net/eNLaQjvpwTwVSAtDHJiyMB-640-80.jpg.webp 640w, https://cdn.mos.cms.futurecdn.net/eNLaQjvpwTwVSAtDHJiyMB-720-80.jpg.webp 720w, https://cdn.mos.cms.futurecdn.net/eNLaQjvpwTwVSAtDHJiyMB-1280-80.jpg.webp 1280w" sizes="99vw" data-normal="https://vanilla.futurecdn.net/cyclingnews/media/img/missing-image.svg" data-original-mos="https://cdn.mos.cms.futurecdn.net/eNLaQjvpwTwVSAtDHJiyMB.jpg" data-pin-media="https://cdn.mos.cms.futurecdn.net/eNLaQjvpwTwVSAtDHJiyMB.jpg" data-pin-nopin="true" data-slice-image="true"></source><source class="popular-box__article-list__image image__image" type="image/jpeg" srcset="https://cdn.mos.cms.futurecdn.net/eNLaQjvpwTwVSAtDHJiyMB-320-80.jpg 320w, https://cdn.mos.cms.futurecdn.net/eNLaQjvpwTwVSAtDHJiyMB-640-80.jpg 640w, https://cdn.mos.cms.futurecdn.net/eNLaQjvpwTwVSAtDHJiyMB-720-80.jpg 720w, https://cdn.mos.cms.futurecdn.net/eNLaQjvpwTwVSAtDHJiyMB-1280-80.jpg 1280w" sizes="99vw" data-normal="https://vanilla.futurecdn.net/cyclingnews/media/img/missing-image.svg" data-original-mos="https://cdn.mos.cms.futurecdn.net/eNLaQjvpwTwVSAtDHJiyMB.jpg" data-pin-media="https://cdn.mos.cms.futurecdn.net/eNLaQjvpwTwVSAtDHJiyMB.jpg" data-pin-nopin="true" data-slice-image="true"></source><img src="https://vanilla.futurecdn.net/cyclingnews/media/img/missing-image.svg" alt="Asus Prime RX 9070 XT graphics card" sizes="99vw" class="popular-box__article-list__image image__image" loading="lazy" data-normal="https://vanilla.futurecdn.net/cyclingnews/media/img/missing-image.svg" data-original-mos="https://cdn.mos.cms.futurecdn.net/eNLaQjvpwTwVSAtDHJiyMB.jpg" data-pin-media="https://cdn.mos.cms.futurecdn.net/eNLaQjvpwTwVSAtDHJiyMB.jpg" data-pin-nopin="true" data-slice-image="true"></picture></div></div></a><div class="popular-box__article-list__content"><div class="popular-box__article-list__number-text">1</div><div class="popular-box__article-list__heading"><a class="popular-box__article-list__link" href="https://www.pcgamer.com/hardware/graphics-cards/amd-radeon-rx-9700-xt-review-asus-prime-oc/" data-analytics-id="popular-list" data-before-rewrite-localise="/hardware/graphics-cards/amd-radeon-rx-9700-xt-review-asus-prime-oc/">AMD Radeon RX 9070 XT review</a></div></div></div></li><li class="popular-box__article-list"><div class="popular-box__article-list__container"><div class="popular-box__article-list__content" style="position:unset"><div class="popular-box__article-list__number-text">2</div><div class="popular-box__article-list__heading"><a class="popular-box__article-list__link" href="https://www.pcgamer.com/games/rpg/suikoden-1-and-2-hd-remaster-review/" data-analytics-id="popular-list" data-before-rewrite-localise="/games/rpg/suikoden-1-and-2-hd-remaster-review/">Suikoden 1&amp;2 HD Remaster review: Fantastic RPGs wrapped up in a middling remaster</a></div></div></div></li><li class="popular-box__article-list"><div class="popular-box__article-list__container"><div class="popular-box__article-list__content" style="position:unset"><div class="popular-box__article-list__number-text">3</div><div class="popular-box__article-list__heading"><a class="popular-box__article-list__link" href="https://www.pcgamer.com/games/adventure/split-fiction-review/" data-analytics-id="popular-list" data-before-rewrite-localise="/games/adventure/split-fiction-review/">Split Fiction review: A relentless parade of surprises, and one of the best co-op games around</a></div></div></div></li><li class="popular-box__article-list"><div class="popular-box__article-list__container"><div class="popular-box__article-list__content" style="position:unset"><div class="popular-box__article-list__number-text">4</div><div class="popular-box__article-list__heading"><a class="popular-box__article-list__link" href="https://www.pcgamer.com/games/roguelike/knights-in-tight-spaces-review/" data-analytics-id="popular-list" data-before-rewrite-localise="/games/roguelike/knights-in-tight-spaces-review/">Knights in Tight Spaces review: John Wick meets D&amp;D in this brutal turn-based strategy roguelike</a></div></div></div></li><li class="popular-box__article-list"><div class="popular-box__article-list__container"><div class="popular-box__article-list__content" style="position:unset"><div class="popular-box__article-list__number-text">5</div><div class="popular-box__article-list__heading"><a class="popular-box__article-list__link" href="https://www.pcgamer.com/hardware/motherboards/asrock-z890-taichi-lite-review/" data-analytics-id="popular-list" data-before-rewrite-localise="/hardware/motherboards/asrock-z890-taichi-lite-review/">ASRock Z890 Taichi Lite motherboard review</a></div></div></div></li></ol></section></div>
  </div>
  </div>
  <div data-widget-type="empty" id="sidebar-popular-bottom" class="clear-both widget widget-empty widget-sidebar-popular-bottom widget-empty-sidebar-popular-bottom ad-unit widget-no-data widget-empty">
  </div>
  </div>
  </div>

  <div id="fixed-bottom-container" class="fixed bottom-0 left-0 right-0 z-[10000] pointer-events-none" data-component-name="Global:FixedBottomContainer">
  <div class="flex items-center pointer-events-none *:pointer-events-auto">
  <span x-cloak class="m-1" data-component-name="EditInCmsLink" x-data="EditInCmsLink('pcgamer','o8nqHsjbsfS5vh5Ho4XPie')" x-html="content">
  </span>
  </div>
  </div>
  </body>

  <div class="viafoura" data-component-name="Viafoura:Notification:Tray">
  <vf-tray></vf-tray>
  </div>
  <div x-data class="relative z-[10000]" aria-labelledby="modal-title" role="dialog" x-show="$store.ViafouraAuthModal.open" x-trap.noreturn="$store.ViafouraAuthModal.open" aria-modal="true" x-cloak>
  <div x-show="$store.ViafouraAuthModal.open" x-transition:enter="ease-out duration-300" x-transition:enter-start="opacity-0" x-transition:enter-end="opacity-100" x-transition:leave="ease-in duration-200" x-transition:leave-start="opacity-100" x-transition:leave-end="opacity-0" class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
  <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
  <div class="flex min-h-full items-start justify-center p-4 text-center sm:items-center sm:p-0">
  <div x-show="$store.ViafouraAuthModal.open" x-transition:enter="ease-out duration-300" x-transition:enter-start="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" x-transition:enter-end="opacity-100 translate-y-0 sm:scale-100" x-transition:leave="ease-in duration-200" x-transition:leave-start="opacity-100 translate-y-0 sm:scale-100" x-transition:leave-end="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" class="relative transform overflow-hidden bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-sm sm:p-6" x-on:click.away="$store.ViafouraAuthModal.closeModal()" x-on:transitionend="$store.ViafouraAuthModal.modalFullyClosed()">
  <div class="absolute right-0 top-0 pr-4 pt-4">
  <button type="button" class="bg-white text-gray-400 hover:text-gray-500 border-0 focus:outline-none focus:ring-1 focus:ring-primary-300 focus:ring-offset-2" x-show="!$store.ViafouraAuthModal.showLoader" x-on:click="$store.ViafouraAuthModal.closeModal()">
  <span class="sr-only">Close</span>
  <svg class="size-6 text-gray-400 hover:text-gray-500" data-component-name="Icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewbox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"></path>
  </svg>
  </button>
  </div>
  <div>
  <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-500">
  <svg class="text-primary-200 size-6" data-component-name="Icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewbox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
  <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"></path>
  </svg>
  </div>
  <div class="mt-3 text-center sm:mt-5">
  <h3 x-show="!$store.ViafouraAuthModal.showLoader" class="text-base font-semibold text-gray-900" id="modal-title">
  Please login or signup to comment
  </h3>
  <h3 x-show="$store.ViafouraAuthModal.showLoader" class="text-base font-semibold text-gray-900">Please wait...</h3>
  </div>
  </div>
  <div class="mt-5 sm:mt-6 flex justify-center items-center flex-col">
  <div x-show="!$store.ViafouraAuthModal.showLoader" class="w-full">
  <button x-on:click="$store.ViafouraAuthModal.redirectToLogin($el)" type="button" class="block mb-3 w-full justify-center px-3 py-2 text-sm font-semibold text-white shadow-sm button-primary">
  Login
  </button>
  <button x-on:click="$store.ViafouraAuthModal.redirectToSignup($el)" type="button" class="block w-full justify-center px-3 py-2 text-sm font-semibold text-white shadow-sm button-secondary">
  Sign Up
  </button>
  </div>
  <svg class="size-10 text-gray-200 animate-spin fill-primary-600" data-component-name="Icon" x-show="$store.ViafouraAuthModal.showLoader" viewbox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path>
  </svg>
  </div>
  </div>
  </div>
  </div>
  </div>
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
