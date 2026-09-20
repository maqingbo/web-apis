# 客户端存储

客户端存储并不是一个单一 API。选择方案时应同时考虑数据规模、查询方式、生命周期、是否需要在 Worker 中访问，以及是否参与网络请求。

## 能力对比

| 能力 | 适合场景 | 主要特点 |
| --- | --- | --- |
| Web Storage | 少量字符串配置 | 同步接口，会阻塞主线程 |
| IndexedDB | 结构化数据和较大数据集 | 异步、事务化、支持索引 |
| Cache Storage | Request/Response 缓存 | 常与 Service Worker 配合 |
| Cookie | 需要随 HTTP 请求发送的少量状态 | 容量小，受安全属性和同源规则约束 |

## 内容

- [Web Storage](/parts/storage/webStorage)
- [IndexedDB](/parts/storage/indexDB)
- [Cache Storage](/parts/storage/cache)

浏览器可能根据配额和存储压力清理数据。重要业务数据不能只依赖客户端副本，还应考虑持久化授权、版本迁移、异常恢复和服务端同步。
