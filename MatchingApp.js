const csv = require('csvtojson')
const fs = require('fs')
const { parse } = require('json2csv')

var csvFilePath = './BlackAndBoodUpResponses/scorecard-responses.csv'

var jsonArray = await csv().fromFile(csvFilePath)

jsonArray

var participantsArr = jsonArray
var participantCount = participantsArr.length

// console.log('_________WHO DO WE LIKE___________')
// console.table(findMatchesO1(participantsArr).whoDoWeLike)

// console.log('_________WHO LIKES US___________')
// console.table(findMatchesO1(participantsArr).whoLikesUs)

// console.log('_________MATCHES___________')
// console.table(findMatchesO1(participantsArr).matches)

const fields = createFields()
const opts = { fields }

var matchData = findMatchesO1(participantsArr).matches
var whoLikesUsData = findMatchesO1(participantsArr).whoLikesUs
var whoDoWeLikeData = findMatchesO1(participantsArr).whoDoWeLike

matchData = convertMatchObjectToJSONObjects(matchData)
whoLikesUsData = convertMatchObjectToJSONObjects(whoLikesUsData)
whoDoWeLikeData = convertMatchObjectToJSONObjects(whoDoWeLikeData)

var matchesFileName = 'matches.csv'
var whoLikesUsFileName = 'who_likes_us.csv'
var whoDoWeLikeFileName = 'who_do_we_like.csv'

saveToFile(matchesFileName, matchData, opts)
saveToFile(whoLikesUsFileName, whoLikesUsData, opts)
saveToFile(whoDoWeLikeFileName, whoDoWeLikeData, opts)

function createFields () {
  const fields = ['Match #']

  for (var i = 0; i <= participantCount; i++) {
    fields.push(i.toString())
  }

  return fields
}

function saveToFile (fileName, data, opts) {
  try {
    data = parse(data, opts)
    console.log(data)
  } catch (err) {
    console.error(err)
  }

  fs.writeFile(fileName, data, function (err) {
    if (err) return console.log(err)
    console.log(`File saved: ${fileName}`)
  })
}

function convertMatchObjectToJSONObjects (data) {
  var jsonArr = []
  var keys = Object.keys(data)
  var jsonObj = {}
  var noOfParticipants = keys.length

  keys.forEach(key => {
    jsonObj = {}

    jsonObj['Match #'] = key
    for (var i = 0; i <= noOfParticipants; i++) {
      jsonObj[i] = data[key][i]
    }
    jsonArr.push(jsonObj)
  })

  return jsonArr
}

function findMatchesO1 (participantsArr) {
  var participantNames = participantsArr.map(name => name['ID'])
  var whoDoWeLike = createMatchesOrInterestObj(participantNames)
  var whoLikesUs = createMatchesOrInterestObj(participantNames)
  var matches = createMatchesOrInterestObj(participantNames)
  var preMatchObj = {}
  var i, interest, isInterested, match, notSelfReferential

  participantsArr.forEach(participant => {
    var interests = Object.keys(participant)

    var subject = participant['ID']
    // subject

    for (i = 0; i < interests.length; i++) {
      interest = interests[i]
      notSelfReferential = getIsSelfReferential(interest, subject)
      isInterested = participant[interest] === 'Yes'

      // populate matches
      if (notSelfReferential && isInterested) {
        // ensure smaller value always comes first in match pair
        match = subject < interest ? `${subject}-${interest}` : `${interest}-${subject}`

        if (preMatchObj[match]) {
          matches[subject].push(interest)
          matches[interest].push(subject)
        } else {
          preMatchObj[match] = true
        }

        // populate whoLikesUs
        whoLikesUs[interest].push(subject)

        // populate whoDoWeLike
        whoDoWeLike[subject].push(interest)
      }
    }
  })

  return {
    matches: matches,
    whoDoWeLike: whoDoWeLike,
    whoLikesUs: whoLikesUs
  }

  function getIsSelfReferential(interest, subject){
    return !(
        interest === 'Email Address' ||
        interest === 'ID' ||
        interest === 'Instagram Handle' ||
        interest === 'Timestamp' ||
        interest === 'Your Name' ||
        interest === subject
      )
  }
}

function createMatchesOrInterestObj (participantsNames) {
  var obj = {}

  participantsNames.forEach(participantName => {
    // create a matches object that collects an array matches for each  participant
    if (!obj[participantName]) {
      obj[participantName] = []
    }
  })

  return obj
}

module.exports = {findMatchesO1}
