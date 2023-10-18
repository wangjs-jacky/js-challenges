/* 
  题目：使用 setTimeout 实现 setInterval
*/

/* 如何看待函数递归？
将同步任务，使用 next 改写
const dispatch = (next) => {
  next();
} 
    ↓
由于 next 为自身，则可以退化为
const looptask = () => {
  looptask()
}
*/

const mySetInterval = (cb, delay) => {
  let cancel = false;
  const task = () => {
    setTimeout(() => {
      if (!cancel) {
        cb()
      }
      task();
    }, delay)
  }
  task();
  return () => { cancel = true }
}

mySetInterval(() => {
  console.log("Hello world!");
}, 1000)

