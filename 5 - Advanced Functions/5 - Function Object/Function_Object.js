// Functions are values in JavaScript, and values have types. The type of 
// functions are objects, which implies there are properties we can access,
// and we already know we can pass them by reference. 

function HelloWorld() {
    console.log("Hello World!");
}
console.log(HelloWorld.name); // HelloWorld

// Names are also assigned contextually if possible:

let HelloWorld2 = function() {
    console.log("Hello World!");
}

console.log(HelloWorld2.name); // HelloWorld2

// Functions also have a length property, which returns how many parameters it takes:
console.log(HelloWorld.length); // 0

function lengthTwo(a, b, ...rest){

}

console.log(lengthTwo.length); // 2 (rest parameters not counted)

// We can of course assign properties to functions as well. These properties need to be 
// accessed like normal object properties, so they are different from local variables:

function propTest(){
    let count = 0;
    console.log(count);
}

propTest.count = 10;
console.log(propTest.count); // 10
propTest(); // 0

// Named Function Expressions (NFEs) allow you to name functions as part of an expression:
let sayHi = function func() {
 func.HelloWorld = () => {
    console.log("Hello World");
 }   
 func.HelloWorld();
}

sayHi(); // "Hello World!"
console.log(sayHi.name); // sayHi

// As you can see above, naming the function in the expression "func" did not change it's 
// name property. It merely allows us to reference the function inside of itself, and it's
// a name that is only local to it. 