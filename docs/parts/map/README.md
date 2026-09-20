# Web API 知识地图

## Web 平台的边界

API（Application Programming Interface，应用程序接口）描述软件组件之间如何交互。它关心的是调用方可以使用什么能力、需要传入什么以及会得到什么，而不要求调用方了解内部实现。

在浏览器中编写 JavaScript 时，实际使用的是两部分能力：

- **ECMAScript**：JavaScript 语言本身，包括语法、类型、对象、Promise、模块等。
- **Web API**：浏览器作为宿主环境提供的能力，包括 DOM、Fetch、Storage、Canvas、WebRTC 等。

过去常用“ECMAScript + DOM + BOM”描述浏览器端 JavaScript。这个说法便于入门，但 BOM 并不是一份统一的正式规范，而是对 `window`、`location`、`navigator`、History 等浏览器能力的历史性统称。现代 Web 平台通常把这些能力放回各自所属的 Web 标准中理解。

Web API 也不同于 GitHub API、地图 API、支付 API 等通过网络提供的第三方服务。浏览器原生 API 是运行环境提供的能力；第三方服务 API 则通常需要通过 Fetch、WebSocket 等浏览器能力访问。

## 从规范到 JavaScript 对象

Web API、规范和 JavaScript 对象不是一一对应的关系。它们大致经过以下几层：

| 层次 | 作用 |
| --- | --- |
| 规范 | 定义概念、处理算法、接口及不同组件之间的关系 |
| Web IDL | 描述接口如何暴露给 JavaScript 等语言绑定 |
| 浏览器实现 | 使用 C++、Rust 等实现规范要求的行为 |
| JavaScript 绑定 | 将能力暴露为 `window`、Worker 全局对象或其他对象上的接口 |

一份规范可以定义多个接口，一个 API 也可能依赖多份规范。例如 Fetch 涉及 `fetch()`、`Request`、`Response`、Headers、Streams 和 HTTP 语义；DOM 中的 `EventTarget` 又被大量其他 API 复用。

接口暴露到 JavaScript 后通常表现为对象、属性和方法，并遵循 Web IDL 定义的绑定规则。它们可能使用事件、Promise、回调、迭代器或同步返回值，并不是所有 Web API 都以事件或原型继承作为核心特征。

## 执行环境

学习一个 API 时，首先要确认它在哪种全局环境中可用。

| 环境 | 主要用途 | 典型能力 |
| --- | --- | --- |
| `Window` | 页面主线程和用户界面 | DOM、History、Storage、Canvas |
| Dedicated Worker | 单个页面的后台计算 | Fetch、Streams、IndexedDB |
| Shared Worker | 多个同源页面共享的后台线程 | 消息通信、共享连接 |
| Service Worker | 网络代理、离线缓存和后台事件 | Fetch 事件、Cache Storage、Push |
| Worklet | 渲染或音频管线中的轻量任务 | AudioWorklet、PaintWorklet |

同名接口不一定在所有环境中都存在。MDN 中的“可在 Web Worker 中使用”以及规范中的 `[Exposed]` 信息，描述的就是这种可用范围。

## 能力目录

这里按使用场景组织内容。分类是为了方便学习，不表示各模块彼此独立。

| 领域 | 主要内容 |
| --- | --- |
| [平台基础](/parts/fundamentals/) | 执行环境、事件循环、事件、取消操作和通用数据类型 |
| [文档与界面](/parts/document/) | DOM、HTML、元素、事件以及页面交互 |
| [网络与数据传输](/parts/getData/) | Fetch、XMLHttpRequest、WebSocket、SSE 和请求生命周期 |
| [二进制数据与文件](/parts/binary/) | ArrayBuffer、TypedArray、Blob、File 和文件系统能力 |
| [客户端存储](/parts/storage/) | Web Storage、IndexedDB、Cache Storage 和配额管理 |
| [图形绘制](/parts/draw/) | Canvas、SVG、WebGL、WebGPU 和图像处理 |
| [音频与视频](/parts/av/) | 媒体元素、MediaStream、Web Audio 和媒体录制 |
| [实时通信](/parts/rtc/) | WebRTC、媒体轨道、数据通道和信令 |
| [后台与并发](/parts/workers/) | Worker、Service Worker、Worklet 和线程间通信 |
| [性能与观察](/parts/performance/) | Performance Timeline、Observer API 和用户体验指标 |
| [安全与权限](/parts/security/) | 同源策略、CORS、安全上下文、权限和用户激活 |
| [设备能力](/parts/device/) | 地理位置、剪贴板、传感器和外部设备访问 |

## API 之间的关系

Web API 更像一张关系网，而不是一棵互斥的分类树。例如：

```text
Fetch ──> Request / Response ──> Streams / Blob
Service Worker ──> Fetch 事件 ──> Cache Storage
MediaStream ──> MediaRecorder ──> Blob
WebRTC ──> MediaStream / RTCDataChannel
Canvas ──> ImageBitmap / Blob
```

其中一些能力还会跨越语言和平台边界。Promise 属于 ECMAScript，但大量 Web API 使用 Promise 表达异步结果；HTTP 由 IETF 标准定义，而 Fetch 规定浏览器如何把 HTTP 等网络能力暴露给 Web 应用。

## 学习一个 API 时关注什么

除了记住属性和方法，还应该回答以下问题：

1. 它解决什么问题，与已有 API 是替代、补充还是依赖关系？
2. 它暴露在 `Window`、Worker 还是其他执行环境？
3. 它使用同步返回值、Promise、事件还是 Streams？如何取消？
4. 它是否要求 HTTPS、安全上下文、用户授权或用户激活？
5. 它受同源策略、CORS、CSP 或 Permissions Policy 的哪些限制？
6. 它涉及哪些资源生命周期，使用完是否需要关闭、释放或撤销？
7. 浏览器兼容性、降级方案和服务端配合要求是什么？

这套问题比孤立地记忆接口更容易建立稳定的知识体系。

## 标准从哪里来

Web apis 由多个组织共同维护。

- [WHATWG](https://spec.whatwg.org/)：维护 HTML、DOM、Fetch、URL、Streams、Storage 等 Living Standards。
- [W3C](https://www.w3.org/TR/?tag=webapi)：发布 WebRTC、Web Audio、Pointer Events、Web Authentication 等标准和草案。
- [TC39](https://tc39.es/)：维护 ECMAScript 语言标准。它不负责浏览器 API，但语言能力与 Web API 经常共同使用。
- [IETF](https://www.ietf.org/standards/)：维护 HTTP、WebSocket 等互联网协议标准。
- [Khronos Group](https://www.khronos.org/webgl/)：维护 WebGL 等图形标准。
- [WICG](https://wicg.io/)：用于孵化新的 Web 平台能力，其中的提案不一定会成为稳定标准。

标准状态会持续变化，因此本文不维护某一时点的完整规范数量。查阅 API 时应以对应规范、MDN 兼容性数据和浏览器实现状态为准。

## 参考

- [Web API 接口参考 - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API)
- [JavaScript 技术概览 - MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/JavaScript_technologies_overview)
- [Web IDL Standard](https://webidl.spec.whatwg.org/)
- [HTML Standard](https://html.spec.whatwg.org/)
