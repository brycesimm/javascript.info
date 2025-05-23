// Map is a keyed collection type like objects, but maps allow any type for keys

/*
Methods and properties are:

new Map() – creates the map.
map.set(key, value) – stores the value by the key.
map.get(key) – returns the value by the key, undefined if key doesn’t exist in map.
map.has(key) – returns true if the key exists, false otherwise.
map.delete(key) – removes the element (the key/value pair) by the key.
map.clear() – removes everything from the map.
map.size – returns the current element count.
*/

let map = new Map();
let obj = { 
    name: "Chip"
};

map.set('1', 'str1');   // a string key
map.set(1, 'num1');     // a numeric key
map.set(true, 'bool1'); // a boolean key
map.set(obj, 'Chip'); // an object key

// remember the regular Object? it would convert keys to string
// Map keeps the type, so these two are different:
console.log( map.get(1)   ); // 'num1'
console.log( map.get('1') ); // 'str1'
console.log( map.get(true) ); // 'bool1'
console.log( map.get(obj) ); // 'Chip'
console.log( map.size ); // 3

// Disclaimer, while map[key] works, it implies it is an object with limitations, so it is 
// better to use its get/set methods instead

// map.set() also returns itself, so we can chain the calls
map.set('1', 'str1').set(1, 'num1').set(true, 'bool1').set(obj, 'Chip');

console.log( map.get(1)   ); // 'num1'
console.log( map.get('1') ); // 'str1'
console.log( map.get(true) ); // 'bool1'
console.log( map.get(obj) ); // 'Chip'
console.log( map.size ); // 3

// To iterate over a map, 4 methods are available for use in for..of loops: map.keys(), 
// map.values(), and map.entries() map.keys() iterates over all of the keys, map.values() 
// iterates over all of the values, and map.entries() iterates over the key-value pairs. 
// map.entries() is used by default in a for..of loop:

let recipeMap = new Map([
  ['cucumber', 500],
  ['tomatoes', 350],
  ['onion',    50]
]);

// iterate over keys (vegetables)
for (let vegetable of recipeMap.keys()) {
  console.log(vegetable); // cucumber, tomatoes, onion
}

// iterate over values (amounts)
for (let amount of recipeMap.values()) {
  console.log(amount); // 500, 350, 50
}

// iterate over [key, value] entries
for (let entry of recipeMap) { // the same as of recipeMap.entries()
  console.log(entry); // cucumber,500 (and so on)
}

// map.forEach() is also offered:
// runs the function for each (key, value) pair
recipeMap.forEach( (value, key, map) => {
  console.log(`${key}: ${value}`); // cucumber: 500 etc
});

// maps can be initialized with values by providing an iterable in its constructor call:

// array of [key, value] pairs
map = new Map([
  ['1',  'str1'],
  [1,    'num1'],
  [true, 'bool1']
]);

console.log( map.get('1') ); // str1

// For a plain object that we need to convert to a map, we can use Object.entries():
obj = {
  name: "John",
  age: 30
};
map = new Map(Object.entries(obj));

console.log( map.get('name') ); // John

// We can also do the reverse to create an object from an array of key-value pairs 
// with Object.fromEntries():

let newObj = Object.fromEntries(map.entries());
console.log(newObj);

// Because Object.fromEntries() expects any iterable object (not necessarily an array), we can
// also just pass the map directly:
newObj = Object.fromEntries(map);
console.log(newObj);