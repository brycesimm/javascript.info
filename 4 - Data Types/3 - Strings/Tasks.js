// 1. 
function ucFirst(str) {
    if(str.length == 0){
        return str;
    }
    let firstChar = str.at(0).toUpperCase();
    return firstChar + str.substring(1);
}

console.log(ucFirst("chip"));

//2. 
function checkSpam(str){
    let string = str.toUpperCase();
    if(string.includes("VIAGRA") || string.includes("XXX")){
        return true;
    }
    return false;
}

console.log(checkSpam('buy ViAgRA now'));
console.log(checkSpam('free xxxxx'));
console.log(checkSpam("innocent rabbit"));

//3. 
function truncate(str, maxlength){
    if(str.length > maxlength){
        return str.substring(0, maxlength - 1) + "…";
    }
    return str;
}
console.log(truncate("What I'd like to tell on this topic is:", 20) );
console.log(truncate("Hi everyone!", 20));

//4. 
function extractCurrencyValue(money){
    return Number(parseFloat(money.substring(1)).toFixed(2));
}

console.log(extractCurrencyValue("$120.699"));