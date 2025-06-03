// We can schedule function calls at a later time through the use of setTimeout and setInterval.
// setTimeout allows us to run a function after a set interval of time, and setInterval allows 
// us to run a function repeatedly after every set time interval.

// They aren't a part of JavaScript itself, but is offered in a lot of environments like browsers and
// node.js. 

// setTimeout()
// let timerId = setTimeout(func|code, [delay], [arg1], [arg2], ...)
// func is the function to run; can also be a string of code but is not recommended
// delay is the interval to wait in milliseconds; default is 0
// arg1, arg2, etc. are arguments for the function

function sayHi(phrase, who) {
  console.log( phrase + ', ' + who );
}
// Very important to note that we pass the function as a reference, we don't call the 
// function with parentheses ()
setTimeout(sayHi, 1000, "Hello", "John"); // Hello, John after 1 second

// If we want to execute code that is not a concrete function, instead of passing a string
// we can pass an arrow function:

setTimeout((phrase, who) => console.log( phrase + ', ' + who), 1000, 'Hello', 'John');

// setTimeout() returns a timer id that we can use clearTimeout() with to cancel a 
// scheduled function call, like if we change our mind:

let timerId = (sayHi, 1000, 'Hello', 'John');
function output(string){
    console.log(string);
}
setTimeout(output, 1001, timerId); // timer object, may be a number or something else in other environments
clearTimeout(timerId); // don't run the 3rd function call
setTimeout(output, 1001, timerId); // same reference, doesn't become null after clearing

// setInterval() 
// let timerId = setInterval(func|code, [delay], [arg1], [arg2], ...)
// func is reference of function to execute, delay is in milliseconds,
// and args are to be passed into the function

// repeat with the interval of 2 seconds
timerId2 = setInterval(() => console.log('tick'), 2000);

// after 5 seconds stop
setTimeout(() => { clearInterval(timerId2); console.log('stop'); }, 5000);

// We can make code execute at intervals of time by nesting setTimeouts, and it can allow
// more functionality as well. We can modify the delay for different intervals depending
// on conditions.

/** instead of:
let timerId = setInterval(() => alert('tick'), 2000);
*/

/*
let timerId3 = setTimeout(function tick() {
  console.log('tick');
  timerId3 = setTimeout(tick, 2000); // (*)
}, 2000);
*/

// pseudocode for modifying delay based on conditions:
/*
let delay = 5000;

let timerId = setTimeout(function request() {
  ...send request...

  if (request failed due to server overload) {
    // increase the interval to the next run
    delay *= 2;
  }

  timerId = setTimeout(request, delay);

}, delay);
*/

// Sometimes the delay between intervals does not match the interval exactly.
// This is because function execution consumes some of that time. Additionally,
// sometimes functions take a while to execute. If a function takes longer than 
// the interval to complete, the scheduler waits for the function to complete and
// then checks if the time is up.

// So, with setInterval() the delay can be inconsistent. But a nested setTimeout
// guarantees precise delays, since the new call is always planned.

// An additional use case for setTimeout is when we set the delay to 0. This will
// make it so that the scheduler will wait until the current script is finished 
// before running the function specified. 

setTimeout(() => console.log("World"));
console.log("Hello");

// in this case, the console.log("Hello") runs first due to no delay,
// and then the "World" gets output right after. The setTimeout waits
// for the "Hello" put after it. 