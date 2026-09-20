# 安全与权限

Web API 的可用性受到浏览器安全模型约束。接口存在并不表示当前页面一定有权调用，协议、来源、嵌入关系、响应头、用户授权和用户操作都会影响最终结果。

本分类同时包含可直接调用的 API 和约束其他 API 的平台安全机制。

## API 与机制地图

| 领域 | 主要接口、策略与机制 | 作用 |
| --- | --- | --- |
| 来源隔离 | 同源策略、CORS、Origin、site | 限制不同来源之间读取数据和操作对象 |
| 安全上下文 | Secure Contexts、Mixed Content | 将敏感能力限制在 HTTPS 等可信环境并阻止不安全资源 |
| 权限查询 | Permissions API：`navigator.permissions`、`PermissionStatus` | 查询部分受保护能力的授权状态和变化 |
| 嵌入权限 | Permissions Policy | 控制当前页面和 iframe 可以使用哪些能力 |
| 用户操作 | User Activation API、`navigator.userActivation` | 判断调用是否由近期真实用户操作触发 |
| 内容执行策略 | Content Security Policy、Subresource Integrity | 限制资源加载和脚本执行，校验外部资源完整性 |
| DOM 注入防护 | Trusted Types、`TrustedHTML`、`TrustedScriptURL` | 把危险 DOM 注入点限制为经过策略处理的值 |
| 跨上下文通信 | `postMessage()`、Channel Messaging、Broadcast Channel | 在窗口和 Worker 之间通信，需要验证来源和消息结构 |
| 密码学 | Web Crypto API：`crypto.getRandomValues()`、`SubtleCrypto` | 生成安全随机数并执行加密、签名、摘要和密钥操作 |
| 身份认证 | Credential Management API、Web Authentication API | 管理凭据并使用平台或外部认证器完成公钥认证 |
| 跨源隔离 | COOP、COEP、CORP、CORS | 隔离浏览上下文和资源，启用 SharedArrayBuffer 等能力 |
| 第三方存储 | Storage Access API、Cookie 属性 | 管理嵌入场景下受隐私策略限制的存储访问 |

## 使用原则

- 把权限拒绝、权限被撤销和接口不可用视为正常业务分支。
- 只在实际需要时申请权限，并向用户说明用途。
- 不要把 CORS 当作身份认证或服务端访问控制。
- 使用 `postMessage()` 时明确指定目标 origin，并验证消息的 `origin`、来源和结构。
- 密码学协议不能只靠正确调用 Web Crypto API，还需要经过验证的协议设计和密钥管理。
- 对剪贴板、媒体设备、文件和硬件能力采用最小权限原则。

## 相关专题

- [网络与数据传输](/parts/getData/)
- [客户端存储](/parts/storage/)
- [设备能力](/parts/device/)
- [后台与并发](/parts/workers/)
