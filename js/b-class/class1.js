class Person {
  firstName = undefined;
  
  constructor(firstName, lastName) {
    console.log('In constructor:',this); // Check the output (empty object)
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

const person = new Person('John', 'Doe');

// Output : Person { firstName: 'John', lastName: 'Doe' }
console.log(person);
