module.exports = function (
  msg,
  statusCode,
  paymentRequired,
  x402
) {
  const error = new Error(msg)
  if (statusCode) error.statusCode = statusCode
  if (paymentRequired) error.paymentRequired = paymentRequired
  if (x402) error.x402 = x402
  return error
}
