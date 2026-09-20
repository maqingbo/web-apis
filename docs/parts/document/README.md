# 文档与界面

浏览器解析 HTML 后会创建 DOM。DOM 是文档的内存模型和编程接口，JavaScript 可以通过它读取结构、修改内容、监听事件，并与布局和渲染过程发生联系。

## 内容

- [DOM](/parts/document/DOM)：DOM Standard 的组成、节点树、事件和 Mutation Observer。
- [HTML](/parts/document/html)：HTML 标准及文档解析相关概念。
- [HTML DOM](/parts/document/htmlDOM)：HTML 元素对 DOM 接口的扩展。
- [事件](/parts/webApis/event)：事件流、事件对象、默认行为和事件委托。

## 关系

HTML 定义元素语义、解析算法和大量浏览器行为；DOM 定义节点树、事件和操作文档的基础接口；CSSOM 则描述样式表和与 CSS 相关的对象模型。三者共同构成页面交互的基础，但不是同一份规范。

修改 DOM 不等于浏览器会立刻完成布局和绘制。连续读取布局信息并修改样式可能触发额外的样式计算和布局，应结合渲染时机与性能工具判断实际开销。
