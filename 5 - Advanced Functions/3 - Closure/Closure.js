// let and const variables are only visible within the blocks they are declared in


// Nested functions are functions declared inside of another function
function sayHiBye(firstName, lastName) {

  // helper nested function to use below
  function getFullName() {
    return firstName + " " + lastName;
  }

  console.log( "Hello, " + getFullName() );
  console.log( "Bye, " + getFullName() );

}

// Functions can be returned as results or as properties of an object:
function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
}

let counter = makeCounter();

console.log( counter() ); // 0
console.log( counter() ); // 1
console.log( counter() ); // 2

// Every code block, function, and script is a part of a hidden object called the 
// Lexical Environment. The Lexical Environment consists of two parts, the 
// Environment Context, and the outer lexical environment. The Environment Context 
// is the object that variables belong to as properties. And so getting and setting
// variables is essentially getting and setting the properties of this object. 

// When the script starts, the Lexical Environment is pre-populated with all variables 
// in the uninitialized state, which means it knows about the variables but cannot 
// reference them until they are declared. Functions, on the other hand, are initialized
// and available to the lexical environment immediately. This is why we can call a function
// in a script before it is declared:

let name = "Chip";
printName(name);

function printName(name){
    console.log(name);
}

// This only applies to function declarations, and not function expressions assigned to variables. 

// When a function runs, a local lexical environment is created, which has a reference to the outer
// lexical environment, typically the global lexical environment of the script. When a function 
// accesses a variable, it searches the inner lexical environment first, and then the outer ones 
// until it searches through the global lexical environment. 

// In this example, we store the nested function in a variable. When that variable's function is
// called, a lexical environment is created which has access to the outer environment of its 
// parent function, which allows it to get the count variable:

function makeCounter2() {
  let count = 0;

  return function() {
    return count++;
  };
}

let counter2 = makeCounter2();

// In this example, the counter2() function's environment variable keeps a reference to the outer
// lexical environment. Every time counter2() is called, it grabs its outer environment reference
// from counter2. Then it searches for the count variable in its own environment, doesn't find it,
// and searches the makeCounter2() function. Then it makes the change to the variable in the 
// environment that it lives in. 

// A closure is a function that remembers its outer variables and can access them. In JavaScript,
// all functions are naturally closures due to being able to remember where they were created via
// their [Environment] property. 

// This affects garbage collection too. When a nested function is no longer reachable, it's environment 
// along with its outer environment are collected and disposed. But if a nested function is still 
// reachable, like how we assigned one to counter2, the references are maintained. 

counter2 = null; // this allows the lexical environment of the nested function to be removed

// So in theory we can see that while a function is alive, its outer variables are retained. 
// But, some modern engines try to optimize this so that if it is obvious from the code that
// a variable is not used in the function, it will be removed. A side effect of this is that 
// in some search engines like Chrome, Edge, and Opera such variables will not be available 
// during debugging:

function f() {
  let value = Math.random();

  function g() {
    debugger; // in console: type alert(value); No such variable!
  }

  return g;
}

let g = f();
g();