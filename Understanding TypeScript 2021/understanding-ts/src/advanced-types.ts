//Intersection Types
type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee; //Intersection Types

const e1: ElevatedEmployee = {
  name: 'Max',
  privileges: ['create-server'],
  startDate: new Date(),
};

// --- Intersection types are very flexible and works great combined with other types
type CombinableType = string | number;
type NumericOrBoolean = number | boolean;
type UniversalType = CombinableType & NumericOrBoolean;

// Type guards allow you to narrow down the type of an object within a conditional block.
function addWithTypeGuard(a: Combinable, b: Combinable) {
  // the if below is a type guard, being sure our code run correctly at runtime
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}

// ---Type Guards
type UnknownEmployee = Employee | Admin;
function printEmployeeInformation(emp: UnknownEmployee) {
  console.log('Name: ', emp.name);
  if ('privileges' in emp) {
    console.log('Privileges: ', emp.privileges);
  }
  if ('startDate' in emp) {
    console.log('Start Date: ', emp.startDate);
  }
}

printEmployeeInformation(e1);

// Typeguards with classes

class Car {
  drive() {
    console.log('Driving...');
  }
}

class Truck {
  drive() {
    console.log('Driving a truck...');
  }

  loadCargo(amount: number) {
    console.log('Loading cargo...' + amount);
  }
}

type Vehicle = Car | Truck;
const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  // We could use this
  if ('loadCargo' in vehicle) {
    vehicle.loadCargo(1000);
  }
  // Or instanceof which is more elegant and less error prone
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000);
  }
}

useVehicle(v1);
useVehicle(v2);

class GuitarPlayer {
  playInstrument() {
    console.log('Playing Guitar');
  }
  doGuitarTricks() {
    console.log('Awesome Guitar trick');
  }
}

class DrumPlayer {
  playInstrument() {
    console.log('Playing Drums');
  }
  doDrumsTricks() {
    console.log('Awesome Drums trick');
  }
}

type Musician = GuitarPlayer | DrumPlayer;
const musician1 = new GuitarPlayer();
const musician2 = new DrumPlayer();

function perform(musician: Musician) {
  musician.playInstrument();
  if (musician instanceof GuitarPlayer) {
    musician.doGuitarTricks();
  }
  if (musician instanceof DrumPlayer) {
    musician.doDrumsTricks();
  }
}

perform(musician1);
perform(musician2);

// --- Discriminated Unions we narrow the type it might be with an extra property
// in this case is as type property sometimes it uses the word kind or type

interface Bird {
  type: 'bird';
  flyingSpeed: number;
}

interface Horse {
  type: 'horse';
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case 'bird':
      speed = animal.flyingSpeed;
      break;
    case 'horse':
      speed = animal.runningSpeed;
      break;
    default:
      break;
  }

  console.log('Moving with speed: ', speed);
}

moveAnimal({ type: 'bird', flyingSpeed: 10 });

// --- Type Casting
// Allows us to give more specific info about the type of object we're working

// const paragraph = document.querySelector('p'); // const paragraph: HTMLParagraphElement | null
// const paragraphId = document.getElementById('message-output'); // const paragraphId: HTMLElement | null
// const userInputElement = <HTMLInputElement>(
//   document.getElementById('user-input')!
// ); // type casting

const userInputElement = document.getElementById(
  'user-input'
)! as HTMLInputElement; // type casting

userInputElement.value = 'Hi there!';

// const userInputElement = document.getElementById('user-input');

// if (userInputElement) {
//   (userInputElement as HTMLInputElement).value = 'Hi there!';
// }

// --- INDEX property

// { email: 'Not a valid email', username: 'Must start with a character!' }
interface ErrorContainer {
  [prop: string]: string;
}

const errorBag: ErrorContainer = {
  email: 'Not a valid email',
  username: 'Must start with a character!',
};

// --- Function Overloads

type CombinableSN = string | number;
type Numeric = number | boolean;

type Universal = CombinableSN & Numeric;

function addOverLoad(a: number, b: number): number;
function addOverLoad(a: string, b: string): string;
function addOverLoad(a: string, b: number): string;
function addOverLoad(a: number, b: string): string;
function addOverLoad(a: CombinableSN, b: CombinableSN) {
  // the if below is a type guard, being sure our code run correctly at runtime
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}

const result1 = addOverLoad('3', 5); // const result: CombinableSN
const result2 = addOverLoad('Max', 'Test'); // const result: CombinableSN
const result3 = addOverLoad(25, 12); // const result: CombinableSN

result2.split(' '); // KO – Property 'split' does not exist on type 'CombinableSN'.

// --- Optional Chaining

const fetchedUserData = {
  id: 'u1',
  name: 'Max',
  job: { title: 'CEO', description: 'My own company' },
};

console.log(fetchedUserData?.job?.title);

// --- Nullish Coalessing

//   const userInput = null; // "DEFAULT"
//   const userInput = undefined; // "DEFAULT"
const userInputAd = ''; // ''
const storedData = userInputAd ?? 'DEFAULT'; // ?? only null and undefined
