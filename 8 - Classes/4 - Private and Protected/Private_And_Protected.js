// There are two visibility modes that are offered for properties and methods in a class: 
// public and private. public implies that entities outside of the class can reference the 
// property or method, whereas private implies only entities inside the class can reference 
// them. 

// Up until this subsection, we've only been using public properties and methods. Some languages 
// offer protected as a third mode, which allows access to entities within the class and those 
// that extend it. JavaScript does not offer it built-in, and so it is often emulated. 

// To make a property protected, we typically prepend an underscore (not mandatory, just an accepted 
// convention) to the name of the property and add a getter and setter to handle its value rather 
// than having it accessed directly. 

// To make a property read-only, we can set it up so that it has a getter but not a setter. 

// To privatize a property or method, we need only preprend a # to the name. This is a language-level
// control added to ECMAScript 2022. 

// Private fields don't conflict with public ones in terms of names, meaning we can have both 
// #waterLimit and waterLimit fields at the same time. 

class CoffeeMachine {
  _waterAmount = 0; // protected

  #waterLimit = 200; // private

  set waterAmount(value) { 
    if (value < 0) {
      value = 0;
    }
    this._waterAmount = value;
  }

  get waterAmount() {
    return this._waterAmount;
  }

  set waterLimit(value){ // public setter
    if (value < 0) this.#waterLimit = 0;
    if (value >= 0) this.#waterLimit = value;
  }

  get waterLimit(){ // public getter
    return this.#waterLimit;
  }

  #fixWaterAmount(value) {
    if (value < 0) return 0;
    if (value > this.#waterLimit) return this.#waterLimit;
  }

  constructor(power) {
    this._power = power;
  }

  get power() {
    return this._power; // only getter, no setter
  }

}

// create the coffee machine
let coffeeMachine = new CoffeeMachine(100);

// add water
coffeeMachine.waterAmount = -10; // _waterAmount will become 0, not -10

// Note we can still technically access protected properties directly, although of course discouraged:
coffeeMachine._waterAmount = -10;
coffeeMachine._power = 0;

// We can't access #waterLimit or #fixWaterAmount() with the coffeeMachine object, they're only available
// inside the class. 

//coffeeMachine.#fixWaterAmount(123); // Error
//coffeeMachine.#waterLimit = 1000; // Error 
coffeeMachine.waterLimit = 0; // public property doesn't conflict with private
