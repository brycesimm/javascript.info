// primitive types are stored by value rather than by reference. 
// if you edit the value of phrase, it won't affect the value in message
let message = "Hello!";
let phrase = message;

// storing objects in variables actually stores a reference to the object 
// rather than the object itself
// if we do the same as above with an object, the original object's properties 
// can be changed through the new variable's reference
let user = {
  name: "John"
};

let newUser = user;

newUser.name = "A A Ron";

console.log( user.name ); // outputs "A A Ron" instead of "John"

let user2 = {
    name: "John"
}

// object comparison only outputs true if you are comparing the same object
// if two different objects have the same properties and property values, they
// are considered not equal:
console.log( user === newUser ); // true

console.log( user === user2 ); // false

// one consequence of objects being stored as references is you can store a reference
// in a const variable and still change the object that is referenced:
const constUser = {
    name: "Balockay"
}

constUser.name = "Deenice";

console.log( constUser.name );

// if we want to duplicate an object, we can iterate over the keys in the original object
// and assign them to the new object, use the Object.assign() method, or even use spread syntax:
let originalObj = {
    name: "Jay Quelin"
}

let iteratedObj = {};

for(key in originalObj){
    iteratedObj[key] = originalObj[key];
}

console.log( originalObj === iteratedObj ); // false
console.log( originalObj.name ); // Jay Quelin
console.log( iteratedObj.name ); // Jay Quelin

let assignObj = Object.assign({}, originalObj);

assignObj.name = "O'Shag-Hennessy";

console.log( originalObj === assignObj ); // false
console.log( originalObj.name ); // Jay Quelin
console.log( assignObj.name ); // O'Shag-Hennessy

let spreadObj = {...originalObj};

console.log( originalObj === spreadObj ); // false
console.log( originalObj.name ); // Jay Quelin
console.log( spreadObj.name ); // O'Shag-Hennessy

// if the object you want to clone has any objects as properties 
// (and no function properties), you need to use structured cloning 
// to avoid those nested objects getting copied by reference as well: 
// (p.s. structuredClone supports circular references too)

originalObj = {
    name: "A A Ron",
    excuses: {
        hasClubPictures: true
    }
}
let structuredObj = structuredClone( originalObj );

structuredObj.excuses.hasClubPictures = false;
console.log( originalObj.excuses.hasClubPictures ); //true
console.log( structuredObj.excuses.hasClubPictures ); //false