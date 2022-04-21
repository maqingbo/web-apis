Browser Object Model，浏览器对象模型，提供了独立于内容与浏览器窗口进行交互的对象。

```yaml
# Chrome 中 window 对象的继承关系

Window
alert: ƒ alert()
atob: ƒ atob()
blur: ƒ blur()
...
[[Prototype]]: Window
  PERSISTENT: 1
  TEMPORARY: 0
  constructor: ƒ Window()
  Symbol(Symbol.toStringTag): "Window"
  [[Prototype]]: WindowProperties
    Symbol(Symbol.toStringTag): "WindowProperties"
    [[Prototype]]: EventTarget
    addEventListener: ƒ addEventListener()
    dispatchEvent: ƒ dispatchEvent()
    ...
    [[Prototype]]: Object
      constructor: ƒ Object()
      hasOwnProperty: ƒ hasOwnProperty()
      ...
```

## window 对象

BOM 的核心是 window 对象，表示浏览器的实例。 

window 对象在浏览器中有两重身份，一个是 ECMAScript 中的 Global 对象，另一个就是浏览器窗口的 JavaScript 接口。

### 窗口大小

- 浏览器窗口自身的大小
  - innerWidth
  - innerHeight
  - outerWidth
  - outerHeight
- 页面视口的宽度和高度
  - document.documentElement.clientWidth
  - document.documentElement.clientHeight

### 弹窗

alert()、 confirm() 和 prompt()。

外观由操作系统或者浏览器决定，无法使用 CSS 设置。此外，这些对话框都是同步的模态对话框，即在它们显示的时候，代码会停止执行。

## location 对象

提供了当前窗口中加载文档的信息，以及通常的导航功能。这个对象独特的地方在于，它既是 window 的属性，也是 document 的属性。

location 对象不仅保存着当前加载文档的信息，也保存着把 URL 解析为离散片段后能够通过属性访问的信息。

### URL 解析

## navigator 对象

浏览器相关信息。

### 判断浏览器类型

## history 对象

history 对象表示当前窗口首次使用以来用户的导航历史记录。因为 history 是 window 的属性，所以每个 window 都有自己的 history 对象。

## screen 对象

浏览器窗口外面的客户端显示器的信息。
