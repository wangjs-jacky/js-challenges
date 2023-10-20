/* 
  题目：实现 PromiseA+ 规范
*/


class myPromise {
  status = "pending";
  sucFun = () => { };
  failFun = () => { };
  nextPromise;

  constructor(fn) {
    /* 直接执行 */
    /* 入参为函数 */
    fn(this.resolve.bind(this), this.reject.bind(this));
  }

  then(sucFun, failFun) {
    this.sucFun = sucFun;
    this.failFun = failFun;
    this.nextPromise = new myPromise(() => { });
    return this.nextPromise;
  }

  resolve() {
    /* 默认严格模式，需要告知 resolve 执行的环境上下文 */
    if (this.status !== "pending") {
      return;
    }
    this.status = "fulfilled";

    /* 延时执行 */
    setTimeout(() => {
      const x = this.sucFun();
      nextPromise.resolveWith(x);
    });
  }

  reject() {
    if (this.status !== "pending") return;
    this.status = "rejected";

    /* 延时执行 */
    setTimeout(() => {
      this.failFun();
    });
  }
}
