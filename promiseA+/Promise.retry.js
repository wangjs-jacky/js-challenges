/* 
  实现 Promise.retry 
  成功后 resolve 结果，失败后重试，尝试超过一定次数才真正的 reject
*/

Promise.retry = function (cb, retryTimes = 1) {
  return new Promise((resolve, reject) => {
    const main = () => {
      console.log("retryTimes", retryTimes);
      retryTimes--;
      cb().then(
        (res) => {
          resolve(res)
        },
        (reason) => {
          if (retryTimes > 0) {
            main();
          } else {
            reject(reason)
          }
        }
      )
    };
    main();
  })
};

Promise.retry(getProm, 3)
  .then(
    (res) => { console.log("成功", res) },
    (err) => {
      console.log("请求失败：", err);
    });

function getProm() {
  const n = Math.random();
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      n > 0.9 ? resolve(n) : reject(n);
    }, 1000);
  })
}


/* 
❎ 广泛错误示例：
Promise.retry = function (cb, retryTime = 2) {
  return new Promise((resolve, reject) => {
    cb().then(
      (res) => {
        console.log("res", res);
        resolve(res)
      },
      (err) => {
        if (retryTime > 0) {
          retryTime--;
          return this.retry(cb, retryTime);
        }
        console.log("err-123", err);
        reject(err);
      })
  })
} */


