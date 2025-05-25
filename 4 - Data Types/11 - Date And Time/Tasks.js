//1. 
let date = new Date(2012, 1, 20, 3, 12, 0, 0);
console.log(date.toLocaleString());

//2. 
function getWeekDay(date){
    let dayArr = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
    let dayNum = date.getDay();
    return dayArr[dayNum];
}
date = new Date(2012, 0, 3);  // 3 Jan 2012
console.log( getWeekDay(date) );        // should output "TU"

//3. 
function getLocalDay(date){
    return date.getDay() == 0 ? 7 : date.getDay(); // Mon-Sat are already 1-6, so just set Sun to 7
}
date = new Date(2012, 0, 3);  // 3 Jan 2012
console.log( getLocalDay(date) );       // tuesday, should show 2

//4. 
function getDateAgo(date, days){
    let dateAgo = new Date(+date - (days * 24 * 3600 * 1000)); // subtract days in ms from date in ms
    return dateAgo.getDate();
}
date = new Date(2015, 0, 2);

console.log( getDateAgo(date, 1) ); // 1, (1 Jan 2015)
console.log( getDateAgo(date, 2) ); // 31, (31 Dec 2014)
console.log( getDateAgo(date, 365) ); // 2, (2 Jan 2014)

//5. 
//Add a month, subtract a day, and return result
function getLastDayOfMonth(year, month) {
  let date = new Date(year, month + 1, 0); // passing 0 as the day will subtract a day
  return date.getDate();
}

console.log( getLastDayOfMonth(2012, 0) ); // 31
console.log( getLastDayOfMonth(2012, 1) ); // 29
console.log( getLastDayOfMonth(2013, 1) ); // 28

//6. 
function getSecondsToday(){
    let now = new Date();
    let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let secs = Math.floor(now.getTime() / 1000);
    let secsAtMidnight = Math.floor(today.getTime() / 1000);
    let secsPassed = secs - secsAtMidnight;
    return secsPassed;
}
console.log(getSecondsToday());

//7. 
function getSecondsToTomorrow(){
    let now = new Date();
    let tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    let dateDiff = tomorrow - now;
    return Math.floor(dateDiff/1000);
}
console.log(getSecondsToTomorrow()); 

//8. 
function formatDate(date){
    let now = new Date();
    let dateDiff = now - date;
    let dateDiffSec = dateDiff / 1000;
    let dateDiffMin = dateDiffSec / 60;
    let dateDiffHour = dateDiffMin / 60;

    if(dateDiffSec < 1){
        return "right now";
    }
    if(dateDiffMin < 1){
        return `${dateDiffSec} sec. ago`;
    }
    if(dateDiffHour < 1){
        return `${dateDiffMin} min. ago`;
    }
    //day.month.year hours:minutes
    return `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
}
console.log( formatDate(new Date(new Date - 1)) ); // "right now"
console.log( formatDate(new Date(new Date - 30 * 1000)) ); // "30 sec. ago"
console.log( formatDate(new Date(new Date - 5 * 60 * 1000)) ); // "5 min. ago"
// yesterday's date like 31.12.16 20:00
console.log( formatDate(new Date(new Date - 86400 * 1000)) );