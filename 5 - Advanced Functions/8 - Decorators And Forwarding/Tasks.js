//1. 
function work(a, b) {
  console.log( a + b ); // work is an arbitrary function or method
}

function spy(func){
    function wrapper(...args){
        wrapper.calls.push(args);
        func.apply(this, args);
    }
    wrapper.calls = [];

    return wrapper;
}

work = spy(work);

work(1, 2); // 3
work(4, 5); // 9

for (let args of work.calls) {
  console.log( 'call:' + args.join() ); // "call:1,2", "call:4,5"
}

//2. 
function f(x) {
  console.log(x);
}

function delay(func, ms){
  return function(){
    setTimeout(() => { func.apply(this, arguments) }, ms);
  }
}

// create wrappers
let f1000 = delay(f, 1000);
let f1500 = delay(f, 1500);

f1000("test"); // shows "test" after 1000ms
f1500("test"); // shows "test" after 1500ms

//3. 
function debouncer(func, ms){
  let timeId = setTimeout(() => { func.apply(this, arguments) }, ms);
  return function(){
    clearTimeout(timeId);
    timeId = setTimeout(() => { func.apply(this, arguments) }, ms);
  }
}

let fnc = debouncer(console.log, 3000);

fnc("a");
setTimeout( () => fnc("b"), 1000);
setTimeout( () => fnc("c"), 1000);

//4. 
function throttle(func, ms){
  let savedArgs;
  let savedThis;
  let isThrottled = false;
  function wrapper(){
    if(isThrottled){
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    isThrottled = true;

    func.apply(this, arguments);

    setTimeout(() => {
      isThrottled = false;
      if(savedArgs){
        wrapper.apply(savedThis, savedArgs);
        savedThis = null;
        savedArgs = null;
      }
    }, ms);
  }
  return wrapper;
}

let fun = throttle(f, 1000);

fun("throttle test");
fun("throttle test2");
fun("throttle test3");