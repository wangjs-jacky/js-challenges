/* 
  题目：js每隔一秒打印1,2,3,4,5
*/

const sleep = (delay = 1000) => {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

/* compose 串实现 */
const tasks = [1, 2, 3, 4, 5].map((i) => {
  return (next) => {
    setTimeout(() => {
      console.log(i);
      next();
    }, 1000);
  }
})

function compose(tasks) {
  const dispatch = (i) => {
    if (i === tasks.length) return;
    const curTask = tasks[i];
    const next = () => dispatch(i + 1);
    return curTask(next);
  };

  dispatch(0);
}

compose(tasks)