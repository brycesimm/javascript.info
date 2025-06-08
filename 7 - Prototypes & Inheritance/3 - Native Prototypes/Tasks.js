//1. 
Function.prototype.defer = function(ms) {
    setTimeout(this, ms);
}

function f() {
  console.log("Hello!");
}

f.defer(1000); // shows "Hello!" after 1 second

//2. 
Function.prototype.defer2 = function(ms) {
    let func = this;
    return function (...args) {
        setTimeout(() => func.apply(this, args), ms);
    }
}
function f2(a, b) {
  console.log( a + b );
}

f2.defer2(1000)(1, 2); // shows 3 after 1 second