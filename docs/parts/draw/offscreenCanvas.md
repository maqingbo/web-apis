# OffscreenCanvas

OffscreenCanvas 把画布与 DOM 解耦，可以在主线程或 Worker 中使用 Canvas 2D、WebGL 等绘图上下文。它适合把计算和渲染工作移出页面主线程，但并不会自动解决数据组织、同步和性能问题。

## 主要 API

| 场景 | 接口与方法 |
| --- | --- |
| 创建离屏画布 | `new OffscreenCanvas(width, height)` |
| 转移现有画布 | `HTMLCanvasElement.transferControlToOffscreen()` |
| 获取上下文 | `getContext('2d')`、`getContext('webgl')`、`getContext('webgl2')` |
| 生成位图 | `transferToImageBitmap()` |
| 导出图片 | `convertToBlob()` |
| 跨线程通信 | Worker、`postMessage()`、transferable objects、`ImageBitmap` |

## 地图场景

地图应用可以在 Worker 中完成大量坐标转换、要素筛选、瓦片绘制或 WebGL 渲染，让主线程更专注于输入和界面更新。主线程仍需要把尺寸、设备像素比、视口状态和交互变化同步给 Worker。

## 使用边界

- 支持的上下文类型和方法可能因浏览器而异，需要进行能力检测。
- DOM、CSS 和大部分页面 API 不能在 Worker 中直接使用。
- 高频传递大型对象可能抵消离屏渲染收益，应优先转移 ArrayBuffer、ImageBitmap 等资源。
- 画布尺寸变化、Worker 终止、WebGL context lost 都需要恢复策略。
- 使用 OffscreenCanvas 前应先通过性能测量确认瓶颈确实位于主线程绘制或计算。
