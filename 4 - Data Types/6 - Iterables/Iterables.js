// Different data types are iterable aside from arrays. Lists, objects, strings etc. are iterable too
// Iterables are objects that implement the Symbol.iterator() method
// Array-likes, are objects that have indexes and a length; which make them look like Arrays

// Objects

// We can add a Symbol.iterator function property to an object to allow iterations on it. 
// The function needs to return an object with properties "current", "last", and function next().
// Function next() should return an object with a boolean property "done" and a "value" property 
// holding the next value in the iteration:

let range = {
  from: 1,
  to: 5
};

// 1. call to for..of initially calls this
range[Symbol.iterator] = function() {

  // ...it returns the iterator object:
  // 2. Onward, for..of works only with the iterator object below, asking it for next values
  return {
    current: this.from,
    last: this.to,

    // 3. next() is called on each iteration by the for..of loop
    next() {
      // 4. it should return the value as an object {done:.., value :...}
      if (this.current <= this.last) {
        return { done: false, value: this.current++ };
      } else {
        return { done: true };
      }
    }
  };
};

// now it works!
for (let num of range) {
  console.log(num); // 1, then 2, 3, 4, 5
}

// Strings

// character by character
for (let char of "test") {
  // triggers 4 times: once for each character
  console.log( char ); // t, then e, then s, then t
}

// calling iterator explicitly
let str = "Hello";

let iterator = str[Symbol.iterator]();

while (true) {
  let result = iterator.next();
  if (result.done) break;
  console.log(result.value); // outputs characters one by one
}

// Strings are iterables and array-likes since they implement the Symbol.iterator() method, have 
// indices, and have lengths

// Iterables may not be array-like and array-likes may not be iterable

// E.g. an arraylike that is not iterable:
let arrayLike = { // has indexes and length => array-like
  0: "Hello",
  1: "World",
  length: 2
};

// If we want to use arrayLike like an array, which is iterable, we can use Array.from():
let arr = Array.from(arrayLike);
console.log(arr); // [ 'Hello', 'World' ] length = 2

// We can also turn an iterable (like range which is an obj that implements Symbol.iterator above) 
// into an array:
let arr2 = Array.from(range); 
console.log(arr2); // [ 1, 2, 3, 4, 5 ]

// Array.from() has an optional second parameter that allows us to call a mapping function
// for each element before it is added to the array:
let arr3 = Array.from(range, num => num * num);
console.log(arr3); // [ 1, 4, 9, 16, 25 ]

// Don't forget, since strings are iterable, we can turn them into arrays too:
let strArr = Array.from(str);
console.log(strArr); // [ 'H', 'e', 'l', 'l', 'o' ]