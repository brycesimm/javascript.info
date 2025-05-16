//1. 
//else is not needed here, if age > 18 then the function will cut short, otherwise will return confirm
function checkAge(age) {
  if (age > 18) {
    return true;
  } else {
    // ...
    return confirm('Did parents allow you?');
  }
}

//2. 
function checkAge2(age) {
  if (age > 18) {
    return true;
  } else {
    return confirm('Did parents allow you?');
  }
}
//|
//|
//V
function checkAge3(age){
    return (age > 18) ? true: confirm('Did parents allow you?');
}
function checkAge4(age){
    return (age > 18) || confirm('Did parents allow you?');
}

//3.
function min(a, b){
    if(a > b){
        return b;
    }
    else {
        return a;
    }
}
//alternative:
function min2(a,b){
    return (a < b) ? a: b;
}
