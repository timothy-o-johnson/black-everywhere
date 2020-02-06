var a = {
    self: 'a',
    b: true,
    c: true,
    d: true,
    i: true,
    j: true
}

var b = {
    self: 'b',
    a: true,
    d: true,
    e: true
}

var c = {
    self: 'c',
    d: true,
    e: true
}

var d = {
    self: 'd',
    a: true,
    c: true,
    e: true,
    g: true
}

var e = {
    self: 'e',
    a: true,
    b: true,
    c: true,
    d: true
}

var f = {
    self: 'f',
    b: true,
    c: true,
    d: true
}

var g = {
    self: 'g',
    f: true,
    i: true,
    e: true
}

var h = {
    self: 'h',
    d: true,
    e: true
}

var i = {
    self: 'i',
    g: true,
    d: true,
    e: true,
    j: true
}

var j = {
    self: 'j',
    a: true,
    h: true,
    f: true,
    i: true
}

var matches = {}
var interest = {}
var participantsArr = [a, b, c, d, e, f, g, h, i, j]
var participantsObj = {}

// populate participantsObj
participantsArr.forEach(participant => {
    var name = participant.self
    participantsObj[name] = participant
})

var participantsNames = participantsArr.map(participant => participant.self)


console.log(findInterests(participantsArr))
console.log(findMatches(participantsArr))
console.log(findMatchesFast(participantsArr))

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

    obj
    return obj
}