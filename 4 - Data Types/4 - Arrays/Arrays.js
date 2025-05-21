// Arrays are data structures that allow us to create ordered lists of items
// At their core, arrays are objects, with some special extensions to deal with
// their length and ordering properties

// Arrays can be created like:
let arr = new Array();
let arr2 = [];

// Arrays can be initialized with values:
arr = new Array("Apple", "Orange");
arr2 = ["Apple", "Orange"];

// But creating an array with the new Array() method can be tricky. If we give a single number 
// inside new Array(), it will create an empty array with that many elements:
arr = new Array(1);
console.log(arr); // [ <1 empty item> ]

// So it's safer to just use square brackets
arr = [];
arr2 = [];

// It is important to remember that since objects are copied by reference, that means
// Arrays are too:
console.log(arr == arr2) // false, two different arrays even though both are empty
arr = arr2;
console.log(arr == arr2); // now true, because arr references arr2 now

// If we want to be mean to arrays and use them for purposes other than originally intended,
// we can even add properties to them; given that they are objects:
arr.type = "Fruits";
console.log(arr.type); // Fruits
arr = new Array(); // sorry, arr, now you're back to normal

// Don't do this though, be nice to your arrays! ;P

// We can add new elements like:
arr[0] = "Apple";
console.log(arr); // [ 'Apple' ]
// Or
arr.push("Orange");
console.log(arr); // [ 'Apple', 'Orange' ]

// We can also mix types in an array:
arr.push({name: "John"});
arr.push(true);
arr.push(function(){console.log("Hello!");});
console.log(arr); // [ 'Apple', 'Orange', { name: 'John' }, true, [Function (anonymous)] ]
console.log(arr[2].name);
arr[4]();

// We can access elements via indices like above or using the at() method:
arr.at(-1)(); // when index is negative, it walks back from the end of the array; -1 = last element
console.log(arr.at(2).name);

// Arrays can be used for queues by using shift() to remove the first element, and push() to add a 
// new element to the end
console.log(arr); // [ 'Apple', 'Orange', { name: 'John' }, true, [Function (anonymous)] ]
console.log(arr.shift()); // Apple
console.log(arr); // [ 'Orange', { name: 'John' }, true, [Function (anonymous)] ]
console.log(arr.push("Apple")); // returns the length of the new array as well; 5
console.log(arr); // [ 'Orange', { name: 'John' }, true, [Function (anonymous)], 'Apple' ]

// We can use Arrays for stacks as well, which are basically reversed queues, with push() and pop():
console.log(arr.push("Pineapple")); // 6
console.log(arr); // [  'Orange',  { name: 'John' },  true,  [Function (anonymous)],  'Apple',  'Pineapple'  ]
console.log(arr.pop()); // Pineapple
console.log(arr); // [ 'Orange', { name: 'John' }, true, [Function (anonymous)], 'Apple' ]

// unshift() is like push() but adds an element to the beginning:
console.log(arr.unshift("Grapes")); // 6
console.log(arr); // [  'Grapes',  'Orange',  { name: 'John' },  true,  [Function (anonymous)],  'Apple'  ]

// We can also do multiple elements at once with push and unshift:
arr = [];
arr.push("Apple", "Orange");
console.log(arr);
arr.unshift("Grapes", "Pineapple");
console.group(arr);

// shift and unshift are slower than push and pop, because they deal with elements at the front
// of the array. This means that when they add/remove an element, all the other elements behind 
// them need to be renumbered and moved over. Then, length needs to be updated. When push or pop
// run, all they do is add/remove an element at the end, and update the length. 

// To iterate over an array, there are technically 3 ways with a for loop:
for(let i = 0; i < arr.length; i++){
    console.log(arr[i]);
}
// Below just gives the value rather than the index
for(let fruit of arr){
    console.log(fruit);
}
// This technically works because arrays are objects, but it's not safe:
arr2 = [...arr];
arr2.prop = "Why is this showing?"
for(let key in arr2){
    console.log(arr2[key]);
}
// Grapes,  Pineapple,  Apple,  Orange,  Why is this showing?
// As we can see, for in loops iterate over all properties not just their elements

// One cool thing about the Array.length property is it is writeable. If we set it to a value
// bigger than the array's length, empty elements are addeedd. But, if we set it to a value smaller than 
// the array's length, values will get truncated irreversibly:
arr2 = [...arr];
arr2.length = 20;
console.log(arr2); // [ 'Grapes', 'Pineapple', 'Apple', 'Orange', <16 empty items> ]
arr2.length = 1;
console.log(arr2); // [ 'Grapes' ]

// For particularly useful purposes, arrays can also have arrays for elements. This will create
// multidimensional arrays. They won't open a portal for Dr. Strange to confront Dormamu, but 
// they will let you create matrices:
let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

console.log( matrix[0][1] ); // This outputs the value in the first row, 2nd column: 2

// We can then loop through it with a double for loop:
for(let i = 0; i < matrix.length; i++){
    for(let j = 0; j < matrix[i].length; j++){
        console.log(matrix[i][j]);
    }
}
// The outer loop iterates through each of the row, while the inner loop interates through the columns

// To output arrays nice-like, we can use their toString() method:
console.log(arr.toString()); //  Grapes,Pineapple,Apple,Orange