// Some functions like math.max() can take any number of arguments. This is because
// functions like this often use "rest" parameters to put a list of parameters into 
// an array to deal with. 

function sum(a, b){
    return a + b;
}

console.log(sum(1, 2, 3, 4, 5)); // will output 3, as 3, 4, and 5 are ignored

// If we want to include all of the arguments passed, we can rewrite the function as:

function sumAll(...args){
    let sum = 0;
    args.forEach(num => sum += num);
    return sum;
}
console.log(sumAll(1, 2, 3, 4, 5)); // 15

// Essentially we are telling JS to put all arguments into an args array so we can
// loop through all of them

// If we want to require two arguments, but allow multiple, we can do:

function sumRevised(a, b, ...rest){
    let sum = a + b;
    if(rest.length > 0){
        rest.forEach(num => sum += num);
    }
    return sum;
}

console.log(sumRevised(1, 2)); // 3
console.log(sumRevised(1, 2, 3, 4, 5)); // 15

// There is also a function-specific array-like object called arguments that has all of the 
// arguments passed into the function:

function showName() {
  console.log( arguments.length );
  console.log( arguments[0] );
  console.log( arguments[1] );

  // it's iterable
  // for(let arg of arguments) alert(arg);
}

// shows: 2, Julius, Caesar
showName("Julius", "Caesar");

// shows: 1, Ilya, undefined (no second argument)
showName("Ilya");

// Unfortunately, arguments is not an array, just array-like, and doesn't support
// array methods. Additonally, arrow functions do not have an arguments object. 

// So we know how to take arguments as an array. But how do we pass arguments as an array?
// We can use the spread operator:

let arr = [3, 5, 1];

console.log( Math.max(...arr) ); // 5 (spread turns array into a list of arguments)

// We can pass multiple spread objects as well:
let arr2 = [6, 8, 9];
console.log( Math.max(...arr, ...arr2));

// We can also merge arrays with it:
let arr3 = [...arr, ...arr2];
console.log(arr3);

// This can be used on any iterable:
let str = "Hello";
console.log(...str); //H, e, l, l, o

// We can also copy objects (including arrays) with it:

arr = [1, 2, 3];

let arrCopy = [...arr]; // spread the array into a list of parameters
                        // then put the result into a new array

// do the arrays have the same contents?
console.log(JSON.stringify(arr) === JSON.stringify(arrCopy)); // true

// are the arrays equal?
console.log(arr === arrCopy); // false (not same reference)

// modifying our initial array does not modify the copy:
arr.push(4);
console.log(arr); // 1, 2, 3, 4
console.log(arrCopy); // 1, 2, 3

let obj = { a: 1, b: 2, c: 3 };

let objCopy = { ...obj }; // spread the object into a list of parameters
                          // then return the result in a new object

// do the objects have the same contents?
console.log(JSON.stringify(obj) === JSON.stringify(objCopy)); // true

// are the objects equal?
console.log(obj === objCopy); // false (not same reference)

// modifying our initial object does not modify the copy:
obj.d = 4;
console.log(JSON.stringify(obj)); // {"a":1,"b":2,"c":3,"d":4}
console.log(JSON.stringify(objCopy)); // {"a":1,"b":2,"c":3}

