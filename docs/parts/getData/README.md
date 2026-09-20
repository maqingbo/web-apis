# 网络与数据传输

浏览器提供多种网络能力。它们的差异不仅是调用方式，还包括连接模型、数据流方向、缓存策略、跨源限制、取消方式和支持的执行环境。

下面的 API 地图表示本分类计划覆盖的知识范围，不代表每一项都已经有独立文章。

## API 地图

| 场景 | 主要接口与 API | 特点 |
| --- | --- | --- |
| HTTP 请求 | Fetch API：`fetch()`、`Request`、`Response`、`Headers` | 基于 Promise，可与 Streams、Service Worker 组合 |
| 传统 HTTP 请求 | `XMLHttpRequest`、`ProgressEvent` | 基于事件，仍常用于监控上传进度 |
| 请求体与表单 | `FormData`、`URLSearchParams`、Blob、ArrayBuffer | 构造表单、URL 编码或二进制请求体 |
| 流式传输 | `ReadableStream`、`WritableStream`、`TransformStream` | 分块消费、转换数据并处理背压 |
| 服务端单向推送 | Server-Sent Events、`EventSource` | 服务器通过 HTTP 持续向页面发送文本事件 |
| 双向长连接 | WebSocket API：`WebSocket` | 在单条连接上双向传输消息 |
| 低延迟传输 | WebTransport API | 基于 HTTP/3 提供流和不可靠数据报，支持度仍需确认 |
| 后台发送 | Beacon API：`navigator.sendBeacon()` | 页面退出阶段发送少量数据 |
| 网络代理 | Service Worker、`FetchEvent` | 拦截请求，实现离线、缓存和自定义响应 |
| 连接状态 | `navigator.onLine`、Network Information API | 提供有限的在线或网络质量提示，不能替代真实请求检测 |

## 选择与边界

| 场景 | 常用选择 |
| --- | --- |
| 普通 HTTP 请求 | Fetch |
| 流式读取响应 | Fetch + `ReadableStream` |
| 监控上传进度 | `XMLHttpRequest` |
| 服务端单向推送 | Server-Sent Events |
| 双向消息 | WebSocket |
| 页面卸载时发送少量数据 | Beacon |

网络请求还会受到 URL、HTTP、缓存、Cookie、同源策略和 CORS 的共同影响。Fetch 成功完成只表示收到了 HTTP 响应；`404`、`500` 等状态通常不会让 Promise 自动变为 rejected。

## 已有专题

- [Fetch](/parts/getData/fetch)
- [XMLHttpRequest](/parts/getData/XHR)
- [客户端存储与缓存](/parts/storage/)
- [安全与权限](/parts/security/)
