let a = 1;
const resultOfFun = (b) => {
  return a + b
}

a = 2;

console.log(resultOfFun(2)); // 答案： 4

a = 3;

console.log(resultOfFun(2)); // 答案： 5