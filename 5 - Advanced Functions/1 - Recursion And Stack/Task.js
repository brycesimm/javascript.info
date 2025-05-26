//1. 
// Solved in O(n) time
function sumToIterative(n){
    let sum = 0;
    for(let i = n; i > 0; i--){
        sum += i;

    }
    return sum;
}

console.log("Iterative sum to 0: " + sumToIterative(0));
console.log("Iterative sum to 1: " + sumToIterative(1));
console.log("Iterative sum to 2: " + sumToIterative(2));
console.log("Iterative sum to 3: " + sumToIterative(3));
console.log("Iterative sum to 4: " + sumToIterative(4));
console.log("Iterative sum to 5: " + sumToIterative(5));

// Solved in O(n) times as well, as function called n times
function sumToRecursive(n){
    if(n == 0){
        return n;
    }else{
        return n + sumToRecursive(n - 1);
    }
}

console.log("Recursive sum to 0: " + sumToRecursive(0));
console.log("Recursive sum to 1: " + sumToRecursive(1));
console.log("Recursive sum to 2: " + sumToRecursive(2));
console.log("Recursive sum to 3: " + sumToRecursive(3));
console.log("Recursive sum to 4: " + sumToRecursive(4));
console.log("Recursive sum to 5: " + sumToRecursive(5));

// Solved in O(1) time
function sumToArithemticProgression(n){
    return (n * (1 + n)) / 2;
}
console.log("Arithmetic Progression sum to 0: " + sumToArithemticProgression(0));
console.log("Arithmetic Progression sum to 1: " + sumToArithemticProgression(1));
console.log("Arithmetic Progression sum to 2: " + sumToArithemticProgression(2));
console.log("Arithmetic Progression sum to 3: " + sumToArithemticProgression(3));
console.log("Arithmetic Progression sum to 4: " + sumToArithemticProgression(4));
console.log("Arithmetic Progression sum to 5: " + sumToArithemticProgression(5));

// Arithmetic Progression function is the fastest. The recursive algorithm is the slowest as it 
// performs on the same order of magnitude as the loop algorithm, but also takes extra memory for 
// tracking execution contexts for each function call. 
// The recursive algorithm cannot be used for n = 100,000 due to the recursive limit of JavaScript

//2. 
function factorial(n){
    if(n == 0){
        return 1;
    }
    else{
        return n * factorial(n - 1);
    }
}

console.log("0!: " + factorial(0));
console.log("1!: " + factorial(1));
console.log("2!: " + factorial(2));
console.log("3!: " + factorial(3));
console.log("4!: " + factorial(4));
console.log("5!: " + factorial(5));

//3. 
function fib(n){
    if(n <= 1){
        return n;
    }
    else{
        return fib(n - 1) + fib(n-2);
    }
}

console.log("Fib 0: " + fib(0));
console.log("Fib 1: " + fib(1));
console.log("Fib 2: " + fib(2));
console.log("Fib 3: " + fib(3));
console.log("Fib 4: " + fib(4));
console.log("Fib 5: " + fib(5));
//console.log("Fib 77: " + fib(77)); // Takes forever recursively

function fibFast(n){
    if(n == 0){
        return 0;
    }
    else if(n == 1){
        return 1;
    }
    else{
        let fibArr = [1, 1];
        while(fibArr.length < n + 1){
            for(let i = 2; i <= n; i++){
                fibArr.push(fibArr[i-2] + fibArr[i-1]);
            }
        }
        return fibArr[n-1];
    }
}

console.log("Fib 0 Fast: " + fibFast(0));
console.log("Fib 1 Fast: " + fibFast(1));
console.log("Fib 2 Fast: " + fibFast(2));
console.log("Fib 3 Fast: " + fibFast(3));
console.log("Fib 4 Fast: " + fibFast(4));
console.log("Fib 5 Fast: " + fibFast(5));
console.log("Fib 77 Fast: " + fibFast(77)); // Takes split second iteratively

//4. 
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

function printListIterative(list){
    let tempList = list;
    while(tempList != null){
        console.log(tempList);
        tempList = tempList.next;
    }
}
console.log("Print list iteratively: ");
printListIterative(list);

function printListRecursive(list){
    if(list != null){
        console.log(list);
        printListRecursive(list.next);
    }
}
console.log("Print list recursively: ");
printListRecursive(list);

// printListIterative is better in this case, as it runs in O(n) without the execution context
// stack overhead. printListRecursive also runs in O(n), but has the memory overhead. 

//5. 
function printListIterativeReverse(list){
    let tempList = list;
    let listArr = [];
    while(tempList != null){
        listArr.push(tempList);
        tempList = tempList.next;
    }
    for(let i = listArr.length - 1; i >= 0; i--){
        console.log(listArr[i]);
    }
}
console.log("Print list iteratively in reverse: ");
printListIterativeReverse(list);

function printListRecursiveReverse(list){
    if(list.next == null){
        console.log(list);
    }else{
        printListRecursiveReverse(list.next);
        console.log(list);
    }

}
console.log("Print list recursively in reverse: ");
printListRecursiveReverse(list);
