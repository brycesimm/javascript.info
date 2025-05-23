//1. 
function camelize(string){
    let arr = string.split('-');
    arr.forEach((str, index) => {
        let firstChar = str.charAt(0).toUpperCase();
        arr[index] = firstChar + str.slice(1);
    })
    arr[0] = arr[0].charAt(0).toLowerCase() + arr[0].slice(1);

    return arr.join("");
}

console.log(camelize("background-color")); // backgroundColor
console.log(camelize("list-style-image")); // listStyleImage
console.log(camelize("-webkit-transition")); // WebkitTransition

// Perhaps a better way is to use the map() function as well:
function camelize2(string) {
    return string.split("-").map((item, index) => {
                                return index == 0 ? item : item.charAt(0).toUpperCase() + item.slice(1)
                            }).join("");
}

console.log(camelize2("background-color")); // backgroundColor
console.log(camelize2("list-style-image")); // listStyleImage
console.log(camelize2("-webkit-transition")); // WebkitTransition

//2. 
function filterRange(arr, a, b){
    return arr.filter((item) => {
        if((item >= a) && (item <= b)){
            return item;
        }
    })
}

let array = [1, 3, 5, 7];
console.log(filterRange(array, 2, 6)); // [ 3, 5 ]
console.log(array); // unaltered, [ 1, 3, 5, 7 ]

arr = [5, 3, 8, 1];
let filtered = filterRange(arr, 1, 4);
console.log( filtered ); // 3,1 (matching values)
console.log( arr ); // 5,3,8,1 (not modified)

//3. 
function filterRangeInPlace(arr, a, b){
    arr.forEach((item, index) => {
        if((item < a) || (item > b)){
            arr.splice(index, 1);
        }
    })
}

arr = [5, 3, 8, 1];
filterRangeInPlace(arr, 1, 4); // modifies arr itself
console.log(arr); // [ 3, 1 ]

//4. 
arr = [5, 2, 1, -10, 8];

function compare(a, b){
    return -1 * (a - b); // could also do b - a
}

arr.sort(compare);

console.log( arr ); // 8, 5, 2, 1, -10

//5. 
function copySorted(array){
    return array.slice().sort();
}

arr = ["HTML", "JavaScript", "CSS"];

let sorted = copySorted(arr);

console.log( sorted ); // CSS, HTML, JavaScript
console.log( arr ); // HTML, JavaScript, CSS (no changes)

//6. A not-so-clean implementation:
function Calculator() {
    this.calculate = (str) => {
        let a = 0;
        let b = 0;
        let operator = "";
        let arr = str.split(" ");
        a = +arr[0];
        operator = arr[1];
        b = +arr[2];
        switch (operator){
            case "+":
                return this.add(a, b);
            case "-":
                return this.sub(a, b);
            case "*":
                return this.mult(a, b);
            case "/":
                return this.div(a, b);
            case "**":
                return this.exp(a, b);
            default:
                return NaN;
            
        }
    }

    this.add = (a, b) => {
        return a + b;
    }

    this.sub = (a, b) => {
        return a - b;
    }

    this.addMethod = (operator, func) => {
        if(operator == "*"){
            this.mult = func;
        }
        else if(operator == "/"){
            this.div = func;
        }
        else if(operator == "**"){
            this.exp = func;
        }
    }
}

let calc = new Calculator();
console.log(calc.calculate("3 + 7"));
console.log(calc.calculate("10 - 7"));

calc.addMethod("*", (a, b) => a * b);
calc.addMethod("/", (a, b) => a / b);
calc.addMethod("**", (a, b) => a ** b);

console.log(calc.calculate("3 * 7"));
console.log(calc.calculate("8 / 2"));
console.log(calc.calculate("2 ** 3"));

// The cleaner implementation done by javascript.info stores the methods inside an object in the 
// Calculator object where the methods' names are just the operator so we can index by the operator 
// passed in the calculate() string rather than needing if/elses or switch cases

//7. 
let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 28 };

let users = [ john, pete, mary ];

let names = users.map((user) => {
    return user.name;
})

console.log( names ); // John, Pete, Mary

//8. 
john = { name: "John", surname: "Smith", id: 1 };
pete = { name: "Pete", surname: "Hunt", id: 2 };
mary = { name: "Mary", surname: "Key", id: 3 };

users = [ john, pete, mary ];

let usersMapped = users.map((user) => {
    return {
        fullName: user.name + " " + user.surname,
        id: user.id
    }
});

/*
usersMapped = [
  { fullName: "John Smith", id: 1 },
  { fullName: "Pete Hunt", id: 2 },
  { fullName: "Mary Key", id: 3 }
]
*/

console.log( usersMapped[0].id ); // 1
console.log( usersMapped[0].fullName ); // John Smith
console.log(usersMapped);

//9.
// Solution done with Selection Sort, but can be done by:
/*
function sortByAge(arr){
    arr.sort((a, b) => a.age - b.age);
}
*/
john = { name: "John", age: 25 };
pete = { name: "Pete", age: 30 };
mary = { name: "Mary", age: 28 };

arr = [ pete, john, mary ];

function sortByAge(arr) {
    let min = null;
    for(let i = 0; i < arr.length; i++){
        min = i;
        for(let j = i + 1; j < arr.length; j++){
            if(arr[j].age < arr[min].age){
                min = j;
            }
        }
        let tempObj = arr[i];
        arr[i] = arr[min];
        arr[min] = tempObj;
    }
}

sortByAge(arr);

// now: [john, mary, pete]
console.log(arr[0].name); // John
console.log(arr[1].name); // Mary
console.log(arr[2].name); // Pete

//10.
arr = [1, 2, 3];

function shuffle(arr) {
    for(let i = 0; i < arr.length; i++){
        let randIndex = Math.floor((Math.random() * (arr.length)));
        let temp = arr[i];
        arr[i] = arr[randIndex];
        arr[randIndex] = temp;
    }
    console.log(arr);
}

shuffle(arr);
// arr = [3, 2, 1]

shuffle(arr);
// arr = [2, 1, 3]

shuffle(arr);
// arr = [3, 1, 2]

//11.
john = { name: "John", age: 25 };
pete = { name: "Pete", age: 30 };
mary = { name: "Mary", age: 29 };

arr = [ john, pete, mary ];

function getAverageAge(arr) {
    let average = arr.reduce((sum, a) => {
        return sum += a.age;
    }, 0) / arr.length;
    return average;
}

console.log( getAverageAge(arr) ); // (25 + 30 + 29) / 3 = 28

//12.
// Could have been simpler using namesFound[] as the return value and using a loop
// to iterate, but I thought using the filter method as the iterating loop to be cheeky
function unique(arr) {
    let namesFound = [];
    let filteredArr = arr.filter((str) => {
        if(!namesFound.includes(str)){
            namesFound.push(str);
            return str;
        }
    });
    return filteredArr;
}

let strings = ["Hare", "Krishna", "Hare", "Krishna",
  "Krishna", "Krishna", "Hare", "Hare", ":-O"
];

console.log( unique(strings) ); // Hare, Krishna, :-O

//13. 
// This can also be achieved through reduce:
/*
function groupById(arr) {
    return arr.reduce((obj, user) => {
            obj[user.id] =  user;
            return obj;
        }, {});
}
*/
users = [
  {id: 'john', name: "John Smith", age: 20},
  {id: 'ann', name: "Ann Smith", age: 24},
  {id: 'pete', name: "Pete Peterson", age: 31},
];

function groupById(arr) {
    let obj = {};
    for(let key of arr){
        obj[key.id] = key; 
    }
    return obj;
}

let usersById = groupById(users);
console.log(usersById);

/*
// after the call we should have:

usersById = {
  john: {id: 'john', name: "John Smith", age: 20},
  ann: {id: 'ann', name: "Ann Smith", age: 24},
  pete: {id: 'pete', name: "Pete Peterson", age: 31},
}
*/