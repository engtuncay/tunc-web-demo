// LAZY REACTIVE PATTERN: executor sadece .create() çalıştırıldığında başlar

function getUsers() {
  // Henüz promise oluşturmıyoruz - sadece fabrika döndürüyoruz
  return {
    create() {
      // İşte burada (.then() çağrısında) promise ve executor başlar!
      console.log("executor başladı - lazy!");
      
      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([
            { username: 'john', email: 'john@test.com' },
            { username: 'jane', email: 'jane@test.com' },
          ]);
        }, 100);
      });
      
      return promise;
    }
  };
}

console.log("1. başlangıç");

// getUsers() çağrıldı fakat executor HENÜZ çalışmadı!
const promise = getUsers();

console.log("2. son satır");
console.log("3. son satır2");

// .then() bağlanırken executor çalışmaya başlar
promise.cre().then((users) => {
  console.log("4. then çalıştı:", users);
});

console.log("5. son satır3");

// İkinci subscriber - yeni executor çalışması
// getUsers().then((users) => {
//   console.log("6. ikinci then çalıştı:", users);
// });

setTimeout(() => {
  console.log("7. gecikmeli son satır");
}, 500);
