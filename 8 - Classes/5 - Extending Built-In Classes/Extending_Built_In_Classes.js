// In addition to classes we make ourselves, built-in classes like Array, Map, etc. 
// are also extendable:

// add one more method to it (can do more)
class PowerArray extends Array {
  isEmpty() {
    return this.length === 0;
  }
}

let arr = new PowerArray(1, 2, 5, 10, 50);
console.log(arr.isEmpty()); // false

let filteredArr = arr.filter(item => item >= 10);
console.log(filteredArr); // 10, 50
console.log(filteredArr.isEmpty()); // false

// It's important to note that methods like Array.filter return the instance of the PowerArray 
// class rather than an Array object, which is neat since we can keep using the PowerArray object. 
// This is done by the Array method using the PowerArray constructor rather than regular Array.
// If we want to return an Array instead of PowerArray, we can add a special [Symbol.species] 
// getter to the class like: 

/*
static get [Symbol.species]() {
    return Array;
  }
*/

// The above would cauls filteredArr.isEmpty() to fail above since Array does not have that method.

// In the Static Properties and Methods subsection we learned about how they are usually inherited 
// from the classes you extend. Built-in classes are an exception to this. For instance, Array extends 
// Object, but there is no Array.keys() static method like there is Object.keys(). 