// Array and Promise are good examples of generics
const names: Array<string> = ['Max', 'Manuel']; // same as string[]
names[0].split(' ');
const promise: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('This is done!');
  }, 2000);
});

promise.then((data) => {
  data.split(' '); // because of the generic type I tell TS data will be string
});

// Creating custom generic and with extends we add a constraints
function merge<T extends object, U extends object | string>(obj1: T, obj2: U) {
  return Object.assign(obj1, obj2);
}

const mergedObj1 = merge({ name: 'Max' }, { age: 30 });
// this is what is happening below
// const mergedObj1 = merge<{name:string}, {age: number}>({ name: 'Max' }, { age: 30 });
// You don't need to do this because TS automatically infers it
const mergedObj2 = merge<
  { name: string; hobbies: Array<string> },
  { age: number }
>({ name: 'Max', hobbies: ['sport'] }, { age: 30 });
mergedObj1.name; // OK
console.log(mergedObj2.hobbies); // OK

// Generic Function
interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let description = 'Got no value.';
  if (element.length === 1) {
    description = 'Got 1 element.';
  } else if (element.length > 1) {
    description = 'Got ' + element.length + ' element.';
  }
  return [element, description];
}

console.log(countAndDescribe('Hi there!'));
console.log(countAndDescribe(['sport', 'cooking']));
console.log(countAndDescribe([]));

// function extractAndConvert(obj: object, key: string) {
//     return obj[key];
//     // KO – Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{}'.
//     // KO – No index signature with a parameter of type 'string' was found on type '{}'.
//   }
// Keyof Constraint ensures we have the correct structure and that the key exists in the object
function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return obj[key];
}

//   extractAndConvert({}, 'name'); // KO – Argument of type '"name"' is not assignable to parameter of type 'never'.
extractAndConvert({ name: 'Max' }, 'name'); // OK

// Generic classes
class DataStorage<T extends string | boolean | number> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const TextOrNumberStorage = new DataStorage<string | number>();

const textStorage = new DataStorage<string>();
textStorage.addItem('Max');
textStorage.addItem('Manu');
textStorage.removeItem('Manu');
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();
numberStorage.addItem(1);
numberStorage.addItem(2);
numberStorage.removeItem(1);
console.log(numberStorage.getItems());

// Partial turns the properties to optional basically
interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}
function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  // do validation
  courseGoal.description = description;
  // do whatever
  courseGoal.completeUntil = date;
  return courseGoal as CourseGoal; // In the end we need to do typecast to not return a partial but the object or type
}

// Readonly
const newNames: Readonly<string[]> = ['Max', 'Anna'];
//newNames.push('Manu'); // KO – Property 'push' does not exist on type 'readonly string[]'.

// Union are more flexible than generics because they allow to choose the type t any point,
// but a generic locks the type of data
