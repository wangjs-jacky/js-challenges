/* 
  渡一版本：https://www.douyin.com/search/promise.all
  Promise.all 实现
*/

Promise.myAll = function (_promiseList) {
  let _resolve;
  let _reject;
  const newPromise = new Promise((resolve, reject) => {
    _resolve = resolve;
    _reject = reject;
  })

  let resolveCount = 0;
  let index = 0;

  const result = [];

  for (let promise of _promiseList) {
    const curIndex = index;
    index++;
    Promise.resolve(promise).then(res => {
      result[curIndex] = res;
      resolveCount++;
      if (resolveCount === _promiseList.length) {
        _resolve(result);
      }
    }, (err) => {
      _reject(err)
    })
  }
  return newPromise;
}

function sleep(delay) {
  return new Promise(resolve => {
    setTimeout(() => resolve("Hello world"), delay);
  });
}

Promise.myAll([sleep(300), sleep(200), sleep(100)]).then((o) => {
  console.log(o);
})
