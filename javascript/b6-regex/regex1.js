// Test Method

{
  const str = "I love JavaScript";
  const pattern = /love/;
  const result = pattern.test(str);
  console.log(result);
}

// -- Output --
// true

// Match Method

{
  const str = "I alove JavaScript flove glove";
  const pattern = /(.love)/g;
  const result = str.match(pattern);
  console.log(result);

  console.log(typeof result);

  for (const element of result) {
    console.log(element);
  }

  // for (const element of result) {
  // console.log(element);
  // }

  // for (const key in result) {
  // console.log(key);
  // }

  // console.log("index:" + result.index);
}

// -- Output --
// ["love", index: 2, input: "I love  JavaScript", groups: undefined]

// Search Met

{
  const str = "I love JavaScript";
  const pattern = /love/g;
  const result = str.search(pattern);
  console.log(result);

  // -- Output --
  // 2
}

// Replace

{
  const txt =
    "Python is the most beautiful language that a human begin has ever created (python).\
I recommend python for a first programming language";

  // g flag'i vermezsek sadece ilk satırı değerlendirir.
  matchReplaced = txt.replace(/Python|python/, "JavaScript");
  console.log(matchReplaced);

  // -- Output --
  // JavaScript is the most beautiful language that a human begin has ever created.I recommend python for a first programming language
}

{
  const txt =
    "%I a%m te%%a%%che%r%.\
T%he%re i%s n%o%th%ing as m%ore r%ewarding a%s e%duc%at%i%ng a%n%d e%m%p%ow%er%ing";

  matches = txt.replace(/%/g, "");
  console.log(matches);
}
