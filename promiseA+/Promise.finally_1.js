/* 
  实现 Promise.finally 函数
  非 PromiseA+ 规范，但未 ES6 Promise 规范

  视频：https://www.douyin.com/search/promise.finally
*/

/* 此处不能使用箭头函数 */
Promise.prototype.myFinally = function (onFinally) {
  /* this 指向的是 Promis，因此直接 this.then 即可  */
  return this.then(
    (res) => {
      Promise.resolve(onFinally()).then(() => res)
    },
    (err) => {
      Promise.resolve(onFinally()).then(() => {
        throw err
      })
    })
}

Promise.resolve(Promise.reject("123"))
  .then(
    (res) => console.log("res", res),
    (err) => console.log("err", err),
  )


/* function checkMail() {
  return new Promise((resolve, reject) => {
    if (Math.random() > 0.5) {
      resolve('Mail has arrived');
    } else {
      reject(new Error('Failed to arrive'));
    }
  });
}

checkMail()
  .then((mail) => {
    console.log(mail);
  })
  .catch((err) => {
    console.error(err);
  })
  .myFinally(() => {
    console.log('Experiment completed');
  }); */
