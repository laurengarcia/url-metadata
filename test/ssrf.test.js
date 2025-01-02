const urlMetadata = require('../index')

test('favicons with public domain', async () => {
  const url = 'https://developer.apple.com/safari/resources/'
  const metadata = await urlMetadata(url, {
    requestHeaders: {
      'User-Agent': 'sparky',
      From: 'foobarred@foo.com'
    }
  })
  expect(metadata.favicons.length).toBe(3)
  expect(metadata.favicons[0].rel).toBe('shortcut icon')
  // Safari pinned tab 'mask-icons' can have 'color' attribute:
  expect(metadata.favicons[2].rel).toBe('mask-icon')
  expect(metadata.favicons[2].color).toBe('#333333')
})

test('redirect on link shortener throw error', async () => {
  const url = 'https://bit.ly/3Bg19uM'
  await expect(urlMetadata(url)).rejects.toThrow('response code 301')
})

test('redirect on link shortener dangerouslyDisableRequestFiltering true', async () => {
  const url = 'https://bit.ly/3Bg19uM'
  try {
    const metadata = await urlMetadata(url, {
      dangerouslyDisableRequestFiltering: true
    })
    expect(metadata.requestUrl).toBe(url)
    expect(metadata.url).not.toBe(url)
  } catch (err) {
    expect(err).toBe(undefined)
  }
})

test('private domain throws error', async () => {
  const url = 'http://localhost:3000'
  await expect(urlMetadata(url)).rejects.toThrow(
    'request to http://localhost:3000/ failed, reason: DNS lookup ::1(family:6, host:localhost) is not allowed. Because, It is private IP address.'
  )
})
