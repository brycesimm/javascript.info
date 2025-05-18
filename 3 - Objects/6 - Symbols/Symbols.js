// Symbols are unique identifiers that can be added as properties
// They are useful if we want to add unique identifiers to objects 
// that are unaware of them, like third-party code. Adding an identifier
// of type int or string for instance may be unsafe, but if we add a
// symbol, it will be unaware of it and avoid any complications.

let user = { // belongs to another code
  name: "John"
};

let id = Symbol("id");

user[id] = 1;

console.log( user[id] ); // we can access the data using the symbol as the key

// Symbols can't be output as-is, if we want to log them we need to use toString():
console.log( id.toString() ); // "Symbol(id)""
// if we want the description, we output:
console.log( id.description); // "id"

// now if the third-party code's user object already had an identifier called "id", 
// it wouldn't conflict with ours because their Symbol is unique, as is ours

// to create a Symbol in an object literal, we need to place square brackets around it:

id = Symbol("id");

user = {
  name: "John",
  [id]: 123 // not "id": 123
};

// Symbols are skipped in for..in loops:
for(key in user){
    console.log(key); // only outputs name
}

// Object.assign does copy Symbols though:
id = Symbol("id");
user = {
  [id]: 123
};

let clone = Object.assign({}, user);

console.log( clone[id] ); // 123

// we can create global symbols by using Symbole.for(key).
// it will create a symbol if one doesn't exist. Global 
// Symbols also have descriptions:
// read from the global registry
let newId = Symbol.for("newId"); // if the symbol did not exist, it is created

// read it again (maybe from another part of the code)
let idAgain = Symbol.for("newId");

// the same symbol
console.log( newId === idAgain ); // true
console.log( newId.description );