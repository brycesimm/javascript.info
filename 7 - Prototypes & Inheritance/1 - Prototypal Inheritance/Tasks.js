//1. 
let animal = {
  jumps: null
};
let rabbit = {
  __proto__: animal,
  jumps: true
};

console.log( rabbit.jumps ); // ? (1) true, from rabbit

delete rabbit.jumps;

console.log( rabbit.jumps ); // ? (2) null, from animal

delete animal.jumps;

console.log( rabbit.jumps ); // ? (3) undefined

//2. 
let head = {
  glasses: 1
};

let table = {
  pen: 3
};

let bed = {
  sheet: 1,
  pillow: 2
};

let pockets = {
  money: 2000
};

// pockets -> bed -> table -> head
pockets.__proto__ = bed;
bed.__proto__ = table;
table.__proto__ = head;

console.log(pockets.pen);

let start = new Date();
console.log(pockets.glasses);
let end = new Date();
console.log("pockets.glasses: " + (end - start));
start = new Date();
console.log(head.glasses);
end = new Date();
console.log("head.glasses: " + (end - start));

// Both pockets.glasses and head.glasses show either 0ms or 1ms execution times respectively. 
// Most modern platforms will cache these results so that they are about equal.

//3. 
animal = {
  eat() {
    this.full = true;
  }
};

rabbit = {
  __proto__: animal
};

rabbit.eat(); // this is passed as rabbit, and so rabbit.eat() will go to animal with this = rabbit.
// rabbit will therefore get the this.full property. 

//4. 
let hamster = {
  stomach: [],

  eat(food) {
    this.stomach.push(food);
  }
};

let speedy = {
  __proto__: hamster
};

let lazy = {
  __proto__: hamster
};

// This one found the food
speedy.eat("apple");
console.log( speedy.stomach ); // apple

// This one also has it, why? fix please.
console.log( lazy.stomach ); // apple

// lazy has apple because when eat() is called, this.stomach tries to find the stomach 
// property in the lazy object. When it doesn't find it, it looks in the prototype and 
// adds apple to the hamster object's stomach array which is then shared. If we remove 
// stomach from hamster, it will work:

hamster = {

  eat(food) {
    if(!this.stomach){
        this.stomach = [];
    }
    this.stomach.push(food);
  }
};

speedy = {
  __proto__: hamster
};

lazy = {
  __proto__: hamster
};

// This one found the food
speedy.eat("apple");
console.log( speedy.stomach ); // apple

console.log( lazy.stomach ); // undefined

// If we want both to have a stomach, then we need to add a stomach array to both 
// speedy and lazy:

speedy = {
    stomach: [],
  __proto__: hamster
};

lazy = {
    stomach: [],
  __proto__: hamster
};

// This one found the food
speedy.eat("apple");
console.log( speedy.stomach ); // apple

console.log( lazy.stomach ); // undefined