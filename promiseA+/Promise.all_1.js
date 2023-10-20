/* 
  山月版本：https://q.shanyue.tech/fe/code/500
  Promise.all 实现
*/

Promise.myAll = function (_promiseList) {
  return new Promise((resolve, reject) => {
    /* promiseList 是一个可迭代对象 */
    const promiseList = Array.from(_promiseList);
    const result = [];
    let resolveCount = 0;
    promiseList.forEach((p, index) => {
      Promise.resolve(p).then((res) => {
        resolveCount++;
        result[index] = res;
        if (resolveCount === promiseList.length) {
          resolve(result)
        }
      }).catch(e => reject(e))
    })
  })
}

function sleep(delay) {
  return new Promise(resolve => {
    setTimeout(() => resolve("Hello world"), delay);
  });
}

Promise.myAll([sleep(300), sleep(200), sleep(100)]).then((o) => {
  console.log(o);
})
