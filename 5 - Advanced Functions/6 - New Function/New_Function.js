// We typically create new functions explicitly in our code, but sometimes we need functions to be
// dynamically defined based on parameters and specific contexts. To do so, we usually create a 
// function with the new keyword like we were instantiating any other object:
// let func = new Function ([arg1, arg2, ...argN], functionBody);

let sum = new Function('a', 'b', 'return a + b');

console.log( sum(1, 2) ); // 3

// We can define a function without parameters:
let helloWorld = new Function('console.log("Hello World!");');
helloWorld();

// So we can define function behaviors via strings passed in, which we can dictate based on context.

// When a function is defined in this way, its Environment variable isn't the one its defined in,
// like usual, but the global lexical environment. 

// So, if we were to declare a function with the new keyword inside of another function, the new
// function would not be able to access the any outer variables (even in the global envrionment):
function getFunc() {
  let value = "test";

  let func = new Function('console.log(value)');

  return func;
}

//getFunc()(); // error: value is not defined

// This is by design, because when JavaScript is published to production, it is compressed through
// a minifier that removes comments, extra spaces, and even renames variables to shorter versions.
// If a new Function was defined to look for a local variable by name, it wouldn't be able to find
// it due to the minification, and thus doesn't make sense to allow that functionality. 