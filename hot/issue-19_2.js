/* 
  题目：实现函数柯里化
*/

function add(a, b, c) {
  return a + b + c
}

const curry = (fn) => {
  const len = fn.length;

  let ctx = {
    args: []
  };

  /* 构造一个函数，总是读取闭包变量 */
  const wrapFn = (...args) => {
    /* 修改环境变量 */
    ctx.args = [...ctx.args, ...args];

    /* 逻辑处理 */
    if (ctx.args.length === len) {
      return fn(...ctx.args);
    } else {
      return wrapFn;
    }
  }

  return wrapFn
}


// 高阶函数
let addCurry = curry(add)

// 调用方案一：
addCurry(1, 2);
const res1 = addCurry(3);

console.log("res", res);

// 调用方案二：
const res2 = addCurry(1, 2)(3);
console.log("res-2", res2);