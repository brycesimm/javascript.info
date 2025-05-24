//1. 
function sumSalaries(obj){
    let salaryArr = Object.values(obj);
    let sum = 0;
    for(let salary of salaryArr){
        sum += salary;
    }
    return sum;
}

let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};

console.log( sumSalaries(salaries) ); // 650

// A cheeky solution is to use reduce on the values array:
/*
function sumSalaries(obj){
    return Object.values(obj).reduce(((sum, salary) => sum + salary), 0);
}
*/

//2. 
function count(obj){
    return Object.keys(obj).length;
}

let user = {
  name: 'John',
  age: 30
};

console.log( count(user) ); // 2