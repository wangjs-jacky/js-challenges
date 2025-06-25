# 使用原生 fetch 进行流式请求

代码：

```ts
const response = await fetch("https://api.coze.cn/v3/chat")
// 获取数据
const stream = response.body;

// 使用 getReader（)
const reader = stream.getReader();

// 由于 content-type 设置为 json 格式，因此使用 textDecoder 进行文本解析
const decoder = new TextDecoder();

while (true) {
    // 循环读取
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value, { stream: true });
    console.log('Received chunk:', chunk);
}
```
