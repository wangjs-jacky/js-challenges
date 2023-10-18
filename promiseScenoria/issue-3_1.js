/* 
  题目：封装一个工具函数输入一个 promise, 确保一定要在 1s 发生状态变化，超出时间按 reject 处理。
*/

/* 思路： Promise.race */
const fulfilledWithinDelayTime = (promise, delay = 1000) => {
  return Promise.race([
    promise,
    new Promise((resolve, reject) => {
      setTimeout(() => {
        reject()
      }, delay);
    }),
  ])
}

const testPromise = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Hello world")
      /* reject("err-info") */
    }, 500);
  })
}

fulfilledWithinDelayTime(testPromise(), 1000)
  .then((res) => console.log(res))
  .catch((err) => console.log(err))


