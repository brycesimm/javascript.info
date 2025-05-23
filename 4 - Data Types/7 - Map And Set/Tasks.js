//1. 
function unique(arr) {
  return Array.from(new Set(arr).values()); // .values() not technically needed
}

let values = ["Hare", "Krishna", "Hare", "Krishna",
  "Krishna", "Krishna", "Hare", "Hare", ":-O"
];

console.log( unique(values) ); // [ 'Hare', 'Krishna', ':-O' ]

//2. 
// A very dumb, (BUT WORKING) version of anagram cleaner
function aclean(array) {
    let arr = [];
    let arrSet = new Set(array);
    arrSet.forEach((value, valueAgain, set) => {
        let tempSet = new Set(value);
        set.forEach((secondValue, secondValueAgain, setAgain) =>{
            let currSet = new Set(secondValue);
            if(value.toUpperCase() != secondValue.toUpperCase()){
                if(isAnagram(tempSet, currSet)){
                    set.delete(secondValue);
                }
            }
        });
    });
    arr = Array.from(arrSet);
    return arr;
}

function isAnagram(a, b){
    if(a.size != b.size){
        return false;
    }
    if([...a].every(value => b.has(value)) || [...a].every(value => b.has(value.toUpperCase()))){
        return true;
    }else{
        return false;
    }
}

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

console.log( aclean(arr) ); // "nap,teachers,ear" or "PAN,cheaters,era"

// More sensible version:
function aclean2(array){
    let map = new Map();
    let valueSet = new Set();
    let keysToDelete = [];
    // Create key-value pairs of words and their sorted strings
    for(let i = 0; i < array.length; i++){
        let tempWord = array[i].toLowerCase().split("").sort().join('');
        map.set(array[i], tempWord);
    }
    // For each new key, add its value to the value Set. If the value pops up again, the key
    // must be an anagram, so we will push it to delete from map later
    for(let [key, value] of map){
        if(!valueSet.has(value)){
            valueSet.add(value);
        }else{
            keysToDelete.push(key);
        }
    }
    // Delete all of the anagram keys in map
    for(let key of keysToDelete){
        map.delete(key);
    }
    // left with all of the anagrams occuring first in the array
    return Array.from(map.keys());
}

let arr2 = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

console.log( aclean2(arr2) ); // [ 'nap', 'teachers', 'ear' ]

// An even cleaner version, which only keeps anagrams found later in the array, 
// is to store the key value pairs in reverse so that the key is the sorted lower-case
// string and the value is the normal word as it appears in the array. That way every time
// you call map.set(key, value), every time key ('anp', <anagram>) is set it will overwrite the 
// current value for that key. But, I think that is cheating and so I wrote my own version.

//3. 
let map = new Map();

map.set("name", "John");

let keys = map.keys();

// Error: keys.push is not a function
//keys.push("more");

// Need to convert the MapIterator keys to an array first:
keys = Array.from(keys);
console.log(keys);
keys.push("more");
console.log(keys);