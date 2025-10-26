const person = {
  name: "Mustafa",
  age: 25,
  salary: 3000
};

// For In 
// Object
for (let prop in person) {
  console.log(prop, person[prop]);
}

/* ---Output--- 
name Mustafa
age 25
salary 3000
*/

const langs = ["Python", "Java", "C++", "Php"];

// Array
for (let index in langs) {
  console.log(index, langs[index]);
}

/* ---Output---
0 Python
1 Java
2 C++
3 Php
*/


const name = "Ahmet";

// String
for (let index in name) {
  console.log(index, name[index]);
}

/* Output
0 A
1 h
2 m
3 e
4 t
*/

// Object

// error : TypeError: person is not iterable
// for (let value of person) {
//   console.log(value);
// }


for (let value of langs) {
  console.log(value);
}

/* --Output--
Python
Java
C++
Php
*/


// String

for (let character of name) {
  console.log(character);
}

/* --Output--
A
h
m
e
t
*/
