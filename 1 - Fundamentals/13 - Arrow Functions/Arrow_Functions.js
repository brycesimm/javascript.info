//1. 
function ask(question, yes, no) {
  if (confirm(question)) yes();
  else no();
}

ask(
  "Do you agree?",
  function() { alert("You agreed."); },
  function() { alert("You canceled the execution."); }
);

//|
//|
//V

let askRewritten = (question, yes, no) => {
    if (confirm(question)) yes();
    else no();
}

askRewritten(
  "Do you agree?",
  () => alert("You agreed."),
  () => alert("You canceled the execution.")
);