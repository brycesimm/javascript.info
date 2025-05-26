// Recursion is used when a problem can be split into separate, smaller parts. It's
// when a function calls itself, which may lead to more calls to itself, or an end
// condition. 

// Take the pow(x, n) function

// One way to do it is to run iteratively:

function pow(x, n) {
    let result = 1;
    for(let i = 0; i < n; i++){
        result *= x;
    }
    return result;
}

console.log(pow(2, 3));

// The other way, is recursively:

function powRecursive(x, n) {
    if(n == 1){ // base of recursion
        return x;
    }
    else{
        return x * powRecursive(x, n - 1);
    }
}

console.log(powRecursive(2, 3));

// This ends up returning 2 * powRecursive(2, 2), and powRecursive(2, 2) returns 2 * powRecursive(2, 1).
// powRecursive(2, 1) returns 2. So then you end up with:
// 2 * powRecursive(2, 2), where now powRecursive(2, 2) = 2 * 2. This means that 
// powRecursive(2, 3) = 2 * 2 * 2, which is 8.

// The chain for powRecursive(2, 4) would look like:
/*
powRecursive(2, 4) = 2 * powRecursive(2, 3)
powRecursive(2, 3) = 2 * powRecursive(2, 2)
powRecursive(2, 2) = 2 * powRecursive(2, 1)
powRecursive(2, 1) = 2

Then it would become:
powRecursive(2, 4) = 2 * powRecursive(2, 3)
powRecursive(2, 3) = 2 * powRecursive(2, 2)
powRecursive(2, 2) = 2 * 2
|
V
powRecursive(2, 4) = 2 * powRecursive(2, 3)
powRecursive(2, 3) = 2 * 2 * 2
|
V
powRecursive(2, 4) = 2 * 2 * 2 * 2 = 16
*/

// The maximal recursion depth (number of times a function can call itself), is 10,000
// In the above example, the recursion depth is 3 (it calls itself 3 times). 

// Functions have execution details that are stored whenever the function is called.
// The details are stored in its execution context, and typically store where the control
// flow is now, the variables, the value of "this", etc. When a function calls itself, the
// current execution is paused, and its execution context is pushed to an execution context
// stack. The nested call then executes, and when it finishes, the current function call's 
// execution context is retrieved from the stack and continues. 

// It's important to note that execution contexts take memory. Every subcall adds a new 
// context to the stack, and so they can be memory intensive for large loads. In that way
// the original iterative solution with the for loop saves more on memory. 

// As JavaScript.info puts it: Any recursion can be rewritten as a loop. The loop variant 
// usually can be made more effective.

// Sometimes rewriting a recursive piece of code is difficult, and sometimes a recursive
// solution is more readable. 

// Recursion really shines in problems where iteration is harder to apply. Take this scenario:
let company = {
  sales: [{
    name: 'John',
    salary: 1000
  }, {
    name: 'Alice',
    salary: 1600
  }],

  development: {
    sites: [{
      name: 'Peter',
      salary: 2000
    }, {
      name: 'Alex',
      salary: 1800
    }],

    internals: [{
      name: 'Jack',
      salary: 1300
    }]
  }
};

// This company currently has two departments. The sales department has an array of employees.
// The development department has two sub departments. The company structure can change over time,
// adding more departments or even sub sub departments. Iterating over all of the nested objects 
// would be very difficult to do. Recursion can be a helpful solution here:

// We can view the problem as having two cases. One where a department has a list of employees 
// to sum. The other, is more department objects. The first case is the base of recursion. 
let dep = [{
    name: 'John',
    salary: 1000
  }, {
    name: 'Alice',
    salary: 1600
  }]
function sumSalaries(department){
    let sum = 0;
    if(Array.isArray(department)){
        sum += department.reduce((sum, employee) => sum += employee.salary, sum);
        return sum;
    }else{
        for(let dep of Object.values(department)){
            sum += sumSalaries(dep);
        }
    }
    return sum;
}
console.log(sumSalaries(dep)); // Test base case, 2600
console.log(sumSalaries(company)); // 7700

// Actually super impressed with myself here, I wrote this algorithm before I looked at
// what javascript.info had, and as it turns out I wrote the same algorithm albeit with 
// a couple small syntactical differences. Go me!

//////////////////////////////////////////////////////////////////////////////////////

// A recursive data structure is a data structure that replicates itself in parts
// The company example above was an example of this. 

// Linked List
// Linked Lists are data structures in which every element references the element(s) next to it.
// These can serve better in some cases than arrays due to array methods like unshift and shift
// being expensive. In the traditional implementation of Linked Lists, each node in a Linked List 
// will only reference the "next" element. With Doubly Linked Lists, where a node references both
// of its neighbors, we can simply get rid of an element's references to its neighbors and connect 
// the neighbors together; effectively deleting the middle element. In a Singly Linked List, we will
// usually have to track the node prior to the node we want to delete so we can set its reference
// to the deleted node's "next" node.

// This is a hard-coded example of a Singly Linked List:
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};
// Visual representation:
// value 1 -> value 2 -> value 3 -> value 4
// value1.next = value2, value2.next = value3, value3.next = value4, value4.next = null
// We can also create it like this (although still tedious):
list = { value: 1 };
list.next = { value: 2 };
list.next.next = { value: 3 };
list.next.next.next = { value: 4 };
list.next.next.next.next = null;

// We can even break off part of list, store it as a second list, and then rejoin them:
console.log(list);
let secondList = list.next.next;
list.next.next = null; // break off from the original list

console.log(list);
console.log(secondList);

list.next.next = secondList; // rejoin
console.log(list);

// If we want to delete an element, say the object with value 2, in this case we can simply
// set it to the node after it; therefore changing the reference of its prior node, value 1:
list.next = list.next.next; // object with value2 is not referenced any longer, will be garbage collected
console.log(list);

// We can also add a new item to the list at the front by doing:
let head = {value: "New Item", next: list};
console.log(head);

// The biggest issue with lists is that we can't index them to access elements directly. We need to 
// traverse the lists to find the elements we want. But, in cases where that is unnecessary, like with 
// queues and stacks, we only need track and access the elements on the ends. We can enhance lists
// with prev references to make them doubly-linked, and even add head and/or tail nodes to track the 
// elements at the front and back. 