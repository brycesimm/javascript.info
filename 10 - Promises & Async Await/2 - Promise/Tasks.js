//1. 
let promise = new Promise(function(resolve, reject) {
  resolve(1);

  setTimeout(() => resolve(2), 1000);
});

promise.then(console.log);

// The output will be immediately 1 because resolving is final, so the resolve(2) will be ignored
// It will still run the setTimeout and run for 1 second, though.

//2. 
function delay(ms) {
  return new Promise(function(resolve, reject){
    setTimeout(() => { resolve() }, ms);
  }
);
}

delay(3000).then(() => console.log('runs after 3 seconds'));

//3. 

function showCircle(cx, cy, radius, callback) {
    let div = document.createElement('div');
    div.style.width = 0;
    div.style.height = 0;
    div.style.left = cx + 'px';
    div.style.top = cy + 'px';
    div.className = 'circle';
    document.body.append(div);

    setTimeout(() => {
      div.style.width = radius * 2 + 'px';
      div.style.height = radius * 2 + 'px';

      div.addEventListener('transitionend', function handler() {
        div.removeEventListener('transitionend', handler);
        callback(div);
      });
    }, 0);
}

// |
// | 
// V

function showCirclePromisified(cx, cy, radius) {
    let div = document.createElement('div');
    div.style.width = 0;
    div.style.height = 0;
    div.style.left = cx + 'px';
    div.style.top = cy + 'px';
    div.className = 'circle';
    document.body.append(div);
    return new Promise(function(resolve, reject){
        setTimeout(() => {
        div.style.width = radius * 2 + 'px';
        div.style.height = radius * 2 + 'px';

        div.addEventListener('transitionend', function handler() {
            div.removeEventListener('transitionend', handler);
            resolve(div);
        });
        }, 0);
    });
}