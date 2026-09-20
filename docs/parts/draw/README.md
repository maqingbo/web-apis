# 图形绘制

Web 平台提供多层图形能力，从保留元素结构的 SVG，到立即模式的 Canvas 2D，再到底层 GPU API。选择时应考虑交互方式、数据规模、可访问性和性能要求。

| 能力 | 适合场景 |
| --- | --- |
| SVG | 图标、图表和需要独立 DOM 节点的矢量图形 |
| Canvas 2D | 像素绘制、图像处理和高频二维场景 |
| WebGL | 基于 GPU 的二维或三维渲染 |
| WebGPU | 现代 GPU 渲染和通用计算 |

Canvas 中绘制的内容不会形成可独立访问的 DOM 节点，需要自行处理命中测试、交互状态和可访问性。WebGL、WebGPU 还需要显式管理 GPU 资源及设备丢失等生命周期。

## 内容

- [Canvas](/parts/draw/canvas)
- [WebGL](/parts/webApis/WebGL)
