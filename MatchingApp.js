var a = {
    self: 'a',
    no: 1,
    b: true,
    c: true,
    d: true,
    i: true,
    j: true
}

var b = {
    self: 'b',
    no: 2,
    a: true,
    d: true,
    e: true
}

var c = {
    self: 'c',
    no: 3,
    d: true,
    e: true
}

var d = {
    self: 'd',
    no: 4,
    a: true,
    c: true,
    e: true,
    g: true
}

var e = {
    self: 'e',
    no: 5,
    a: true,
    b: true,
    c: true,
    d: true
}

var f = {
    self: 'f',
    no: 6,
    b: true,
    c: true,
    d: true
}

var g = {
    self: 'g',
    no: 7,
    f: true,
    i: true,
    e: true
}

var h = {
    self: 'h',
    no: 8,
    d: true,
    e: true
}

var i = {
    self: 'i',
    no: 9,
    g: true,
    d: true,
    e: true,
    j: true
}

var j = {
    self: 'j',
    no: 10,
    a: true,
    h: true,
    f: true,
    i: true
}

var matches = {}
var interest = {}
var participantsArr = [a, b, c, d, e, f, g, h, i, j]
var participantsObj = {}

console.log('_________WHO DO WE LIKE___________')
console.table(findMatchesO1(participantsArr).whoDoWeLike)

console.log('_________WHO LIKES US___________')
console.table(findMatchesO1(participantsArr).whoLikesUs)

console.log('_________MATCHES___________')
console.table(findMatchesO1(participantsArr).matches)

function findMatchesO1(participantsArr) {
    var participantNames = participantsArr.map(name => name.self)
    var preMatchObj = {}
    var whoDoWeLike = createMatchesOrInterestObj(participantNames)
    var whoLikesUs =  createMatchesOrInterestObj(participantNames)
    var matches = createMatchesOrInterestObj(participantNames)
    var i, interest, notSelfReferential, match

    participantsArr.forEach(participant => {
        var interests = Object.keys(participant)

        for (i = 0; i < interests.length; i++) {
            interest = interests[i]
            notSelfReferential = !(interest === 'no' || interest === 'self')
            
            // populate matches
            if (notSelfReferential) {
                // ensure smaller letter always comes first in match pair
                match = participant.self < interest ? participant.self + interest : interest + participant.self

                // populate matches
                if (preMatchObj[match]) {
                    matches[participant.self].push(interest)
                    matches[interest].push(participant.self)
                } else {
                    preMatchObj[match] = true
                }

                // populate whoLikesUs
                 whoLikesUs[interest].push(participant.self)

                 // populate whoDoWeLike
                 whoDoWeLike[participant.self].push(interest)
            }

        }
    })

    return {
        matches: matches,
        whoDoWeLike: whoDoWeLike,
        whoLikesUs: whoLikesUs
    }
}




// populate participantsObj
participantsArr.forEach(participant => {
    var name = participant.self
    participantsObj[name] = participant
})

var participantsNames = participantsArr.map(participant => participant.self)

// console.table(findInterests(participantsArr))
// console.table(findMatches(participantsArr))
// console.table(findMatchesFast(participantsArr))

function findInterests(participantsArr) {
    var participantsNames = participantsArr.map(name => name.self)
    var interest = createMatchesOrInterestObj(participantsNames)
    interest

    participantsNames.forEach(name => {
        participantsArr.forEach(participant => {
            if (participant[name] === true) {
                interest[name].push(participant.self)
            }
        })
    })

    return interest
}

function findMatches(participantsArr) {
    var participantsNames = participantsArr.map(name => name.self)
    var matches = createMatchesOrInterestObj(participantsNames)
    var alreadyChecked = []

    // fill in matches
    participantsArr.forEach(participant => {
        var self = participant.self
        alreadyChecked.push(self)

        participantsArr.forEach(compare => {
            var candidate = compare.self
            var skip = alreadyChecked.indexOf(candidate) < 0
            var isAMatch = participant[candidate] && compare[self]

            if (skip && isAMatch) {
                matches[self].push(candidate)
                matches[candidate].push(self)
            }
        })
    })

    return matches
}

function findMatchesFast(participantsArr) {
    // fill in matches
    var participantsNames = participantsArr.map(name => name.self)
    var matches = createMatchesOrInterestObj(participantsNames)
    var compareList = [...participantsNames].reverse()

    participantsArr.forEach(participant => {
        compareList.pop()

        compareList.forEach(name => {
            comparison = participantsObj[name]
            participantName = participant.self

            var isAMatch = participant[name] && comparison[participantName]

            if (isAMatch) {
                matches[participantName].push(name)
                matches[name].push(participantName)
            }
        })
    })

    return matches
}


function createMatchesOrInterestObj(participantsNames) {
    var obj = {}

    participantsNames.forEach(participantName => {
        // create a matches object that collects an array matches for each  participant
        if (!obj[participantName]) {
            obj[participantName] = []
        }
    })

    return obj
}