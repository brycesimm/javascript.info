/* Simple way to testing cases
describe("pow", function() {

  it("2 raised to power 3 is 8", function() {
    assert.equal(pow(2, 3), 8);
  });

  it("3 raised to power 4 is 81", function() {
    assert.equal(pow(3, 4), 81);
  });

});
*/

/*Iterative test cases
describe("pow", function() {

  function makeTest(x) {
    let expected = x * x * x;
    it(`${x} in the power 3 is ${expected}`, function() {
      assert.equal(pow(x, 3), expected);
    });
  }

  for (let x = 1; x <= 5; x++) {
    makeTest(x);
  }

});
*/

//nested describes allow subgroups of tests
describe("pow", function() {

  describe("raises x to power 3", function() {

    function makeTest(x) {
      let expected = x * x * x;
      it(`${x} in the power 3 is ${expected}`, function() {
        assert.equal(pow(x, 3), expected);
      });
    }

    for (let x = 1; x <= 5; x++) {
      makeTest(x);
    }

    it("for negative n the result is NaN", function() {
      assert.isNaN(pow(2, -1));
    });

    it("for non-integer n the result is NaN", function() {
      assert.isNaN(pow(2, 1.5));
    });

  });

  // ... more tests to follow here, both describe and it can be added
});

/*Can also add before/after and/or beforeEach/afterEach functions that run according to each 
  "it" functions:

   before(() => alert("Testing started – before all tests"));
   after(() => alert("Testing finished – after all tests"));

   beforeEach(() => alert("Before a test – enter a test"));
   afterEach(() => alert("After a test – exit a test"));
*/