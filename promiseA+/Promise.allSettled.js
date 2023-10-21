/* 
  实现 Promise.allSettled
*/

Promise.myAllSettled = function (_promiseList) {
  return new Promise((resolve, reject) => {
    /* promiseList 是一个可迭代对象 */
    const promiseList = Array.from(_promiseList);
    const result = [];
    let resolveCount = 0;
    promiseList.forEach((p, index) => {
      Promise.resolve(p).then((res) => {
        resolveCount++;
        result[index] = {
          status: "fulfilled",
          data: res
        }
        if (resolveCount === promiseList.length) {
          resolve(result)
        }
      }, (err) => {
        resolveCount++;
        result[index] = {
          status: "rejected",
          reason: err
        }
        if (resolveCount === promiseList.length) {
          resolve(result)
        }
      })
    })
  })
}

function sleep(delay) {
  return new Promise(resolve => {
    setTimeout(() => resolve("Hello world"), delay);
  });
}

Promise.myAllSettled([sleep(300), Promise.reject(200), sleep(100)]).then((o) => {
  console.log(o);
})
