/* 
  题目：js每隔一秒打印1,2,3,4,5
  使用迭代器实现
*/

const sleep = (delay = 1000) => {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

// 方法1: 使用生成器函数（Generator）实现迭代器
function* numberGenerator() {
  for (let i = 1; i <= 5; i++) {
    yield i;
  }
}

// 使用async函数配合生成器
async function printWithGenerator() {
  console.log('--- 使用生成器函数实现 ---');
  const generator = numberGenerator();
  
  for (const num of generator) {
    console.log(num);
    if (num < 5) { // 最后一个数字后不需要延时
      await sleep();
    }
  }
}

// 方法2: 手动实现迭代器接口
function createNumberIterator() {
  let current = 1;
  const max = 5;
  
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      if (current <= max) {
        return { value: current++, done: false };
      } else {
        return { done: true };
      }
    }
  };
}

async function printWithCustomIterator() {
  console.log('--- 使用自定义迭代器实现 ---');
  const iterator = createNumberIterator();
  
  for (const num of iterator) {
    console.log(num);
    if (num < 5) { // 最后一个数字后不需要延时
      await sleep();
    }
  }
}

// 方法3: 使用生成器函数配合async/await的更优雅实现
async function* asyncNumberGenerator() {
  for (let i = 1; i <= 5; i++) {
    yield i;
    if (i < 5) { // 最后一个数字后不需要延时
      await sleep();
    }
  }
}

async function printWithAsyncGenerator() {
  console.log('--- 使用异步生成器实现 ---');
  
  for await (const num of asyncNumberGenerator()) {
    console.log(num);
  }
}

// 执行所有实现方式
async function runAll() {
  await printWithGenerator();
  
  await sleep(2000); // 间隔2秒
  
  await printWithCustomIterator();
  
  await sleep(2000); // 间隔2秒
  
  await printWithAsyncGenerator();
}

// 执行
runAll();