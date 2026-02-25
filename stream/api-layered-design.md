# 从 Coze API 设计思考函数分层

我对于分层设计有以下的理解：

1、分层某种层度上可以看做是一种 `Best Pratice` 最佳实践，即如何使用模块化的方案去拆分文件夹。

2、分层设计其实并不是一个很奇妙的东西，就是不同的阶段需要用户去输入不同的内容，有时间是将函数柯里化的设计思想迁移到文件夹的分层上。

3、从复用性角度看，是函数逐层抽象的过程，最底层的抽象能力最高，可以适用于任何场景，必要时可以以 `package`包的方式提供出去，不牵涉任何的业务的内容。

就拿 `coze-js` 这个仓库的 `api` 举例来说，对于 `axios` 可以控制如下参数：

- 核心参数

  - `options.url`

  - `options.method `

  - `options.body`

  - `options.headers`

- 配置参数
  - `options.isStreaming`

其中很多参数并不需要用户全部输入，可以是框架底层封装掉了，比如与用户鉴权的信息可以在 `new` 阶段就可以输入了，对于 `input_message` 则是在函数触发时输入。



## Package 层

### fetch 层 - 核心逻辑处理

> 核心逻辑：不牵扯任务的业务属性

该层主要实现如下核心代码：
```ts
const { response, stream, json } = await fetchAPI(fullUrl, fetchOptions);
```
核心基础能力： 
1. 兼容 `fetch` + `node-fetch` 确保无论是浏览器端还是 `node` 端都可以执行。
2. 支持额外配置 `isStreaming`，特殊处理该参数逻辑。使用 *stream() 方式统一封装流式响应。
3. 对响应内容进行基础数据格式的转化： `chunk` 的 `string` → `object` 类型

需要处理的 HTTP 状态码：
1. 401 鉴权失败
2. `axios` 内置的 `code` 逻辑

     - error.code === 'ECONNABORTED'
     - error.code === 'ERR_CANCELED'
3. 500 报错



### Core 层 - 牵扯部分的业务逻辑

该层主要实现如下核心代码：

```tsx
const fetchOptions = await this.buildOptions(method, body, options);
this.debugLog(options?.debug, `--- request url: ${fullUrl}`);
this.debugLog(options?.debug, '--- request options:', fetchOptions);
const { response, stream, json } = await fetchAPI(fullUrl, fetchOptions);
this.debugLog(options?.debug, `--- response status: ${response.status}`);
this.debugLog(options?.debug, '--- response headers: ', response.headers);
```
核心基础能力： 
1. 合并带一些业务属性的 config 配置
   - headers['X-Coze-Client-User-Agent'] 
   - headers['authorization']=`Bearer ${token}`
2. 额外的能力，如调试能力等
3. 对核心的参数进行校验，如 浏览器端不允许使用 pat_ 验证方式。



## 应用层

### client 层

核心导出所有的配置文件
```tsx
const client = new CozeAPI({
  baseURL,
  token: apiKey,
  baseWsURL,
  debug: false,
});

export {
  client
}
```



### chat 层

```tsx
const v = await client.chat.stream({
    bot_id: botId,
    auto_save_history: false,
    additional_messages: [
      {
        role: RoleType.User,
        content: query,
        content_type: 'text',
      },
    ],
  });

  for await (const part of v) {
    if (part.event === ChatEventType.CONVERSATION_CHAT_CREATED) {
      console.log('[START]');
      callback && callback(part.data);
    } else if (part.event === ChatEventType.CONVERSATION_MESSAGE_DELTA) {
      process.stdout.write(part.data.content);
    } else if (part.event === ChatEventType.CONVERSATION_MESSAGE_COMPLETED) {
      const { role, type, content } = part.data;
      if (role === 'assistant' && type === 'answer') {
        process.stdout.write('\n');
      } else {
        console.log('[%s]:[%s]:%s', role, type, content);
      }
    } else if (part.event === ChatEventType.CONVERSATION_CHAT_COMPLETED) {
      console.log(part.data.usage);
    } else if (part.event === ChatEventType.DONE) {
      console.log(part.data);
    } else if (part.event === ChatEventType.ERROR) {
      console.error(part.data);
    }
  }

  console.log('=== End of Streaming Chat ===');
}
```