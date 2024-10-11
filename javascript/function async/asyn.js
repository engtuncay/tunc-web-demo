async function getUserAsync(name) {
  let response = await fetch(`https://api.github.com/users/${name}`);
  let data = await response.json();
  return data;
}

getUserAsync("engtuncay").then((data) => {
  console.log(data);
  document.body.innerText = "Name:" + data.name;
});
