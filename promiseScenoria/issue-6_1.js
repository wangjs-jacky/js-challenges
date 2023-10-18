/* 
  题目：Promise 串行
*/

/* 不考虑传参和异常值处理 */

const sleep = (delay = 1000) => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("Hello world");
      resolve();
    }, delay);
  });
}


const tasks = [sleep, sleep, sleep];

/* 构建 promise 的 .then 串 */
function asyncFn(tasks) {
  const [first, ...otherTasks] = tasks;
  otherTasks.reduce((pre, cur) => {
    return pre.then(() => cur())
  }, first());
}

asyncFn(tasks);

