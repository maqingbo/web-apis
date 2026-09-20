# 客户端存储

客户端存储不是一个单一 API。选择方案时需要同时考虑数据规模、查询方式、事务要求、生命周期、线程可用性、清理策略，以及数据是否需要随网络请求发送。

下面的 API 地图表示本分类计划覆盖的知识范围，不代表每一项都已经有独立文章。

## API 地图

| 能力 | 主要接口与 API | 适合场景与特点 |
| --- | --- | --- |
| 键值存储 | Web Storage：`localStorage`、`sessionStorage`、`StorageEvent` | 少量字符串配置；同步接口会阻塞主线程 |
| 结构化数据库 | IndexedDB：`IDBFactory`、`IDBDatabase`、`IDBTransaction`、`IDBObjectStore`、`IDBIndex` | 较大规模结构化数据；异步、事务化并支持索引 |
| 请求响应缓存 | Cache API：`CacheStorage`、`Cache` | 存储 `Request`/`Response`，常与 Service Worker 配合 |
| HTTP 状态 | Cookie、`document.cookie`、Cookie Store API | 保存需要参与 HTTP 请求或服务端会话的少量状态 |
| 配额与持久化 | Storage API：`navigator.storage.estimate()`、`persist()`、`persisted()` | 查询配额和申请持久化存储 |
| 私有文件系统 | Origin Private File System、`navigator.storage.getDirectory()` | 在站点私有空间中读写文件，支持度需确认 |
| 第三方存储访问 | Storage Access API | 在嵌入场景中请求访问受限制的 Cookie 和存储 |

## 选择参考

| 需求 | 优先考虑 |
| --- | --- |
| 少量、可丢失的字符串配置 | Web Storage |
| 需要查询、索引或事务的数据 | IndexedDB |
| 离线保存网络响应 | Cache Storage |
| 必须随 HTTP 请求发送的状态 | Cookie |
| 大文件或接近文件系统的读写 | OPFS / File System API |

浏览器可能根据配额、隐私策略和存储压力清理数据。重要业务数据不能只依赖客户端副本，还应考虑持久化授权、版本迁移、异常恢复和服务端同步。

## 已有专题

- [Web Storage](/parts/storage/webStorage)
- [IndexedDB](/parts/storage/indexDB)
- [Cache Storage](/parts/storage/cache)
- [Service Worker](/parts/workers/)
