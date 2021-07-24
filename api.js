const ApiBuilder = require('claudia-api-builder'),
  api = new ApiBuilder()

const handlers = {
  postAnalytic: require('./handlers/analytic/postAnalytic'),
  getStats: require('./handlers/analytic/getStats'),
}

// Analytic Endpoints
api.post('/analytic', handlers.postAnalytic, { success: 201 })
api.get('/analytic/getStats', handlers.getStats)

module.exports = api
