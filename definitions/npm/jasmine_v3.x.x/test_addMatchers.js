/* @flow */

/**
 * addMatchers
 */

jasmine.addMatchers({
  toHaveFoo1: (utils, customEqualityTesters) => {
    return {
      compare: (actual: string, expected: string) => {
        return {
          pass: true,
          message: "Nothing to see here"
        };
      }
    }
  }
});

jasmine.addMatchers({
  toHaveFoo2: () => {
    return {
      compare: (actual, expected) => {
        return {
          pass: actual === expected,
          message: "Nothing to see here"
        };
      }
    }
  }
});

jasmine.addMatchers({
  toHaveFoo3: () => {
    return {
      compare: (a, b) => {
        return {
          pass: a === b,
          message: () => 'A is not B'
        };
      }
    }
  }
});


jasmine.addMatchers({
  toHaveFoo4: () => {
    var check = (a, b) => a == b;
    return {
      compare: (a, b) => {
        return {
          pass: check(a, b),
          message: () => 'A is not B'
        };
      }
    }
  }
});

// $FlowExpectedError[incompatible-type]
var badResult1: JasmineMatcherResult = false;

// $FlowExpectedError[prop-missing]
var badResult2: JasmineMatcherResult = {
  message: 'Did not pass',
};

var badResult3: JasmineMatcherResult = {
  pass: true,

  // $FlowExpectedError[incompatible-type]
  message: () => false
};

// $FlowExpectedError[incompatible-type]
var badStruct1: JasmineMatcherStruct = 1;

// $FlowFixMe[prop-missing]
var badStruct2: JasmineMatcherStruct = {
  notCompare: (actual, expected): JasmineMatcherResult => {
    return {
      pass: true
    }
  }
}

// $FlowExpectedError[incompatible-type]
var badMatcher1: JasmineMatcher = (utils, customEqualityTesters, extra) => {
  compare: (actual, expected): JasmineMatcherResult => {
    return {
      pass: true
    }
  }
}

// $FlowExpectedError[incompatible-call]
jasmine.addMatchers('a');
