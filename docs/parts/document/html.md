[HTML 规范](https://html.spec.whatwg.org/) 大致结构：

1. 概述
2. 公共基础设施
3. HTML 文档的语义，结构，与 API
4. HTML 元素
5. Microdata：微数据
6. User interaction：用户交互，foucs、Drag and drop 等
7. Web 页面相关
   - Browsing contexts：浏览上下文；
   - Window, WindowProxy, 和 Location 对象的安全基础设施
   - Window 对象
   - The WindowProxy exotic object
   - Origin：同源策略
   - Sandbox：沙箱
   - Cross-origin policies：跨域策略
   - history、navigation：浏览记录和导航
   - Offline web applications：离线应用，已被 service workers 代替；
8. Web 应用 API：介绍 html 中脚本的基本特性
   - script：脚本的运行机制，ES 文档有讲
   - WindowOrWorkerGlobalScope
   - base64 编解码：atob()、btoa() 方法
   - Dynamic markup insertion：动态标记插入，document.open()、close()
   - DOM parsing：字符串转 DOM 对象；[W3c](https://w3c.github.io/DOM-Parsing/#the-domparser-interface) 还规范了 DOM 对象转字符串。
   - Timers：setTimeout()、setInterval()
   - Microtask queuing：微任务队列
   - User prompts：对话框
   - System state and capabilities：宿主环境的一些功能
9. Communication：页面间的通信方式、事件对象等
   - MessageEvent 事件对象：server-sent events, cross-document messaging, channel messaging, broadcast channels, WebSockets 这几种通信方式都要用这个对象来处理 message 事件；
   - EventSource 对象：用于处理服务器推送事件，单项通信，客户端不需要发送数据到服务端；
   - WebSockets 对象：客户端与服务端的双向通信；
   - postMessage 方法：跨文档通信；
   - MessageChannel 对象：管道，用于页面间通信；
   - BroadcastChannel：一个简单的基于 MessageChannel 的广播机制；
10. Web workers：可以后台执行 script，不影响 DOM
11. Worklets：轻量级的 workers，只能应用于特定场景
12. Web storage：客户端存储，Storage 对象以及 sessionStorage、localStorage.
13. HTML 语法
14. XML 语法
15. 渲染

一共 15 项，其中涉及 DOM 的 3、4 两项在 HTML DOM 部分讲解。