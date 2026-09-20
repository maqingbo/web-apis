# 后台与并发

Worker 允许脚本在页面主线程之外运行，适合计算、网络代理、后台事件和跨页面协调。不同 Worker 的所有者、生命周期、全局对象和可用 API 不同，不能互相替代。

下面的 API 地图表示本分类计划覆盖的知识范围，不代表每一项都已经有独立文章。

## API 地图

| 类型或能力 | 主要接口与 API | 用途 |
| --- | --- | --- |
| 专用线程 | Web Workers：`Worker`、`DedicatedWorkerGlobalScope` | 为单个页面执行计算或数据处理 |
| 共享线程 | `SharedWorker`、`SharedWorkerGlobalScope` | 在多个同源页面之间共享连接和状态协调逻辑 |
| 网络与后台事件 | Service Worker：`ServiceWorkerContainer`、`ServiceWorkerRegistration`、`ServiceWorkerGlobalScope` | 处理网络代理、离线、Push 和后台事件 |
| 专用管线 | `AudioWorklet`、`PaintWorklet`、Worklet | 在音频或渲染管线中执行受限、低延迟任务 |
| 点对点消息 | `postMessage()`、`MessageChannel`、`MessagePort` | 在页面、iframe 和 Worker 之间交换消息 |
| 跨页面协调 | `BroadcastChannel`、Web Locks API、`navigator.locks`、Shared Worker | 在同源页面和 Worker 之间广播消息、协调资源占用或共享连接 |
| 数据传递 | 结构化克隆、transferable objects | 复制对象或转移 ArrayBuffer、MessagePort 等资源 |
| 共享内存 | `SharedArrayBuffer`、`Atomics` | 在代理之间共享内存并进行原子同步，要求跨源隔离 |
| 离线与缓存 | `FetchEvent`、Cache API、Clients API | 拦截请求、返回缓存响应并与页面通信 |
| 后台能力 | Push API、Notifications API、Background Sync API | 在符合条件时接收推送、显示通知或重试任务 |

## 生命周期

| 类型 | 生命周期特点 |
| --- | --- |
| Dedicated Worker | 通常由创建它的页面控制，适合页面级计算任务 |
| Shared Worker | 可被多个同源上下文连接，支持情况需要确认 |
| Service Worker | 由浏览器按事件启动并在空闲时终止，不能假设进程常驻 |
| Worklet | 生命周期由所属浏览器管线管理，可用 API 非常受限 |

后台任务应设计成可恢复、可重复执行，并把关键状态写入合适的持久化存储。Service Worker 的更新、激活和页面接管也需要显式处理版本切换。

BroadcastChannel 负责传递消息，Web Locks 负责协调同源上下文对共享资源的独占或共享访问；它们不会自动持久化业务状态。需要保存的数据仍应写入 IndexedDB 等存储。

## 相关专题

- [平台基础](/parts/fundamentals/)
- [网络与数据传输](/parts/getData/)
- [客户端存储](/parts/storage/)
- [音频与视频](/parts/av/)
