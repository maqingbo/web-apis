# Canvas 2D

Canvas 2D 是基于像素的立即模式绘图 API。JavaScript 向 `CanvasRenderingContext2D` 发出绘制命令，浏览器不会为画布中的图形保留独立 DOM 节点，因此交互状态、命中测试和重绘策略需要由应用维护。

## 主要 API

| 领域 | 接口与方法 |
| --- | --- |
| 画布与上下文 | `HTMLCanvasElement`、`getContext('2d')`、`CanvasRenderingContext2D` |
| 路径与形状 | `Path2D`、`beginPath()`、`moveTo()`、`lineTo()`、`arc()`、`fill()`、`stroke()` |
| 坐标变换 | `translate()`、`rotate()`、`scale()`、`transform()`、`DOMMatrix` |
| 文本 | `fillText()`、`strokeText()`、`measureText()`、`TextMetrics` |
| 图像 | `drawImage()`、`createPattern()`、`ImageData`、`getImageData()`、`putImageData()` |
| 状态管理 | `save()`、`restore()`、裁剪、合成、透明度、阴影和滤镜 |
| 导出与媒体 | `toBlob()`、`toDataURL()`、`captureStream()` |

## 地图场景

Canvas 2D 适合绘制数量中等、需要频繁更新的点、线、面、标签和栅格图层。实现时通常需要处理：

- 将地理坐标转换为屏幕坐标，并随平移和缩放重新计算。
- 按设备像素比调整画布尺寸，避免高分屏模糊。
- 维护要素索引和命中测试，因为画布不会保留图形对象。
- 对静态图层分层缓存，只重绘发生变化的区域或图层。
- 在数据量和计算量增大时评估 OffscreenCanvas、Worker 或 WebGL。

## 学习重点

1. 画布尺寸、CSS 尺寸和设备像素比的关系。
2. 绘图状态栈、路径生命周期和坐标变换矩阵。
3. 动画循环、清屏和分层重绘策略。
4. 图片跨源限制、tainted canvas 和导出失败处理。
5. 资源释放、内存占用和大量对象绘制的性能分析。
