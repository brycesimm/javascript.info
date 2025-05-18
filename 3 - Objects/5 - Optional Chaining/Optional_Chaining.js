// using ? when accessing properties allows undefined to be returned when 
// a property doesn't exist rather than returning an error:

let user = {}; // user has no address

console.log( user?.address?.street ); // undefined (no error)

// in the above case, it finds that user exists, so it goes on to find 
// address, which is undefined. It stops the chaining there and returns
// undefined before even looking for street

// it also works with functions:
let userAdmin = {
  admin() {
    alert("I am admin");
  }
};

let userGuest = {};

userAdmin.admin?.(); // I am admin

userGuest.admin?.(); // nothing happens (no such method)

// it also works with square bracket notation:
let key = "firstName";

let user1 = {
  firstName: "John"
};

let user2 = null;

alert( user1?.[key] ); // John
alert( user2?.[key] ); // undefined

// it can also be used with delete:
delete user?.name; // delete user.name if user exists