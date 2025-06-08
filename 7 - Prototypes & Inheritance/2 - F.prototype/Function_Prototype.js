// We can make a new object by using the new keyword followed by a function 
// to use as the constructor. When doing so, we can also set an explicit 
// prototype function property that is a regular property and sets the [[Prototype]] 
// reference. 

// Every function has the prototype property, and is only used when new F() is called.
// The default prototype used if one isn't explicitly given is an object with a 
// "constructor" property that points back to the function itself:

function Rabbit() {}

/* default prototype
Rabbit.prototype = { constructor: Rabbit };
*/

console.log(Rabbit.prototype); // {}
console.log( Rabbit.prototype.constructor == Rabbit ); // true

let rabbit = new Rabbit(); // inherits from {constructor: Rabbit}

console.log(rabbit.constructor == Rabbit); // true (from prototype)