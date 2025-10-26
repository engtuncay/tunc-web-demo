// test method returns true or false if the pattern match a string or not (pattern exist)
// (tümüyle uyumuna değil, parça olarak var mı ona bakar)
let myString1 = "Hello, World!";
let myRegex1 = /Hello/;
let result1 = myRegex1.test(myString1);

console.log(result1);
// true

// extract the matches of a regex with the match method
let extractStr = "Extract the word 'coding' from this string.";
let codingRegex = /coding/;
let result2 = extractStr.match(codingRegex);

console.log(result2);
/*
[
  'coding',
  index: 18,
  input: "Extract the word 'coding' from this string.",
  groups: undefined
]
*/

// Search and replace
let wrongText = "The sky is silver.";
let silverRegex = /silver/;
let result2_1 = wrongText.replace(silverRegex, "blue"); // Returns "The sky is blue."

console.log(result2_1);
// The sky is blue.

// search for multiple patterns using the alternation or OR operator: |
let petString = "James has a pet cat.";
let petRegex = /dog|cat|bird|fish/;
let result3 = petRegex.test(petString);

console.log(result3);
// true

// ignore upper or lowercase
let myString = "FreeCodeCamp";
let fccRegex = /freeCodeCamp/i; // flag i
let result4 = fccRegex.test(myString);

console.log(result4);
// true

// Search or extract a pattern more than once
let twinkleStar = "Twinkle, twinkle, little star";
let starRegex = /Twinkle/gi; // a regex can have multiple flags
let result5 = twinkleStar.match(starRegex);

console.log(result5);
// [ 'Twinkle', 'twinkle' ]

// The wildcard character .(dot) will match any character except new lines.
let exampleStr = "Let's have fun with regular expressions!";
let unRegex = /.un/;
let result6 = unRegex.test(exampleStr);

console.log(result6);
// true

// define the characters to match, in this example all the vowels in quoteSample
let quoteSample1 =
  "Beware of bugs in the above code; I have only proved it correct, not tried it.";
let vowelRegex = /[aeiou]/gi;
let result7 = quoteSample1.match(vowelRegex);


console.log(result7);
/*
[
  'e', 'a', 'e', 'o', 'u', 'i',
  'e', 'a', 'o', 'e', 'o', 'e',
  'I', 'a', 'e', 'o', 'o', 'e',
  'i', 'o', 'e', 'o', 'i', 'e',
  'i'
]
*/

// Match all the characters in quoteSample (between a and z)
let quoteSample2 = "The quick brown fox jumps over the lazy dog.";
let alphabetRegex = /[a-z]/gi;
let result8 = quoteSample2.match(alphabetRegex);

console.log(result8);

/*
[
  'T', 'h', 'e', 'q', 'u', 'i', 'c',
  'k', 'b', 'r', 'o', 'w', 'n', 'f',
  'o', 'x', 'j', 'u', 'm', 'p', 's',
  'o', 'v', 'e', 'r', 't', 'h', 'e',
  'l', 'a', 'z', 'y', 'd', 'o', 'g'
]
*/

// Match all the character between two characters and numbers
let quoteSample3 = "Blueberry 3.141592653s are delicious.";
let myRegex2 = /[h-s2-6]/gi;
let result9 = quoteSample3.match(myRegex2);

console.log(result9);
/*
[
  'l', 'r', 'r', '3', '4',
  '5', '2', '6', '5', '3',
  's', 'r', 'l', 'i', 'i',
  'o', 's'
]
*/

// Match all that is not a number or a vowel
let quoteSample4 = "3 blind mice.";
let myRegex3 = /[^aeiou0-9]/gi;
let result10 = quoteSample4.match(myRegex3);

console.log(result10);
/* 
[
  ' ', 'b', 'l',
  'n', 'd', ' ',
  'm', 'c', '.'
]
*/

// (+) Match 1 or more occurrences (* for 0 or more)
let difficultSpelling = "Mississippi";
let myRegex4 = /s+/g;
let result11 = difficultSpelling.match(myRegex4);

console.log(result11);
/* 
[ 'ss', 'ss' ]
*/

// ? Match 0 or 1 occurrence. Useful for Lazy matching
let text = "titanic";
let myRegex5 = /t[a-z]*?i/;
let result12 = text.match(myRegex5);

console.log(result12);
// [ 'ti', index: 0, input: 'titanic', groups: undefined ]


// Search for patterns at the beginning of strings
let rickyAndCal = "Cal and Ricky both like racing.";
let calRegex = /^Cal/;
let result13 = calRegex.test(rickyAndCal);

console.log(result13);
// true

// Search for patterns at the end of a string
let caboose = "The last car on a train is the caboose";
let lastRegex = /caboose$/;
let result14 = lastRegex.test(caboose);

console.log(result14);
// true

// \w is equal to [A-Za-z0-9_]
let quoteSample = "The five boxing wizards jump quickly.";
let alphabetRegexV2 = /\w/g;
let result15 = quoteSample.match(alphabetRegexV2).length;

console.log(result15);
// 31

// Match only 3 to 6 letter h's in the word "Oh no"
let ohStr = "Ohhh no";
let ohRegex = /Oh{3,6} no/;
let result16 = ohRegex.test(ohStr);

console.log(result16);
// true

// Match both the American English (favorite) and the British English (favorite) version of the word
let favWord = "favorite";
let favRegex = /favou?rite/;
let result17 = favRegex.test(favWord);

console.log(result17);
// true

// Groups () let you reuse patterns
let repeatNum = "42 42 42";
let reRegex = /^(\d+)\s\1\s\1$/; // every 1 represent the group (\d+)
let result18 = reRegex.test(repeatNum);

console.log(result18);
//true

// Remove all the spaces at the beginning and end of a string
let hello = "   Hello, World!  ";
let wsRegex = /^\s+(.*\S)\s+$/;
let result19 = hello.replace(wsRegex, "$1"); // returns 'Hello, World!'

console.log(result19);
// Hello, World!

