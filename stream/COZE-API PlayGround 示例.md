# COZE-API PlayGround 示例

时间：`2025-06-25 17:34:23`
地址：https://www.coze.cn/open/playground/chat_v3

| 步骤                | 示例                                                                                                 |
| ------------------- | ---------------------------------------------------------------------------------------------------- |
| 生成个人 Token      | https://www.coze.cn/open/oauth/pats                                                                  |
| Bot_ID              | `https://www.coze.cn/space/7413360175245066251/bot/7503922688172752933` 中 `7503922688172752933` |
| user_id             | 无所谓，可以任意填                                                                                   |
| Stream              | true                                                                                                 |
| additional_messages | `{ role: "user", question: "用户输入", content_type: "text" }`                                     |

其中平台自动生成了 `shell` 脚本

```shell
curl -X POST 'https://api.coze.cn/v3/chat?' \
-H "Authorization: Bearer pat_" \
-H "Content-Type: application/json" \
-d '{
  "bot_id": "7503922688172752933",
  "user_id": "dddd",
  "stream": true,
  "additional_messages": [
    {
      "role": "user",
      "type": "question",
      "content_type": "text",
      "content": "几节课逻辑来看极乐空间卡拉季  进来进来快进来"
    }
  ]
}'
```

执行结果如下：

<img src="https://vblog-img.oss-cn-shanghai.aliyuncs.com/jacky-blog-vuepress/image-20250625180925874.png" style="zoom: 33%;" />

此处流式结果为：

```plaintext
event:conversation.chat.created
data:{"id":"7519836506127876137","conversation_id":"7519836506127859753","bot_id":"7503922688172752933","created_at":1750848375,"last_error":{"code":0,"msg":""},"status":"created","usage":{"token_count":0,"output_count":0,"input_count":0},"section_id":"7519836506127859753"}

event:conversation.chat.in_progress
data:{"id":"7519836506127876137","conversation_id":"7519836506127859753","bot_id":"7503922688172752933","created_at":1750848375,"last_error":{"code":0,"msg":""},"status":"in_progress","usage":{"token_count":0,"output_count":0,"input_count":0},"section_id":"7519836506127859}

...

event:done
data:"[DONE]"
```
