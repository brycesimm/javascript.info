//1. 
let str = "Hello";

str.test = 5;

console.log(str.test);

// This won't exactly work because while adding the test property to str works,
// the object that gets created ends up destroyed and str is left as-is.
// When the console.log() line is ran, str.test doesn't exist anymore and is 
// undefined. In strict mode this would, of course, error out.