var p = 1

var o = {
  v: 'hello',
  p: ['a1', 'a2'],
  f: function f() {
    this.p.forEach(function (item) {
      /* 这里的 this 指向的全局 */
      console.log(this.v + ' ' + item);
    });
  },
  /* 使用箭头函数 */
  f2: () => {
    /* 这里的 this 指向的全局 */
    console.log("this.p", this.p);
  },
}

o.f();
o.f2();

/* 打印：
   1. undefined + a1
   2. undefined + a2
*/

