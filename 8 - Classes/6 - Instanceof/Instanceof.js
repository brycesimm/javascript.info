// The instanceof operator allows you to check if an object is an instance of a 
// class. It also takes inheritance into account. 
// The syntax is:
// obj instanceof Class

class Rabbit {}
let rabbit = new Rabbit();

// is it an object of Rabbit class?
console.log( rabbit instanceof Rabbit ); // true

let arr = [1, 2, 3];
console.log( arr instanceof Array ); // true
console.log( arr instanceof Object ); // true, inheritance

// If we want to customize the logic of instanceof, we implement a static method called 
// [Symbol.hasInstance](obj):

// setup instanceOf check that assumes that
// anything with canEat property is an animal
class Animal {
  static [Symbol.hasInstance](obj) {
    if (obj.canEat) return true;
  }
}

let obj = { canEat: true };

console.log(obj instanceof Animal); // true: Animal[Symbol.hasInstance](obj) is called

// Classes that don't have a [Symbol.hasInstance](obj) static method typically examine the 
// prototype chain of the object to see if any match the Class.prototype

