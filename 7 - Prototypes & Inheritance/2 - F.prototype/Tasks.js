//1. 
function Rabbit() {}
Rabbit.prototype = {
  eats: true
};

let rabbit = new Rabbit();

Rabbit.prototype = {};

console.log( rabbit.eats ); 
// true; assigning a new value to Rabbit.prototype will affect new objects, but not old ones

function Rabbit2() {}
Rabbit2.prototype = {
  eats: true
};

rabbit = new Rabbit2();

Rabbit2.prototype.eats = false;

console.log( rabbit.eats ); 
// tricky, but will print false. Rabbit2.prototype is not changing, the eats property is, which 
// is still referenced by old objects and so they will see the change

function Rabbit3() {}
Rabbit3.prototype = {
  eats: true
};

rabbit = new Rabbit3();

delete rabbit.eats;

console.log( rabbit.eats ); 
// true, delete gets applied to the object itself. rabbit does not have an eats property but its
// prototype does; delete does not look at the prototype though.

function Rabbit4() {}
Rabbit4.prototype = {
  eats: true
};

rabbit = new Rabbit4();

delete Rabbit4.prototype.eats;

console.log( rabbit.eats ); 
// undefined; deleting will occur on the Rabbit4.prototype object which does have an eats property,
// and so it will be deleted. rabbit will try to reference it through its prototype and not find it.

//2. 
// This does not always work, such as in times when a function's prototype has changed:

function Rabbit5() {}
rabbit = new Rabbit5();

let rabbit2 = new rabbit.constructor();

console.log(rabbit.constructor == rabbit2.constructor); // true

function Rabbit6() {}

rabbit = new Rabbit6();

Rabbit6.prototype = {

};

rabbit2 = new rabbit.constructor();

console.log(rabbit.constructor == rabbit2.constructor); // false