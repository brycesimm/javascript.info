// constructors are functions that are ran when an object 
// is initialized using the new keyword. They usually have 
// capitalized first letters

function User(name) {
  this.name = name;
  this.isAdmin = false;
}

let user = new User("Jack");

console.log(user.name); // Jack
console.log(user.isAdmin); // false