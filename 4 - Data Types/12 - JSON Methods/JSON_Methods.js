// JSON stands for JavaScript Object Notation

// JavaScript provides two methods, JSON.stringify() and JSON.parse().
// JSON.stringify() takes an object and converts it into a JSON-encoded string:

let student = {
  name: 'John',
  age: 30,
  isAdmin: false,
  courses: ['html', 'css', 'js'],
  spouse: null
};

let json = JSON.stringify(student);

console.log(typeof json); // we've got a string!

console.log(json);
/* JSON-encoded object:
{
  "name": "John",
  "age": 30,
  "isAdmin": false,
  "courses": ["html", "css", "js"],
  "spouse": null
}
*/

// Notice that strings become surrounded by double-quotes rather than single quotes, 
// as in 'John' -> "John". Property names are also double-quoted.

// JSON.stringify() accepts primitives as well:
console.log(JSON.stringify(1)); // 1
console.log(JSON.stringify('test')); // "test"
console.log(JSON.stringify(true)); // true
console.log(JSON.stringify([1, 2, 3])); // [1, 2, 3]

// JSON.stringify() skips over function properties, symbolic properties, and properties storing undefined.
let user = {
  sayHi() { // ignored
    alert("Hello");
  },
  [Symbol("id")]: 123, // ignored
  something: undefined // ignored
};

console.log( JSON.stringify(user) ); // {} (empty object)

// The nice thing is that even nested objects are supported:
// AS LONG AS THERE ARE NO CIRCULAR REFERENCES
let meetup = {
  title: "Conference",
  room: {
    number: 23,
    participants: ["john", "ann"]
  }
};

console.log( JSON.stringify(meetup) );
/* The whole structure is stringified:
{
  "title":"Conference",
  "room":{"number":23,"participants":["john","ann"]},
}
*/
/*
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: ["john", "ann"]
};

meetup.place = room;       // meetup references room
room.occupiedBy = meetup; // room references meetup

JSON.stringify(meetup); // Error: Converting circular structure to JSON
*/

// One way to bypass circular references is to use the other parameters that 
// JSON.stringify() has to offer: JSON.stringify(value[, replacer, space]).
// Any properties listed in the replacer parameter will be the only ones encoded:
let room = {
  number: 23
};

meetup = {
  title: "Conference",
  participants: [{name: "John"}, {name: "Alice"}],
  place: room // meetup references room
};

room.occupiedBy = meetup; // room references meetup

console.log( JSON.stringify(meetup, ['title', 'participants']) );
// {"title":"Conference","participants":[{},{}]}
// this is too strict; participants' array is empty objects. 
// we can list every property name except room.occupiedBy. This
// will make it so that place.room is encoded, but it doesn't get 
// stuck in the circular reference:
console.log( JSON.stringify(meetup, ['title', 'participants', 'name' , 'place', 'number']));
/*
{
  "title":"Conference",
  "participants":[{"name":"John"},{"name":"Alice"}],
  "place":{"number":23}
}
*/

// This way of doing it can be tedious, so we can also use a function:
console.log( JSON.stringify(meetup, (key, value) => {
    console.log( `${key}: ${value}`);
    return (key == "occupiedBy") ? undefined : value;
}
));

/*
: [object Object] // first round is special made by wrapper object {"": meetup}
title: Conference
participants: [object Object],[object Object]
0: [object Object]
name: John
1: [object Object]
name: Alice
place: [object Object]
number: 23
occupiedBy: [object Object]
*/

// The space parameter of JSON.stringify() is used exclusively for prettying output
// We don't want to use it if sending it over a network to be used for something.
// The parameter tells how many spaces to use for indents:

user = {
  name: "John",
  age: 25,
  roles: {
    isAdmin: false,
    isEditor: true
  }
};

console.log( JSON.stringify(user, null, 2) );
/* two-space indents:
{
  "name": "John",
  "age": 25,
  "roles": {
    "isAdmin": false,
    "isEditor": true
  }
}
*/

/* for JSON.stringify(user, null, 4) the result would be more indented:
{
    "name": "John",
    "age": 25,
    "roles": {
        "isAdmin": false,
        "isEditor": true
    }
}
*/

// Some objects have their own toJSON methods that convert to JSON. JSON.stringify() will
// automatically call those methods. E.g., Date objects:
room = {
  number: 23
};

meetup = {
  title: "Conference",
  date: new Date(Date.UTC(2017, 0, 1)),
  room
};

console.log( JSON.stringify(meetup, null, 2) );
/*
  {
    "title":"Conference",
    "date":"2017-01-01T00:00:00.000Z",  // (1)
    "room": {"number":23}               // room does not have toJSON()
  }
*/

room.toJSON = function () {
    return this.number;
}

console.log( JSON.stringify(meetup, null, 2) );
/* 
{
  "title": "Conference",
  "date": "2017-01-01T00:00:00.000Z",
  "room": {
    "number": 23                        // stringified
  }
}
*/

/////////////////////////////////////////////////////////////////

// JSON.parse() can be used to parse an object from a string
// let value = JSON.parse(str[, reviver]);
// str is the string to parse, while reviver is a function to call
// for each value to transform it

// stringified array
let numbers = "[0, 1, 2, 3]";

numbers = JSON.parse(numbers);

console.log( typeof numbers );
console.log( numbers );
console.log( numbers[1] ); // 1

let userData = '{ "name": "John", "age": 35, "isAdmin": false, "friends": [0,1,2,3] }';

user = JSON.parse(userData);

console.log(user);

console.log( user.friends[1] ); // 1

// Frequent mistakes in JSON strings:
/*
let json = `{
  name: "John",                     // mistake: property name without quotes
  "surname": 'Smith',               // mistake: single quotes in value (must be double)
  'isAdmin': false                  // mistake: single quotes in key (must be double)
  "birthday": new Date(2000, 2, 3), // mistake: no "new" is allowed, only bare values
  "friends": [0,1,2,3]              // here all fine
}`;
*/

// When we parse this string into an object, how does JSON know that "date"
// should become a Date() object? It doesn't.
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';
console.log( JSON.parse(str) ); //{ title: 'Conference', date: '2017-11-30T12:00:00.000Z' }

// Therefore, we need to provide a function for the reviver to convert the date string
// into a Date() object:
console.log( JSON.parse(str, (key, value) => {
    return key == "date" ? new Date(value) : value // { title: 'Conference', date: 2017-11-30T12:00:00.000Z }
}));

// This works for nested objects as well:

let meetings = {
    meeting1: {id: 1, date: "2025-05-25T12:00:00.000Z"},
    meeting2: {id: 2, date: "2025-05-25T12:00:00.000Z"}
}

str = JSON.stringify(meetings);

console.log( JSON.parse(str, (key, value) => {
    return key == "date" ? new Date(value) : value 
}));
/*
{
  meeting1: { id: 1, date: 2025-05-25T12:00:00.000Z },
  meeting2: { id: 2, date: 2025-05-25T12:00:00.000Z }
}
*/