---
title: 收集箱
---

# 早期 Web API 笔记

这个目录保留项目早期按单个知识点记录的内容。新的知识结构已经按能力领域整理，旧文章暂不移动，以免改变历史链接；后续完善时再逐步归入对应分类。

## API 与分类

| 领域 | 涉及的 API | 现有内容 | 新分类概览 |
| --- | --- | --- | --- |
| 浏览器全局对象 | `Window`、`Location`、`Navigator`、弹窗、窗口尺寸 | [BOM 与 Window](/parts/webApis/BOM) | [平台基础](/parts/fundamentals/) |
| 事件系统 | `EventTarget`、`Event`、事件传播、默认行为、事件委托 | [事件](/parts/webApis/event) | [平台基础](/parts/fundamentals/) |
| 文档对象模型 | `Document`、`Node`、`Element`、`DocumentFragment` | [DOM 基础笔记](/parts/webApis/DOM) | [文档与界面](/parts/document/) |
| 网络请求 | Ajax、`XMLHttpRequest`、Fetch API、`FormData` | [Ajax（待补充）](/parts/webApis/ajax)、[FormData（待补充）](/parts/webApis/FormData) | [网络与数据传输](/parts/getData/) |
| 客户端存储 | Web Storage、IndexedDB、Cache Storage、Cookie | [Storage（待补充）](/parts/webApis/storage) | [客户端存储](/parts/storage/) |
| 图形绘制 | Canvas、WebGL、着色器和 GPU 渲染 | [WebGL](/parts/webApis/WebGL) | [图形绘制](/parts/draw/) |
| 定时与调度 | `setTimeout()`、`setInterval()`、`requestAnimationFrame()` | 暂无独立专题 | [平台基础](/parts/fundamentals/) |

“收集箱”只承担旧内容索引，不再作为新的顶层分类。新增文章应优先放到对应能力目录，并在该目录的概览中登记涉及的 API。
