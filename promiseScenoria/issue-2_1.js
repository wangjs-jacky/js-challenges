/* 
  题目：
    扩展 console.log 功能，延时重复内容
    repeat(console.log, 5, 1000);
*/

const repeat = (cb, delay = 1000, times = 5) => {
  /* 高阶函数 */
  return (text) => {
    /* 封装为 promise */
    const asyncFn = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          cb(text);
          resolve();
        }, delay);
      })
    }

    /* 执行串：Promise.resolve().then(()=>a()).then(()=>b()) */
    new Array(times).fill(asyncFn).reduce((pre, cur) => {
      return pre.then(() => cur());
    }, Promise.resolve())
  }
}

const mockLog = repeat(console.log);

mockLog("Hello world!!")