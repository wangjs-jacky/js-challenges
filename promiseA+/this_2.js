class Test {
  constructor() {
    /* 写法一：使用 bind 修改指针 */
    this.consoleName = this.consoleName.bind(this);
    this.name = "Hello world"
  }
  consoleName() {
    console.log(this.name);
  }

  /* 写法二：箭头函数 */
  con = () => {
    console.log(this.name);
  }
}

const test = new Test();
test.consoleName(); // 'Hello world'
const { con } = test;
con(); //  'Hello world'
