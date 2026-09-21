# 图像数据与资源

图形 API 不只负责绘制，还需要加载、解码、转换和导出图片。选择正确的数据类型和传递方式，可以减少主线程阻塞、内存复制和重复解码。

## 主要 API

| 数据或阶段 | 接口与方法 | 作用 |
| --- | --- | --- |
| DOM 图片 | `HTMLImageElement`、`decode()`、`loading`、`crossOrigin` | 加载并解码普通图片资源 |
| 像素数据 | `ImageData`、`createImageData()`、`getImageData()`、`putImageData()` | 直接读写 RGBA 像素 |
| 可传递位图 | `ImageBitmap`、`createImageBitmap()` | 异步解码并在 Canvas、Worker 间高效传递图像 |
| 二进制来源 | Blob、ArrayBuffer、对象 URL | 表达网络、文件或内存中的图片数据 |
| Canvas 绘制 | `drawImage()`、`CanvasPattern` | 绘制图片、视频、Canvas 或 ImageBitmap |
| 导出 | `toBlob()`、`toDataURL()`、`OffscreenCanvas.convertToBlob()` | 将绘制结果编码为图片 |
| 底层解码 | WebCodecs `ImageDecoder`、`VideoFrame` | 控制图像解码流程，兼容性需要确认 |

## 地图场景

地图瓦片、图标精灵、热力图纹理和离屏图层都会经过图片加载与解码流程。需要关注缓存策略、并发请求、瓦片取消、缩放层级切换，以及图片解码是否阻塞主线程。

从跨源地址加载的图片如果没有正确的 CORS 响应，会污染 Canvas。被污染的画布仍可显示内容，但调用 `getImageData()`、`toBlob()` 或 `toDataURL()` 时会抛出安全异常。

## 学习重点

1. 图片下载、解码、上传 GPU 和实际绘制是不同阶段。
2. `ImageData` 是原始像素，`ImageBitmap` 更适合绘制和跨线程传递。
3. 对象 URL、ImageBitmap、VideoFrame 等资源使用完成后需要及时释放。
4. 处理高分屏图片时同时考虑逻辑尺寸、像素尺寸和内存占用。
