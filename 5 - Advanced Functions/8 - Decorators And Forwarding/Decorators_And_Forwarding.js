// A decorator function is a function that surrounds another to enhance or 
// otherwise change the original function's behavior. 
// 
// For example, we can use a decorator to provide a cache to check to retrieve 
// values from if they exist, otherwise call the intended function and add the 
// result to the cache. 

function slow(x) {
  // there can be a heavy CPU-intensive job here
  console.log(`Called with ${x}`);
  return x;
}

function cachingDecorator(func) {
  let cache = new Map();

  // this function is a wrapper, which wraps around func(x)
  return function(x) {
    if (cache.has(x)) {    // if there's such key in cache
      return cache.get(x); // read the result from it
    }

    let result = func(x);  // otherwise call func

    cache.set(x, result);  // and cache (remember) the result
    return result;
  };
}

slow = cachingDecorator(slow);

console.log( slow(1) ); // slow(1) is cached and the result returned
console.log( "Again: " + slow(1) ); // slow(1) result returned from cache

console.log( slow(2) ); // slow(2) is cached and the result returned
console.log( "Again: " + slow(2) ); // slow(2) result returned from cache

// As you can see on line 29, we set slow to the cachingDecorator function with the original slow
// passed as a parameter. This implies we can do the same for any function. 

// The above decorator doesn't work for a function that is a property of an object, though.
// If we pass an object's method into a decorator, the wrapped function will execute when 
// called, but "this" will be null in the context of the call. To get around this, we can
// use func.call:

// func.call(context, arg1, arg2, ...)

function sayHi() {
  console.log(this.name);
}

let user = { name: "John" };
let admin = { name: "Admin" };

// use call to pass different objects as "this"
sayHi.call( user ); // John
sayHi.call( admin ); // Admin

// In the above we are setting the context explicitly with func.call

// Now we can use the decorator function with an object function:
let worker = {
  someMethod() {
    return 1;
  },

  slow(x) {
    console.log("Called with " + x);
    return x;
  }
};

function cachingDecorator2(func) {
  let cache = new Map();
  return function(x) {
    if (cache.has(x)) {
      return cache.get(x);
    }
    let result = func.call(this, x); // "this" is passed correctly now
    cache.set(x, result);
    return result;
  };
}


worker.slow = cachingDecorator2(worker.slow);
worker.slow(2); // prints called with 2
worker.slow(2); // cached, does not print

// If we want to make this decorator work for functions with multiple parameters, we 
// need a way to cache multiple parameters. The easiest way is to create a hash function
// that creates a single output from multiple parameters and use it as the key for the 
// cache map:

worker = {
  slow(min, max) {
    console.log(`Called with ${min},${max}`);
    return min + max;
  }
};

function cachingDecorator3(func, hash) {
  let cache = new Map();
  return function() {
    let key = hash(arguments); // (*)
    if (cache.has(key)) {
      return cache.get(key);
    }

    let result = func.call(this, ...arguments); // (**)

    cache.set(key, result);
    return result;
  };
}

function hash(args) {
  return args[0] + ',' + args[1];
}

worker.slow = cachingDecorator3(worker.slow, hash);

console.log( worker.slow(3, 5) ); // works
console.log( "Again " + worker.slow(3, 5) ); // same (cached)

// While using func.call(this, ...args) works, we can also use func.apply(this, args)
// The only difference is the ...args allows iterable objects whereas func.apply allows
// array-like objects. func.apply is generally recommended for lists of args due to engines
// usually optimizing it. 

// In the above hash() function, it would be great to be able to handle any number of args.
// One would think we could use args.join(), but because args isn't an array it won't work.
// We can get around this by Method-Borrowing:

function hash2(args){
    // we borrow the join method from an empty array []
    return [].join.call(args);
}

console.log(hash2([1, 2, 3, 4, 5]));

// The above works specifically because of the way Array.join() is configured, it allows 
// any array-like object. 