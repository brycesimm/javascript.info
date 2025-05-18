let user = new Object(); // "object constructor" syntax
user = {};  // "object literal" syntax
user = {     // an object
  name: "John",  // by key "name" store value "John"
  age: 30        // by key "age" store value 30
};

// Get property values of the object:
alert( user.name ); // John
alert( user.age ); // 30

user.isAdmin = true; // Add a boolean property isAdmin
delete user.age; // Remove age property

user = {
  name: "John",
  age: 30,
  "likes birds": true  // Multiword property name must be quoted
};

// Multiword properties must be indexed with square brackets, no . notation allowed

// set
user["likes birds"] = true;
// get
alert(user["likes birds"]); // true
// delete
delete user["likes birds"];

let user2 = {
  name: "John",
  age: 30, // Allowed to end with a comma
}

// Can use square brackets for indexing with expressions as well
let key = prompt("What do you want to know about the user?", "name");
// Access by variable
alert( user[key] ); // John (if enter "name")
// Cannot access by . notation
key = "name";
alert( user.key ) // undefined

// Computed properties
let fruit = prompt("Which fruit to buy?", "apple");

let bag = {
  [fruit]: 5, // The name of the property is taken from the variable fruit
};

alert( bag.apple ); // 5 if fruit="apple"

// Can make more complex like:
bag = {
  [fruit + 'Computers']: 5 // bag.appleComputers = 5
};

// No limits on object property names, these properties are all right even using keywords
// __proto__ property has a special exception to the rule, covered later
let obj = {
  for: 1,
  let: 2,
  return: 3
};

alert( obj.for + obj.let + obj.return );  // 6

obj = {
  0: "test" // same as "0": "test"
};

// Both alerts access the same property (the number 0 is converted to string "0")
alert( obj["0"] ); // test
alert( obj[0] ); // test (same property)

// Allowed to access properties that don't exist, just return undefined
user = {};

alert( user.noSuchProperty === undefined ); // true means "no such property"

// Use in operator to check if object has a property
user = { name: "John", age: 30 };

alert( "age" in user ); // true, user.age exists
alert( "blabla" in user ); // false, user.blabla doesn't exist

key = "age";
alert( key in user ); // true, property "age" exists

// Using in operator for finding missing properties is better than checking if a property is undefined
// E.g. when a property exists but the property itself is undefined:
object = {
  test: undefined
};

alert( obj.test ); // it's undefined, so - no such property?
alert( "test" in obj ); // true, the property does exist!

user = {
  name: "John",
  age: 30,
  isAdmin: true
};
// Allows iteration across each of the properties in an object
for (let prop in user) {
  // keys
  alert( prop );  // name, age, isAdmin
  // values for the keys
  alert( user[prop] ); // John, 30, true
}