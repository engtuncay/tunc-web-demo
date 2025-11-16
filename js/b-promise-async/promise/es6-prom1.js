function getUsers() {
  return new Promise((resolve, reject) => {
    console.log("promise çalıştı");
    //setTimeout(() => {
    resolve([
      { username: 'john', email: 'john@test.com' },
      { username: 'jane', email: 'jane@test.com' },
    ]);
    //}, 1);
  });
}

const promise = getUsers();

promise.then((users) => {
  console.log(users);
});

promise.then((users) => {
  console.log(users.length);
});

console.log("son satır");
console.log("son satır2");
setTimeout(()=>{
console.log("gecikmeli son satır");
},500);
