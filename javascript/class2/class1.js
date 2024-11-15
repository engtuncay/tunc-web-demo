class Person {
  firstName = undefined;

  constructor() {
    //this.firstName = undefined;
    this.lastName = undefined;
  }

  // constructor(firstName, lastName, age, country, city) {
  //   this.firstName = firstName;
  //   this.lastName = lastName;
  //   this.age = age;
  //   this.country = country;
  //   this.city = city;
  // }

  getFullName() {
    const fullName = this.firstName + " " + this.lastName;
    return fullName;
  }
}

//const person1 = new Person("Asabeneh", "Yetayeh", 250, "Finland", "Helsinki");
const person2 = new Person();
