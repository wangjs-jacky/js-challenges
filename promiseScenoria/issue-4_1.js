/* 
  题目：js每隔一秒打印1,2,3,4,5
*/

const sleep = (delay = 1000) => {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

/* promise 串实现 */
[1, 2, 3, 4, 5].reduce((pre, cur) => {
  return pre.then(() => {
    console.log(cur);
    return sleep();
  })

}, Promise.resolve())