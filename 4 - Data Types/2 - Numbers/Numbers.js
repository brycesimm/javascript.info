// Regular numbers are stored in a 64-bit format, and cannot fall outside of the bounds -(2^53-1), (2^53-1)

// We can define numbers like so:
let billion = 1000000000;
// or
billion = 1_000_000_000; // underscores are ignored, and allow readability for big numbers
// or
billion = 1e9;  // 1 billion, literally: 1 and 9 zeroes

let sevenPointThreeBil = 7.3e9;  // 7.3 billions (same as 7300000000 or 7_300_000_000)

// For small numbers we can write them like so:
let mсs = 0.000001;
// or
mcs = 1e-6; // 6 zeroes to the left including the one separated by the period

// For hexadecimal numbers we can use:
console.log( 0xff ); // 255
console.log( 0xFF ); // 255 (the same, case doesn't matter)

// Binary and octal numbering systems are supported as well:
let a = 0b11111111; // binary form of 255
let b = 0o377; // octal form of 255

console.log( a == b ); // true, the same number 255 at both sides

// For other numbering systems, parseInt will be needed

// Number.toString() will return the string representation of a number with the given base
// default is base 10:
let num = 255;

console.log( num.toString() ); // "255"
console.log( num.toString(16) );  // hexadecimal, ff
console.log( num.toString(2) );   // binary, 11111111

// Base 36 is useful for representing a number in a shorter form, where the latin alphabet
// is used to represent numbers. This can be used to create shorter URLs, for example:
console.log( 123456..toString(36) ); // 2n9c p.s. a second period is needed as the first is interpreted 
                                     // as a decimal point. Otherwise use parentheses:
console.log( (123456).toString(36) ); // 2n9c

// Rounding functions are offered, such as Math.floor(), Math.ceil(), and Math.round().
// These round to the down to an integer, rounds up to an integer, and rounds to the nearest 
// integer respectively.
// Math.trunc() removes everything after the decimal point, and is not suppored by Internet Explorer
// Keep in mind that with negative numbers, like -1.6, Math.floor() will round to -2, Math.ceil
// will round to -1, and Math.round() will round to -2. 

// To round to a certain decimal place, we can multiply by that many 0s after a 1, round it,
// and divide by the same number of 0s after the 1:
num = 1.23456; // Want to round to hundredths (place where 3 is)

console.log( Math.round(num * 100) / 100 ); // 1.23456 -> 123.456 -> 123 -> 1.23
// or
console.log( +num.toFixed(2) ); // toFixed() returns a string, so need to be careful with the result
// In the event that toFixed() is called with a number higher than there are places, 0's will be added:
console.log( +num.toFixed(7) ); //1.2345600

// If a number becomes too big for a 64-bit register to hold, it will become infinity:
console.log( 1e500 ); // Infinity

// Be careful with mathematic operations, as numbers are represented in binary form
// when computed with and can lead to precision errors:
console.log( 0.1 + 0.2 == 0.3 ); // false
console.log( 0.1 + 0.2 ); // 0.30000000000000004

// NaN, Infinity, and -Infinity have special functions to check for them:
console.log( isNaN(NaN) ); // true
console.log( isNaN("str") ); // true
console.log( isFinite("15") ); // true
console.log( isFinite("str") ); // false, because a special value: NaN
console.log( isFinite(Infinity) ); // false, because a special value: Infinity

// Number.isNaN() and Number.isFinite() are stricter versions; they don't auto-convert
// values to numbers, they first check if the value belongs to the number type first

// For converting values to number that have other values in them, we can't use + or Number()
// We have to use parseInt() or parseFloat(). They parse a number from a value until they no 
// longer can:
console.log( parseInt('100px') ); // 100
console.log( parseFloat('12.5em') ); // 12.5
console.log( parseInt('12.3') ); // 12, only the integer part is returned
console.log( parseFloat('12.3.4') ); // 12.3, the second point stops the reading
console.log( parseInt('a123') ); // NaN, the first symbol stops the process

// parseInt() also has an optional parameter "radix" which specifies the base system to parse to:
console.log( parseInt('0xff', 16) ); // 255
console.log( parseInt('ff', 16) ); // 255, without 0x also works
console.log( parseInt('2n9c', 36) ); // 123456

// Math.random() generates a number from [0,1)
// Math.max(a, b, c, ...) and Math.min(a, b, c, ...) return the biggest and smallest numbers
// Math.pow(x, n) raises x to the power of n