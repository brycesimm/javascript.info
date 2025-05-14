console.log("String Conversion \n");
let num = 123456;
let boolTrue = true;
let boolFalse = false;
let nullVal = null;
let undefinedVal = undefined;

let numStr = String(num);
let boolTrueStr = String(boolTrue);
let boolFalseStr = String(boolFalse);
let nullValStr = String(nullVal);
let undefinedValStr = String(undefinedVal);

console.log(`${typeof num} ` + num + " value after converting to string: " + numStr);
console.log(`${typeof boolTrue} ` + boolTrue + " value after converting to string: " + boolTrueStr);
console.log(`${typeof boolFalse} ` + boolFalse + " value after converting to string: " + boolFalseStr);
console.log(`${typeof nullVal} ` + nullVal + " value after converting to string: " + nullValStr);
console.log(`${typeof undefinedVal} ` + undefinedVal + " value after converting to string: " + undefinedValStr);

console.log("\n");

console.log("Number Conversion \n");
let unTrimmedNumStr = "   123   ";
let notANumStr = "123z";
let emptyStr = "";

let unTrimmedNum = Number(unTrimmedNumStr);
let notANum = Number(notANumStr);
let emptyStrNum = Number(emptyStr);
let boolTrueNum = Number(boolTrue);
let boolFalseNum = Number(boolFalse);
let nullVallNum = Number(nullVal);
let undefinedNum = Number(undefinedVal);

console.log(`${typeof unTrimmedNumStr} ` + "\"" + unTrimmedNumStr + "\"" + " value after converting to number: " + unTrimmedNum);
console.log(`${typeof notANumStr} ` + "\"" + notANumStr + "\"" + " value after converting to number: " + notANum);
console.log(`${typeof emptyStr} ` + "\"" + emptyStr + "\"" + " value after converting to number: " + emptyStrNum);
console.log(`${typeof boolTrue} ` + boolTrue + " value after converting to number: " + boolTrueNum);
console.log(`${typeof boolFalse} ` + boolFalse + " value after converting to number: " + boolFalseNum);
console.log(`${typeof nullVal} ` + nullVal + " value after converting to number: " + nullVallNum);
console.log(`${typeof undefinedVal} ` + undefinedVal + " value after converting to number: " + undefinedNum);

console.log("\n");

console.log("Boolean Conversion \n");
let trueNum = 1;
let falseNum = 0;
let posNum = 10;
let negNum = -10;
let regString = "hello";
let zeroStr = "0";
let trueStr = "true";
let falseStr = "false";

let nullValBool = Boolean(nullVal);
let undefinedValBool = Boolean(undefinedVal);
let trueNumBool = Boolean(trueNum);
let falseNumBool = Boolean(falseNum);
let posNumBool = Boolean(posNum);
let negNumBool = Boolean(negNum);
let regStringBool = Boolean(regString);
let zeroStrBool = Boolean(zeroStr);
let trueStrBool = Boolean(trueStr);
let falseStrBool = Boolean(falseStr);

console.log(`${typeof nullVal} ` + nullVal + " value after converting to boolean: " + nullValBool);
console.log(`${typeof undefinedVal} ` + undefinedVal + " value after converting to boolean: " + undefinedValBool);
console.log(`${typeof trueNum} ` + trueNum + " value after converting to boolean: " + trueNumBool);
console.log(`${typeof falseNum} ` + falseNum + " value after converting to boolean: " + falseNumBool);
console.log(`${typeof posNum} ` + posNum + " value after converting to boolean: " + posNumBool);
console.log(`${typeof negNum} ` + negNum + " value after converting to boolean: " + negNumBool);
console.log(`${typeof regString} ` + "\"" + regString + "\"" + " value after converting to boolean: " + regStringBool);
console.log(`${typeof zeroStr} ` + "\"" + zeroStr + "\"" + " value after converting to boolean: " + zeroStrBool);
console.log(`${typeof trueStr} ` + "\"" + trueStr + "\"" + " value after converting to boolean: " + trueStrBool);
console.log(`${typeof falseStr} ` + "\"" + falseStr + "\"" + " value after converting to boolean: " + falseStrBool);
