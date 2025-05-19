// There are 7 primitive types: string, number, bigint, boolean, symbol, null and undefined.
// Object wrappers are created to allow methods to be accessed with primitives.
// The “object wrappers” are different for each primitive type and are called: 
// String, Number, Boolean, Symbol and BigInt. Thus, they provide different sets of methods.

// Take a case like this:
let str = "Hello";

console.log( str.toUpperCase() ); // HELLO

// str is a primitive, so an object is created that knows the value of str.
// The object also has methods like toUpperCase(), which returns a new string
// The object is destroyed, and str is untouched as a primitive

// It is not recommended to use object wrappers explicitly as behavior can be unexpected.
// i.e. : 
console.log( typeof 0 ); // "number"

console.log( typeof new Number(0) ); // "object"!

let zero = new Number(0);

if (zero) { // zero is true, because it's an object and objects are always truthy
  console.log( "zero is truthy!?!" );
}

// But, using the methods without new is still a good and useful thing, like in conversion:
let num = Number("123"); // convert a string to number

// One thing to poing out is that null and undefinied have no object wrappers and can be 
// considered the most primitive.