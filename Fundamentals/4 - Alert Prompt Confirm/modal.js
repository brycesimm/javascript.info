alert("Fill out the next prompt carefully, please");

let confirmed = false;
let name;
while (!confirmed) {
    name = prompt("", "");
    confirmed = confirm(`Is "${name}" your name?`);
}

if(name !== null && name !== ""){
    alert("Your name is: " + name);
}
else{
    alert("You don't have a name, I guess!");
}
