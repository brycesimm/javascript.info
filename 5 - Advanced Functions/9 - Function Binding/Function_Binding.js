// When an object function is passed by reference somewhere else, you will lose
// the reference to "this":
let user = {
  firstName: "John",
  sayHi() {
    console.log(`Hello, ${this.firstName}!`);
  }
};

setTimeout(user.sayHi, 0); // Hello, undefined!

// In this instance, setTimeout does not receive the sayHi function from user even 
// though it looks like it does. Depending on the platform, setTimeout may try to 
// get the user.sayHi function from the browser window, timer object, etc.

// One solution is to use a wrapper:
setTimeout(() => { user.sayHi() }, 0); // Hello, John!

// Using a wrapper here works because the function will look for the variable in the 
// outer lexical environment, which in this case will be global.
// One issue doing it this way is that user.sayHi could be modified on the next line, 
// and by the time setTimeout triggers, the functionality of the function is changed:

setTimeout(() => { user.sayHi() }, 1); // Hello, Chip!
setTimeout(() => { user.sayHi = () => { console.log("Hello, Chip!") } }, 2); // this happens before line 24 runs
setTimeout(() => { user.sayHi = () => { console.log("Hello, John!") } }, 3); // reset

// The second solution is using the bind function:
// let boundFunc = func.bind(context);
// This boundFunc is a function-like object that is callable as a function and 
// sets "this" to context

let user2 = {
  firstName: "John"
};

function func() {
  console.log(this.firstName);
}

let funcUser = func.bind(user2);
funcUser(); // John (appears at the top due to setTimeouts)

// And so we can also do this with object methods:

let sayHi = user.sayHi.bind(user);

sayHi(); // Hello, John! (after John in output)

//setTimeout(sayHi, 1000); // Hello, John!

// even if the value of user changes within 1 second
// sayHi uses the pre-bound value which is reference to the old user object
/*
user = {
  sayHi() { console.log("Another user in setTimeout!"); }
};
*/

// If an object has many methods that we want to bind, we can bind them all in a loop. 
// Some libraries may provide methods that bind all methods easily. 
/*
for (let key in user) {
  if (typeof user[key] == 'function') {
    user[key] = user[key].bind(user);
  }
}
*/

// We can also bind parameters of functions in addition to context, which creates 
// partial functions:

function mul(a, b){
    return a * b;
}

let double = mul.bind(null, 2); // passes null as context and 2 as a

console.log(double(3)); // 6
console.log(double(4)); // 8
console.log(double(10)); // 20

// This is helpful if we want a more specific variant of a function, like in the 
// case of a sendMessage(from, to, msg) function where we want to be able to only 
// send from the current user, we could create a sendMessageUser(to, msg) partial
// function by binding from to user. 

// Creating a partial function this way does require us to pass a value for context
// even if it is null. If we want to bypass that and only bind arguments, we can create
// a partial helper function to handle it:

// takes the function and arguments that are to be bound
function partial(func, ...argsBound){
    // returns a function with unbound arguments
    return function(...args){
        // calls function with this, fixed arguments, and then unbound arguments
        return func.call(this, ...argsBound, ...args);
    }
}

// Usage:
let user3 = {
  firstName: "John",
  say(time, phrase) {
    console.log(`[${time}] ${this.firstName}: ${phrase}!`);
  }
};

// add a partial method with fixed time
user3.sayNow = partial(user3.say, new Date().getHours() + ':' + new Date().getMinutes());

user3.sayNow("Hello");
// Something like:
// [10:00] John: Hello!

// Some libraries may provide methods for doing this conveniently too