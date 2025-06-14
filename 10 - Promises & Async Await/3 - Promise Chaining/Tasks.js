//1. 
// promise.then(f1).catch(f2);
// vs
// promise.then(f1, f2);

// They are not the same; the first case will run the then(), which will call f1 when it resovles. 
// It will only run the catch() with f2 when an error occurs. the second case will run the then(), 
// and only execute f1 when resolved, or f2 when rejected. If an error occurs in the 2nd case, 
// neither f1 nor f2 will be called. 