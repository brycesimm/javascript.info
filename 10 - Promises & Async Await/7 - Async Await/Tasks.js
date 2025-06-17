//1. 
function loadJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    });
}

loadJson('https://javascript.info/no-such-user.json')
  .catch(console.log); // Error: 404

// |
// |
// V

async function loadJsonAwait(url) {
    let response = await fetch(url);
    if(response.status == 200){
        return response.json();
    }else{
        throw new Error(response.status);
    }
}

try{
    loadJsonAwait('https://javascript.info/no-such-user.json');
}
catch(error){
    console.log(error);
}

//2. 
class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}

function loadJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new HttpError(response);
      }
    });
}

// Ask for a user name until github returns a valid user
function demoGithubUser() {
  let name = prompt("Enter a name?", "iliakan");

  return loadJson(`https://api.github.com/users/${name}`)
    .then(user => {
      console.log(`Full name: ${user.name}.`);
      return user;
    })
    .catch(err => {
      if (err instanceof HttpError && err.response.status == 404) {
        console.log("No such user, please reenter.");
        return demoGithubUser();
      } else {
        throw err;
      }
    });
}

demoGithubUser();

// |
// |
// V

async function loadJson2(url) {
    let response = await fetch(url);
    if(response.status == 200){
        return response.json();
    }else{
        throw new Error(response.status);
    }
}

// Ask for a user name until github returns a valid user
async function demoGithubUser2() {
  let valid = false;
  while(!valid){
    try{
        let name = prompt("Enter a name?", "iliakan");
        let user = await loadJson2(`https://api.github.com/users/${name}`);
        console.log(`Full name: ${user.name}.`);
        valid = true;
        return user;
    }
    catch(error){
        if (err instanceof HttpError && err.response.status == 404) {
            console.log("No such user, please reenter.");
      } else {
        throw err;
      }
    }
  }
}

demoGithubUser2();

//3. 
async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return 10;
}

function f() {
  wait().then(result => console.log(result));
}

f();