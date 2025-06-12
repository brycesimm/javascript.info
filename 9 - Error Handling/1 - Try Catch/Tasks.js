//1. 
try {
  // work work
} catch (err) {
  // handle errors
} finally {
  // cleanup the working space
}

try {
  // work work
} catch (err) {
  // handle errors
}

// cleanup the working space

// The above try catch is superior when we need to clean up regardless if there was an error or not; 
// the finally block will always execute after the try and/or catch, whereas the second try catch 
// will stop after the catch and not get to the cleanup after if there are errors. 