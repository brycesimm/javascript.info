// Generators can return (yield) multiple values. They work great with iterables and can create 
// streams of data easily. 
// To create a generator function, we need to use: function*

function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

// When a generator function is called, it doesn't actually run its code, it returns a generator 
// object to handle the execution.

let generator = generateSequence();
console.log(generator); // [object Generator]

// We can run the generator function's code by calling next() on the generator object. It will 
// execute code until it reaches the nearest yield statement, and the yielded value is returned 
// to the outer code.

// The result of next() is always an object with two properties:
// value: the yielded value.
// done: true if the function code has finished, otherwise false.

let one = generator.next();

console.log(JSON.stringify(one)); // {value: 1, done: false}

let two = generator.next();

console.log(JSON.stringify(two)); // {value: 2, done: false}

let three = generator.next();

console.log(JSON.stringify(three)); // {value: 3, done: true}

// Generator functions are iterable, but only over yielded values, not returned values. When iterating 
// over a generator function, the yield statements are called as if you were calling next():

generator = generateSequence(); // reset generator
for(let value of generator){
    console.log(value); // 1, 2
}

function* generateSequence2(){
    yield 1;
    yield 2;
    yield 3;
}

let generator2 = generateSequence2();
for(let value of generator2){
    console.log(value); // 1, 2, 3
}

generator2 = generateSequence2(); // have to reset after logging
let sequence = [...generator2];
console.log(sequence); // [ 1, 2, 3 ]
let sequence2 = [...generateSequence2()]; // call a new instance and iterate
console.log(sequence2); // [ 1, 2, 3 ]

// In a previous section on iterables, we created an object with an iterator symbole property 
// that had a next() function to iterator through a range of values:

let range = {
  from: 1,
  to: 5,

  // for..of range calls this method once in the very beginning
  [Symbol.iterator]() {
    // ...it returns the iterator object:
    // onward, for..of works only with that object, asking it for next values
    return {
      current: this.from,
      last: this.to,

      // next() is called on each iteration by the for..of loop
      next() {
        // it should return the value as an object {done:.., value :...}
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

// iteration over range returns numbers from range.from to range.to
console.log([...range]); // 1,2,3,4,5

// We can replace the Symbol.iterator with:

range = {
  from: 1,
  to: 5,
  *[Symbol.iterator]() { // a shorthand for [Symbol.iterator]: function*()
    for(let value = this.from; value <= this.to; value++) {
      yield value;
    }
  }
};

// iteration over range returns numbers from range.from to range.to
console.log([...range]); // 1,2,3,4,5

// We can also nest generators if needed; such as in the case where we need to generate sequences 
// of characters based on their character codes between a start and end range, say 0-9, A-Z, and a-z;
// before concatenating all three sequences:

function* generateSequenceRange(start, end) {
  for (let i = start; i <= end; i++) yield i;
}

// yield* lets us embed a generator into another, so that the embedded generator's execution can 
// be delegated to its outer generator:
function* generatePasswordCodes() {

  // 0..9
  yield* generateSequenceRange(48, 57);

  // A..Z
  yield* generateSequenceRange(65, 90);

  // a..z
  yield* generateSequenceRange(97, 122);

}

let str = '';

for(let code of generatePasswordCodes()) {
  str += String.fromCharCode(code);
}

console.log(str); // 0..9A..Za..z

// Something interesting about "yield" is it can return values to outer code AND pass values into 
// generators:

function* gen() {
  // Pass a question to the outer code and wait for an answer
  let result = yield "2 + 2 = ?"; // (*)

  console.log(result);
}

generator = gen();

let question = generator.next().value; // first next() gets the object, and then its first yield value
console.log(question);

generator.next(4); // --> pass the result into the generator, runs the code and logs it

// This may shed even more light:

function* gen2() {
  let ask1 = yield "2 + 2 = ?";

  console.log(ask1); // 4

  let ask2 = yield "3 * 3 = ?"

  console.log(ask2); // 9
}

generator = gen2();

console.log( generator.next().value ); // "2 + 2 = ?"

console.log( generator.next(4).value ); // causes 4 to be printed, and then the yielded "3 * 3 = ?"

console.log( generator.next(9).done ); // causes 9 to be printed, and then the yielded true

// We can not only pass values into generators, but we can throw errors into them when needed, too. 
// We use the generator.throw(error) syntax:

function* gen3() {
  try {
    let result = yield "2 + 2 = ?"; // (1)

    console.log("The execution does not reach here, because the exception is thrown above");
  } catch(e) {
    console.log(e); // shows the error
  }
}

generator = gen3();

question = generator.next().value;

generator.throw(new Error("The answer is not found in my database")); // (2)

// We could also have the try-catch around line 193 instead of in the gen3() generator since the error 
// will fall out of the generator if it isn't caught, and be caught by the try-catch in the outer code:

try {
  generator.throw(new Error("The answer is not found in my database"));
} catch(e) {
  console.log(e); // shows the error
}

// generator.return(<input value>) is something to cover that isn't used very often; it will complete a 
// generator even if not all of the yields have been ran, and return a result like: 
// {value: <input value>, done: true}