module.exports = function ({
  msg,
  statusCode,
  redirects,
  paymentRequired,
  x402
}) {
  const error = new Error(msg)
  if (statusCode) error.statusCode = statusCode
  if (redirects) error.redirects = redirects
  if (paymentRequired) error.paymentRequired = paymentRequired
  if (x402) error.x402 = x402

  return error
}
