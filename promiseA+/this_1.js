let test = {
  a: 1,
  b: function () {
    console.log(this.a)
  }
}

/* 上下文为 test */
test.b() // 1

/* 上下为 global，默认严格模式 */
const { b } = test;
b() // undefined