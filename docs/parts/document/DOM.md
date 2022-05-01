## 概述

DOM 全称（文档对象模型，Document Object Model），定义了和平台无关的事件、节点树的模型等内容，它只是一种模型，DOM 规范是对这种模型的描述。它告诉我们该如何对文档进行访问和修改。这种模型适用于 HTML 和 XML 类型的文档。

DOM 模型用一个树结构来表示一个文档，树的每个分支的终点都是一个节点 (node)，每个节点都是包含属性和方法的对象 (objects)。DOM 的方法 (methods) 让你可以用特定方式操作这个树，用这些方法你可以改变文档的结构、样式或者内容。节点可以关联上事件处理器，一旦某一事件被触发了，那些事件处理器就会被执行。

前端平时常说的 DOM 对象其实是通过 JS 对 DOM 接口的一种实现，**DOM 对象就是 JS 对象，也是使用原型继承**。

DOM 曾经使用 Level 来命名，一直到 Level 3，标准文件维护在 [w3c 网站](https://www.w3.org/TR/?title=dom)。Level 4 时修改为 DOM Standard，维护在 [WHATWG 网站](https://dom.spec.whatwg.org/)。

![](../../images/DOM/DOM-Level.png)

## 现行标准

DOM Standard 大致内容如下：

1. Infrastructure：介绍了 DOM 标准中的一些基本概念和术语
   1. Trees
   2. Ordered sets
   3. Selectors
   4. Namespaces
2. Events（事件）
3. Aborting ongoing activities（终止正在进行的活动）
4. Nodes（节点）
5. Ranges（范围）
6. Traversal（遍历）
7. Sets（DOMTokenList）
8. XPath（XML 路径语言）
9.  XSLT（XSL 转换）
10. Historical（历史：废弃的接口）

### Infrastructure（基本概念）

**Trees**：

主要讲了树的定义、特征，以及节点的特征、节点间的关系。定义了后面几个章节使用到的一些名词。

- 所谓 tree 是一个有限层次的树形结构，遍历顺序为先序深度优先遍历；
- tree 中的节点都是对象，上有父节点 (parent)，下有子节点 (children)；
- 根节点 (root) 的 parent 是 null；
- 如果节点 A 是 B 的子节点 (child)，或者 C 是 B 的子节点 (child) 而 A 是 C 的子节点 (child)，那么称作 A 是 B 的后代元素 (descendant)；
- 当且仅当 A 是 B 的后代元素 (descendant) 时，节点 B 才称为节点 A 的祖先元素 (ancestor)；
- 当且仅当 A 与 B 拥有同一个不为 null 的父节点时，A、B 节点互称为兄弟节点 (sibling)；
- ......

**Ordered sets**：todo

**Selectors**：todo

**Namespaces**：todo

### Events（事件）

**介绍**：在 Web 中，事件的作用给对象 (object) 发送信号，通知对象某件事情（请求、交互等）的发生，对象通过 addEventListener 来接受这些信号，然后做对应的处理。

对应的具体接口 (interface)：

**Event**：事件对象。表示事件发生，对象本身提供了一些属性和方法，包含了事件本身的各种信息。

**CustomEvent**：自定义事件。继承自 Event 对象，可以创建自定义功能的事件。

```js
// 添加一个事件监听器
obj.addEventListener("cat", function(e) { process(e.detail) })

// 创建并分发事件
var event = new CustomEvent("cat", { "detail":{ "cute":true }})
obj.dispatchEvent(event)
```

### Aborting ongoing activities（终止正在进行的活动）
### Nodes（节点）
### Ranges（范围）
### Traversal（遍历）
### Sets（DOMTokenList）
### XPath（XML 路径语言）
### XSLT（XSL 转换）
### Historical（历史：废弃的接口）