// Many built-in constructor functions use prototyping. For instance, when we create a new object:
let obj = {};

// This is the same as saying let obj = new Object();. Object's prototype has a constructor function 
// as well as other methods like toString():
console.log(obj.toString()); // toString() retrieved from Object.prototype

// the same thing happens for other object types like Arrays, Dates, Functions, etc.
// For instance:
let arr = [1, 2, 3]; // calls new Array(), which inherits Array.prototype that provides all of the 
// array methods

// All of these built-in prototypes have Object.prototype at the top according to the specification.
// We can verify that here by checking arr's prototype, which should be Array.prototype. Then, that 
// prototype's prototype should have a prototype of Object.prototype:

console.log(arr.__proto__ == Array.prototype); // true
console.log(arr.__proto__.__proto__ == Object.prototype); // true
console.log(arr.__proto__.__proto__.__proto__ == null); // true, Object is at the top

// As we know, arrays have their own toString() function. Since its prototype is closer in the chain 
// than Object, the Array.prototype toString() is used over the Object.prototype's

function func() {

}

console.log(func.__proto__ == Function.prototype); // true
console.log(func.__proto__.__proto__ == Object.prototype); // true
console.log(func.__proto__.__proto__.__proto__ == null); // true

// Primitive types are not objects. But, as learned in previous sections, there is a temporary object 
// wrapper that gets created using built-in constructors of String, Number, and Boolean. They provide 
// the methods and then get disposed. The methods reside in String.prototype, Number.prototype, and 
// Boolean.prototype. null and undefined do not have prototypes.

// We can modify the built-in prototypes if we wish:
String.prototype.show = function(){
    console.log(this);
}

"Hello World!".show(); // [String: 'Hello World!']

// This is, of course, generally a bad idea. If two libraries were to both add the show() function 
// to a prototype, there could be conflicts. 

// We typically limit modifying built-in prototypes to provide polyfills for backwards compatibility.

if (!String.prototype.repeat) { // if there's no such method
  // add it to the prototype

  String.prototype.repeat = function(n) {
    // repeat the string n times

    // actually, the code should be a little bit more complex than that
    // (the full algorithm is in the specification)
    // but even an imperfect polyfill is often considered good enough
    return new Array(n + 1).join(this);
  };
}

console.log( "La".repeat(3) ); // LaLaLa

// We can even borrow these methods from prototypes, such as if we had an array-like object 
// and we wanted to give it array functions:

obj = {
  0: "Hello",
  1: "world!",
  length: 2,
};

obj.join = Array.prototype.join;

console.log( obj.join(',') ); // Hello,world!

// We could also choose to set obj's prototype to Array.prototype, but if obj is already inheriting 
// from another object then that wouldn't be possible.