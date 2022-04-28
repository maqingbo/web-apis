XMLHttpRequest API 由 [WHATWG](https://xhr.spec.whatwg.org/) 维护，用于在客户端与服务端之间传递数据，包含以下三个接口：

- XMLHttpRequest
- FormData
- ProgressEvent

## XMLHttpRequest

## FormData

表单是一种网页组件，可以包含表单控件如文本，按钮，复选框，范围或颜色选择器控件。我么还可以使用表单将数据发送到服务器，发送数据的过程浏览器自动完成，不需要使用 JS。

[HTML API](https://html.spec.whatwg.org/#forms) 中定义了 `<form>` 元素和供 JS 操作的 HTMLFormElement 对象，[XMLHttpRequest API](https://xhr.spec.whatwg.org/#interface-formdata) 中则提供了 FormData 对象，让我们可以使用 XHR 将 form 中的数据发送到服务器。

### 表单元素 \<form\>

下面是一个示例，使用 form 发送数据，同样可以使用 `HTMLFormElement.submit()` 来提交表单

```html
<form action="xxx.com/subscribe" method="get">
  <div class="form-example">
    <label for="name">name: </label>
    <input type="text" name="name" id="name" required>
  </div>
  <div class="form-example">
    <label for="email">email: </label>
    <input type="email" name="email" id="email" required>
  </div>
  <div class="form-example">
    <input type="submit" value="Subscribe!">
  </div>
</form>
```

form 中控件还可以指定一些条件，浏览器在提交前会进行校验，校验通过，input 会匹配一个 `:valid` 伪类，反之匹配 `:invalid` 伪类。同样可以使用 `HTMLFormElement.checkValidity()` 来手动校验，返回一个布尔值。

form 元素的 novalidate 可以控制关闭浏览器的自动校验。

```html
<input minlength="6" maxlength="6">
<input type="number" min="1" max="10">
```

enctype 属性决定了向服务器发送数据时的编码格式，仅适用于 POST 方法。

- application/x-www-form-urlencoded: 初始的默认值。
- multipart/form-data:  混合模式，适用于使用 `<input>` 标签上传文件。
- text/plain: 纯文本格式，HTML5 引入的类型。

### FormData 对象

FormData 对象用来构建表示表单字段的键值对。

```js
// form 参数不传的话返回一个空对象
const form = document.getElementById('myForm')
const formData = new FormData(form)
console.log(formData) // FormData {}

formData.get('name') // "小明"
formData.set('name', '小红')
```

### 上传文件

通过表单上传文件一般有两种方法，但不管哪一种方法，表单部分都要符合以下几个条件：

- input 元素 type="file";
- form 元素 methods="POST";
- form 元素 enctype="multipart/form-data";

```html
<form method="post" enctype="multipart/form-data">
  <div>
    <label for="file">选择文件</label>
    <input type="file" id="file" name="myFile" multiple>
  </div>
  <div>
    <input type="submit" id="submit" name="submit_button" value="上传" />
  </div>
</form>
```

**第一种方法**：form 元素直接添加 action 属性，input 元素使用 accept 属性限制上传类型，点击提交按钮即可上传。

accept 属性接受两种类型的值：

- 以 STOP 字符 (U+002E) 开始的文件扩展名。（例如：".jpg,.png,.doc"）
- 一个有效的 MIME 类型，但没有扩展名。（audio/* 音频；video/* 视频；image/* 图片）

```html
<form method="post" enctype="multipart/form-data" accept=".jpg,.png" action="xxx.com">
  <div>
    <label for="file">选择文件</label>
    <input type="file" id="file" name="myFile" multiple>
  </div>
  <div>
    <input type="submit" id="submit" name="submit_button" value="上传" />
  </div>
</form>
```

**第二种方法**：通过 input 元素获取到 File 对象，使用 XHR/Fetch 直接发送 File；或者将 File 添加到 FormData 对象中，然后使用 XHR/Fetch 发送。

```js
// 获取 file
const fileElement = document.getElementById('file')
const files = fileElement.files

// file 添加到 formData
const formData = new FormData()
for (const i = 0; i < files.length; i++) {
  const file = files[i]
  // 只上传图片文件
  if (!file.type.match('image.*')) {
    console.log('只能上传图片文件！')
  }
  formData.append('images', file, file.name)
}

// 发送
const xhr = new XMLHttpRequest()
xhr.open('POST', 'upload.jsp', true)
xhr.onload = function () {
  if (xhr.status !== 200) {
    console.log('error')
  }
}
xhr.send(formData)
```

## ProgressEvent

## 参考

- [一文了解文件上传全过程](https://segmentfault.com/a/1190000037411957)