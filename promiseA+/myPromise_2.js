class myPromise {
  status = "pending";
  sucFun = null;
  failFun = null;
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

  resolve(result) {
    /* 默认严格模式，需要告知 resolve 执行的环境上下文 */
    if (this.status !== "pending") {
      return;
    }
    this.status = "fulfilled";

    /* 延时执行 */
    setTimeout(() => {
      if (typeof this.sucFun === "function") {
        const res = this.sucFun(result);
        this.nextPromise.resolveWith(res)
      }
    });
  }

  reject(reason) {
    if (this.status !== "pending") return;
    this.status = "rejected";

    /* 延时执行 */
    setTimeout(() => {
      if (typeof this.failFun === "function") {
        this.failFun(reason);
      }
    });
  }

  resolveWith(x) {
    if (this === x) {
      this.reject(new TypeError("不允许返回自身"))
    } else if (x instanceof myPromise) {
      x.then(
        (result) => this.resolve(result),
        (reason) => this.reject(reason)
      )
    } else if (isPromiseLike(x)) {
      let then;
      try {
        then = x.then;
      } catch (error) {
        this.reject(error)
      }
      then(
        (res) => this.resolveWith(res),
        (reason) => this.reject(reason)
      )
    } else {
      /* x 是一个普通数据类型 */
      this.resolve(x)
    }
  }
}

/* 测试 .then 返回 字符串 */
new myPromise((resolve, reject) => {
  setTimeout(() => {
    resolve();
  }, 1000);
}).then(() => { return "success" },
).then((x) => { console.log("x-2", x) })


/* 测试 .then 返回 promsie 类型 */
new myPromise((resolve, reject) => {
  setTimeout(() => {
    resolve();
  }, 1000);
}).then(() => { return new myPromise((resolve) => { resolve(2) }) },
).then((x) => { console.log("x-2", x) })


function isPromiseLike(obj) {
  return !!(obj && typeof obj === "object" && typeof obj.then === "function");
}
