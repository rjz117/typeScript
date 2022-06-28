
let arr1:number[] = [2,3,4,5];
let arr2:number[] = [1,2,5];

let obj1 = {id:1, name:"Mohan"};
let obj2 = {age: 20, country: "IND"}

console.log([...arr1, ...arr2]);
console.log({...obj1, ...obj2});
