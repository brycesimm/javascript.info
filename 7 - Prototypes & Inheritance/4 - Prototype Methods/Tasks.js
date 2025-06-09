//1. The author's solution didn't work for this, and they cheated by changing the 
// let dictionary = line, so I added my own solution that works but requires the toString
// method to be called:
let dictionary = Object.create(null);

// your code to add dictionary.toString method
Object.defineProperty(dictionary, "toString", {
    value: function(){
        let strArr = [];
        let str = "";
        for(let prop in this) {
            strArr.push(prop);
        }
        str = strArr.join(",");
        return str;
    },
    enumerable: false
});

// add some data
dictionary.apple = "Apple";
dictionary.__proto__ = "test"; // __proto__ is a regular property key here

// only apple and __proto__ are in the loop
for(let key in dictionary) {
  console.log(key); // "apple", then "__proto__"
}

// your toString in action
console.log(dictionary.toString()); // "apple,__proto__"

//2. 
function Rabbit(name) {
  this.name = name;
}
Rabbit.prototype.sayHi = function() {
  console.log(this.name);
};

let rabbit = new Rabbit("Rabbit");

// These calls do the same thing or not?
rabbit.sayHi(); // This will print "Rabbit"
Rabbit.prototype.sayHi(); // This will print undefined
Object.getPrototypeOf(rabbit).sayHi(); // This will print undefined
rabbit.__proto__.sayHi(); // This will print undefined

// The top call calls sayHi with rabbit as "this". The last 3 all call from Rabbit.prototype
// which does not have a name property.