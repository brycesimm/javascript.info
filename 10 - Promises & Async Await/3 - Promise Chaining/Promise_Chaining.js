// In the last section, we learned about the Promise.then() method that allows us to complete a 
// task after the initial promise's completion. This method actually returns a new Promise(), and 
// so we can actually chain .then() method calls. When this happens, the result of each then() is 
// passed on to the next, just like it was from the original Promise to the first then. 

new Promise(function(resolve, reject) {

  setTimeout(() => resolve(1), 1000); // (*)

}).then(function(result) { // (**)

  console.log(result); // 1
  return result * 2;

}).then(function(result) { // (***)

  console.log(result); // 2
  return result * 2;

}).then(function(result) {

  console.log(result); // 4
  return result * 2;

});

// It's important to note that attempting this by calling promise.then() several times is not the 
// same as above. If we do:

let promise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve(1), 1000);
});

promise.then(function(result) {
  console.log(result); // 1
  return result * 2;
});

promise.then(function(result) {
  console.log(result); // 1
  return result * 2;
});

promise.then(function(result) {
  console.log(result); // 1
  return result * 2;
});

// Then each promise.then() processes the results independently instead of passing on from one to 
// another.

// While the Promise.then() call returns a new promise implicitly, we can also return a new 
// Promise explicitly if we need to run another bit of async code. That promise gets returned 
// to the next then() in the chain, which waits for the new promise to resolve before getting 
// the result:

new Promise(function(resolve, reject) {

  setTimeout(() => resolve(1), 1000);

}).then(function(result) {

  console.log(result); // 1

  return new Promise((resolve, reject) => { // (*)
    setTimeout(() => resolve(result * 2), 1000);
  });

}).then(function(result) { // (**)

  console.log(result); // 2

  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(result * 2), 1000);
  });

}).then(function(result) {

  console.log(result); // 4

});

// Here the first promise resolves after 1 second with result 1, which is passed on to the first then(). 
// The first then() takes that result, outputs it, and then returns a new promise that also resolves 
// after 1 second with the result doubled. The next then() has to wait 1 second until the previous 
// then() resolves before it gets the updated result. 

// One thing you may notice about this way of chaining for multiple async actions is that there is no 
// sign of the code slowly shifting to the right on each line. That is, there is not pyramid of doom 
// as in the intro section.

// A technicality that perhaps should have been outlined earlier about the .then() handler, is that it 
// actually only needs to return a "thenable" object rather than an actual Promise instance. A thenable 
// object is one that has a then() method in it. This way, third party libraries can implement their own 
// promise-like objects if needed. 

class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    console.log(resolve); // function() { native code }
    // resolve with this.num*2 after the 1 second
    setTimeout(() => resolve(this.num * 2), 1000); // (**)
  }
}

new Promise(resolve => resolve(1))
  .then(result => {
    return new Thenable(result); // (*)
  })
  .then(console.log); // shows 2 after 1000ms

// In practice, it is always a good idea to return a promise from a handler, even if we don't 
// expect to extend the chain. It could be needed in the future. 