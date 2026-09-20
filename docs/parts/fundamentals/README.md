# 平台基础

Web API 运行在浏览器提供的宿主环境中。理解全局对象、事件循环、事件模型、取消机制和数据交换方式之后，再学习具体 API，会更容易判断它在哪里可用、如何组合以及何时释放资源。

下面的 API 地图表示本分类计划覆盖的知识范围，不代表每一项都已经有独立文章。

## API 地图

| 主题 | 主要接口与机制 | 作用 |
| --- | --- | --- |
| 全局环境 | `Window`、`WorkerGlobalScope`、`globalThis`、`Navigator` | 提供不同执行环境的全局入口和平台信息 |
| 事件模型 | `EventTarget`、`Event`、`CustomEvent` | 订阅、派发和传播状态变化 |
| 取消操作 | `AbortController`、`AbortSignal` | 在 Fetch、Streams、事件监听等 API 之间传递取消信号 |
| 任务调度 | `setTimeout()`、`setInterval()`、`queueMicrotask()`、`requestAnimationFrame()`、`requestIdleCallback()` | 安排任务、微任务、渲染前回调和空闲任务 |
| URL 与编码 | `URL`、`URLSearchParams`、`TextEncoder`、`TextDecoder`、`atob()`、`btoa()` | 解析 URL，在文本、字节和 Base64 之间转换 |
| 流式数据 | `ReadableStream`、`WritableStream`、`TransformStream` | 以分块和背压方式读取、写入或转换数据 |
| 消息通信 | `postMessage()`、`MessageChannel`、`MessagePort`、`BroadcastChannel` | 在窗口、iframe 和 Worker 之间传递消息 |
| 对象序列化与复制 | `structuredClone()`、结构化克隆算法、transferable objects | 在浏览器内部序列化并复制复杂对象，或转移二进制资源所有权 |
| 通用错误 | `DOMException`、`ErrorEvent`、`PromiseRejectionEvent` | 表达 Web API 调用失败和全局脚本错误 |

Promise、JSON、`Atomics` 等能力来自 ECMAScript，但会与 Web API 大量配合使用。学习时需要区分语言能力和宿主环境能力，不必把二者割裂开。结构化克隆支持循环引用、Map、Set、ArrayBuffer 等复杂数据，但不会产生可直接保存或通过 HTTP 交换的公开字符串格式。

## 执行环境

- `Window` 对应页面主线程，可以访问 DOM 和用户界面。
- Dedicated Worker 和 Shared Worker 拥有独立的全局环境，不能直接操作 DOM。
- Service Worker 位于页面和网络之间，具有安装、激活和按需终止的生命周期。
- Worklet 运行在浏览器特定管线中，适合音频或渲染等低延迟任务。

接口是否可用取决于规范中的暴露范围、安全上下文和浏览器实现，不能只根据接口名称判断。

## 运行机制

浏览器通过事件循环协调脚本、用户交互、网络和渲染。一次任务执行结束后会清空微任务队列，然后浏览器才有机会进行渲染。Promise 回调属于微任务，定时器和多数事件回调属于任务。

“异步”不等于“并行”。主线程上的长任务仍会阻塞输入和渲染，计算密集型工作应拆分任务或交给 Worker。

## 已有专题

- [事件](/parts/webApis/event)
- [BOM 与 Window](/parts/webApis/BOM)
- [二进制数据与文件](/parts/binary/)
- [后台与并发](/parts/workers/)
- [性能与观察](/parts/performance/)
