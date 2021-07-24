const AWS = require('aws-sdk'),
  dynamoDb = new AWS.DynamoDB.DocumentClient(),
  Referral = require('referral-parser')

module.exports = request => {
  let analyticEvent = JSON.parse(request.body)
  analyticEvent.AnalyticId = Date.now().toString()
  analyticEvent.DateTime = new Date().toISOString()
  // Parse analyticEvent.Referrer (If available)
  if (analyticEvent.Referrer) {
    let refObj = new Referral(analyticEvent.Referrer)
    analyticEvent.ReferrerDetails = refObj.refferal
  } else analyticEvent.ReferrerDetails = null
  // SAVE analytic event
  let params = {
    TableName: 'Analytics',
    Item: analyticEvent,
  }
  return dynamoDb.put(params).promise() // returns dynamo result
}
