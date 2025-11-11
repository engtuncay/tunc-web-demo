// Regex Examples

console.log('Regex1js');

function testMethod1() {
  const str = "I love JavaScript";
  const pattern = /love/;
  const result = pattern.test(str);
  console.log(result);
  // -- Output --
  // true
  // Match Method
}

testMethod1();


function matchMethod1() {
  const str = "I alove JavaScript flove glove";
  const pattern = /(.love)/g;
  const result = str.match(pattern);
  console.log(result);

  // -- Output --
  // [ 'alove', 'flove', 'glove' ]

  // g flag'i olmazsa sonuç :
  // ["love", index: 2, input: "I love  JavaScript", groups: undefined]
}

matchMethod1()

// Search Met

function searchMethod1() {
  const str = "I love JavaScript";
  const pattern = /love/g;
  const result = str.search(pattern);
  console.log(result);

  // -- Output --
  // 2
}

searchMethod1()

// Replace

function replaceMethod1() {
  const txt =
    "Python is the most beautiful language that a human begin has ever created (python).\
    I recommend python for a first programming language";

  // g flag'i vermezsek sadece ilk satırı değerlendirir.
  matchReplaced = txt.replace(/Python|python/, "JavaScript");
  console.log(matchReplaced);

  // -- Output --
  // JavaScript is the most beautiful language that a human begin has ever created.I recommend python for a first programming language
}

replaceMethod1()

function replaceMethod2() {
  const txt =
    "%I a%m te%%a%%che%r%.\
T%he%re i%s n%o%th%ing as m%ore r%ewarding a%s e%duc%at%i%ng a%n%d e%m%p%ow%er%ing";

  matches = txt.replace(/%/g, "");
  console.log(matches);
}

replaceMethod2();
