//1. 
alert( null || 2 || undefined ); //2 because it is the first truthy value

//2. 
alert( alert(1) || 2 || alert(3) ); //1, then 2 becaus alert(1) returns undefined which is falsy

//3.
alert( 1 && null && 2 ); //null because it is the first falsy value

//4.
alert( alert(1) && alert(2) ); //1, then undefined because alert returns undefined which is the first falsy value

//5. 
//3 because 2 && 3 has higher precedence and yields 3 as it is the last truthy in that inner expression
//it is then the first truthy in the overall expression
alert( null || 2 && 3 || 4 ); 

//6. 
let age = 25;

if(age>=14 && age<=90){
    alert("Between");
}

//7.
if(!(age>=14 && age<=90)){
    alert("Not Between");
}

//8.
if (-1 || 0) alert( 'first' ); //will alert, -1 || 0 == -1 == true
if (-1 && 0) alert( 'second' ); //will not alert, -1 && 0 == 0 == false
if (null || -1 && 1) alert( 'third' ); //will alert, -1 && 1 == 1, null || 1 == 1 == true

//9.
let username = prompt("Enter a username", "Admin");
let password;
if(username === "Admin"){
    password = prompt("Enter a password", "");

    if(password === "TheMaster"){
        alert("Welcome!");
    }
    else if(password === "" || password === null){
        alert("Canceled");
    }
    else{
        alert("Wrong password");
    }
}
else if (username === "" || username === null){
    alert("Canceled");
}
else{
    alert("I don’t know you");
}
