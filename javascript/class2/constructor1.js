

class Person {
  constructor(firstName, lastName) {
    console.log(this)
    this.firstName = firstName
    this.lastName = lastName
  }
}

const person = new Person()

console.log(person)

// -- Output --
// Person ()
// Person {firstName: undefined, lastName:undefined}


const person1 = new Person('Asabeneh', 'Yetayeh')

console.log(person1)

// -- Output --
// Person {firstName: "Asabeneh", lastName: "Yetayeh"}