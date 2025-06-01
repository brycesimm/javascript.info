// The Global Object is the object at the very top of the lexical
// environment hierarchy, and includes variables, functions, etc. 
// as its properties. In a browser it may be called window, and in
// node.js it may be called global. globalThis has been added to the
// standard and should be supported in most environments

globalThis.console.log("Hello World!"); // outputs just as console.log alone would

var testVar = 5;

console.log(globalThis.testVar); // undefined, may work in a browser though

let test = 5;

console.log(globalThis.test); // undefined, doesn't work for let/const regardless

// We can make things explicitly a global property (although risky and discouraged) by doing:
globalThis.helloWorld = "Hello World!";

console.log(globalThis.helloWorld); // Hello World!
console.log(helloWorld); // Hello World!

// This can be useful for providing polyfills for features not available in old browsers,
// such as if the built-in Promise object isn't provided, we can define it ourselves

if(!globalThis.Promise){
    globalThis.Promise = {
        // Polyfill code
    }
}

