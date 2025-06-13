// Sometimes we have code that runs asynchronously, as in the rest of the code doesn't wait on it 
// to finish. So, we can have code that runs and takes its time while we continue on until it's ready.
// But if we have code that depends on the result of that async code, it may not be ready if we try 
// to use it immediately. To solve that, we can use callbacks, which let us know when the async 
// code has completed:

function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(script);

  document.head.append(script);
}

// Then, when we are calling loadScript, we provide the callback function that will then use 
// whatever is needed from the async code:

// loadScript('/my/script.js', function() {
    // the callback runs after the script is loaded
  // newFunction(); // so now it works
    // ...
// });

loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', script => {
  alert(`Cool, the script ${script.src} is loaded`);
  alert( _ ); // _ is a function declared in the loaded script
});

// This doesn't account for errors though, so we can also add an error parameter to check when 
// sending a callback function off:

function loadScript2(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));

  document.head.append(script);
}

loadScript2('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', (error, script) => {
    if(error){
        // handle error
    }else{
        alert(`Cool, the script ${script.src} is loaded`);
        alert( _ ); // _ is a function declared in the loaded script
    }
});

// The way described above using callbacks by passing anonymous functions as parameters can be 
// ugly if we have multiple nested async calls:

/*
loadScript(url, callback() {
    loadScript(url2, callback2() {
        loadScript(url3, callback3() {
            loadScript(url4, callback4() {
                // ...
            });
        });
    });
});
*/

// This is called "callback hell" or "pyramid of doom"

// We can make it cleaner by creating named functions that are used as callbacks instead:

loadScript('1.js', step1);

function step1(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('2.js', step2);
  }
}

function step2(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('3.js', step3);
  }
}

function step3(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...continue after all scripts are loaded (*)
  }
}

// The async functions still chain to one another, but they don't clutter up with each new addition. 
// It's still a bit difficult to read, and there are even better solutions ahead in the next sections.