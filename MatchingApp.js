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
var participantsArr = [a, b, c, d, e, f, g, h, i, j ]
var participantsObj = {}

participantsArr.forEach(participant => {
    var name = participant.self
    participantsObj[name] = participant
})

var participantsNames = participantsArr.map(participant => {
    return participant.self
})

var compareList = [...participantsNames]
var alreadyChecked = []

createMatchesAndInterestObjs()

// fill in Interests
participantsNames.forEach(name => {
    participantsArr.forEach(participant => {
        if (participant[name] === true) {
            interest[name].push(participant.self)
        }
    })
})


var count = 0
// fill in matches
participantsArr.forEach(participant => {
    //  var candidate = participantsNamesCopy.pop()
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
        count++
    })
})


count = 0
matches = {}
var comparison

createMatchesAndInterestObjs()

compareList = compareList.reverse()
// fill in matches
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
        count++
    })
})


function createMatchesAndInterestObjs() {
    participantsNames.forEach(participantName => {
        // create a matches object that collects an array matches for each  participant
        if (!matches[participantName]) {
            matches[participantName] = []
        }

        // create a Interests object collects an array of participants who have interest in each participants
        if (!interest[participantName]) {
            interest[participantName] = []
        }

    })
}