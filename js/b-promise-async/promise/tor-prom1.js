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

// callback =  (rs,rj) => {
// success result, call rs
// rs(data);
// failure result, call rj
// rj(err);
// }
// new Promise (callback);

const promise = getUsers();

promise.then(
  // promise tanımı içinde
  // resolve fonksiyonuna gönderilen argümanı (users) alır
  (users) => {
  console.log(users);
});

promise.then((users) => {
  console.log(users.length);
});

// promise.then(resolve, reject) şeklinde de kullanılabilir

console.log("son satır");
console.log("son satır2");
setTimeout(()=>{
console.log("gecikmeli son satır");
},500);
