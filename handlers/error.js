const ApiBuilder = require('claudia-api-builder')

module.exports = (message, httpCode) => {
  throw new ApiBuilder.ApiResponse(
    {
      errorMessage: message,
    },
    { 'Content-Type': 'application/json' },
    httpCode,
  )
}