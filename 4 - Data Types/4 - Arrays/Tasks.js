//1.
let fruits = ["Apples", "Pear", "Orange"];

// push a new value into the "copy"
let shoppingCart = fruits;
shoppingCart.push("Banana");

// what's in fruits?
console.log( fruits.length ); // ?

// fruits.length shows 4 because arrays copy by reference; the push to shoppingCart 
// changes the fruits array as well

//2. 
let styles = ["Jazz", "Blues"];
styles.push("Rock-n-Roll"); 
console.log(styles); // Jazz, Blues, Rock-n-Roll
styles[Math.floor(styles.length/2)] = "Classics"; // Only works correctly for arrays of odd length
console.log(styles); //Jazz, Classics, Rock-n-Roll
console.log(styles.shift()); //Jazz
console.log(styles); // Classics, Rock-n-Roll
styles.unshift("Rap", "Reggae"); 
console.log(styles); // Rap, Reggae, Classics, Rock-n-Roll

//3. 
let arr = ["a", "b"];

arr.push(function() {
  console.log( this );
});

arr[2](); // ?

// an anyonymous function gets pushed to the end of the array. That function logs "this", which will
// refer to the object that the function is a property of. And so it will print out the arr array

//3. 
function sumInput(){
    let arr = [];
    let input = 0;
    let sum = 0;
    while(!isNaN(input)){
        input = prompt("Enter a number to be summed ", 0);
        if(input == "" || input == null){
            break;
        }
        let num = parseInt(input);
        if(!isNaN(num)){
            arr.push(num);
        }else{
            break;
        }
    }
    for(let i = 0; i < arr.length; i++){
        sum += arr[i];
    }
    return sum;
}

console.log(sumInput());

//4. 
// This runs in O(n^2)
function getMaxSubSum(array){
    let subSumArr = [];
    let subSum = 0;
    let maxSum = 0;
    for(let i = 0; i < array.length; i++){
        subSum += array[i];
        subSumArr.push(subSum);
        for(let j = i + 1; j < array.length; j++){
            subSum += array[j];
            subSumArr.push(subSum);
        }
        subSum = 0;
    }
    maxSum = Math.max(...subSumArr);
    return maxSum >= 0 ? maxSum : 0;
}

console.log(getMaxSubSum([-1, 2, 3, -9])); // 5
console.log(getMaxSubSum([2, -1, 2, 3, -9])); // 6
console.log(getMaxSubSum([-1, 2, 3, -9, 11])); // 11
console.log(getMaxSubSum([-2, -1, 1, 2])); // 3
console.log(getMaxSubSum([100, -9, 2, -3, 5])); // 100
console.log(getMaxSubSum([1, 2, 3])); //6
console.log(getMaxSubSum([-1, -2, -3])); //0

// Faster algorithm (O(n)) given by javascript.info:
function getMaxSubSum2(arr) {
  let maxSum = 0;
  let partialSum = 0;

  for (let item of arr) { // for each item of arr
    partialSum += item; // add it to partialSum
    maxSum = Math.max(maxSum, partialSum); // remember the maximum
    if (partialSum < 0) partialSum = 0; // zero if negative
  }

  return maxSum;
}

console.log(getMaxSubSum2([-1, 2, 3, -9])); // 5
console.log(getMaxSubSum2([2, -1, 2, 3, -9])); // 6
console.log(getMaxSubSum2([-1, 2, 3, -9, 11])); // 11
console.log(getMaxSubSum2([-2, -1, 1, 2])); // 3
console.log(getMaxSubSum2([100, -9, 2, 3, 5])); // 100
console.log(getMaxSubSum2([1, 2, 3])); //6
console.log(getMaxSubSum2([-1, -2, -3])); //0