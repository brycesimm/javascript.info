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

//3. 
arr = [5, 2, 1, -10, 8];

function compare(a, b){
    return -1 * (a - b); // could also do b - a
}

arr.sort(compare);

console.log( arr ); // 8, 5, 2, 1, -10

//4. 
function copySorted(array){
    return array.slice().sort();
}

arr = ["HTML", "JavaScript", "CSS"];

let sorted = copySorted(arr);

console.log( sorted ); // CSS, HTML, JavaScript
console.log( arr ); // HTML, JavaScript, CSS (no changes)

//5. A not-so-clean implementation:
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