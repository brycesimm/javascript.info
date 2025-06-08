"use strict";
// Object properties are usually seen as simple key-value pairs, but actually 
// have more functionality underneath them. Properties have other attributes 
// in addition to value called flags, namely:
// writable - bool - can the value be changed?
// enumerable - bool - is it listed in loops?
// configurable - bool - can this property be deleted and these attributes be edited?

// When creating a property, these flags are by default set to true

// In order to get these flags, we can use the following Object method:
// let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);
// It returns a descriptor for obj's property by its name, propertyName

let user = {
  name: "John"
};

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

console.log( JSON.stringify(descriptor, null, 2 ) );
/* property descriptor:
{
  "value": "John",
  "writable": true,
  "enumerable": true,
  "configurable": true
}
*/

// To change the flags we can use:
// Object.defineProperty(obj, propertyName, descriptor)
// It applies the descriptor to obj's property named propertyName
// If the property exists, it gets updated with the descriptor; otherwise
// the property is created with the descriptor applied. If a property is 
// created this way and a flag is missing, it is assumed to be false.

user = {};

Object.defineProperty(user, "name", {
  value: "John"
});

descriptor = Object.getOwnPropertyDescriptor(user, 'name');

console.log( JSON.stringify(descriptor, null, 2 ) );
/*
{
  "value": "John",
  "writable": false,
  "enumerable": false,
  "configurable": false
}
 */

user = {
  name: "John"
};

Object.defineProperty(user, "name", {
  writable: false
});

//user.name = "Pete"; // in strict-mode: Error: Cannot assign to read only property 'name'

// Creating the property from scratch:
user = { };

Object.defineProperty(user, "name", {
  value: "John",
  // for new properties we need to explicitly list what's true
  enumerable: true,
  configurable: true
});

console.log(user.name); // John
//user.name = "Pete"; // Error

user = {
  name: "John",
  toString() {
    return this.name;
  }
};

// By default, both our properties are listed:
for (let key in user) console.log(key); // name, toString

// If we don't like the toString method to be enumerable, we set its flag to false:
Object.defineProperty(user, "toString", {
  enumerable: false
});

for (let key in user) console.log(key); // name

// Non-configurable properties are usually used for preset values that shouldn't be modified,
// like Math.PI:

descriptor = Object.getOwnPropertyDescriptor(Math, 'PI');

console.log( JSON.stringify(descriptor, null, 2 ) );
/*
{
  "value": 3.141592653589793,
  "writable": false,
  "enumerable": false,
  "configurable": false
}
*/

// We can't make it configurable again; once a property's configurable flag is 
// set to false, we can't set it to true after

// It's important to note that changing this flag only prevents deletion of the 
// property and changing the property's flags; it does not prevent changing the 
// property's value. That is what the writable flag is for.

// One minor exception to the rule is a property with configurable set to false 
// can still have its writable flag set from true to false.

// In addition to Object.defineProperty(), there is a batch method called 
// Object.defineProperties(obj, descriptors). The structure for using it is:
// Object.defineProperties(obj, {
//  prop1: descriptor1,
//  prop2: descriptor2
//   ...
// });

let user2 = { };

Object.defineProperties(user2, {
  name: { value: "John", writable: false, enumerable: true },
  surname: { value: "Smith", writable: false, enumerable: true },
  // ...
});

for (let key in user2){
    let descript = Object.getOwnPropertyDescriptor(user2, key);
    console.log(key); 
    console.log( JSON.stringify(descript, null, 2 ) );
}

// We can also get multiple descriptors at once with Object.getOwnPropertyDescriptors(obj)

// We can use this with Object.defineProperties to clone an object that is also flag-aware:
// let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));

// These flags limit access at the property level, but there are also methods that limit 
// access to entire objects (although rarely used in practice):

/*
Object.preventExtensions(obj)
Forbids the addition of new properties to the object.

Object.seal(obj)
Forbids adding/removing of properties. Sets configurable: false for all existing properties.

Object.freeze(obj)
Forbids adding/removing/changing of properties. Sets configurable: false, writable: false for all existing properties.

And also there are tests for them:

Object.isExtensible(obj)
Returns false if adding properties is forbidden, otherwise true.

Object.isSealed(obj)
Returns true if adding/removing properties is forbidden, and all existing properties have configurable: false.

Object.isFrozen(obj)
Returns true if adding/removing/changing properties is forbidden, and all current properties are configurable: false, writable: false.
*/