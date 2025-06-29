# API 流式请求

## 基础知识

如何构造一个可迭代对象？一共有两种方法：

1. 需要构造一个特殊的函数（`Symbol.iterator`），返回一个具有 `next` 属性节点的对象，其中 `next` 的返回结果必须为 `{done: boolean, value: any}`
2. 使用 `generator` 快速构建。

**Example**

```tsx
let range = {
  from: 1,
  to: 3
};
```

第一种方案：

```tsx
let range = {
  from: 1,
  to: 3,
  [Symbol.iterator]() {
    let current = this.from;
    let last = this.to;
    
    return {
      next() {
        if (current <= last) {
          return { done: false, value: current++ };
        } else {
          return { done: true, value: undefined };
        }
      }
    };
  }
};
```

第二种方案：直接使用 `generator` 函数

```tsx
// 或者更简单的方式，直接使用 generator 函数
function* generateSequence(from, to) {
  yield 1;
  yield 2;
  yield 3;
}
```

那我们又如何消费这个可迭代对象呢？ 一共也有两种方案

第一种方案，使用 `xxx.next()` 一直消费返回值，直至 `done` 为 `true`

```tsx
// 如果是第一种方案的话，
let gen = range[Symbol.iterator]();
// 如果是第二种方案，直接执行就好了
let gen = generateSequence();
let one = gen.next(); // {value: 1, done: false}
let two = gen.next(); // {value: 2, done: false}
let three = gen.next(); // {value: 3, done: true}
```

第二种方案，则可使用  `for...of` 这种消费方式

```tsx
for(let value of generateSequence()){
  console.log(value)
}
```

铺垫完 `iterator` 的基础概念后，我们看下实际的案例就很方便了，对于 `repsones.body` 是一个 `stream` 类型。消费就两个步骤:
1. 获取可迭代对象
  - 对于 `fetch` 方式：`const reader = response.body.getReader()`
  - 对于 `node-fetch@2.x` 方式： `const reader = response.body[Symbol.asyncIterator]` 

2. 通过 `.next` 消费
  - 对于 `fetch` 方式：`reader.read()`
  - 对于 `node-fetch@2.x` 方式： `reader.next()` 

## 使用原生 fetch 进行流式请求

```ts
async function fetchStream() {
  const payload = {
    bot_id: "7503922688172752933",
    // 任意值
    user_id: "1234567890",
    // 是否支持流式
    stream: true,
    additional_messages: [
      {
        "role": "user",
        "content": "你好",
        "content_type": "text"
      }
    ]
  };

  const response = await fetch("https://api.coze.cn/v3/chat", {
    method: 'POST',
    headers: {
      Authorization: "Bearer pat_WLa5EgjU4p3YagOR8eRIlU54jpS6dnzD1",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload)
  });

  // 查看数据流是否有值
  if (!response.body) {
    throw new Error('无法获取到数据流');
  }
  // 获取数据流
  const stream = response.body;

  // 使用 .getReader() 获取数据流
  const reader = stream.getReader();
  // 数据流是 Chunk，需要使用文本解码器解码
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value, { stream: true });
    console.log('Received chunk:', chunk);
  }
}

fetchStream();
```



## 使用 node-fetch 进行流式请求

> `node-fetch` 必须是 `^2`

```ts
// @ts-ignore
const fetch = require('node-fetch');

// 使用 node-fetch 流式请求
async function fetchStream() {
  const payload = {
    bot_id: "7503922688172752933",
    // 任意值
    user_id: "1234567890",
    // 是否支持流式
    stream: true,
    additional_messages: [
      {
        "role": "user",
        "content": "你好",
        "content_type": "text"
      }
    ]
  };

  const response = await fetch("https://api.coze.cn/v3/chat", {
    method: 'POST',
    headers: {
      Authorization: "Bearer pat_WLa5EgjU4ph6O54jpS6dnzD1j",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload)
  });

  if (!response.body) {
    throw new Error('Response body is null');
  }

  const stream = response.body;

  // 使用 Symbol.asyncIterator 获取数据流，原生 fetch 使用 getReader() 获取数据流
  const reader = stream[Symbol.asyncIterator]();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.next();
    if (done) break;
    const chunk = decoder.decode(value, { stream: true });
    console.log('Received chunk:', chunk);
  }
}

fetchStream();
```


## 封装 compatible fetch 方法

原生：浏览器环境 + node 18.0.0 或更高版本

`node-fetch`: 除以上条件外

```ts
import nodeFetch from 'node-fetch';

function isBrowser() {
  return typeof window !== 'undefined';
}

// 原生 fetch 使用条件： 浏览器环境 + node 18.0.0 或更高版本
const isSupportNativeFetch = () => {
  // 浏览器环境
  if (isBrowser()) {
    return true;
  }
  // native fetch is supported in node 18.0.0 or higher
  const version = process.version.slice(1);
  return compareVersions(version, '18.0.0') >= 0;
};

// Add version comparison utility
function compareVersions(v1: string, v2: string): number {
  const v1Parts = v1.split('.').map(Number);
  const v2Parts = v2.split('.').map(Number);

  for (let i = 0; i < 3; i++) {
    const part1 = v1Parts[i] || 0;
    const part2 = v2Parts[i] || 0;
    if (part1 > part2) {
      return 1;
    }
    if (part1 < part2) {
      return -1;
    }
  }
  return 0;
}

const getFetch = () => {
  if (isSupportNativeFetch()) {
    console.log("\x1b[32m当前环境使用的是：原生 fetch\x1b[0m");
    return fetch;
  }
  console.log("\x1b[33m当前环境使用的是：node-fetch\x1b[0m");
  return nodeFetch;
}

// 兼容性 fetch 函数
const compatibleFetch = async (url: string, options: any) => {
  const fetchFun = getFetch();
  const response: any = await fetchFun(url, options);
  const stream = response.body;

  // 原生 fetch 使用 getReader() 获取数据流， node-fetch 使用  asyncIterator 获取数据流
  const reader = stream[Symbol.asyncIterator] ? stream[Symbol.asyncIterator]() : stream.getReader();
  // 数据流是 Chunk，需要使用文本解码器解码
  const decoder = new TextDecoder();

  while (true) {
    // 原生 fetch 使用 read() 获取数据流， node-fetch 使用 next() 获取数据流
    const { done, value } = await (reader.next ? reader.next() : reader.read());
    if (done) break;
    const chunk = decoder.decode(value, { stream: true });
    console.log('Received chunk:', chunk);
  }
};

async function fetchStream() {
  const payload = {
    bot_id: "7503922688172752933",
    // 任意值
    user_id: "1234567890",
    // 是否支持流式
    stream: true,
    additional_messages: [
      {
        "role": "user",
        "content": "你好",
        "content_type": "text"
      }
    ]
  };

  await compatibleFetch("https://api.coze.cn/v3/chat", {
    method: 'POST',
    headers: {
      Authorization: "Bearer pat_WLa5EgjU44jpS6dnzD1j",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload)
  });
}

fetchStream();
```
