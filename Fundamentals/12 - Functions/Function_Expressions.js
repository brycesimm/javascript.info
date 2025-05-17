//function sayHi is declared and stored in func, but can be called with func() and sayHi()
function sayHi() {
  alert( "Hello" );
}

let func = sayHi; 

console.log(sayHi); //Will output [Function: sayHi]
console.log(sayHi.toString()); //Will output source code of sayHi function
console.log(func); //Will output [Function: sayHi]
console.log(func.toString()); //Will output source code of sayHi function

func(); // Hello 
sayHi(); // Hello  


//yes and no are "callback" functions passed as parameters and are called using parentheses
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}

function showOk() {
  alert( "You agreed." );
}

function showCancel() {
  alert( "You canceled the execution." );
}

// usage: functions showOk, showCancel are passed as arguments to ask
ask("Do you agree?", showOk, showCancel);

//A more streamlined version:
ask(
  "Do you agree?",
  function() { alert("You agreed."); },
  function() { alert("You canceled the execution."); }
);