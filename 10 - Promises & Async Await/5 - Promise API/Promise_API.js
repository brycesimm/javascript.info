// The Promise class has 6 static methods that can be used to more efficiently leverage the class

// Promise.all()
// Great for having multiple promises run in parallel, and we want to wait for them all to be completed
// let promise = Promise.all(iterable);

Promise.all([
  new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
  new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
  new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
]).then(console.log); // 1,2,3 when promises are ready: each promise contributes an array member

// One trick we can leverage this for, is multiple API calls. We can map an array of URLs to the 
// promise of fetching each URL and then use Promise.all() on them:

let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://api.github.com/users/jeresig'
];

// map every url to the promise of the fetch
let requests = urls.map(url => fetch(url));

// Promise.all waits until all jobs are resolved
Promise.all(requests)
  .then(responses => responses.forEach(
    response => console.log(`${response.url}: ${response.status}`)
  ));

// With Promise.all, if any of the promises reject, then the singular promise returned rejects 
// with the error of the rejected promise. The rest of the promises in the iterable will be abandoned. 
// That is, they will still execute, but their results will no longer be watched. 

// Promise.allSettled() is a new variant that waits for all promises to be fulfilled regardless of their 
// outcomes. 

// The resulting array from Promise.allSettled() has the fields:
// {status:"fulfilled", value:result} for successful responses,
// {status:"rejected", reason:error} for errors.

// The polyfill for Promise.allSettled():
if (!Promise.allSettled) {
  const rejectHandler = reason => ({ status: 'rejected', reason });

  const resolveHandler = value => ({ status: 'fulfilled', value });

  Promise.allSettled = function (promises) {
    const convertedPromises = promises.map(p => Promise.resolve(p).then(resolveHandler, rejectHandler));
    return Promise.all(convertedPromises);
  };
}

////////////////////////////////////////////////////////////////////////////

// Promise.race()
// Similar to Promise.all(), but only waits for one promise to settle.
Promise.race([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(console.log); // 1, first promise was the fastest

////////////////////////////////////////////////////////////////////////////

// Promise.any()
// It takes the first fulfilled promise as the result, so, similar to Promise.race()

Promise.any([
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 1000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(console.log); // 1, first promise rejected, 2nd promise fulfills

// When all promises fail, the result is an AggregateError object where each of the error messages 
// are stored:
Promise.any([
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Ouch!")), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Error!")), 2000))
]).catch(error => {
  console.log(error.constructor.name); // AggregateError
  console.log(error.errors[0]); // Error: Ouch!
  console.log(error.errors[1]); // Error: Error!
});

////////////////////////////////////////////////////////////////////////////

// Promise.resolve() / Promise.reject()
// Often made obsolete by async/await syntax

// Promise.resolve(value) creates a promise that resolves with value; the same as:
{ let promise = new Promise(resolve => resolve(value)); }

// Promise.reject(error) creates a promise that rejects with error; the same as:
{ let promise = new Promise((resolve, reject) => reject(error)); }