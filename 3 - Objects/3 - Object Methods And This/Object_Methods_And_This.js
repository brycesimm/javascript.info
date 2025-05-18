// we can stored functions inside objects as properties as such:
// these objects do the same

let user = {
  sayHi: function() {
    alert("Hello");
  }
};

// method shorthand looks better, right?
user = {
  sayHi() { // same as "sayHi: function(){...}"
    alert("Hello");
  }
};

// we can also use the keyword "this" to reference the object 
// that the function is a property of:
user = {
  name: "John",
  age: 30,

  sayHi() {
    // "this" is the "current object"
    alert(this.name);
  }

};

user.sayHi(); // John

// using "this" without an object in strict mode will result in referencing undefined
// in non-strict mode, it will reference the global object, i.e. the window in a browser

// an interesting interaction with arrow functions is they do not have their own "this"
// arrow functions' "this" will reference the object they are in:
user = {
  firstName: "Ilya",
  sayHi() {
    let arrow = () => alert(this.firstName); // "this" references user
    arrow();
  }
};

user.sayHi(); // Ilya