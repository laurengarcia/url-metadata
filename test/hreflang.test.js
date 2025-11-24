const urlMetadata = require('./../index')

test('extracts hreflang tags', async () => {
  try {
    // Mocked data originally from:
    // const url = 'https://addidas.com'
    const html = `
    <!DOCTYPE html>
    <html lang="en" class="theme-adidas">
      <head>
        <meta charSet="utf-8">
        <title>Black Friday Deals: Up to 60% Off | adidas US</title>
        <meta name="description" content="Shop Black Friday deals and save up to 60% off! Don&#x27;t wait to save on adidas favorites that will be the highlight of the season.">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="icon" href="/static/glass/plp/plp-app/favicon.ico">
        <meta name="apple-itunes-app" data-auto-id="native-iOS-banner" content="app-id=1266591536, app-argument=/">
        <meta name="robots" content="noindex,follow"><meta property="og:title" content="Black Friday Deals: Up to 60% Off | adidas US">
        <meta property="og:description" content="Shop Black Friday deals and save up to 60% off! Don&#x27;t wait to save on adidas favorites that will be the highlight of the season.">
        <meta property="og:site_name" content="adidas US">
        <meta property="og:url" content="https://www.adidas.com/us/black_friday">
        <link rel="canonical" href="https://www.adidas.com/us/black_friday">

        <!-- Test both "hrefLang" and "hreflang" variations -->
        <link rel="alternate" href="https://www.adidas.at/black_friday" hrefLang="de-AT">
        <link rel="alternate" href="https://www.adidas.be/en/black_friday" hreflang="en-BE">

        <link rel="alternate" href="https://www.adidas.be/fr/black_friday" hrefLang="fr-BE">
        <link rel="alternate" href="https://www.adidas.be/nl/black_friday" hrefLang="nl-BE">
        <link rel="alternate" href="https://www.adidas.ca/en/black_friday" hrefLang="en-CA">
        <link rel="alternate" href="https://www.adidas.ca/fr/black_friday" hrefLang="fr-CA">
        <link rel="alternate" href="https://www.adidas.ch/de/black_friday" hrefLang="de-CH">
        <link rel="alternate" href="https://www.adidas.ch/en/black_friday" hrefLang="en-CH">
        <link rel="alternate" href="https://www.adidas.ch/fr/black_friday" hrefLang="fr-CH">
        <link rel="alternate" href="https://www.adidas.ch/it/black_friday" hrefLang="it-CH">
        <link rel="alternate" href="https://www.adidas.cl/black_friday" hrefLang="es-CL">
        <link rel="alternate" href="https://www.adidas.co/black_friday" hrefLang="es-CO">
        <link rel="alternate" href="https://www.adidas.co.in/black_friday" hrefLang="en-IN">
        <link rel="alternate" href="https://www.adidas.co.kr/black_friday" hrefLang="ko-KR">
        <link rel="alternate" href="https://www.adidas.co.nz/black_friday" hrefLang="en-NZ">
        <link rel="alternate" href="https://www.adidas.co.th/en/black_friday" hrefLang="en-TH">
        <link rel="alternate" href="https://www.adidas.co.th/th/black_friday" hrefLang="th-TH">
        <link rel="alternate" href="https://www.adidas.co.uk/black_friday" hrefLang="en-GB">
        <link rel="alternate" href="https://www.adidas.com.au/black_friday" hrefLang="en-AU">
        <link rel="alternate" href="https://www.adidas.com.br/black_friday" hrefLang="pt-BR">
        <link rel="alternate" href="https://www.adidas.com.my/en/black_friday" hrefLang="en-MY">
        <link rel="alternate" href="https://www.adidas.com.ph/black_friday" hrefLang="en-PH">
        <link rel="alternate" href="https://www.adidas.com.sg/black_friday" hrefLang="en-SG">
        <link rel="alternate" href="https://www.adidas.com.tr/en/black_friday" hrefLang="en-TR">
        <link rel="alternate" href="https://www.adidas.com.tr/tr/black_friday" hrefLang="tr-TR">
        <link rel="alternate" href="https://www.adidas.com.vn/en/black_friday" hrefLang="en-VN">
        <link rel="alternate" href="https://www.adidas.com.vn/vi/black_friday" hrefLang="vi-VN">
        <link rel="alternate" href="https://www.adidas.com/us/black_friday" hrefLang="en-US">
        <link rel="alternate" href="https://www.adidas.cz/black_friday" hrefLang="cs-CZ">
        <link rel="alternate" href="https://www.adidas.de/cyber_woche" hrefLang="de-DE">
        <link rel="alternate" href="https://www.adidas.de/en/cyber_week" hrefLang="en-DE">
        <link rel="alternate" href="https://www.adidas.dk/black_friday" hrefLang="da-DK">
        <link rel="alternate" href="https://www.adidas.es/black_friday" hrefLang="es-ES">
        <link rel="alternate" href="https://www.adidas.fi/black_friday" hrefLang="en-FI">
        <link rel="alternate" href="https://www.adidas.fr/black_friday" hrefLang="fr-FR">
        <link rel="alternate" href="https://www.adidas.gr/black_friday" hrefLang="el-GR">
        <link rel="alternate" href="https://www.adidas.ie/black_friday" hrefLang="en-IE">
        <link rel="alternate" href="https://www.adidas.it/black_friday" hrefLang="it-IT">
        <link rel="alternate" href="https://www.adidas.mx/black_friday" hrefLang="es-MX">
        <link rel="alternate" href="https://www.adidas.nl/black_friday" hrefLang="nl-NL">
        <link rel="alternate" href="https://www.adidas.no/black_friday" hrefLang="no-NO">
        <link rel="alternate" href="https://www.adidas.pe/black_friday" hrefLang="es-PE">
        <link rel="alternate" href="https://www.adidas.pl/black_friday" hrefLang="pl-PL">
        <link rel="alternate" href="https://www.adidas.pt/black_friday" hrefLang="pt-PT">
        <link rel="alternate" href="https://www.adidas.se/black_friday" hrefLang="sv-SE">
        <link rel="alternate" href="https://www.adidas.sk/black_friday" hrefLang="sk-SK">
        <link rel="alternate" href="https://www.adidas.sa/en/white-friday-sale" hrefLang="en-SA">
        <link rel="alternate" href="https://www.adidas.sa/ar/white-friday-sale" hrefLang="ar-SA">
        <link rel="alternate" href="https://www.adidas.ae/en/white-friday-sale" hrefLang="en-AE">
        <link rel="alternate" href="https://www.adidas.com.eg/en/white-friday-sale" hrefLang="en-EG">
        <link rel="alternate" href="https://www.adidas.com.eg/ar/white-friday-sale" hrefLang="ar-EG">
        <link rel="alternate" href="https://www.adidas.co.ma/fr/white-friday-sale" hrefLang="fr-MA">
        <link rel="alternate" href="https://www.adidas.co.ma/ar/white-friday-sale" hrefLang="ar-MA">
        <link rel="alternate" href="https://www.adidas.com/kw/ar/white-friday-sale" hrefLang="ar-KW">
        <link rel="alternate" href="https://www.adidas.com/kw/en/white-friday-sale" hrefLang="en-KW">
        <link rel="alternate" href="https://www.adidas.com/om/ar/white-friday-sale" hrefLang="ar-OM">
        <link rel="alternate" href="https://www.adidas.com/om/en/white-friday-sale" hrefLang="en-OM">
        <link rel="alternate" href="https://www.adidas.com/bh/ar/white-friday-sale" hrefLang="ar-BH">
        <link rel="alternate" href="https://www.adidas.com/bh/en/white-friday-sale" hrefLang="en-BH">
        <link rel="alternate" href="https://www.adidas.com/qa/ar/white-friday-sale" hrefLang="ar-QA">
        <link rel="alternate" href="https://www.adidas.com/qa/en/white-friday-sale" hrefLang="en-QA">
        <link rel="alternate" href="https://www.adidas.co.za/black_friday" hrefLang="en-ZA">
        <link rel="alternate" href="https://www.adidas.co.il/en/black_friday" hrefLang="en-IL">
        <link rel="alternate" href="https://www.adidas.co.il/he/black_friday" hrefLang="he-IL">
        <link rel="alternate" href="https://www.adidas.com/cr/es/black_friday" hrefLang="es-CR">
        <link rel="alternate" href="https://www.adidas.com/ec/es/black_friday" hrefLang="es-EC">
        <link rel="alternate" href="https://www.adidas.jp/ブラックフライデーセール" hrefLang="ja-JP">
      </head>
      <body>
        NADA
      </body>
    </html>
    `
    const response = new Response(html, {
      headers: {
        'Content-Type': 'text/html'
      }
    })
    const metadata = await urlMetadata(null, {
      parseResponseObject: response
    })
    expect(metadata.hreflang.length).toBeGreaterThan(10)
    expect(metadata.hreflang[0].hreflang).toBe('de-AT')
    expect(metadata.hreflang[1].hreflang).toBe('en-BE')
    expect(metadata.hreflang[0].href).toBe('https://www.adidas.at/black_friday')
    expect(metadata.hreflang[1].href).toBe('https://www.adidas.be/en/black_friday')
  } catch (err) {
    expect(err).toBe(undefined)
  }
})
