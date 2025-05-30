//1. 
let name = "John";

function sayHi() {
  console.log("Hi, " + name);
}

name = "Pete";

sayHi(); // what will it show: "John" or "Pete"?
// it will show Pete, because the function is aware of variables at any point in the program

//2. 
function makeWorker() {
  let name = "Pete";

  return function() {
    console.log(name);
  };
}

name = "John";

// create a function
let work = makeWorker();

// call it
work(); // what will it show?

// It will show Pete, because it will look to the inner-most environment first

//3. 
function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
}

let counter = makeCounter();
let counter2 = makeCounter();

console.log( counter() ); // 0
console.log( counter() ); // 1

console.log( counter2() ); // ?
console.log( counter2() ); // ?
// The lexical environment of makeCounter() will not be shared by the returned function.
//  Both returned functions will have different outer environments, meaning
// they will both increase their own counts when called. So counter2() will print 0 and 1.

//4. 
function Counter() {
  let count = 0;

  this.up = function() {
    return ++count;
  };
  this.down = function() {
    return --count;
  };
}

counter = new Counter();

console.log( counter.up() ); // ?
console.log( counter.up() ); // ?
console.log( counter.down() ); // ?

// The result will be 1, 2, and 1 because both functions up() and down() 
// share the same outer environment

//5. 
let phrase = "Hello";

if (true) {
  let user = "John";

  function sayHi2() {
    console.log(`${phrase}, ${user}`);
  }
}

sayHi2();

// It will print "Hello, John" if ran with node.js due to function hoisting. But,
// in strict mode this will fail because sayHi2() is declared inside a code block 
// that the sayHi2() call is not in as well.

//6. 
function sum(a){

    return function(b){
        return a + b;
    };
}

console.log(sum(2)(3)); 

// This works because sum(2) returns a function expecting another parameter,
// which we then call with the 2nd pair of parentheses and give 3 to. That 2nd
// function remembers a, and adds b to it. 

//7. 
let x = 1;

function func() {
  //console.log(x); // ?

  let x = 2;
}

func();

// func() will look into its own environment for x, and it will find it defined after the log call.
// It won't even go to the outer environment to look for the other x, it will just error

//8. 
function inBetween(a, b){
    return function(item){
        return item >= a && x <= b;
    };
}
function inArray(array){
    return function(item){
        return array.includes(item);
    }
}
let arr = [1, 2, 3, 4, 5, 6, 7];

console.log( arr.filter(inBetween(3, 6)) ); // 3,4,5,6

console.log( arr.filter(inArray([1, 2, 10])) ); // 1,2

//9. 
let users = [
  { name: "John", age: 20, surname: "Johnson" },
  { name: "Pete", age: 18, surname: "Peterson" },
  { name: "Ann", age: 19, surname: "Hathaway" }
];

function byField(property){
    return function(a, b){
        return a[property] > b[property] ? 1 : -1;
    };
}

users.sort(byField('name'));
console.log(users);
users.sort(byField('age'));
console.log(users);

//10. 
function makeArmy() {
  let shooters = [];

  let i = 0;
  while (i < 10) {
    let shooter = function() { // create a shooter function,
      console.log( i ); // that should show its number
    };
    shooters.push(shooter); // and add it to the array
    i++;
  }

  // ...and return the array of shooters
  return shooters;
}

let army = makeArmy();

// all shooters show 10 instead of their numbers 0, 1, 2, 3...
army[0](); // 10 from the shooter number 0
army[1](); // 10 from the shooter number 1
army[2](); // 10 ...and so on.

// The functions are remembering the i variable from the outer environment, not what i was
// when they were created and stored in the array. So when each is called, i is already 10
// and so each function call outputs 10. 

// This fixes it:

function makeArmy2() {
  let shooters = [];

  let i = 0;
  while (i < 10) {
    let num = i; // belongs to current loop iteration rather than makeArmy() so it is remembered
    let shooter = function() { // create a shooter function,
      console.log(num);
    };
    shooters.push(shooter); // and add it to the array
    i++;
  }

  // ...and return the array of shooters
  return shooters;
}

army = makeArmy2();

// all shooters show 10 instead of their numbers 0, 1, 2, 3...
army[0](); // 10 from the shooter number 0
army[1](); // 10 from the shooter number 1
army[2](); // 10 ...and so on.