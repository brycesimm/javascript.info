// An improvement to the way callbacks were being introduced in the previous section is JavaScript's 
// concept of Promises. Promises are a way for "consumer" code to be promised a result from "producer" 
// code. 

// The construtor syntax for the Promise class is:
/*
let promise = new Promise(function(resolve, reject) {
  // executor (the producing code, "singer")
});
*/

// The function that is passed into the constructor is called the executor, and it takes two
// pre-defined arguments: resolve and reject, which are callbacks. resolve(value) is to be 
// called if the code completed successfully, and reject(error) is to be called if an issue occurs. 

// A Promise object has the following properties:
/*
state — initially "pending", then changes to either "fulfilled" when resolve is called or "rejected" 
when reject is called.

result — initially undefined, then changes to value when resolve(value) is called or error when 
reject(error) is called.
*/

let promise = new Promise(function(resolve, reject) {
  // the function is executed automatically when the promise is constructed

  // after 1 second signal that the job is done with the result "done"
  setTimeout(() => resolve("done"), 1000);
});

/*let promise2 = new Promise(function(resolve, reject) {
  // after 1 second signal that the job is finished with an error
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});*/

// Calling resolve() or reject() is final, similar to returning a value, but code after will still 
// execute. They also only expect one argument, any additional arguments are ignored

// The way we can receive the result of a Promise is by using Promise.then(), which expects 
// two arguments: a function to call when the Promise is resolved, and a function to call 
// when the Promise is rejected. 

let promise3 = new Promise(function(resolve, reject) {
  setTimeout(() => resolve("done!"), 1000);
});

// resolve runs the first function in .then
promise3.then(
  result => console.log(result), // shows "done!" after 1 second
  error => console.log(error) // doesn't run
);

/*
promise3 = new Promise(function(resolve, reject) {
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});

// reject runs the second function in .then
promise3.then(
  result => console.log(result), // doesn't run
  error => console.log(error) // shows "Error: Whoops!" after 1 second
);
*/

// If we only care for successful runs we can omit the 2nd callback for Promise.then:
// promise.then(result => console.log(result));

// If we only care for unsuccessful runs we can set the resolve callback to null:
// promise.then(null, error => console.log(error));

// Or, we can use the Promise.catch() method:
// promise.catch(console.log);

// At the end, we can add a Promise.finally() method just like we can with try-catch blocks
// It's intended to be used as a cleanup mechanism, such as to finalize work after 
// what was done in the then(f, f) callbacks, turn off loading indicators, etc. 

/*
new Promise((resolve, reject) => {
  // do something that takes time, and then call resolve or maybe reject //
})
  // runs when the promise is settled, doesn't matter successfully or not
  .finally(() => stop loading indicator)
  // so the loading indicator is always stopped before we go on
  .then(result => show result, err => show error)


new Promise((resolve, reject) => {
  throw new Error("error");
})
  .finally(() => console.log("Promise ready")) // triggers first
  .catch(err => console.log(err));  // <-- .catch shows the error
*/

// finallies are not meant to process a promise result, they are meant to handle generic 
// cleanup regardless if the promis was resolved or rejected, and so they take no parameters. 
// They do pass through values like the result to the then()/catch() method afterwards though. 

// To tie this new knowledge back to the loadScript example in the previous section, we can rewrite 
// the function using Promises (commented so node.js doesn't throw a fit):

// Original:

/*
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));

  document.head.append(script);
}
*/

// Promisified:

/*
function loadScript(src) {
  return new Promise(function(resolve, reject) {
    let script = document.createElement('script');
    script.src = src;

    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Script load error for ${src}`));

    document.head.append(script);
  });
}

let promise = loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js");

promise.then(
  script => console.log(`${script.src} is loaded!`),
  error => console.log(`Error: ${error.message}`)
);

promise.then(script => console.log('Another handler...'));
*/