 import promptSync from 'prompt-sync';
 const prompt = promptSync();
// The basic syntax of a class is:
/*
class MyClass {
  // class methods
  constructor() { ... }
  method1() { ... }
  method2() { ... }
  method3() { ... }
  ...
}
*/

// when new MyClass() is called, the constructor is called

class User {

  constructor(name) {
    this.name = name;
  }

  sayHi() {
    console.log(this.name);
  }

}

// Usage:
let user = new User("John");
user.sayHi();

// In JavaScript, a class is a kind of function:
console.log(typeof User); // function
console.log(typeof user);

// What happens when we use class User {} is that a function named User is created, and the function 
// code is taken from the constructor. Then, its methods are put into User.prototype. When we create 
// a new User() and then use a method, the method is taken from the User.prototype so that the object 
// has access to the class methods. 

console.log(user.__proto__ == User.prototype); // user's prototype is the same as User.prototype
console.log(User == User.prototype.constructor); // User is the same as its prototype's constructor
console.log(User.prototype.sayHi.toString()); // sayHi code

// Technically a class isn't always needed since we could do the same thing with a regular function
// named User (renamed User2 due to naming conflict with the prior class):

function User2(name) {
    this.name = name;
}

User2.prototype.sayHi = function() {
    console.log(this.name);
}

let user2 = new User2("Chip");

user2.sayHi();

// There are still some differences between them, but none of which are usually relevant for 
// day to day development. Classes must always be called with new, their string representation 
// always begins with "class ...", and classes always use strict-mode. 

// Just like functions, classes can be stored as expressions to be passed by reference:

let Animal = class {
    walk() {
        console.log("Animal Walk");
    }
};

// We can also name the class expression just like with function expressions:
let Rabbit = class myRabbit {
    sayHi() {
        console.log(myRabbit);
    }
};

new Rabbit().sayHi(); // notice the new and the () after Rabbit; prints out [class myRabbit]

// We can also make classys dynamical with functions:

function makeClass(phrase){
    return class {
        sayHi(){
            console.log(phrase);
        }
    };
}

let newClass = makeClass("Hello World!");
new newClass().sayHi();

// Classes can also have getters/setters just like literal objects:

class User3 {

  constructor(name) {
    // invokes the setter
    this.name = name;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    if (value.length < 4) {
      console.log("Name is too short.");
      return;
    }
    this._name = value;
  }

}

let user3 = new User3("John");
console.log(user3.name); // John

user3 = new User3(""); // Name is too short.

// Computed method names are also allowed, although may need polyfills in older versions:
/*
class User {

  ['say' + 'Hi']() {
    console.log("Hello");
  }

}

new User().sayHi();
*/

// When we add properties to a class instead of its prototype, we are creating class fields:

class User4 {
    name = "Chip";
    age = +prompt("What is your age? ", 0);
}

user = new User4();
console.log(user.name); // Chip
console.log(User4.prototype.name); // undefined
console.log(user.age);

// Class methods can suffer the same binding issues with losing "this" when passed as references. 
// We can of course get around this by passing a wrapper function:

setTimeout(() => user2.sayHi(), 0);

// or, we can use a clever class field:

class Button {
  constructor(value) {
    this.value = value;
  }
  click = () => {
    console.log(this.value);
  }
}

let button = new Button("hello");

setTimeout(button.click, 0); // hello

// This works because arrow functions don't have their own "this", and will get it from outside of 
// their lexical environment which is the class itself