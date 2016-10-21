// TODO: abstract me away from here, pass in source mappings as option

/**
 * This is handy for setting the source field of content when it is hosted
 * on 3rd party sites (i.e. YouTube). Most of the keys in the `sourceMappings`
 * object are account usernames on 3rd party sites.
 */
const sourceMappings = {
  '21stcenturywiretv': '21stcenturywire.com',
  'boiling frogs post': 'boilingfrogspost.com',
  'bric tv': 'bricartsmedia.org',
  'corbettreport': 'corbettreport.com',
  'factmagazine': 'factmag.com',
  'globalwitness': 'globalwitness.org',
  'the guardian': 'theguardian.com',
  'mintpressnews': 'mintpressnews.com',
  'therealnews': 'therealnews.com',
  'remezcla': 'remezcla.com',
  'stimulator': 'submedia.tv',
  'stormcloudsgathering': 'stormcloudsgathering.com',
  'ted': 'ted.com',
  'wearechange': 'wearechange.org',
  'the young turks': 'tytnetwork.com'
}

module.exports = function (string) {
  return sourceMappings[string.toLowerCase()]
}
