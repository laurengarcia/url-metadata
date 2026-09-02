module.exports = function ({
  msg,
  requestUrl,
  redirects,
  url,
  statusCode,
  paymentRequired,
  x402,
  notFollowedRedirect
}) {
  const error = new Error(msg)
  if (requestUrl) error.requestUrl = requestUrl
  if (redirects) error.redirects = redirects
  if (url) error.url = url
  if (statusCode) error.statusCode = statusCode
  if (paymentRequired) error.paymentRequired = paymentRequired
  if (x402) error.x402 = x402
  if (notFollowedRedirect) error.notFollowedRedirect = notFollowedRedirect

  return error
}
