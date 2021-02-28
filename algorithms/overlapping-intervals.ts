var input = '[[7,10], [12,16], [14,18]]';
var newArr = JSON.parse(input);
console.log(newArr);

const overlapping = (a, b) => {
  return a[1] > b[0] && b[1] > a[0];
};

const isOverlapping = (arr) => {
  let i, j;
  for (i = 0; i < arr.length - 1; i++) {
    for (j = i + 1; j < arr.length; j++) {
      if (overlapping(arr[i], arr[j])) {
        return false;
      }
    }
  }
  return true;
};
console.log(isOverlapping(newArr));
