//4. 
function pow(x,n){
    if(((typeof +x) === "number") && ((typeof +n) === "number") && (n >= 1)){
        return x**n;
    }
    else{
        return "Entered values are not supported";
    }
}

let x = prompt("Enter a value for x", "0");
let n = prompt("Enter a value for n", "1");
alert(pow(x,n));