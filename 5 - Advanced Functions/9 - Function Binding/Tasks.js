"use strict";
const prompt = require('prompt-sync')();

//1. 
function f() {
  console.log( this ); // ?
}

let user = {
  g: f.bind(null)
};

user.g();

// This will output the global object in non-strict mode. Binding to null will default the context 
// to the global context. In strict mode, it will print null

//2. 
function f2() {
  console.log(this.name);
}

f2 = f2.bind( {name: "John"} ).bind( {name: "Ann" } );

f2();

// This will bind f to the object with name "John" as a callable function. The second bind will 
// not re-bind as functions can only be bound once. So the output will be "John"

//3. 
function sayHi() {
  console.log( this.name );
}
sayHi.test = 5;

let bound = sayHi.bind({
  name: "John"
});

console.log( bound.test ); // what will be the output? why?

// The output will change as "this" will no longer refer to the original lexical environment
// of sayHi. It will refer to the object with name "John", and test will not be defined.

//4. 
function askPassword(ok, fail) {
  let password = prompt("Password?", '');
  if (password == "rockstar") ok();
  else fail();
}

user = {
  name: 'John',

  loginOk() {
    console.log(`${this.name} logged in`);
  },

  loginFail() {
    console.log(`${this.name} failed to log in`);
  },

};

askPassword(user.loginOk.bind(user), user.loginFail.bind(user));

//5. 
function askPassword2(ok, fail) {
  let password = prompt("Password?", '');
  if (password == "rockstar") ok();
  else fail();
}

user = {
  name: 'John',

  login(result) {
    console.log( this.name + (result ? ' logged in' : ' failed to log in') );
  }
};

askPassword2(user.login.bind(user, true), user.login.bind(user, false)); // create partial functions binding true / false