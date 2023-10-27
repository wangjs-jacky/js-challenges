/* 
  题目：实现函数柯里化
*/

function add(a, b, c) {
  return a + b + c
}

const curry = (fn) => {
  const len = fn.length;

  const temp = (...args) => {
    if (args.length >= len) {
      return fn(...args);
    } else {
      return (...newArgs) => {
        return temp(...args, ...newArgs);
      }
    }
  }

  return temp;
}

// 高阶函数
let addCurry = curry(add)

// 支持如下调用：
const res1 = addCurry(1, 2)(3)
const res2 = addCurry(1)(2)(3)

console.log("res1", res1);
console.log("res2", res2);