Promise.myRace = function (_promiseList) {
  return new Promise((resolve, reject) => {
    /* promiseList 是一个可迭代对象 */
    const promiseList = Array.from(_promiseList);
    promiseList.forEach((p) => {
      Promise.resolve(p).then((res) => {
        resolve(res);
      }, (err) => {
        reject(err);
      })
    })
  })
}

const promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, 'one');
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'two');
});

Promise.myRace([promise1, promise2]).then((value) => {
  console.log(value);
  // Both resolve, but promise2 is faster
});
// Expected output: "two"