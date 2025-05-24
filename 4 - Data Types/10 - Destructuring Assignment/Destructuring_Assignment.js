// We can use destructuring assignment to assign elements in arrays or objects to variables easily.

let arr = ["John", "Smith"]

// destructuring assignment
// sets firstName = arr[0]
// and surname = arr[1]
let [firstName, surname] = arr;

console.log(firstName); // John
console.log(surname);  // Smith

// We can use it with methods that return arrays as well:
[firstName, surname] = "John Smith".split(' ');
console.log(firstName); // John
console.log(surname);  // Smith

// In the case above, if "John Smith" had any extra items in it to split, they would be ignored
// as there would be no variables to assign them to. Additionally, if we wanted to ignore some 
// of the items, we can insert extra commas into the destructring "array":

// second element is not needed
let [name, , title] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

console.log( name + " " + title ); // Julius Consul

// Destructuring assignment also works with any iterable on the right side:
let [a, b, c] = "abc"; // ["a", "b", "c"]
let [one, two, three] = new Set([1, 2, 3]);

// We can even use destructuring assignment to swap values:
let hello = "Hello ";
let world = "World ";
console.log(hello + world);
[hello, world] = [world, hello];
console.log(hello + world);

// For cases where we don't want to get rid of extra items in an iterable, we can use spread:
let [name1, name2, ...titles] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
// now titles = ["Consul", "of the Roman Republic"]

// In the case that the iterable does not have enough values to assign to variables, the 
// variables will be undefined. In that case we can also offer default values:
// default values
[name = "Guest", surname = "Anonymous"] = ["Julius"];

console.log(name);    // Julius (from array)
console.log(surname); // Anonymous (default used)

// We can even prompt for default values as well.
//[name = prompt('name?'), surname = prompt('surname?')] = ["Julius"];

/////////////////////////////////////////////////////////////////////////////////

// Object destructuring assignment works similarly:

let options = {
  menuTitle: "Menu",
  width: 100,
  height: 200
};

let {menuTitle, width, height} = options; // variable names have to match property names this way

console.log(menuTitle);  // Menu
console.log(width);  // 100
console.log(height); // 200

// if we want to assign to variables with different names we need to map them like so:
let {menuTitle: m, width: w, height: h} = options;
console.log(m);
console.log(w);
console.log(h);

// we can also still give default values:
let options2 = {};
let {menuTitle: m2 = "Title", width: w2 = 50, height: h2 = 100} = options2;
console.log(m2);
console.log(w2);
console.log(h2);

// we can assign with just one variable if we don't need all of the properties:
let example = {
    test: "test",
    name: "name"
}
let {test} = example;
console.log(test);

// using spread also works here:
let {test: test2, ...rest} = example;
console.log(test2);
console.log(rest);

/////////////////////////////////////////////////////////////////////////////////

// We can also nest destructuring assignments for objects that have nested iterables:
options = {
  size: {
    newWidth: 100,
    newHeight: 200
  },
  items: ["Cake", "Donut"],
  extra: true
};

// destructuring assignment split in multiple lines for clarity
let {
  size: { // put size here
    newWidth,
    newHeight
  },
  items: [item1, item2], // assign items here
  newTitle = "Menu" // not present in the object (default value is used)
} = options;

console.log(newTitle);  // Menu
console.log(newWidth);  // 100
console.log(newHeight); // 200
console.log(item1);  // Cake
console.log(item2);  // Donut

/////////////////////////////////////////////////////////////////////////////////

// We can also pass objects with function parameters in them, and functions will destructure them
// automatically. This helps when there are multiple optional parameters:
options = {
  title: "My menu",
  items: ["Item1", "Item2"]
};

// we can even provide a default parameter object at the end:                   V
function showMenu({title = "Untitled", width = 200, height = 100, items = []} = {}) {
  // title, items – taken from options,
  // width, height – defaults used
  console.log( `${title} ${width} ${height}` ); // My Menu 200 100
  console.log( items ); // Item1, Item2
}

showMenu(options);

