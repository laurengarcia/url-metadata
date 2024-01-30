const urlMetadata = require('./../index')

// https://ogp.me/
test('og:type article', async () => {
  const url = 'https://www.nytimes.com/2024/01/26/technology/cryptocurrency-stocks-bonds-courts-move-closer-to-an-answer.html'
  try {
    const metadata = await urlMetadata(url)
    expect(metadata['article:section']).toBe('Technology')
    expect(metadata['article:opinion']).toBe('false')
    // handle multiple `article:tag` tags w/ comma delimiter:
    expect(metadata['article:tag']).toBe('Virtual Currency,Regulation and Deregulation of Industry,Decisions and Verdicts,Banking and Financial Institutions,Suits and Litigation (Civil),Corporations,Computers and the Internet,Binance,Coinbase Inc,Securities and Exchange Commission,Gensler, Gary S')
    // handle multiple `article:author` tags w/ comma delimiter:
    expect(metadata['article:author']).toBe('https://www.nytimes.com/by/matthew-goldstein,https://www.nytimes.com/by/david-yaffe-bellany')
  } catch (err) {
    expect(err).toBe(undefined)
  }
})

// https://developers.facebook.com/docs/opengraph/music/
test('og:type music.song', async () => {
  const url = 'https://open.spotify.com/track/2aSFLiDPreOVP6KHiWk4lF'
  try {
    const metadata = await urlMetadata(url)
    expect(metadata['og:type']).toBe('music.song')
    // handle multiple musicians w/ comma delimiter:
    expect(metadata['music:musician']).toBe('https://open.spotify.com/artist/1dfeR4HaWDbWqFHLkxsg1d,https://open.spotify.com/artist/0oSGxfWSnnOXhD2fKuz2Gy')
    expect(metadata['music:album']).toBe('https://open.spotify.com/album/7rq68qYz66mNdPfidhIEFa')
    expect(metadata['music:duration']).toBe('237')
    expect(metadata['music:album:track']).toBe('2')
    expect(metadata['music:release_date']).toBe('1991-10-28')
  } catch (err) {
    expect(err).toBe(undefined)
  }
})
