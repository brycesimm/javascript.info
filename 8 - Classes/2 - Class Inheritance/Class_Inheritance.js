// Class inheritance is a way for one class to extend its own functionality by 
// inheriting it from another class. We call it extending a class, where the child 
// class in the relationship extends the parent class to inherit its methods:
class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  run(speed) {
    this.speed = speed;
    console.log(`${this.name} runs with speed ${this.speed}.`);
  }
  stop() {
    this.speed = 0;
    console.log(`${this.name} stands still.`);
  }
}

let animal = new Animal("My animal");

class Rabbit extends Animal {
  hide() {
    console.log(`${this.name} hides!`);
  }
}

let rabbit = new Rabbit("White Rabbit"); // name is passed to Animal constructor 

rabbit.run(5); // White Rabbit runs with speed 5.
rabbit.hide(); // White Rabbit hides!

// The extends keyword sets Rabbit.prototype.[[Prototype]] to Animal.prototype, 
// so anything that isn't found in Rabbit will be looked for in Animal.

// Class syntax allows us to extend more than just classes themselves, we can also 
// extend expressions that return classes:
function f(phrase) {
  return class {
    sayHi() { console.log(phrase); }
  };
}

class User extends f("Hello") {}

new User().sayHi(); // Hello

// We can also override a parent class's method by implementing a method of the same name 
// in the child class. If we still want to use the parent class's methods at some point, 
// we use super.methodName() where methodName is the name of the method to call. super() 
// calls the parent's constructor. 

class Frog extends Animal {
    constructor(name, species){
        super(name);
        this.species = species;
    }

    run(speed) {
    if(speed <= 5){
        super.run(speed);
    }else{
        console.log(`${this.name} hops with speed ${speed}.`);
    }
  }
}

let froggy = new Frog("Toady");
console.log(froggy.name);
froggy.run(10); // hops instead of runs
froggy.run(5); // runs instead of hops
froggy.stop();

// As demonstrated with the Rabbit class, when a child class does not have its own constructor, 
// a special constructor is created:
/*
    construtor(...args){
        super(...args);
    }
*/

// This passes everything passed into the child class at instantiation to the parent class's constructor.
// This is why rabbit.name works.

// When child classes do have their own constructors, they must call super(), and they must call it 
// before using "this". Looking at the Frog class, we've done just that by passing the name value to 
// super(). 

// It's important to note that if we want to override a class field in the parent class with a field 
// in the child class for use in a method/constructor inside the parent class, the parent class will 
// use its own field rather than the child's field that is meant to override it:

class Bird {
    name = "Bird";

    constructor(){
        console.log(this.name);
    }

    showName() {
        console.log(this.name);
    }
}

class Duck extends Bird {
    name = "Duck";

    showName() {
        console.log(this.name);
    }
}

let birb = new Bird(); // Bird
let ducky = new Duck(); // Bird, parent's field is used
birb.showName(); // Bird
ducky.showName(); // Duck, child's method is used

// So class fields and class methods differ in this way.

