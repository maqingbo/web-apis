## 简介

《JavaScript 高级程序设计》第四版将浏览器端 JavaScript 概括为 ECMAscript + DOM + BOM，而 MDN 网站现已将 JavaScript 概括为 ECMAScript + Web API，其中 DOM 属于 Web API 中的一员，而 BOM 则被打散在了 Web API 中。

> 但是，如果从浏览器的范畴去理解“JavaScript”这个术语，它包含了截然不同的两个方面。一方面是 JavaScript 的核心语言（ECMAScript），另一方面是大量的 Web API 们，包括 DOM（文档对象模型）。 —— JavaScript 技术概览 - MDN

应用程序接口（API，Application Programming Interface）是基于编程语言构建的结构，使开发人员更容易地创建复杂的功能。它们抽象了复杂的代码，并提供一些简单的接口规则直接使用。

就好比我们平时用电，是使用插头插座的方式，而不需要徒手接电线！

随着 Web 的不断发展，Web API 也越来越多：从操纵文档到本地存储，从音视频到实时通讯 ... 这么多的 API 虽然功能强大，但学习起来也同样让人头大😵。

本项目旨在捋清楚各 API 的发展历史、关联关系，提供一些简单的教程和常见的使用场景，算是我自己在学习体系上的查漏补缺。

## 简单了解 Web API

第一个要了解的是：Web API 首先都是一份规范，理论上可以用不同的语言来实现；使用 ECMAScript 语言实现之后就具有 ES 语言的特点，具体下来就是一个个的对象，带有不同的属性和方法，使用原型链继承，使用事件的处理方式等等。

MDN 页面介绍 API 时也是分了两大块：Specifications（规范）和 Interfaces（接口），我们平时使用的是**接口**。普遍情况下，一份规范对应多个接口，这样一个关系。

另外 API 也分种类，我们目前只讨论第一种**客户端 API**。

- 客户端 API：内置于浏览器的结构程序，位于 JavaScript 语言顶部，使您可以更容易的实现功能。
- 第三方 API：置于第三方普通的结构程序（例如 Twitter，Facebook），使您可以在自己的 Web 页面中使用那些平台的某些功能（例如在您的 Web 页面显示最新的 Tweets）。

## 规范分类

我们以 [W3C 官网](https://www.w3.org/TR/?tag=webapi) 为准，抓取到目前状态是 PR 和 REC 的 api，一共 35 个：

```js
{
  PR: [
    "geolocation api",
    "payment request api",
    "cooperative scheduling of background tasks"
  ],
  REC: [
    "web audio api",
    "web storage (second edition)",
    "server-sent events",
    "html5 web messaging",
    "webrtc 1.0: real-time communication between browsers",
    "json-ld 1.0 processing algorithms and api",
    "progress events",
    "web notifications",
    "webassembly javascript interface",
    "high resolution time",
    "high resolution time level 2",
    "pointer events",
    "user timing",
    "user timing level 2",
    "widget interface",
    "webdriver",
    "html media capture",
    "indexed database api 2.0",
    "encrypted media extensions",
    "web cryptography api",
    "webidl level 1",
    "media source extensions™",
    "geolocation api specification 2nd edition",
    "pointer lock",
    "vibration api (second edition)",
    "indexed database api",
    "metadata api for media resources 1.0",
    "performance timeline",
    "page visibility (second edition)",
    "touch events",
    "navigation timing"
  ]
}
```

## 参考

- [Web API 接口参考 - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API)