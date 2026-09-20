# 二进制数据与文件

二进制相关 API 解决数据如何存放、解释、编码、传输和持久化。理解某个类型是否拥有底层数据、是否只是视图、是否可转移，以及能否流式处理，可以避免不必要的复制和内存占用。

下面的 API 地图表示本分类计划覆盖的知识范围，不代表每一项都已经有独立文章。

## API 地图

| 主题 | 主要接口与 API | 作用 |
| --- | --- | --- |
| 原始内存 | `ArrayBuffer`、`SharedArrayBuffer`、Resizable ArrayBuffer | 保存固定或可调整长度的原始字节，共享内存还要求跨源隔离 |
| 数值视图 | TypedArray、`DataView` | 按数值类型、偏移量和字节序解释 ArrayBuffer |
| 文本编码 | `TextEncoder`、`TextDecoder`、`TextEncoderStream`、`TextDecoderStream` | 在字符串和 UTF-8 等字节表示之间转换 |
| Blob 数据 | `Blob`、对象 URL、`Blob.stream()` | 表达带 MIME 类型的不可变二进制数据 |
| 文件对象 | `File`、`FileList`、`FileReader` | 表达用户选择的文件及读取结果 |
| 文件选择 | `<input type="file">`、HTML Drag and Drop、File System Access API | 由用户选择、拖入或授权访问本地文件 |
| 流式处理 | Streams API、`CompressionStream`、`DecompressionStream` | 分块读写、转换、压缩和解压数据 |
| 图像数据 | `ImageData`、`ImageBitmap`、`createImageBitmap()` | 在 Canvas、Worker 和图像解码流程中传递像素数据 |
| 数据复制与转移 | `structuredClone()`、transferable objects | 复制复杂对象，或转移 ArrayBuffer 等资源的所有权 |

## 类型关系

- `ArrayBuffer` 持有字节，TypedArray 和 `DataView` 通常只是它上面的视图。
- `File` 继承自 Blob，因此可以用于接受 Blob 的 API。
- Blob、ArrayBuffer 和 Streams 经常作为 Fetch、Canvas、MediaRecorder、IndexedDB 等 API 之间的数据桥梁。
- 对象 URL 使用结束后应调用 `URL.revokeObjectURL()`，流和文件句柄也要按各自生命周期正确关闭。

## 已有专题

- [ArrayBuffer、编码、Blob 与 File 收集箱](/parts/binary/inBox)
- [网络与数据传输](/parts/getData/)
- [客户端存储](/parts/storage/)
