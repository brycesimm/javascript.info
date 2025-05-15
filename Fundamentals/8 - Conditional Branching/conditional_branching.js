//1. 
//non-empty string is truthy, so alerts Hello
if ("0") {
  alert( 'Hello' );
}

//2. 
let answer = prompt("What is the \"offical\" name of JavaScript?", "");

if(answer === "ECMAScript"){
    alert("Right!");
}
else{
    alert("You don’t know? ECMAScript!");
}

//3. 
let num = prompt("Enter a number", "");

if(Number(num) > 0){
    alert(1);
}
else if(Number(num) < 0){
    alert(-1);
}
else{
    alert(0);
}

//4. 
/*
let result;

if (a + b < 4) {
  result = 'Below';
} else {
  result = 'Over';
}
*/

let result = (a + b < 4) ? 'Below' : 'Over';

//5. 
/*
let message;

if (login == 'Employee') {
  message = 'Hello';
} else if (login == 'Director') {
  message = 'Greetings';
} else if (login == '') {
  message = 'No login';
} else {
  message = '';
}
*/
let login = 'Employee';
let message = (login == 'Employee') ? 'Hello' :
              (login == 'Director') ? 'Greetings' :
              (login == '') ? 'No login' :
              '';