//1. 
function printNumbersInterval(from, to){
    let timerId = setInterval(function increment() {
        if(from <= to){
            console.log(from);
            from++;
        }
        else{
            clearTimeout(timerId);
        }
    }, 1000, from);
}

printNumbersInterval(1, 5);

function printNumbersNested(from, to){
    let timerId = setTimeout(function increment(from) {
        if(from <= to){
            console.log(from);
            from++;
            timerId = setTimeout(increment, 1000, from);
        }
        else{
            clearTimeout(timerId);
        }
    }, 1000, from);
}

printNumbersNested(1, 5);

//2. 
let i = 0;

setTimeout(() => console.log(i), 100); // ?

// assume that the time to execute this function is >100ms
for(let j = 0; j < 100000000; j++) {
  i++;
}

// The timeout will wait for the loop after to finish, and then print i, which will be 100000000