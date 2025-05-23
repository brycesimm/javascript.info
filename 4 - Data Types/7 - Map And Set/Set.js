// Set is a collection of values in which values can appear only once, and have no keys

/*
Methods and properties are:

new Set([iterable]) – creates the set, and if an iterable object is provided (usually an array), 
                      copies values from it into the set.
set.add(value) – adds a value, returns the set itself.
set.delete(value) – removes the value, returns true if value existed at the moment of the call, 
                    otherwise false.
set.has(value) – returns true if the value exists in the set, otherwise false.
set.clear() – removes everything from the set.
set.size – is the elements count.
*/

// Because sets can only contain one copy of any given value, repeated set.add() calls with the 
// same value are ignored:

let set = new Set();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

// visits, some users come multiple times
set.add(john);
set.add(pete);
set.add(mary);
set.add(john); // ignored
set.add(mary); // ignored

// set keeps only unique values
console.log( set.size ); // 3

for (let user of set) {
  console.log(user.name); // John (then Pete and Mary)
}

// Sets can be iterated over via for..of or forEach:
set = new Set(["oranges", "apples", "bananas"]);

for (let value of set) console.log(value);

// the same with forEach:
set.forEach((value, valueAgain, set) => {
  console.log(value);
});

// Note that with forEach, the same value is given as a parameter twice; this is for compatibility
// with map where the first value given is key, and the second is value.

// For iteration, the same methods as with maps are available: set.keys(), set.values, and set.entries().
// set.keys() and set.values() return the same thing, while set.entries() returns value-value pairs
// for compatibility with maps once again.


