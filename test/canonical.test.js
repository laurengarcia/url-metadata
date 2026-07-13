const urlMetadata = require('./../index')

test('single canonical tag', async () => {
  try {
    const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>Single Canonical</title>
        <link rel="icon" href="/favicon.ico">
        <link rel="canonical" href="https://example.com/preferred-page">
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
    expect(metadata.canonical).toBe('https://example.com/preferred-page')
    expect(metadata.canonicalUrls.length).toBe(1)
    expect(metadata.canonicalUrls[0]).toBe('https://example.com/preferred-page')
  } catch (err) {
    expect(err).toBe(undefined)
  }
})

test('no canonical tag', async () => {
  try {
    const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>No Canonical</title>
        <link rel="icon" href="/favicon.ico">
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
    expect(metadata.canonical).toBe('')
    expect(Array.isArray(metadata.canonicalUrls)).toBe(true)
    expect(metadata.canonicalUrls.length).toBe(0)
  } catch (err) {
    expect(err).toBe(undefined)
  }
})

test('multiple canonical tags: canonical resolves to first in document order', async () => {
  try {
    // Regression test: previously the last <link rel="canonical"> tag on
    // the page would win, since the old implementation's guard only
    // checked before entering the loop, not on each iteration. Canonical
    // should always resolve to the FIRST occurrence in document order.
    const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>Multiple Canonicals</title>
        <link rel="canonical" href="https://example.com/first-page">
        <link rel="alternate" href="https://example.com/en/first-page" hreflang="en">
        <link rel="canonical" href="https://example.com/second-page">
        <link rel="canonical" href="https://example.com/third-page">
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
    expect(metadata.canonical).toBe('https://example.com/first-page')
    expect(metadata.canonicalUrls.length).toBe(3)
    expect(metadata.canonicalUrls[0]).toBe('https://example.com/first-page')
    expect(metadata.canonicalUrls[1]).toBe('https://example.com/second-page')
    expect(metadata.canonicalUrls[2]).toBe('https://example.com/third-page')
  } catch (err) {
    expect(err).toBe(undefined)
  }
})

test('canonical tag missing href attribute is ignored', async () => {
  try {
    const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>Malformed Canonical</title>
        <link rel="canonical">
        <link rel="canonical" href="https://example.com/valid-page">
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
    expect(metadata.canonical).toBe('https://example.com/valid-page')
    expect(metadata.canonicalUrls.length).toBe(1)
    expect(metadata.canonicalUrls[0]).toBe('https://example.com/valid-page')
  } catch (err) {
    expect(err).toBe(undefined)
  }
})

test('duplicate identical canonical tags are not deduplicated', async () => {
  try {
    // canonicalUrls is a raw extraction on purpose: it's the audit layer's
    // job to decide whether identical duplicates matter, not this
    // package's. Confirm we don't silently dedupe here.
    const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>Duplicate Identical Canonicals</title>
        <link rel="canonical" href="https://example.com/same-page">
        <link rel="canonical" href="https://example.com/same-page">
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
    expect(metadata.canonical).toBe('https://example.com/same-page')
    expect(metadata.canonicalUrls.length).toBe(2)
  } catch (err) {
    expect(err).toBe(undefined)
  }
})
