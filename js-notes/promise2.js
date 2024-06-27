const promise = new Promise((resolve, reject) => {
  let success = true;
  if (success) {
    resolve("success");
  } else {
    reject("failure");
  }
});

promise
  .then((param1) => {
    console.log(param1);
  })
  .then((param2) => console.log(param2));
