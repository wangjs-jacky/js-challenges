/* 
  题目： 实现 Promise 队列的并发操作，支持控制并发个数
*/

/* 

*/

function sleep(text, delay = 1000) {
  return () => new Promise(resolve => {
    setTimeout(() => {
      console.log(text)
      resolve();
    }, delay);
  });
}

const tasks = [1, 2, 3, 4, 5].map((i) => {
  return sleep(i)
})

/* 使用 dispatch 实现 */
const asyncPool = (tasks, poolLimit) => {
  return new Promise((resolve, reject) => {
    const result = [];
    let resolveCount = 0;
    let currentIndex = 0;

    const dispatch = () => {
      const curTask = Promise.resolve(tasks[currentIndex]());
      const index = currentIndex;
      currentIndex++;
      /* 异步任务的递归，通过 .then 实现 */
      curTask.then(res => {
        result[index] = res;
        resolveCount++;
        if (resolveCount === tasks.length) {
          resolve(res);
        }

        /* 递归的触发(currentIndex指针还未触发) */
        if (currentIndex < tasks.length) {
          dispatch();
        }
      });
    }

    for (let i = 0; i < poolLimit && i < tasks.length; i++) {
      dispatch();
    }
  })
}

asyncPool(tasks, 2)


