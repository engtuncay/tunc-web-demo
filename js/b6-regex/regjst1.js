let str = "Are you Ok? Yes, I'm OK";
let result = str.match(/OK/gi);

console.log(result);

// Output:
//
// ["Ok", "OK"]

console.log("---Example2---");

str = "Are you OK? Yes, I'm OK.";
result = str.replace(/OK/g, 'fine');

console.log(result);

// Output:
//
// Are you fine? Yes, I'm fine.

console.log("---Example3---");

let phone = '+1-(408)-555-0105';
let re = /\d/;

console.log(phone.match(re));

// Output:
// 
// ['1', index: 1, input: '+1-(408)-555-0105', groups: undefined]

console.log("---Example4---");

