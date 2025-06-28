# API 流式请求

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



## 使用迭代器改造





## Symbol.asyncIterator 是个什么？

对于一个普通对象的是，是无法使用
