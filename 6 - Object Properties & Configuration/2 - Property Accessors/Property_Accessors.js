// There are two types of properties, data properties and accessor properties. 
// The standard type of properties are data properties. The properties used up 
// to this point are data properties. Accessor properties are properties that 
// look like regular properties in code external to the object, but execute 
// like functions to get and set data properties. Accessor properties are split 
// into getters and setters:

let obj = {
  get propName() {
    // getter, the code executed on getting obj.propName
  },

  set propName(value) {
    // setter, the code executed on setting obj.propName = value
  }
};

let user = {
  name: "John",
  surname: "Smith",

  get fullName() {
    return `${this.name} ${this.surname}`;
  },

  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  }
};

console.log(user.fullName); // John Smith

user.fullName = "Chip Simm";
console.log(user.fullName);

// Descriptors for accessor properties are a little different than descriptors for 
// data properties. There are no value flags, but there are get and set functions
// This of course implies that we can set these functions ourselves in a pre-defined 
// descriptor:

user = {
  name: "John",
  surname: "Smith"
};

Object.defineProperty(user, 'fullName', {
  get() {
    return `${this.name} ${this.surname}`;
  },

  set(value) {
    [this.name, this.surname] = value.split(" ");
  }
});

console.log(user.fullName); // John Smith

for(let key in user) console.log(key); // name, surname

// This allows us to have special logic for getters and setters if needed, like 
// for filtering out certain outputs or abstracting property access. 