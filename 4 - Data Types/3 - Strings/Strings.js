// Strings can be made with single quotes (''), double quotes (""), or backticks (``)
// backticks allow code to be inserted:
function sum( a, b ){
    return a + b;
}
let num = 5;
let num2 = 7;
let string = `Numbers are ${num} and ${num2}`;
let summed = `Summed is ${sum(num, num2)}`;
console.log(string);
console.log(summed);

// backtick strings can span multiple lines, but regular quoted strings need special characters:
let backtickStr = `Line 1
Line 2`; // Be careful; spaces, tabs, and new lines do get outputed in the string
let normalStr = "Line 1\nLine 2";

console.log(backtickStr);
console.log(normalStr);

console.log( backtickStr == normalStr); // Look different, but are actually the same

// Special characters need to be escaped with \, and it is important to remember that
// escaped characters count as one as in the following example:
console.log( `My\n`.length ); // 3

// We can access characters at specific positions as well using square brackets or the 
// str.at(pos) function:
let str = "ABCDEF"; // 6 characters
let charOne = str[0];
let charLast = str[str.length - 1];
console.log(charOne);
console.log(charLast);
charOne = str.at(0);
charLast = str.at(str.length - 1);
console.log(charOne);
console.log(charLast);

// Various string method demonstration:
console.log("big".toUpperCase());
console.log("LITTLE".toLowerCase()); // BIG
console.log("Chicken".substring(0, 5)); // little
console.log("Hello".indexOf("l")); // 2
console.log("Hello".indexOf("L")); // -1
console.log("Hello".indexOf("B")); // -1
console.log("Hello".indexOf("l", 3)); // 3, search for l starting at index 3

// When using indexOf() to check if a string exists in a string, be sure to check for -1 rather
// than using the value returned alone in an if statement:
str = "Widget with id";

if (str.indexOf("Widget")) {
    console.log("We found it"); // doesn't work! indexOf returns 0 which is falsy
}

// Instead, check for -1:
if (str.indexOf("Widget") != -1) {
    console.log("We found it");
}

console.log("Hello there".includes("Hello")); // true
console.log("Hello there".includes("here", 6)); // true, start looking at position six
console.log("Hello there".startsWith("Hello")); // true
console.log("Hello there".endsWith("there")); // true

str = "string";
console.log(str.slice(0, str.length - 1)); // strin because slice is exclusive at the end position
console.log(str.slice(0, str.length)); // string
console.log(str.slice(2)); // ring
console.log(str.slice(-4, -1)); // rin (negative numbers read backwards from the end of the string)

console.log(str.substring(0, str.length - 1)); // strin
console.log(str.substring(0, str.length)); // string
console.log(str.substring(6, 2)); // ring, substring swaps values if they start is greater
// substring does not support negative numbers though

console.log(str.substr(-4, 5)); // ring, but this function is deprecated

// In comparing strings, they are compared character by character. And lower case characters
// are greater than upper case:
console.log('a' > 'A');