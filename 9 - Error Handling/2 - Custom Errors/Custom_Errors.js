// Sometimes we want to create classes for specific errors that inherit from the Error class, so 
// we can still support things like message, name, and stack while also giving extra functionality 
// on top. Such cases may be like adding response codes for a class of HttpError, for example. 

// In another example, say we have a method that parses a JSON string into an object. The object 
// should have a name and an age. If the JSON string is malformed, say a bracket is missing or 
// something else is wrong syntactically, JSON.parse() will throw a SyntaxError. But what if there 
// is an issue with the JSON string that isn't syntax-related, like missing a property? We could 
// create a class for that kind of error, say ValidationError, and have it extend the Error class 
// as well:

// The "pseudocode" for the built-in Error class defined by JavaScript itself
// class Error {
  // constructor(message) {
    // this.message = message;
    // this.name = "Error"; // (different names for different built-in error classes)
    // this.stack = <call stack>; // non-standard, but most environments support it
  // }
// }

class ValidationError extends Error {
  constructor(message) {
    super(message); // (1) we HAVE to call the super() constructor, don't forget
    this.name = "ValidationError"; // (2) the super() constructor sets name to "Error", so we override it
  }
}

function test() {
  throw new ValidationError("Whoops!");
}

try {
  test();
} catch(err) {
  console.log(err.message); // Whoops!
  console.log(err.name); // ValidationError
  console.log(err.stack); // a list of nested calls with line numbers for each
}

// Usage
function readUser(json) {
  let user = JSON.parse(json);

  if (!user.age) {
    throw new ValidationError("No field: age");
  }
  if (!user.name) {
    throw new ValidationError("No field: name");
  }

  return user;
}

// Working example with try..catch

try {
  let user = readUser('{ "age": 25 }');
} catch (err) {
  if (err instanceof ValidationError) {
    console.log("Invalid data: " + err.message); // Invalid data: No field: name
  } else if (err instanceof SyntaxError) { // (*)
    console.log("JSON Syntax Error: " + err.message);
  } else {
    throw err; // unknown error, rethrow it (**)
  }
}

// The ValidationError class is a bit generic though, and can't handle more specific issues with it. 
// We can add another, more specific class that extends the ValidationError class to handle more 
// specific errors:

class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super("No property: " + property); // Pass the message up to ValidationError and then Error
    this.name = "PropertyRequiredError"; // Override both ValidationError and Error's naming
    this.property = property; // Track which property has an issue
  }
}

// Usage
function readUserRefined(json) {
  let user = JSON.parse(json);

  if (!user.age) {
    throw new PropertyRequiredError("age");
  }
  if (!user.name) {
    throw new PropertyRequiredError("name");
  }

  return user;
}

try {
  let user = readUserRefined('{ "age": 25 }');
} catch (err) {
  if (err instanceof ValidationError) {
    console.log("Invalid data: " + err.message); // Invalid data: No property: name
    console.log(err.name); // PropertyRequiredError
    console.log(err.property); // name
  } else if (err instanceof SyntaxError) {
    console.log("JSON Syntax Error: " + err.message);
  } else {
    throw err; // unknown error, rethrow it
  }
}

// Having to manually override the name of the error in every downstream error class from Error can 
// be tedious, so one way we can make that easier is to create a middle-man class between Error and our 
// error classes that sets this.name = this.constructor.name, and so all custom error classes will 
// inherit from it.

class MyError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

class ValidationErrorRefined extends MyError { }

class PropertyRequiredErrorRefined extends ValidationErrorRefined {
  constructor(property) {
    super("No property: " + property);
    this.property = property;
  }
}

// name is correct
console.log( new PropertyRequiredErrorRefined("field").name ); // PropertyRequiredErrorRefined