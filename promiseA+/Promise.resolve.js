/* 
  题目：实现 Promise.resolve 函数 和 Promise.reject
*/

Promise.myResolve = function (value) {
  if (value instanceof Promise) {
    return value;
  } else if (isPromiseLike(value)) {
    return new Promise(resolve, reject => {
      value.then(resolve, reject)
    })
  }
}

Promise.myRejcet = function (err) {
  return new Promise((resolve, reject) => {
    reject(err);
  })
}

function isPromiseLike(obj) {
  return obj && typeof obj.then === "function";
}