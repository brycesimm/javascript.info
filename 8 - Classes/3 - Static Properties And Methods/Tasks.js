//1. 
/* 
class Rabbit extends Object {
  constructor(name) {
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

console.log( rabbit.hasOwnProperty('name') ); // Error
*/

// Above errors because we must call the super constructor in the Rabbit class:

class Rabbit extends Object {
  constructor(name) {
    super();
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

console.log( rabbit.hasOwnProperty('name') ); // true