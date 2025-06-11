// Sometimes we want to combine functionalities of classes without utilizing inheritance. 
// One way we can accomplish this is by using mixins, which means that we copy (assign) 
// the mixin to the class's prototype so that instances of that class gain access to the 
// new methods:

// mixin
let sayHiMixin = {
  sayHi() {
    console.log(`Hello ${this.name}`);
  },
  sayBye() {
    console.log(`Bye ${this.name}`);
  }
};

// usage:
class User {
  constructor(name) {
    this.name = name;
  }
}

// copy the methods
Object.assign(User.prototype, sayHiMixin);

// now User can say hi
new User("Dude").sayHi(); // Hello Dude!

// This also allows User to extend another class if needed