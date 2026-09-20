# 后台与并发

Worker 允许脚本在页面主线程之外运行，适合计算、网络代理和跨页面协调。不同 Worker 的生命周期和所有权不同，不能互相替代。

| 类型 | 生命周期与用途 |
| --- | --- |
| Dedicated Worker | 由一个页面创建，适合计算密集型工作 |
| Shared Worker | 可被多个同源页面共享，适合共享连接和状态协调 |
| Service Worker | 独立于具体页面，处理网络、离线、Push 等事件 |
| Worklet | 嵌入浏览器特定管线，强调低延迟和受限执行 |

## 通信与数据

页面和 Worker 通常使用 `postMessage()` 通信。数据默认使用结构化克隆；ArrayBuffer 等对象可以作为 transferable 转移所有权，以避免复制。共享内存则需要 SharedArrayBuffer、Atomics 以及相应的跨源隔离配置。

## 生命周期

Worker 可能随页面关闭而终止，Service Worker 也可能在空闲时被浏览器停止，因此不能依赖进程常驻或普通全局变量保存关键状态。后台任务需要设计成可恢复、可重复执行，并把持久状态写入合适的存储。

Service Worker 还连接了 [网络与数据传输](/parts/getData/)、[客户端存储](/parts/storage/) 和离线体验。
