# 性能与观察

性能 API 的目标不是给出一个笼统分数，而是提供统一时间轴、渲染时机和可观察事件，帮助定位加载、资源请求、主线程任务、交互和视觉稳定性中的具体问题。

下面的 API 地图表示本分类计划覆盖的知识范围，不代表每一项都已经有独立文章。

## API 地图

| 领域 | 主要接口与 API | 观察内容 |
| --- | --- | --- |
| 高精度时间 | High Resolution Time、`performance.now()`、`performance.timeOrigin` | 单调递增的高精度时间基准 |
| 自定义测量 | User Timing：`performance.mark()`、`measure()`、`clearMarks()` | 记录业务阶段和自定义耗时 |
| 统一时间轴 | Performance Timeline、`PerformanceEntry`、`PerformanceObserver` | 查询或订阅不同类型的性能条目 |
| 页面导航 | Navigation Timing、`PerformanceNavigationTiming` | DNS、连接、请求、响应、DOM 和加载阶段 |
| 资源请求 | Resource Timing、`PerformanceResourceTiming`、Server Timing | 脚本、样式、图片等资源的网络阶段和服务端指标 |
| 绘制体验 | Paint Timing、Largest Contentful Paint、Layout Instability | 首次绘制、最大内容绘制和布局偏移 |
| 交互响应 | Event Timing、Long Tasks API、Long Animation Frames API | 输入延迟、长任务和阻塞渲染的脚本工作 |
| 元素观察 | `MutationObserver`、`ResizeObserver`、`IntersectionObserver` | DOM 变化、尺寸变化和可见区域交叉状态 |
| 渲染调度 | `requestAnimationFrame()`、`requestIdleCallback()`、Prioritized Task Scheduling API | 在渲染前、空闲期或指定优先级执行任务 |
| 页面生命周期 | Page Visibility API、`visibilitychange`、`pageshow`、`pagehide`、`PageTransitionEvent.persisted`、freeze / resume | 处理可见性变化、冻结恢复、页面卸载和往返缓存（BFCache） |
| 内存与压力 | `performance.measureUserAgentSpecificMemory()`、Pressure API | 内存占用或系统资源压力，支持度有限 |

## 指标与 API

Core Web Vitals 是建立在浏览器性能条目之上的用户体验指标，不是一组独立的 Web API。LCP、INP 和 CLS 需要结合 `PerformanceObserver`、真实用户监控和实验室工具理解。

MutationObserver、ResizeObserver 和 IntersectionObserver 观察的是 DOM、尺寸和可见性变化，不是通用计时器。测量代码本身也应保持轻量，并注意条目缓冲区、跨源资源时间信息和浏览器支持范围。

页面离开时不应只依赖 `unload` 或 `beforeunload`。保存状态和停止非必要工作时，通常应结合 `visibilitychange`、`pagehide` 和 `pageshow`；同时避免无意中破坏 BFCache，并在恢复后重新校验过期的连接或数据。

## 相关专题

- [平台基础与事件循环](/parts/fundamentals/)
- [文档与界面](/parts/document/)
- [网络与数据传输](/parts/getData/)
- [后台与并发](/parts/workers/)
