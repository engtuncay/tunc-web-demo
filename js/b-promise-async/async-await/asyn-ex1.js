console.log("async example");

let globalData;

async function getUserAsync(name) {
  // burada hata yakalamak istersek try catch kullanmak gerekir
  try {
    let response = await fetch(`https://api.github.com/users/${name}`);
    // burada await kullanılmazsa data bir promise olur
    let data = await response.json();
    globalData = data;
    return data;
  } catch (error) {
    console.error("Hata:", error);
  }
}

getUserAsync("engtuncay").then((data) => {
  console.log('Async and Promise executed');
  //document.body.innerText = "Name:" + data.name;
});

console.log("getUserAsync");
// await'i async bir fonksiyon içinde kullanmalıyız
(async () => {
  await getUserAsync("engtuncay");
  console.log('Global Data:',globalData);
})();
console.log("getUserAsync-End");


