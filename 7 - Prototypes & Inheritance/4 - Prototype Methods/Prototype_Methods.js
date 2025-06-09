// As discussed prior, using the __proto__ property is outdated and generally frowned upon, and there
// are methods that are recommended to be used for getting and setting a prototype:
// Object.getPrototypeOf(obj) – returns the [[Prototype]] of obj.
// Object.setPrototypeOf(obj, proto) – sets the [[Prototype]] of obj to proto. 
// The only use of __proto__ that isn't frowned upon is when it is used in explicit object declaration:
/*
let obj = {
    __proto__ : ...
}
*/

// Technically, there is a method for doing this too:
// Object.create(proto[, descriptors])

let animal = {
  eats: true
};

// create a new object with animal as a prototype
let rabbit = Object.create(animal); // same as {__proto__: animal}

console.log(rabbit.eats); // true

console.log(Object.getPrototypeOf(rabbit) === animal); // true

Object.setPrototypeOf(rabbit, {}); // change the prototype of rabbit to {}

// We can also use Object.create with a descriptor:
rabbit = Object.create(animal, {
  jumps: {
    value: true
  }
});

console.log(rabbit.jumps); // true

// This allows even better cloning than before:
// let clone = Object.create(
//   Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj)
// );