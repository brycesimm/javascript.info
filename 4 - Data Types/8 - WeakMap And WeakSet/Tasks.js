//1. A weakset may be a better choice, here, but is still very doable with a weakmap:
let weakMap = new WeakMap();

function wasItRead(msg) {
    let tempMessage = weakMap.get(msg);
    if(tempMessage == msg){
        return true;
    }
    else{
        weakMap.set(msg, msg);
        return false;
    }
}

let messages = [
  {text: "Hello", from: "John"},
  {text: "How goes?", from: "John"},
  {text: "See you soon", from: "Alice"}
];

// Read messages
for(let message of messages){
    weakMap.set(message, message);
}

console.log(wasItRead(messages[0])); // true
console.log(wasItRead(messages[1])); // true
console.log(wasItRead(messages[2])); // true
// New unread message, will be added to weakmap
let newMsg = {text: "Hello", from: "Alice"};
console.log(wasItRead(newMsg)); // false
console.log(wasItRead(newMsg)); // true

//2. 
function timeRead(msg){
    if(weakMap.has(msg)){
        return weakMap.get(msg);
    }
    else{
        readMessage(msg);
        return "New message, now read at: " + weakMap.get(msg);
    }
}

function readMessage(msg){
    const now = new Date();
    const hours = now.getHours();
    const mins = now.getMinutes();
    const secs = now.getSeconds();
    weakMap.set(msg, `${hours}:${mins}:${secs}`);
}

weakMap = new WeakMap();
messages = [
  {text: "Hello", from: "John"},
  {text: "How goes?", from: "John"},
  {text: "See you soon", from: "Alice"}
];

// Read messages
for(let message of messages){
    readMessage(message);
}

console.log(timeRead(messages[0])); // read
console.log(timeRead(messages[1])); // read
console.log(timeRead(messages[2])); // read
// New unread message, will be added to weakmap
newMsg = {text: "Hello", from: "Alice"};
console.log(timeRead(newMsg)); // not read, added to weakmap
console.log(timeRead(newMsg)); // read

