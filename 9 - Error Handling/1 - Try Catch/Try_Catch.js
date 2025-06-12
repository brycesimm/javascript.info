// try catches are constructs that let us catch exceptions when they happen to handle them 
// gracefully; either trying to recover if possible, or tying up loose ends. 
// They only work with synchronous code, and so if an asynchronous piece of code runs and 
// errors when the engine has left the try catch block, the try catch won't catch it. 
// If we want to catch an error in an asynchronous code, we must include the try catch 
// inside of it:

setTimeout(function() {
  try {
    noSuchVariable; // try...catch handles the error!
  } catch {
    console.log( "error is caught here!" );
  }
}, 0);


// When an error occurs, JavaScript generates an object that can be passed into the catch block
// implicitly. It will have properties "name", "message", and stack:

try {
  lalala; // error, variable is not defined!
} catch (err) {
  console.log(err.name); // ReferenceError
  console.log(err.message); // lalala is not defined
  console.log(err.stack); // ReferenceError: lalala is not defined at (...call stack)

  // Can also show an error as a whole
  // The error is converted to string as "name: message"
  console.log(err); // ReferenceError: lalala is not defined
}

// We can also throw errors explicitly for errors that aren't auto-generated exceptions, like 
// when a property doesn't exist or something unexpected with data happens:

let json = '{ "age": 30 }'; // incomplete data

try {

  let user = JSON.parse(json); // <-- no errors

  if (!user.name) {
    throw new SyntaxError("Incomplete data: no name"); // (*)
  }

  console.log( user.name );

} catch (err) {
  console.log( "JSON Error: " + err.message ); // JSON Error: Incomplete data: no name
}

// We can also utilize the ability to re-throw errors if needed. In a catch statement, we can 
// check the type of error received with instanceof. If the error received isn't one we expect or 
// want to deal with, we can rethrow the error:
try {

  let user = JSON.parse(json);

  if (!user.name) {
    throw new SyntaxError("Incomplete data: no name");
  }

  blabla(); // unexpected error

  console.log( user.name );

} catch (err) {

  if (err instanceof SyntaxError) {
    console.log( "JSON Error: " + err.message );
  } else {
    throw err; // rethrow (*)
  }

}

// The throw err above will fall out of the try catch and can fall into another try catch on the outside
// or kill the script, meaning the catch statement only handles the ones it knows and ignores the others.

// A finally block can be added to the end of a try catch, which will run after the try if there are no 
// errors, or after a catch if there were errors. 

try {
  console.log( 'try' );
  if (confirm('Make an error?')) BAD_CODE();
} catch (err) {
  console.log( 'catch' );
} finally {
  console.log( 'finally' );
}

// finally blocks help us finalize whatever was being worked on regardless if an error occurs or not; 
// it gives the chance to clean up afterwards. 

// It's important to remember that try catch finally blocks restrict the visibility of variables
// declared inside them. It's better to declare variables outside of them if they need to be used in 
// more than one of the blocks or outside of the try catch finally. 

// Another important mention is that finally blocks execute even when explicit returns are made:
function func() {

  try {
    return 1;

  } catch (err) {
    /* ... */
  } finally {
    console.log( 'finally' );
  }
}

console.log( func() ); // first works console.log from finally, and then this one

// We can also omit the catch block entirely to just have try finally; useful for when we don't want 
// to handle errors but we want things to be finalized.