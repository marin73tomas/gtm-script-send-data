const AWS = require('aws-sdk'),
  dynamoDb = new AWS.DynamoDB.DocumentClient(),
  errorHandler = require('../error')

module.exports = request => {
  // GET stats for specific query string parameters
  let qs = request.queryString
  if (!qs.StartDate)
    errorHandler('You must provide StartDate parameter in the request.', 400)
  if (qs.PageType === 'maker' && !qs.PageId)
    errorHandler(
      'When passing PageType of maker you must also provide parameter PageId (Maker ID).',
      400,
    )
  if (qs.PageType === 'job' && !qs.PageId)
    errorHandler(
      'When passing PageType of job you must also provide parameter PageId (Job ID).',
      400,
    )
  if (qs.PageType === 'studio' && !qs.StudioOwner)
    errorHandler(
      'When passing PageType of studio you must also provide parameter StudioOwner.',
      400,
    )
  if (qs.PageType === 'studioJobs' && !qs.StudioOwner)
    errorHandler(
      'When passing PageType of studioJobs you must also provide parameter StudioOwner.',
      400,
    )
  return dynamoDb
    .query({
      TableName: 'Analytics',
      IndexName: (() => {
        if (qs.PageType === 'maker' || qs.PageType === 'job')
          return 'PageTypeAndPageId-index'
        if (qs.PageType === 'studio' || qs.PageType === 'studioJobs')
          return 'PageTypeAndStudioOwner-index'
      })(),
      KeyConditionExpression: (() => {
        if (qs.PageType === 'maker' || qs.PageType === 'job')
          return 'PageType = :p AND PageId = :u'
        if (qs.PageType === 'studio' || qs.PageType === 'studioJobs')
          return 'PageType = :p AND StudioOwner = :so'
      })(),
      ExpressionAttributeNames: {
        '#DateTime': 'DateTime',
      },
      ExpressionAttributeValues: {
        ':p': (() => {
          if (qs.PageType === 'studioJobs') return 'job'
          else return qs.PageType
        })(),
        ':u': qs.PageId,
        ':so': qs.StudioOwner,
        ':sd': qs.StartDate,
      },
      FilterExpression: '#DateTime >= :sd',
    })
    .promise()
    .then(response => {
      let resObj = {
        totalViews: {
          count: response.Count,
          time: response.Items.reduce(
            (total, currentValue) => total + currentValue.ElapsedTime,
            0,
          ),
        },
      }
      resObj.viewedByMakers = (() => {
        let ids = []
        response.Items.forEach(i => {
          if (!ids.includes(i.UserID)) ids.push(i.UserID)
        })
        return ids
      })()
      if (qs.PageType === 'maker') {
        resObj.viewedByStudioList = (() => {
          let studioNames = []
          response.Items.forEach(i => {
            if (
              !studioNames.includes(i.StudioNameViewing) &&
              i.StudioNameViewing !== 'NULL'
            )
              studioNames.push(i.StudioNameViewing)
          })
          return studioNames
        })()
      }
      return resObj
    })
}
