//1. 
new Promise(function(resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
}).catch(console.log);

// The catch() will not run. This is because while there is an implicit try-catch surrounding the 
// function code, it will only handle errors for synchronous code. The error thrown above is async, 
// and occurs after the promise function completes and therefore it won't handle it.