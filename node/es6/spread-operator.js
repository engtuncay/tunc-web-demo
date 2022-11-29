
const arrFoo = ['foo','bar','xyz'];
console.log(...arrFoo);

const arr = [1,2,3];
const arr2= [...arr,4,5,6];

console.log(arr2);

const arrAlpha = ['a','b','c','d'];
const [deger1, ...rest] = arrAlpha;

console.log(rest);
