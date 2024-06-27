// square function returns not value, promise object
const square = async function (n) {
  return n * n;
};

square(2); // square(2) returns promise
console.log(square);

// Your async task will execute with await
var start = async function () {
  let value = await square(2);
  console.log("value:", value);
  console.log("I will execute after foo get either resolved/rejected");
};

start();

// Output
// [AsyncFunction: square]
// value: 4
// I will execute after foo get either resolved/rejected
