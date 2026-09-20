# 网络与数据传输

浏览器提供多种网络能力。它们的差异不仅是接口写法，还包括连接模型、数据流方向、缓存、跨源限制和取消方式。

## 内容

- [Fetch](/parts/getData/fetch)：基于 Promise、Request 和 Response 的现代请求接口。
- [XMLHttpRequest](/parts/getData/XHR)：较早的请求接口，以及上传进度等事件能力。

## 常见选择

| 场景 | 常用能力 |
| --- | --- |
| 普通 HTTP 请求 | Fetch |
| 流式读取响应 | Fetch + ReadableStream |
| 监控上传进度 | XMLHttpRequest |
| 服务端单向推送 | Server-Sent Events |
| 双向长连接 | WebSocket |
| 页面卸载时发送少量数据 | Beacon |

网络请求还会受到 URL、HTTP、缓存、Cookie、同源策略和 CORS 的共同影响。Fetch 成功完成只表示收到了 HTTP 响应；`404`、`500` 等状态通常不会让 Promise 自动变为 rejected。
