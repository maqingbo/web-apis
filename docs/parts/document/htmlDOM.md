DOM 模型不能完全满足 HTML 文档的需求，所以 HTML DOM 在 DOM 的基础上进行了拓展。

HTML DOM 这个名称只在 MDN 上出现了，它属于 [HTML API](https://html.spec.whatwg.org/) 的一部分，关于 DOM 的那一部分。广义上的 HTML API 还包括 BOM、setTimeOut、alert 等，涉及的内容确实较多，把它们进行拆分是一个很好的方法，下面的简述中我们也会沿用这个名称。

HTML DOM API 包括以下几个方面：

1. 通过 DOM 访问和控制 HTML 元素
   - 增强了 Document 对象
   - 增强了 Element 对象
1. 访问和操作 form data
1. 增加了绘图上下文 canvas 
1. audio、video
1. 在网页上拖放内容
1. 访问浏览器导航历史
1. 其他 API 的支持和连接接口，例如 Web Components, Web Storage, Web Workers, WebSocket, Server-sent events.

最后一项中的每一项都有其对应的单独的 API，我们在此不做表述。其他的我们一个一个来。

## 通过 DOM 访问和控制 HTML 元素

我们都知道，DOM 规范，也就是文档对象模型描述了页面的架构，是用一个树结构来表示一个文档，树的每个分支的终点都是一个节点。在 DOM 规范中，整棵树叫 document，每个节点叫 element。

在 JS 中实现的 document 和 element 对象，继承关系如下：

```yaml
EventTarget
  Node # 基础节点类型
    Document # 整个文档用它的实例 document 表示
    Element # 节点
```

这个模型不仅仅适用于 html 文档，也适用于 XML、SVG 等文档。HTML 在此基础上进行一些拓展，具体的实现是新增了 HTMLDocument 对象，这个对象只能在 HTML 文档中使用。

继承关系变成了下面这样：

```yaml {4,6,7,8,9,10}
EventTarget
  Node # 基础节点类型
    Document
      HTMLDocument # 整个文档用它的实例 document 表示
    Element
      HTMLElement
        HTMLCanvasElement # 节点
        HTMLInputElement # 节点
        HTMLBodyElement # 节点
        ...
```

> XML、SVG 也在这个模型的基础上进行了拓展，具体的实现是 XMLDocument 对象。

### 增强了 Document 对象

也就是新增了 HTMLDocument HTMLDocument 的实例 document 来标识整个文档。一些文档层面的方法和属性挂载在这个对象上的原型对象上。具体在以下几个方面：

- 支持访问 HTTP header 中的一些信息，例如 location, cookie, lastModified, referrer 等。
- 允许获取 `<head>` 和 `<body>` 中的一些元素列表，例如：images, links, scripts，返回一个 HTMLCollection.
- 支持检查文档是否获取了焦点 (hasFocus).
- 新增了全局属性 contenteditable.
- 新增了事件处理程序，例如：鼠标和键盘事件、拖放、媒体控制等。混入了 GlobalEventHandlers 中的事件名称作为属性。
- 新增了一些 Document 和 Element 都可以使用的的事件处理程序，目前仅包括 copy、cut、paste.

### 增强了 Element 对象

具体表现为：

- 新增了 HTMLElement 对象，继承自 Element，这个对象上混入了 [GlobalEventHandlers](https://maqingbo.github.io/fe-mindmap/parts/webApis/event.html#globaleventhandlers) 中的所有事件名称作为属性，并且提供了所有 HTML 元素共有的一些功能。例如：accessKey、offsetLeft、style、title 等。
- 在这之后再为每种 html 标签新增单独的`HTML*Element`对象（几乎一一对应），继承自 HTMLElement，来提供每种 HTML 元素独有的功能，通过 JS 操作元素时返回的就是这个对象。

下面是一个例子，在 Chrome 控制台中打印的 ul 元素（略去了部分属性）。

```yaml
nodeName: "UL",
nodeType: 1,
nodeValue: null,
...
[[prototype]]: HTMLUListElement
  constructor: HTMLUListElement()
  ...
  # 特定的 ul 类型的节点
  [[Prototype]]: HTMLElement
    constructor: HTMLElement()
    blur: blur()
    click: click()
    focus: focus()
    innerText: ""
    ...
    # HTMLElement 构造函数的原型对象上挂载了很多 HTML 元素自有的属性和方法
    # 结合上图可知，这些属性和方法在 SVG 中是不可用的
    [[Prototype]]: Element
      constructor: Element()
      getElementsByClassName: getElementsByClassName()
      getElementsByTagName: getElementsByTagName()
      querySelector: querySelector()
      querySelectorAll: querySelectorAll()
      ...
      # Element 构造函数的原型对象上也挂载了很多共有的属性和方法，且在 SVG 中也是可用的
      [[Prototype]]: Node
        constructor: Node()
        nodeName: "UL"
        nodeType: 1
        appendChild: appendChild()
        ...
        # Node 类型是最基本的类型，有一些 DOM 节点最基本的共有属性和方法
        [[Prototype]]: EventTarget
          constructor: EventTarget()
          addEventListener: addEventListener()
          dispatchEvent: dispatchEvent()
          removeEventListener: removeEventListener()
          # EventTarget 对象用来处理事件，只挂载了这三个方法
          [[Prototype]]: Object
            constructor: Object()
            hasOwnProperty: hasOwnProperty()
            isPrototypeOf: isPrototypeOf()
            ...
```

## 参考

- [Web APIs - MDN](https://developer.mozilla.org/en-US/docs/Web/API)