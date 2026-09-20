# 二进制数据与文件

二进制相关 API 解决的是数据如何存放、解释、传输和持久化。理解不同类型是否拥有数据、是否只是视图以及能否流式处理，可以避免不必要的复制和内存占用。

## 核心类型

| 类型 | 作用 |
| --- | --- |
| `ArrayBuffer` | 一段固定长度的原始内存 |
| TypedArray | 按指定数值类型解释 ArrayBuffer |
| `DataView` | 按不同类型和字节序读写数据 |
| Blob | 带 MIME 类型的不可变二进制数据 |
| File | 带文件名和时间等元数据的 Blob |
| Streams | 分块处理数据，避免一次性加载全部内容 |

## 常见来源和去向

Fetch 响应、文件选择器、拖放、Canvas、MediaRecorder 和 IndexedDB 都可能产生或消费这些类型。对象 URL 可以临时把 Blob 暴露为 URL，使用结束后应通过 `URL.revokeObjectURL()` 释放。

- [收集箱](/parts/binary/inBox)
