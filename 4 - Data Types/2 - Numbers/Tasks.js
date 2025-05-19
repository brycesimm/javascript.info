//1. 
let a = +prompt("Enter a value for a ", 0);
let b = +prompt("Enter a value for b ", 0);

console.log (a + b);

//2. 
// console.log( 1.35.toFixed(1) ); // 1.4
// console.log( 6.35.toFixed(1) ); // 6.3
// This is because of the binary representation of 6.35 leading to a precision issue, where
// 6.35 becomes a number slightly less than 6.35 and therefore rounds down to 6.3
// To properly round, you should use multiply 6.35 by 10, use math.round(), and then divide by 10:
// console.log( Math.round( 6.35 * 10 ) / 10 );

//3. 
function readNumber() {
let num = NaN;

while(isNaN(num)){
    num = prompt("Enter a number ", 0);
    if(num == null || num == ""){
        return null;
    }
    num = +num;
}

return num;

}
console.log(readNumber());

//Left off here: https://javascript.info/number