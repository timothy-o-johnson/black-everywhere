const matchingApp = require ('./MatchingApp.js')
// const matchesTest = require('./BlackAndBoodUpResponses/test-data/matches.csv')
// const responsesTest = require('./BlackAndBoodUpResponses/test-data/responses-test.csv')
// const whoLikesUsTest = require('./BlackAndBoodUpResponses/test-data/who-likes-us-test.csv')
// const whoDoWeLikeTest = require('./BlackAndBoodUpResponses/test-data/who-do-we-like-test.csv')

const matchesTestPath = './BlackAndBoodUpResponses/test-data/matches.csv'
const responsesTestPath = './BlackAndBoodUpResponses/test-data/responses-test.csv'
const whoLikesUsTestPath = './BlackAndBoodUpResponses/test-data/who-likes-us-test.csv'
const whoDoWeLikeTestPath = './BlackAndBoodUpResponses/test-data/who-do-we-like-test.csv'

const csv = require('csvtojson')
const fs = require('fs')
const { parse } = require('json2csv')



 matchesTest = await csv().fromFile(matchesTestPath)
 responsesTest = await csv().fromFile(responsesTestPath)




test ('and object with theree parameter is returns', () =>{
   var matches = JSON.stringify(matchingApp.findMatchesO1(responsesTest).matches))
    expect(JSON.stringify(matchingApp.findMatcches01(responsesTest)).toBe(matches)
})