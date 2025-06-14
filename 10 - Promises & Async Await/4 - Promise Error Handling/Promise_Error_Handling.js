// Error handling with promises is fairly easy to implement. When a promise has an issue, it jumps to the 
// nearest handler to deal with it. In the event of promise chaining, you can set one catch at the very 
// end to handle errors for promises anywhere in the chain. If any of the promises fail, they will 
// go to the catch at the end to deal with the error. 

fetch('/article/promise-chaining/user.json')
  .then(response => response.json())
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  .then(response => response.json())
  .then(githubUser => new Promise((resolve, reject) => {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 3000);
  }))
  .catch(error => console.log(error.message)); // any of the then() promises' errors will be caught here

// There is an implicit try-catch that surrounds a promise function, such that when any error occurs 
// it will be treated like a rejection that passes in the error object to the rejection function. 

// The same happens for any handler like then() as well. When an error occurs in a then()'s code, it will 
// locate and jump to the nearest error handler (catch()).

// We can also have a catch() set so that when an error happens, we recover from it, and then the next 
// then() executes as normal:

// the execution: catch -> then
new Promise((resolve, reject) => {

  throw new Error("Whoops!");

}).catch(function(error) {

  console.log("The error is handled, continue normally");

}).then(() => console.log("Next successful handler runs"));

// We can also re-throw the error if it can't be handled:

// the execution: catch -> catch
new Promise((resolve, reject) => {

  throw new Error("Whoops!");

}).catch(function(error) { // (*)

  if (error instanceof URIError) {
    // handle it
  } else {
    console.log("Can't handle such error");

    throw error; // throwing this or another error jumps to the next catch
  }

}).then(function() {
  /* doesn't run here */
}).catch(error => { // (**)

  console.log(`The unknown error has occurred: ${error}`);
  // don't return anything => execution goes the normal way

});