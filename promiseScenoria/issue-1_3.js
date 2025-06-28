// 模拟红灯亮
function red() {
  console.log('red')
}

//模拟绿灯亮
function green() {
  console.log('green')
}

//模拟黄灯亮
function yellow() {
  console.log('yellow')
}

// 使用 Generator 函数实现迭代器
function* trafficLightIterator() {
  while (true) {
    yield red;
    yield yellow;
    yield green;
  }
}

// 创建迭代器实例
const lightIterator = trafficLightIterator();

// 执行红绿灯循环的函数
function runTrafficLight() {
  const { value: lightFunction } = lightIterator.next();
  lightFunction(); // 执行对应的灯光函数
}

// 示例：连续执行10次来演示循环
console.log('=== 使用迭代器实现红绿灯循环 ===');
for (let i = 0; i < 10; i++) {
  console.log(`第 ${i + 1} 次：`);
  runTrafficLight();
}

// 另一种实现方式：使用自定义迭代器对象
const trafficLightCustomIterator = {
  lights: [red, yellow, green],
  currentIndex: 0,
  
  [Symbol.iterator]() {
    return this;
  },
  
  next() {
    const light = this.lights[this.currentIndex];
    this.currentIndex = (this.currentIndex + 1) % this.lights.length;
    return { value: light, done: false };
  }
};

console.log('\n=== 使用自定义迭代器对象 ===');
let count = 0;
for (const lightFunction of trafficLightCustomIterator) {
  console.log(`第 ${count + 1} 次：`);
  lightFunction();
  count++;
  if (count >= 6) break; // 演示6次后停止
}

