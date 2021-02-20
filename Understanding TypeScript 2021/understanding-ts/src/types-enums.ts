// ENUMS AND TUPLES
enum Role {
  ADMIN = 'ADMIN',
  READ_ONLY = 100,
  AUTHOR = 'AUTHOR',
}
const person: {
  name: string;
  age: number;
  hobbies: string[];
  activity: [number, string]; // we need to overwrite the TS inference and a tuple is perfect here // TUPLES
  role: Role;
} = {
  name: 'Max',
  age: 30,
  hobbies: ['Sports', 'Cooking'], // (property) hobbies: string[]
  activity: [2, 'author'], // (property) role: (string | number)[],
  role: Role.ADMIN,
};

//   Literal Types and Union
function combine(
  input1: number | string, //UNION
  input2: number | string, //UNION
  resultConversion: 'as-number' | 'as-text' // literal type
) {
  let result;
  if (typeof input1 === 'number' && typeof input2 === 'number') {
    result = input1 + input2;
  } else {
    result = input1.toString() + input2.toString();
  }

  return resultConversion === 'as-number' ? +result : result.toString();
}

const combinedStringAges = combine('30', '26', 'as-number');
console.log(combinedStringAges);

const combinedNames = combine('Max', 'Anna', 'as-text');
console.log(combinedNames);

//Type ALias and Custom Types
type Whatever = number; // it works but we should avoir it
type Combinable = number | string; // a new type we're creating based on a union type
type ConversionDescriptor = 'as-number' | 'as-text'; // a new type we're creating based on a literal type

function combineWithTypes(
  input1: Whatever | string,
  input2: Combinable,
  resultConversion: ConversionDescriptor
) {
  let result;
  // ...
}

type User = { name: string; age: number };

// Void Type
function greet(user: User): void {
  console.log('Hi, I am ' + user.name);
}

const isOlder = (user: User, checkAge: number): boolean => {
  return checkAge > user.age;
};

function addN(n1: number, n2: number): number {
  return n1 + n2;
}

// Function type
// let combineValues: Function;
let combineValues: (a: number, b: number) => number;
combineValues = addN; // OK
combineValues(5, 12);

// Callback types
function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2;
  cb(result);
}

addAndHandle(1, 3, (result) => {
  console.log(result);
});

// Unknown type
let userInput: unknown;
let userName: string;

userInput = 5;
userInput = 'Max';
if (typeof userInput === 'string') {
  userName = userInput;
}

// Utility function which build error function
function generateError(message: string, code: number): never {
  throw { message, errorCode: code };
}

generateError('An error occured', 500);
