# 图形绘制

Web 平台提供从保留元素结构的 SVG、立即模式的 Canvas 2D，到直接使用 GPU 的 WebGL 和 WebGPU 等多层图形能力。选择时需要考虑交互模型、数据规模、可访问性、线程环境和性能要求。

下面的 API 地图表示本分类计划覆盖的知识范围，不代表每一项都已经有独立文章。

## API 地图

| 领域 | 主要接口与 API | 适合场景 |
| --- | --- | --- |
| 矢量图形 | SVG、SVG DOM、`SVGElement`、`SVGGeometryElement` | 图标、图表和需要独立 DOM 节点的矢量内容 |
| 二维绘制 | Canvas API、`HTMLCanvasElement`、`CanvasRenderingContext2D`、`Path2D` | 像素绘制、图像处理和高频二维场景 |
| 离屏绘制 | `OffscreenCanvas`、`ImageBitmap`、`createImageBitmap()` | 在 Worker 中绘制或高效传递图像资源 |
| 三维与 GPU 绘制 | WebGL、WebGL 2、`WebGLRenderingContext`、`WebGL2RenderingContext` | 基于 GPU 的二维或三维渲染 |
| 现代 GPU | WebGPU：`GPU`、`GPUAdapter`、`GPUDevice`、`GPUCanvasContext` | 现代 GPU 渲染和通用计算，支持度需确认 |
| CSS 绘制扩展 | CSS Painting API、`PaintWorklet` | 使用 Worklet 生成 CSS 图像，支持度有限 |
| 图像处理与解码 | `ImageData`、`ImageBitmap`、`createImageBitmap()`、WebCodecs `ImageDecoder` | 操作像素并解码图像资源 |
| 导出与捕获 | `toBlob()`、`toDataURL()`、`captureStream()` | 将画布导出为图片或媒体流 |

## 选择与边界

SVG 内容会形成 DOM 节点，便于样式、事件和无障碍处理；Canvas 中的绘制结果只是像素，需要自行维护对象模型、命中测试和可访问性。WebGL 与 WebGPU 更接近底层图形 API，还需要显式管理着色器、缓冲区、纹理及设备丢失等生命周期。

Three.js、PixiJS 等是构建在浏览器图形 API 之上的库，不属于 Web API 本身。

## 已有专题

- [Canvas](/parts/draw/canvas)
- [WebGL](/parts/webApis/WebGL)
- [二进制数据与图像类型](/parts/binary/)
- [后台与并发](/parts/workers/)
