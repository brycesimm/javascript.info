//1. 
//Missing describe around it
//it should be 3 separate "it"s
//Does not check all edge cases, like x != 5, n < 0 or typeof n != integer
it("Raises x to the power n", function() {
  let x = 5;

  let result = x;
  assert.equal(pow(x, 1), result);

  result *= x;
  assert.equal(pow(x, 2), result);

  result *= x;
  assert.equal(pow(x, 3), result);
});