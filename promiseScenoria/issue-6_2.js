/* 
  题目：Promise 串行
  不考虑 waterfall | Bail 场景 | 传参 ...args
*/

const sleep = (delay = 1000) => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("Hello world");
      resolve();
    }, delay);
  });
}


const tasks = [sleep, sleep, sleep];

/* 基于 async + await 实现 */
async function asyncFn() {
  for (let i = 0; i < tasks.length; i++) {
    try {
      await tasks[i]();
    } catch (error) { }
  }
}

asyncFn(tasks);