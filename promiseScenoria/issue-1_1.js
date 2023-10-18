/* 
  题目：交通灯： red → yellow → green → red → ....
*/

/* 技术点：
   1. 将同步任务封装为异步。
   2. 问题转化为：异步串行
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

/* 方案一：封装 Promise 列表 */
const light = (callback, seconds = 500) => {
  return () => {
    return new Promise(resolve => {
      setTimeout(() => {
        callback();
        resolve();
      }, seconds);
    })
  }
}

const tasks = [light(red), light(yellow), light(green)];

/* 异步串行写法
   a().then(()=>b()).then(()=>c())
      .then(()=>console.log("串执行结束"))
      .catch(()=> console.log("串行执行报错"))
*/
const taskRun = () => {
  const [first, ...otherTasks] = tasks;
  return new Promise((resolve, reject) => {
    otherTasks.reduce((pre, cur) => {
      return pre.then(() => cur())
    }, first())
      .then(() => {
        /* taskRun(); */
        resolve();
      })
  })
}

/* 包裹 taskRun 为递归 */
const loopTask = async () => {
  await taskRun().then(() => console.log("结束"))
  loopTask();
}

/* 启动循环 */
loopTask();