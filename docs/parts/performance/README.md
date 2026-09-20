# 性能与观察

性能 API 的目标不是给出一个笼统分数，而是提供统一时间轴和可观察事件，帮助定位加载、渲染、资源请求和长任务中的具体问题。

## 主要能力

- High Resolution Time：提供单调递增的高精度时间基准。
- Performance Timeline：统一组织导航、资源、绘制和用户自定义条目。
- `performance.mark()` / `performance.measure()`：记录业务阶段耗时。
- PerformanceObserver：异步订阅性能条目，避免反复轮询。
- Navigation Timing / Resource Timing：分析页面导航和资源加载。
- Long Tasks / Event Timing / Layout Instability：观察主线程阻塞、交互延迟和布局偏移。

MutationObserver、ResizeObserver 和 IntersectionObserver 也属于重要的观察能力，但它们观察的是 DOM、尺寸和可见性变化，不应当作通用性能计时器。

测量代码本身应尽量轻量，并注意条目缓冲区、跨源资源时间信息以及不同浏览器的支持范围。
