
var a = {
    self: a,
    b: true,
    c: true,
    d: true
}

var b = {
    self: b,
    a: true,
    d: true,
    e: true
}

var c = {
    self: c,
    d: true,
    e: true
}

var d = {
    self: d,
    a: true,
    c: true,
    e: true
}

var e = {
    self: e,
    a: true,
    b: true,
    c: true,
    d: true
}

var matches = {}
var interest = {}
var participants = [ a, b, c, d, e]

participants.forEach( participant => {
    var interests = Object.keys(participants)


   if(!match[participant]){
       match[participant] = []
   } 

   if(!interest[participant]){
       interest[participant] = interests
   }

})

participants.forEach( participant => {
    var candidates = Object.keys(participants)

if(participant[a]){
    match[participant].push(a.self)
}

})
