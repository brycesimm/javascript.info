//1. 
let user = {
  name: "John Smith",
  age: 35
};

let jsonStr = JSON.stringify(user, null, 2);
console.log(jsonStr);

//2. 
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  occupiedBy: [{name: "John"}, {name: "Alice"}],
  place: room
};

// circular references
room.occupiedBy = meetup;
meetup.self = meetup;

console.log( JSON.stringify(meetup, function replacer(key, value) {
    // first call is by object wrapper where key == "" and value = meeting, need to skip
    if(value == meetup && key != ""){ 
        return undefined;
    }
  return value;
}, 2));

/* result should be:
{
  "title":"Conference",
  "occupiedBy":[{"name":"John"},{"name":"Alice"}],
  "place":{"number":23}
}
*/