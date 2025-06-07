// We know that arrow functions have many useful purposes. They can be used in 
// function expressions, array.forEach(), setTimeout, etc. 

// Arrow functions do not have their own "this" context. They grab it from the 
// environment they are in. This can be useful such as in the case of iterating 
// through an arrow function's object properties:

let group = {
  title: "Our Group",
  students: ["John", "Pete", "Alice"],

  showList() {
    this.students.forEach(
      student => console.log(this.title + ': ' + student) // this refers to its outer function showList() for context
    );
  }
};

group.showList();

let group2 = {
  title: "Our Group",
  students: ["John", "Pete", "Alice"],

  showList() {
    this.students.forEach(function(student) {
      // Error: Cannot read property 'title' of undefined
      console.log(this.title + ': ' + student);
    });
  }
};

// Doing it with a regular function inside of the forEach doesn't work, it will try to 
// use its own context, and then check the forEach context which is ran as undefined 
// by default.

// Another important thing to note is that arrow functions do not have "arguments" variable.
// This can be helpful when using them in decorator functions, like with func.apply(this, arguments);
// arguments will come from the outer function rather than the arrow function. 
