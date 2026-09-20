# 文档与界面

浏览器解析 HTML 后会创建 DOM。JavaScript 通过 DOM、HTML、CSSOM 和各类界面 API 读取文档结构、修改内容、响应输入，并与浏览器的布局和渲染过程交互。

下面的 API 地图表示本分类计划覆盖的知识范围，不代表每一项都已经有独立文章。

## API 地图

| 主题 | 主要接口与 API | 作用 |
| --- | --- | --- |
| DOM 树 | `Document`、`Node`、`Element`、`DocumentFragment`、`ShadowRoot` | 表达和修改文档、元素及 Shadow DOM 树 |
| 查询与遍历 | `querySelector()`、`NodeIterator`、`TreeWalker`、`Range`、`Selection` | 查找、遍历和选择文档内容 |
| 变更观察 | `MutationObserver` | 异步观察节点、属性和文本变化 |
| HTML 元素 | `HTMLElement`、`HTMLFormElement`、`HTMLDialogElement`、各元素专用接口 | 暴露 HTML 元素的状态和行为 |
| 表单与校验 | Forms API、`HTMLFormElement`、`HTMLInputElement`、`FormData`、Constraint Validation API、`ValidityState` | 收集表单数据并执行浏览器原生约束校验 |
| 文档解析与序列化 | `DOMParser`、`XMLSerializer` | 在字符串与 HTML、XML 文档或节点之间转换 |
| 事件与输入 | `EventTarget`、UI Events、Pointer Events、Keyboard Events、Input Events | 处理鼠标、触摸、手写笔、键盘和编辑输入 |
| 拖放与剪贴板 | HTML Drag and Drop、`DataTransfer`、Clipboard API | 在页面内部或页面与系统之间交换内容 |
| 样式接口 | CSSOM、`CSSStyleSheet`、`CSSRule`、`getComputedStyle()`、`matchMedia()` | 读取和修改样式表，查询最终样式和媒体条件 |
| 尺寸与可见性 | `ResizeObserver`、`IntersectionObserver`、Page Visibility API | 观察元素尺寸、交叉状态和页面可见性 |
| 页面与窗口 | `Window`、`Location`、History API、Navigation API | 管理窗口、地址和会话历史 |
| 界面模式 | Fullscreen API、Pointer Lock API、Popover API、View Transition API | 控制全屏、指针、浮层和页面视觉过渡 |
| 动画 | Web Animations API：`Animation`、`KeyframeEffect`、`Element.animate()`、`Document.getAnimations()` | 使用 JavaScript 创建、控制和检查动画时间线 |
| Web Components | Custom Elements、Shadow DOM、`HTMLTemplateElement` | 创建封装且可复用的原生组件 |

## 规范关系

HTML 定义元素语义、解析算法和大量浏览器行为；DOM 定义节点树、事件和操作文档的基础接口；CSSOM 描述样式表及与 CSS 相关的对象模型。它们共同构成页面交互基础，但不是同一份规范。

修改 DOM 不代表浏览器会立即完成布局和绘制。连续读取布局信息并修改样式可能触发额外的样式计算和布局，需要结合渲染时机和性能工具判断实际开销。

`DOMParser` 和 `XMLSerializer` 处理的是文档字符串与 DOM 节点；普通 JavaScript 数据的复制使用结构化克隆，跨语言或持久化的数据交换通常使用 JSON。三者解决的问题不同。

## 已有专题

- [DOM Standard](/parts/document/DOM)
- [DOM 基础笔记](/parts/webApis/DOM)
- [HTML](/parts/document/html)
- [HTML DOM](/parts/document/htmlDOM)
- [事件](/parts/webApis/event)
- [BOM 与 Window](/parts/webApis/BOM)
