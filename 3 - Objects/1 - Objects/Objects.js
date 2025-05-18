//1. 
let user = {};
user.name = "John";
user.surname = "Smith";
user.name = "Peter";
delete user.name;

//2. 
function isEmpty(object){
    for(let prop in object){
        return false;
    }
    return true;
}
let schedule = {};

alert( isEmpty(schedule) ); // true

schedule["8:30"] = "get up";

alert( isEmpty(schedule) ); // false

//3. 
function sumProps(object){
    let sum = 0;
    for(let prop in object){
        sum += object[prop];
    }
    return sum;
}

let salaries = {
  John: 100,
  Ann: 160,
  Pete: 130
}

alert( sumProps(salaries) );

//4. 
function multiplyNumeric(object){
    for(let prop in object){
        if(typeof object[prop] === "number"){
            object[prop] *= 2;
        }
    }
}
// before the call
let menu = {
  width: 200,
  height: 300,
  title: "My menu"
};

multiplyNumeric(menu);

// after the call
menu = {
  width: 400,
  height: 600,
  title: "My menu"
};