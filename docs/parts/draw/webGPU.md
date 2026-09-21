# WebGPU

WebGPU 是面向现代 GPU 架构的 Web API，提供渲染和通用计算能力。与 WebGL 相比，它显式描述资源、管线和命令提交，更适合复杂渲染和大规模并行计算，但学习与工程成本也更高。

## 主要 API

| 阶段 | 接口与对象 | 作用 |
| --- | --- | --- |
| 入口与适配器 | `navigator.gpu`、`GPUAdapter` | 检测 WebGPU 并选择 GPU 适配器 |
| 设备 | `GPUDevice`、`GPUQueue` | 创建资源、管线并提交命令 |
| 画布配置 | `GPUCanvasContext`、`configure()` | 将 Canvas 与 GPU 设备和纹理格式连接 |
| 数据资源 | `GPUBuffer`、`GPUTexture`、`GPUSampler` | 保存顶点、索引、统一变量、图片和采样状态 |
| 着色器 | `GPUShaderModule`、WGSL | 编写顶点、片元和计算着色器 |
| 渲染管线 | `GPURenderPipeline`、bind group、pipeline layout | 描述固定渲染状态和着色器资源绑定 |
| 命令编码 | `GPUCommandEncoder`、`GPURenderPassEncoder`、`GPUComputePassEncoder` | 记录渲染或计算命令 |
| 错误与恢复 | error scope、`GPUDevice.lost`、uncaptured error | 处理验证错误、设备丢失和恢复 |

## 地图场景

WebGPU 适合海量点线面、复杂符号化、热力计算、地形、三维建筑和 GPU 端数据处理。它可以减少重复状态切换并更好地利用并行计算，但地图投影、瓦片管理、要素索引和拾取仍需应用或上层引擎实现。

## 使用边界

- 使用前检测 `navigator.gpu`，并准备 Canvas 2D 或 WebGL 降级路径。
- WebGPU 不是 WebGL 的语法升级，着色器语言、资源绑定和命令模型都不同。
- 资源不会由业务逻辑自动释放，应调用对象提供的 `destroy()` 并处理设备丢失。
- 不同设备的 limits 和 features 不同，不能把开发机能力当作最低基线。
- 对普通二维地图，成熟的 Canvas 或 WebGL 方案往往具有更好的兼容性和生态。
