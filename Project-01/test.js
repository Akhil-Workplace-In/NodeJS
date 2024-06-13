let arr = [1, 2, 3, 4, 5];

let result = arr.find((n) => n === 3);

let index = arr.indexOf(result);

let arr2 = arr.splice(index,1);

console.log(arr);
console.log(arr2);
