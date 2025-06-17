// async is a keyword that we can put in front of functions to make them always return 
// a promise:

async function f() {
  return 1;
}

f().then(console.log); // 1

// In thise case, f() returns a resolved promise with a value of 1
// We could explicitly return a promise with Promise.resolve(1), but it would be the same

// The await keyword can only be used inside of async functions. It makes JavaScript wait until 
// the promise is settled and returns its result.

async function f2() {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000)
  });

  let result = await promise; // wait until the promise resolves (*)

  console.log(result); // "done!"
}

f2();

// It's a more elegant way to wait on promises to settle rather than implementing promise.then()

// In the event that await is used and the promise is resolved, the result is returned. If the 
// promise is rejected, then an error is thrown automatically. 

// It may take some time for a promise to reject to throw an error, so we can make sure to catch 
// it with a surrounding try-catch. 

async function f3() {

  try {
    let response = await fetch('http://no-such-url');
  } catch(err) {
    console.log(err); // TypeError: failed to fetch
  }
}

f3();

// One important thing to note is that await still works with Promise.all(iterable)