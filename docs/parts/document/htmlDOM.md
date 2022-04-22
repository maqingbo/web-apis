DOM 模型不能满足 HTML 文档的需求，HTML DOM API 在 DOM 的基础上进行了拓展。

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

也就是新增了 HTMLDocument 对象，具体在以下几个方面：

- 支持在加载页面时访问 HTTP 标头提供的各种信息，例如加载文档的位置、cookie、修改日期、引用站点等。
- 允许获取 head 和 body 块中的元素
- 支持通过检查焦点和对可编辑内容执行命令来与用户交互。
- HTML 标准定义的文档事件的事件处理程序，允许访问鼠标和键盘事件、拖放、媒体控制等。
- 可以传递给元素和文档的事件的事件处理程序；这些目前仅包括复制、剪切和粘贴操作。

### 增强了 Element 对象

具体表现为新增了 HTMLElement 对象，这个对象上添加了 [GlobalEventHandlers（DOM 0 级事件处理程序）](https://maqingbo.github.io/fe-mindmap/parts/webApis/event.html#globaleventhandlers)，并且提供了所有 HTML 元素共有的功能。在这之后再为每种 html 标签新增单独的`HTML*Element`对象（几乎一一对应），来提供每种 HTML 元素独有的功能。


## 参考

- [Web APIs - MDN](https://developer.mozilla.org/en-US/docs/Web/API)