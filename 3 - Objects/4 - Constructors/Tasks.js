//1. 
// This is technically cheating to make the functions return the same object since 
// we have to create an obj outside to return, but javascript.info counts it as their solution
let obj = {};
function A() { return obj; }
function B() { return obj; }

let a = new A();
let b = new B();

console.log( a == b ); // true

//2. 
function Calculator() {
    this.read = function() {
        this.a = +prompt("Enter a value for a ", "0");
        this.b = +prompt("Enter a value for b ", "0");
    };
    this.sum = function() {
        return this.a + this.b;
    };
    this.mul = function() {
        return this.a * this.b;
    }
}

let calc = new Calculator();
calc.read();
console.log( calc.sum() );
console.log( calc.mul() );

//3. 
function Accumulator(startingValue) {
    this.value = startingValue;
    this.read = function() {
        this.value += +prompt("Enter a value to accumulate ", "0");
    }
}

let accum = new Accumulator(0);
accum.read();
accum.read();
console.log( accum.value );