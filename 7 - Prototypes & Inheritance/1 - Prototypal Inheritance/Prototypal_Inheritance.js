// Sometimes we want to create objects based on others without having to rewrite 
// properties. One way we can do this is by using the __proto__ property that every 
// object implicitly has. When we assign an object's prototype property to reference 
// another object, the original object can inherit properties from the assigned 
// "prototype". 

let animal = {
  eats: true
};
let rabbit = {
  jumps: true
};

rabbit.__proto__ = animal; // (*)

// we can find both properties in rabbit now:
console.log( rabbit.eats ); // true (**)
console.log( rabbit.jumps ); // true

// In this case, animal is the prototype of rabbit. Rabbit prototypically inherits from
// animal. If we add a method to animal, rabbit will also inherit it. We can also define
// rabbit's prototype at declaration:

rabbit = {
  jumps: true,
  __proto__: animal
}

animal.Walk = function() {
  console.log("Animal Walk");
}

rabbit.Walk(); // "Animal Walk"

// This can be made even more powerful by chaining prototypes; an object will search 
// through the chain of prototypes to find the property being referenced:
let longEar = {
  earLength: 10,
  __proto__: rabbit
};

longEar.Walk(); // "Animal Walk"
console.log(longEar.jumps); // true

// Two limitations of the [[Prototype]] type is that circular references cannot be created,
// and it can only hold data of type Object or null.

// __proto__ is also a historical getter/setter property, not the data property itself. It's 
// there for historical reasons, but it's not used particularly frequently. It's recommended 
// to use Object.getPrototypeOf()/Object.setPrototypeOf() instead. 

// If we assign an object a property, it will overtake its prototype's property in priority:
rabbit.Walk = function() {
  console.log("Rabbit Walk");
}
rabbit.Walk(); // "Rabbit Walk", not "Animal Walk"

// If we still want to use the prototype's properties, we can call it directly:
rabbit.__proto__.Walk(); // "Animal Walk"

// We can also still use getters an setters of prototypes without affecting the state 
// of the prototype:
let user = {
  name: "John",
  surname: "Smith",

  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  },

  get fullName() {
    return `${this.name} ${this.surname}`;
  }
};

let admin = {
  __proto__: user,
  isAdmin: true
};

console.log(admin.fullName); // John Smith (*)

// setter triggers!
admin.fullName = "Alice Cooper"; // (**)

console.log(admin.fullName); // Alice Cooper, state of admin modified
console.log(user.fullName); // John Smith, state of user protected

// This raises the question of context, which object is being passed as "this" when using 
// a prototype's getter/setter? Prototyping does not affect context, this will always be 
// passed as the object before the dot, as in admin.fullName, admin is "this". 

// An interesting interaction is when we iterate over an object's properties with for..in,
// the loop will go through its inherited properties as well. Object.keys(obj) will not:

animal = {
  eats: true
};

rabbit = {
  jumps: true,
  __proto__: animal
};

// Object.keys only returns own keys
console.log(Object.keys(rabbit)); // jumps

// for..in loops over both own and inherited keys
for(let prop in rabbit) console.log(prop); // jumps, then eats

// If we want to use for..in, we can use the obj.hasOwnProperty(key) method to 
// filter out inherited properties:

for(let prop in rabbit) {
  if(rabbit.hasOwnProperty(prop)){
    console.log("Own prop: " + prop);
  }else{
    console.log("Inherited prop: " + prop);
  }
}

// Someone cleaver may wonder where the hasOwnProperty() method comes from if it's 
// a property available to rabbit, but not shown in its keys. Simply put, referring to 
// the previous chapter, hasOwnProperty is a property inherited from Object.prototype 
// that has its enumerable flag set to false. 