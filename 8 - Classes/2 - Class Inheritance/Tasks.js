import { ExtendedClock } from "./extended-clock.js";

//1. 
class Animal {

  constructor(name) {
    this.name = name;
  }

}

class Rabbit extends Animal {
  constructor(name) {
    super(name); // super is needed here
    //this.name = name;
    this.created = Date.now();
  }
}

let rabbit = new Rabbit("White Rabbit"); 
console.log(rabbit.name);

//2. 
let extendedClock = new ExtendedClock({template: "h:m:s"}, 2000);
extendedClock.start();

setTimeout(() => extendedClock.stop(), 10000);