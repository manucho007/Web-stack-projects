class PersonDecorator {
  name = 'Manuel';

  constructor() {
    console.log('Creating person object with decorator');
  }
}

const pers = new PersonDecorator();
console.log(pers);
