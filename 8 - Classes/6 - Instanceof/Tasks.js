//1. 
function A() {}
function B() {}

A.prototype = B.prototype = {};

let a = new A();

console.log( a instanceof B ); // true

// a instanceof B returns true because after line 5, both A and B share the same prototype.
// When the prototype chain is examined, we find that a's A.prototype === B.prototype and returns true;