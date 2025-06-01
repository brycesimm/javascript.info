//1. 
function makeCounter() {

  function counter(operand) {
    return counter.count++;
  };

  counter.count = 0;

  counter.set = function(num){
    counter.count = num;
};

counter.decrease = function(){
    counter.count--;
};

  return counter;
}

let counter = makeCounter();

counter.count = 10;
console.log( counter() ); // 10, makes 11
counter.decrease(); // makes 10
counter.decrease(); // makes 9
console.log(counter()); // 9, makes 10
counter.set(0); // sets to 0
console.log(counter()); // 0, makes 1

//2. 
function sum(a){
    let sum = 0;
    sum += a;

    function func(b){
        sum += b;
        return func;
    }

    func.toString = function() {
        return sum;
    };

    func.valueOf = function() {
    return sum;
};

    return func;
}

// node.js console.log does not call toString() implicitly like browsers might.
// toString() needed explicitly here:
console.log(sum(1)(2).toString()); // 3
console.log(sum(1)(2)(3).toString()); // 6
console.log(sum(5)(-1)(2).toString()); // 6
console.log(sum(6)(-1)(-2)(-3).toString()); // 0
console.log(sum(0)(1)(2)(3)(4)(5).toString()); // 15

// by changing the valueOf property we can use the + operator to get the same 
// result:
console.log(+sum(1)(2)); // 3
console.log(+sum(1)(2)(3)); // 6
console.log(+sum(5)(-1)(2)); // 6
console.log(+sum(6)(-1)(-2)(-3)); // 0
console.log(+sum(0)(1)(2)(3)(4)(5)); // 15