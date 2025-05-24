//1. 
let user = {
  name: "John",
  years: 30
};

let {name, years: age, isAdmin = false} = user;
console.log(name);
console.log(age);
console.log(isAdmin);

//2. 
function topSalary(salaries){
    let maxName = null;
    let maxSalary = 0;
    for( let [name, salary] of Object.entries(salaries)){
        if(salary > maxSalary){
            maxName = name;
            maxSalary = salary;
        }
    }
    return maxName;
}

let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};

console.log(topSalary(salaries));