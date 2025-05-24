// Plain objects offer the keys(), values(), and entries() methods like arrays, maps, and sets do.
// One distinction is they are static methods for the Object class, so we don't call them from
// instances of Object; but from the class itself:

// Note that all three methods ignore any Symbol properties!

let user = {
  name: "John",
  age: 30
};
console.log(Object.keys(user));
console.log(Object.values(user));
console.log(Object.entries(user));

// This is so that objects that might have their own keys(), values(), and/or entries() methods 
// can still function:
user.keys = function (){
    let keysArr = ['name', 'age'];
    return keysArr;
}
console.log(user.keys()); // can still function as intended

// We can also transform objects into an array of entries (using Object.entries()) to 
// perform iterable operations on them before converting them back into objects with 
// Object.fromEntries():

let prices = {
  banana: 1,
  orange: 2,
  meat: 4,
};

let doublePrices = Object.fromEntries(
  // convert prices to array, map each key/value pair into another pair
  // and then fromEntries gives back the object
  Object.entries(prices).map(entry => [entry[0], entry[1] * 2])
);

console.log(doublePrices.meat); // 8