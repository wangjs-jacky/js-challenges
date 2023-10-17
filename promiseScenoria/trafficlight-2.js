/* 
  题目：交通灯： red → yellow → green → red → ....
*/

/* 
  解法二：使用基于 koa 的源码实现
*/

// 模拟红灯亮
function red() {
  console.log('red')
}

//模拟绿灯亮
function green() {
  console.log('green')
}

//模拟黄灯亮
function yellow() {
  console.log('yellow')
}

/* 构造延时 */
const light = (cb, delay = 1000) => {
  return (next) => setTimeout(() => {
    cb();
    /* 当前函数执行后，触发 next 函数 */
    next();
  }, delay)
}

const tasks = [light(red), light(yellow), light(green)];

const compose = (tasks) => {
  const dispatch = (i) => {
    /* 移动指针至头部 */
    if (i === tasks.length) {
      i = 0;
    }
    /* 取出下一个任务 */
    const next = () => dispatch(i + 1)
    /* 取出当前任务 */
    const curTask = tasks[i];
    return curTask(next);
  }
  dispatch(0);
}

compose(tasks);


