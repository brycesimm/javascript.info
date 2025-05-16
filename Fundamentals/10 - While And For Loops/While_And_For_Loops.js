//1. 
//Outputs 3,2,1
let i = 3;

while (i) {
  alert( i-- );
}

//2. 
//Outputs 1,2,3,4 because ++i returns the new value
i = 0;
while (++i < 5) alert( i );
//Outputs 1,2,3,4,5 because i++ returns the old value
i = 0;
while (i++ < 5) alert( i );

//3.
//Outputs 0,1,2,3,4
for (let i = 0; i < 5; i++) alert( i );
//Outputs 0,1,2,3,4
for (let i = 0; i < 5; ++i) alert( i );

//4.
for(let i = 2; i <= 10; i+=2){
    console.log(i);
}

//5. 
for (let i = 0; i < 3; i++) {
  alert( `number ${i}!` );
}
//|
//|
//V
i = 0;
while(i < 3){
    alert(`number ${i}!`);
    i++;
}

//6. 
let num;
let isGreater = false
do {
    num = prompt("Enter a number",0);
    if(num > 100){
        isGreater = true;
    }
}while(!isGreater && num)

//7. 
let n = 5;

for(let i = 2; i <= n; i++){
    let isPrime = true;
    for(let j = 2; j < i; j++){
        if(i % j == 0){
            isPrime = false;
        }
    }
    if(isPrime){
        console.log(i);
    }
}

//alternative:
outer: for(let i = 2; i <= n; i++){
        for(let j = 2; j < i; j++){
            if(i % j == 0){
                continue outer; //breaks to outer for loop if not prime
            }
        }
        console.log(i);
    }