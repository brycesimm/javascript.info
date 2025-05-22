// In addition to the methods in the previous section (push, pop, shift, unshift)
// Arrays have much more methods:

// Array.splice()

// Since arrays are objects, we can delete their elements like properties:
let arr = ["Apple", "Orange", "Grapes"];
delete arr[1];
console.log(arr); // [ 'Apple', <1 empty item>, 'Grapes' ]
console.log(arr.length); // still 3
arr[1] = "Orange";

// Above is not very clean, so instead we should use splice():
// arr.splice(start[, deleteCount, elem1, ..., elemN])
// it starts at index start, deletes "deleteCount" elements, inserts "elem1" to "elemN" in their place
arr.splice(1,1); // Start at index 1, and delete one element
console.log(arr); // [ 'Apple', 'Grapes' ]
console.log(arr.length); // 2

arr = ["I", "study", "JavaScript", "right", "now"];

// remove 3 first elements and replace them with another
arr.splice(0, 3, "Let's", "dance");
console.log( arr ); // now ["Let's", "dance", "right", "now"]

arr = ["I", "study", "JavaScript", "right", "now"];

// remove 2 first elements
let removed = arr.splice(0, 2);
console.log( removed ); // "I", "study" <-- array of removed elements

arr = ["I", "study", "JavaScript"];

// from index 2 delete 0 then insert "complex" and "language"
arr.splice(2, 0, "complex", "language");
console.log( arr ); // "I", "study", "complex", "language", "JavaScript"

// Note that if we want to insert items at the end, we need to do:
arr.splice(arr.length, 0, "end");
console.log(arr); // [ 'I', 'study', 'complex', 'language', 'JavaScript', 'end' ]

arr = [1, 2, 5];

// from index -1 (one step from the end) delete 0 elements, then insert 3 and 4
arr.splice(-1, 0, 3, 4);
console.log( arr ); // 1,2,3,4,5

/////////////////////////////////////////////////////////////////////////////////////

// Array.slice() (not to be confused with slice())

// It returns an array from a starting index to an end index, not including the end element:
arr = ["t", "e", "s", "t"];

console.log(arr.slice(0,1)); // ["t"]
console.log(arr.slice(2, arr.length)); // ["s", "t"]
console.log(arr.slice(1, 3)); // ["e", "s"];
console.log(arr.slice()); // ["t", "e", "s", "t"];

/////////////////////////////////////////////////////////////////////////////////////

// Array.concat()

// It can be used to concatenate arrays or values into arrays:

arr = [1, 2];

console.log( arr.concat([3, 4]) ); // 1,2,3,4
console.log( arr.concat([3, 4], [5, 6]) ); // 1,2,3,4,5,6
console.log( arr.concat([3, 4], 5, 6) ); // 1,2,3,4,5,6
console.log( arr.concat(3, [4, 5], 6)); // 1,2,3,4,5,6

// We can also concatenate other things like objects, booleans, etc.
let obj = {
    0: "Why?",
    length: 1
};

console.log(arr.concat(obj)); // [ 1, 2, { '0': 'Why?', length: 1 } ]
console.log(arr.concat(true)); // [ 1, 2, true ]

// A funny interaction is we can add objects like arrays if the objects have 
// [Symbol.isConcatSpreadable]: true as a property:

let arrayLike = {
  0: "something",
  1: "else",
  [Symbol.isConcatSpreadable]: true,
  length: 2
};

console.log( arr.concat(arrayLike) ); // 1,2,something,else

/////////////////////////////////////////////////////////////////////////////////////

// Array.forEach()

// Allows iterating through each element in the array and do something with the elements:

["Bilbo", "Gandalf", "Nazgul"].forEach((item, index, array) => {
  console.log(`${item} is at index ${index} in ${array}`);
});
["Bilbo", "Gandalf", "Nazgul"].forEach((item, index, array) => {
  item = item + "s";
  console.log(item);
});

/////////////////////////////////////////////////////////////////////////////////////

// Array.indexOf(), Array.lastIndexOf(), and Array.includes()

// Array.indexOf(item, from) starts at "from" index and searches on for item and returns 
// it if it is found, otherwise returns -1; USES STRICT (===) EQUALITY

// Array.includes(item, from) is similar, it starts at "from" index and searches for item
// and returns true if found, false otherwise

arr = [1, 0, false];

console.log( arr.indexOf(0) ); // 1
console.log( arr.indexOf(false) ); // 2
console.log( arr.indexOf(null) ); // -1

console.log( arr.includes(1) ); // true

// Array.lastIndexOf(item) looks for an item from the end of the array to the front and 
// returns the largest index that the item is found at, otherwise -1

let fruits = ['Apple', 'Orange', 'Apple']

console.log( fruits.indexOf('Apple') ); // 0 (first Apple)
console.log( fruits.lastIndexOf('Apple') ); // 2 (last Apple)
console.log( fruits.lastIndexOf('Grapes') ); // -1

/////////////////////////////////////////////////////////////////////////////////////

// Array.find(), Array.findIndex(), and Array.findLastIndex()

// If we need to find an element that fits some criteria, 
// Array.find(function(item, index, array) {}) works. It stops the search after the 
// function returns true and returns the element that caused true to be returned

let users = [
  {id: 1, name: "John"},
  {id: 2, name: "Pete"},
  {id: 3, name: "Mary"},
  {id: 4, name: "John"}
];

let user = users.find(item => item.id == 1);
let user2 = users.find(item => item.name == "John");

console.log(user.name); // John
console.log(user2); // { id: 1, name: 'John' } the second John object is not returned 
console.log(users.find(item => item.name == "Chip")); // undefined

console.log(users.findIndex(item => item.name == "John")); // 0
console.log(users.findIndex(item => item.name == "Chip")); // -1
console.log(users.findLastIndex(item => item.name == "John")); // 3

/////////////////////////////////////////////////////////////////////////////////////

// Array.filter()

// For cases where we need to find multiple elements fitting a certain criteria,
// we can use Array.filter(function(item, index, array) {})

let someUsers = users.filter(item => item.id < 3); // {id: 1, name: "John"}, {id: 2, name: "Pete"}

console.log(someUsers.length); // 2

/////////////////////////////////////////////////////////////////////////////////////

// Array.map()

// It calls a function for each element in the array and returns an array of the 
// results

let lengths = ["Bilbo", "Gandalf", "Nazgul"].map(item => item.length);
console.log(lengths); // 5,7,6

/////////////////////////////////////////////////////////////////////////////////////

// Array.sort() sorts a method in place, meaning you don't need to store the result
// in a variable. But, it does return the sorted array. CAUTION: it sorts elements
// as if they were strings by default

arr = [ 1, 2, 15 ];

// the method reorders the content of arr
arr.sort();

console.log( arr );  // 1, 15, 2 (Not right?) Need to provide a function for non-strings:

function compareNumeric(a, b) {
  if (a > b) return 1;
  if (a == b) return 0;
  if (a < b) return -1;
}

arr = [ 1, 2, 15 ];

arr.sort(compareNumeric);

console.log(arr);  // 1, 2, 15

// A faster way is with arrow functions:
arr = [ 1, 2, 15 ]; 

arr.sort((a, b) => a - b); // returns positive num if a > b, 0 if equal, negative num otherwise

console.log(arr);

/////////////////////////////////////////////////////////////////////////////////////

// Array.reverse()

// It reverses the order of the elements in the array in place. Also returns the 
// reversed array if needed

arr.reverse();
console.log(arr);

/////////////////////////////////////////////////////////////////////////////////////

// String.split()

// It splits a string using a delimiter value to separate the elements into an array.
// If no delimiter is given, the string is put into an array as the sole value. If 
// an empty string is given for the delimiter, the string to be split is added 
// character by character to the array. It also offers an optional parameter to limit 
// the length of the result array. 

let names = 'Bilbo, Gandalf, Nazgul';

arr = names.split(', ');

console.log(arr); // [ 'Bilbo', 'Gandalf', 'Nazgul' ]

for (let name of arr) {
  console.log( `A message to ${name}.` ); // A message to Bilbo  (and other names)
}

let testStr = "test";
console.log(testStr.split()); // [ 'test' ]
console.log(testStr.split("")); // [ 't', 'e', 's', 't' ]

arr = names.split(', ', 2);
console.log(arr); // [ 'Bilbo', 'Gandalf' ]

/////////////////////////////////////////////////////////////////////////////////////

// Array.reduce(), Array.reduceRight()

// Similar in use to Array.find() and Array.map(), 
// Array.reduce(function(accumulator, item, index, array) {}, [initial]) carries the result of the 
// function into the function of the next element and then returns that value. It reduces
// the array to a single value. [initial] is the value given for the first element's function
// to use. Array.reduceRight() does the same thing but from right to left in the array.

arr = [1, 2, 3, 4, 5];

let result = arr.reduce((sum, current) => sum + current, 0); // accum = sum, item = current, initial = 0

console.log(result); // 15

// subtracts values from left to right, initial = 2 * the element at the end to account for 
// it subtracting itself
let result2 = arr.reduceRight((sub, current) => sub - current, 2 * arr[arr.length-1]);
// 5 - 4 = 1, 1 - 3 = -2, -2 - 2 = -4, -4 - 1 = -5
console.log(result2); // -5

/////////////////////////////////////////////////////////////////////////////////////

// Array.isArray()

// It returns true if an item is an array, false otherwise

console.log(Array.isArray({})); // false
console.log(Array.isArray([])); // true