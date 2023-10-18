/* 
  题目： 实现 Promise 队列的并发操作，支持控制并发个数
*/

/* async-tool 思想
   基于 Promise.all 和 Promise.race
   参考实现：https://mp.weixin.qq.com/s/yWOPoef9ixuSBWApZQhjIg
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

const asyncPool = async (tasks, poolLimit) => {
  /* 所有异步任务执行状态 */
  const allTasks = [];
  /* 正在执行的任务数组 */
  const poolTasks = [];

  for (let i = 0; i < tasks.length; i++) {
    const curTask = Promise.resolve(tasks[i]());
    allTasks.push(curTask);

    /* 当 poolLimit <= tasks.length 时，实现并发控制 */
    if (poolLimit <= tasks.length) {
      /* 在原有异步包裹处理操作 */
      const e = curTask.then(() => {
        /* 成功后，从正在执行的任务数组中删除 */
        poolTasks.splice(poolTasks.indexOf(e), 1)
      })
      poolTasks.push(e);

      /* poolTasks 持续增加会超出限制数量 */
      if (poolTasks.length >= poolLimit) {
        /* 始终控制 poolTasks 的数量 */
        await Promise.race(poolTasks);
      }
    }
  }

  /* 此时 allTasks 中剩余 pending < poolTasks */
  return Promise.all(allTasks);
}

asyncPool(tasks, 2)