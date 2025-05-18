//1. 
function makeUser() {
  return {
    name: "John",
    ref: this
  };
}

let user = makeUser();

alert( user.ref.name ); // What's the result?

// makeUser() creates an object, and then the reference to the object 
// is stored in user. But, at the time makeUser() is called, this does
// not have an object to bind to and therefore is undefined.
// user.ref will therefore be undefined, and user.ref.name will throw an error.
// if ref were to be made into a function returning "this", then it would work
// by calling user.ref().name

//2. 
let calculator = {
    read() {
        this.a = +prompt("Enter a value for a ", "0");
        this.b = +prompt("Enter a value for b ", "0");
    },
    sum() {
        return this.a + this.b;
    },
    mul() {
        return this.a * this.b;
    }
}

calculator.read();
console.log( calculator.sum() );
console.log( calculator.mul() );

//3. Modify the code so you can chain up(), down(), and showStep() calls
let ladder = {
  step: 0,
  up() {
    this.step++;
  },
  down() {
    this.step--;
  },
  showStep: function() { // shows the current step
    console.log( this.step );
  }
};

//|
//|
//V

ladder = {
  step: 0,
  up() {
    this.step++;
    return this;
  },
  down() {
    this.step--;
    return this;
  },
  showStep: function() { // shows the current step
    console.log( this.step );
    return this;
  }
};

ladder.up().up().down().showStep().down().showStep(); // shows 1 then 0