// As we learned in the garbage collection section, items will be removed from memory if
// they become no longer reachable or will no longer be used in the code. With the introduction of 
// arrays and maps, we can use these data structures to hold objects. In the case of maps, we can
// even use objects as keys. So, if we set an object and then use it as a key for a map, and then
// set that object to null, the object won't be garbage collected as it is still used by the map.
// WeakMaps only allow objects to be used for keys; and for good reason seen below.
// This is where WeakMaps can come into play:
let john = { name: "John" };

let weakMap = new WeakMap();
weakMap.set(john, "...");

john = null; // overwrite the reference

// john is removed from memory!

// One tradeoff of WeakMaps is that they are not iterable by nature. This has a hand in concepts
// from theory of computation, in which garbage collection is inherently non-deterministic; meaning
// the garbage collector can collect and remove data at its discretion depending on the environment
// it is in. There is no way to tell when it does what, due to how the collection process happens. 
// In this case, if a WeakMap was iterable, we would add elements and try to iterate over
// that WeakMap. But, what if the garbage collector removed one of the keys in WeakMap? We wouldn't 
// be able to know since it happens under the hood. When iterating over, we might expect a key to be
// available when it isn't and run into an issue. Therefore, WeakMaps are restricted from being iterable.

// So, the reason why Arrays, maps, and sets are iterable is because they maintain the state of the 
// elements they reference and therefore prevent the garbage collector from removing them until 
// explicitly chosen (such as setting an element to null). This makes the behavior deterministic and
// doesn't clash with the deterministic assumptions of iteration.

// Use cases for WeakMaps typically stem from having cases in which data is only needed while its
// associated object is alive. Another case is in caching, where data only needs to be alive for 
// a certain period of time for easy of access:

// 📁 cache.js
let cache = new WeakMap();

// calculate and remember the result
function process(obj) {
  if (!cache.has(obj)) {
    let result = /* calculate the result for */ obj;

    cache.set(obj, result);
    return result;
  }

  return cache.get(obj);
}

// 📁 main.js
let obj = {/* some object */};

let result1 = process(obj);
let result2 = process(obj);

// ...later, when the object is not needed any more:
obj = null;

// Can't get cache.size, as it's a WeakMap,
// but it's 0 or soon be 0
// When obj gets garbage collected, cached data will be removed as well