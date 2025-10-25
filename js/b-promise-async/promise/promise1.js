ex1();
//ex2FetchApi();
//ex3AsyncAwaitAndFetch();
ex4AsyncSimple();

// Functions

function ex1() {
  console.log("ex1");
  // Promise
  let doPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const skills = ["HTML", "CSS", "JS"];
      if (skills.length > 0) {
        resolve(skills);
      } else {
        reject("Something wrong has happened");
      }
    }, 1000);
  });

  doPromise
    .then((result) => {
      // resolve callback
      console.log(result);
    })
    .catch(
      // reject callback
      (error) => console.log(error)
    );

  // Output
  // ["HTML", "CSS", "JS"]
}

// Ex2
function ex2FetchApi() {
  console.log("ex2");
  const url = "https://restcountries.com/v2/all"; // countries api
  fetch(url)
    .then((response) => response.json()) // accessing the API data as JSON
    .then((data) => {
      // getting the data
      console.log(data);
    })
    .catch((error) => console.error(error)); // handling error if something wrong happens
}

function ex3AsyncAwaitAndFetch() {
  console.log("ex3");
  const url = "https://restcountries.com/v2/all"; // countries api
  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const countries = await response.json();
      console.log("ex3-result-success");
      countries.forEach((element) => {
        console.log(element.name);
      });
      //console.log(countries);
    } catch (err) {
      console.error(err);
    }
  };
  console.log("===== async and await");
  fetchData();
}

// Ex4 Async Await Simple (function içerisinde async func tanımlamaya izin vermiyor)
// const ex4Square = async function (n) {
// return n * n;
// };
// const ex4Promise = ex4Square(2);
// const ex4Value = await ex4Square(2);
// console.log(ex4Value);
// console.log(ex4Promise);
// ex4Promise.then((val) => console.log(val));
//---

async function ex4AsyncSimple() {
  console.log("ex4-2");
  const ex4Square = async (n) => n * n;
  const ex4Promise = ex4Square(2);
  const ex4Value = await ex4Square(2);

  console.log(ex4Value);
  console.log(ex4Square);
  console.log(ex4Promise);
  ex4Promise.then((val) => console.log(val));
}
