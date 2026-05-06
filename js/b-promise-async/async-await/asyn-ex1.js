console.log("Async example is starting...");

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
  console.log('Async fonksiyon promise ile yakalandı.');
  console.log('Url:' + data.html_url);
  //document.body.innerText = "Name:" + data.name;
});


// await'i async bir fonksiyon içinde kullanmalıyız
// (async () => {
//   await getUserAsync("engtuncay");
//   console.log('Global Data:',globalData);
// })();

let fnGetUser = async () => {
  try {
    let data = await getUserAsync("engtuncay");
    console.log('Await ile Async fonk yakalandı.');
    console.log('Url:', data.html_url);
  } catch (error) {
    console.error("fnGetUser Hata:", error);
  }
};;

fnGetUser();
console.log("fnGetUser called");
console.log("asyn-ex1.js Ended");


