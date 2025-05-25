// The Date() object allows us to manipulate dates and times:
let now = new Date();
console.log(now); // current date time string

////////////////////////////////////////////////////////////////

// new Date(milliseconds) == new Date(timestamp)

// We can use timestamps to create specific dates, which are numeric representations
// of how many milliseconds have passed since Jan 1st, 1970

// 0 means 01.01.1970 UTC+0
let Jan01_1970 = new Date(0);
console.log( Jan01_1970 );

// now add 24 hours, get 02.01.1970 UTC+0
let Jan02_1970 = new Date(24 * 3600 * 1000);
console.log( Jan02_1970 );

// dates prior to Jan 1st, 1970 have negative timestamps:

// 31 Dec 1969
let Dec31_1969 = new Date(-24 * 3600 * 1000);
console.log( Dec31_1969 );

////////////////////////////////////////////////////////////////

// new Date(datestring)

let date = new Date("2017-01-26");
console.log(date);
// The time is not set, so it's assumed to be midnight GMT and
// is adjusted according to the timezone the code is run in
// So the result could be
// Thu Jan 26 2017 11:00:00 GMT+1100 (Australian Eastern Daylight Time)
// or
// Wed Jan 25 2017 16:00:00 GMT-0800 (Pacific Standard Time)

////////////////////////////////////////////////////////////////

// new Date(year, month, date, hours, minutes, seconds, ms)

/*
The year should have 4 digits. For compatibility, 2 digits are also accepted and considered 19xx, 
e.g. 98 is the same as 1998 here, but always using 4 digits is strongly encouraged.
The month count starts with 0 (Jan), up to 11 (Dec).
The date parameter is actually the day of month, if absent then 1 is assumed.
If hours/minutes/seconds/ms is absent, they are assumed to be 0.
*/

let test = new Date(2011, 0, 1, 0, 0, 0, 0); // 1 Jan 2011, 00:00:00
let test2 = new Date(2011, 0, 1); // the same, hours etc are 0 by default

date = new Date(2011, 0, 1, 2, 3, 4, 567);
console.log( date ); // 1.01.2011, 02:03:04.567

////////////////////////////////////////////////////////////////

// Date Methods

// getFullYear() - 4 digits
date = new Date();
console.log("Full year: " + date.getFullYear());

// getMonth() - 0 - 11
console.log("Month: " + date.getMonth());
console.log("Month as 1-12: " + (date.getMonth() + 1));

// getDate() - day of the month, 1-31
console.log("Day: " + date.getDate());

// getHours(), getMinutes(), getSeconds(), getMilliseconds()
console.log("Hours 24hr: " + date.getHours());
console.log("Hours 12hr: " + (date.getHours() % 12));
console.log("Minutes: " + date.getMinutes());
console.log("Seconds: " + date.getSeconds());
console.log("Milliseconds: " + date.getMilliseconds());

// getDay() - gets day of the week, from Sunday = 0 to Saturday = 6
console.log("Day: " + date.getDay());

// Above return results for the current time zone, but there are UTC counterparts
// for some: getUTCFullYear(), getUTCMonth(), getUTCDay()

// getTime() - time in milliseconds since Jan 1, 1970 UTC+0
console.log("Milliseconds since 1/1/1970 UTC+0: " + date.getTime()); 

// getTimezoneOffset() - difference between current timezone and UTC+0 in minutes
console.log("Offset in minutes from UTC+0: " + date.getTimezoneOffset()); // 240 = 8 hrs = UTC-8 in US eastern

// Setting date components

/*
setFullYear(year, [month], [date])
setMonth(month, [date])
setDate(date)
setHours(hour, [min], [sec], [ms])
setMinutes(min, [sec], [ms])
setSeconds(sec, [ms])
setMilliseconds(ms)
setTime(milliseconds) (sets the whole date by milliseconds since 01.01.1970 UTC)
*/

// All of the above except setTime() has a UTC variant
// Many have optional parameters, the parameters that are omitted are not modified

////////////////////////////////////////////////////////////////

// Autocorrection 
// When we set out of bounds values for dates, the date object adjusts to a value that
// works:
date = new Date(2013, 0, 32); // 32 Jan 2013 ?!?
console.log("1/32/2013 turns into: " + date); // ...is 1st Feb 2013!

// autocorection can be used to get time in the future without having to worry about
// converting units. E.g. getting time 70 minutes from now, 45 days from now, etc.

////////////////////////////////////////////////////////////////

// When a date is converted to a number, it becomes a timestamp:
date = new Date();
console.log(+date); // the number of milliseconds, same as date.getTime()

// Since a timestamp is just a number, we can subtract dates easily:
let start = new Date();
let end = new Date(+start + (24 * 3600 * 1000)); // add 24 hours to start date

console.log( `The difference is: ${end - start} ms` );

// If we just want the time without the object, we can use Date().now():
// It's the same as Date().getTime(), but without the object:
start = Date.now();
end = start + (24 * 3600 * 1000);
console.log( `The difference is: ${end - start} ms` ); // same as above

// For performance reasons, when subtracting dates one should use the 
// getTime() method first. It's faster when doing multiple operations over time.

////////////////////////////////////////////////////////////////

// Date.parse(str) - parses a string of format YYYY-MM-DDTHH:mm:ss.sssZ
// T is the delimiter, and Z is the optional time zone in the format +-hh:mm
// Having Z as the zone defaults to UTC+0. Shorter variants like YYYY-MM-DD,
// YYYY-MM, and YYYY are possible as well.

let ms = Date.parse('2012-01-26T13:51:50.417-07:00');
console.log(ms); // 1327611110417  (timestamp)

// since Date.parse() returns a timestamp, we can pass it to create a Date() object:
date = new Date( Date.parse('2012-01-26T13:51:50.417-07:00') );
console.log(date);
