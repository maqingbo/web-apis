# WebGL 使用指南

WebGL 是浏览器提供的 GPU 绘制接口。它可以把大量顶点、像素和图像数据交给显卡处理，因此适合动画、数据可视化、图像特效、粒子、三维模型和 CAD 等场景。

它和 Canvas 2D 的最大区别，不是“一个只能画二维、一个只能画三维”，而是抽象层次不同：Canvas 2D 提供了路径、矩形、文字等现成绘图命令；WebGL 更接近显卡，只提供顶点、纹理、着色器和绘制命令。圆形、文字、材质、光照、模型和相机，都需要由应用或上层库组织出来。

这带来两个结果：WebGL 能处理更大规模、更高频率的绘制，但学习成本也更高。本文不从接口列表开始，而是围绕“这些东西为什么存在、它解决什么问题、我什么时候需要它”逐步展开。示例以 WebGL 2 为主，文中的大部分设计思路同样适用于 WebGL 1。

## 先决定要不要用 WebGL

比较适合 WebGL 的情况：

- 同时绘制几千到几十万个点、粒子或实例；
- 图形需要持续变化，例如动画、模拟和实时数据展示；
- 需要三维空间、透视、深度遮挡或自定义光照；
- 需要对图片、视频或大量像素做并行处理；
- 需要自己决定数据如何批量上传、如何绘制以及如何使用 GPU 内存。

以下情况通常不必一开始就使用 WebGL：

- 图形数量不多，但文字、无障碍和 DOM 交互很重要；
- 需要的是少量图标、图表或简单的二维绘制；
- 团队更关心快速实现，而不是控制底层绘制过程。

这时 SVG 或 Canvas 2D 往往更合适。如果目标是尽快搭建常见三维场景，可以使用 [Three.js](/parts/draw/threejs)，它会替你组织场景、相机、材质、模型和渲染流程，但底层仍然受 WebGL 的性能和资源限制影响。

## WebGL 1 和 WebGL 2 怎么选

WebGL 1 建立在 OpenGL ES 2.0 之上，WebGL 2 建立在 OpenGL ES 3.0 之上。新项目一般优先 WebGL 2，因为它提供了更完整的现代 GPU 能力：

| 能力 | WebGL 1 | WebGL 2 |
| --- | --- | --- |
| 着色器语法 | GLSL ES 1.00 | GLSL ES 3.00 |
| VAO | 通常依赖扩展 | 原生支持 |
| 实例化绘制 | 通常依赖扩展 | 原生支持 |
| 3D 纹理、整数纹理 | 能力有限或依赖扩展 | 原生支持 |
| 多渲染目标 | 依赖扩展 | 支持度更好 |
| 采样器对象、Uniform Buffer | 不支持 | 支持 |

不要把“支持 WebGL 2”理解成“所有 GPU 特性都相同”。浮点纹理、纹理压缩格式、最大纹理尺寸和 MSAA 等能力仍然需要查询：

```js
const gl = canvas.getContext('webgl2')

if (!gl) {
  // 可以降级到 WebGL 1、Canvas 2D，或显示不支持提示
  throw new Error('当前环境不支持 WebGL 2')
}

console.log({
  maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
  maxTextureUnits: gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS),
  maxVertexAttributes: gl.getParameter(gl.MAX_VERTEX_ATTRIBS)
})
```

如果必须兼容 WebGL 1，不只是把 `webgl2` 改成 `webgl`。两代着色器声明、输入输出语法、VAO 和实例化接口都可能需要不同实现，最好在初始化阶段明确能力分支。

## 创建上下文时的参数

```js
const canvas = document.querySelector('canvas')
const gl = canvas.getContext('webgl2', {
  alpha: true,
  antialias: true,
  depth: true,
  stencil: false,
  premultipliedAlpha: true,
  preserveDrawingBuffer: false,
  powerPreference: 'high-performance'
})
```

这些参数不是装饰项，而是在创建绘制环境时做出的取舍：

| 参数 | 为什么存在 | 什么时候调整 |
| --- | --- | --- |
| `alpha` | 决定 Canvas 是否需要透明背景 | 要把 WebGL 内容叠在页面背景上时设为 `true`；始终不透明时可设为 `false` |
| `antialias` | 请求默认绘制缓冲区抗锯齿 | 需要平滑边缘且接受额外开销时开启；高性能粒子场景可关闭 |
| `depth` | 是否创建深度缓冲区 | 有前后遮挡的三维场景需要；纯二维且自己排序时可关闭 |
| `stencil` | 是否创建模板缓冲区 | 需要蒙版、局部裁剪、轮廓效果时开启 |
| `premultipliedAlpha` | 解释 Canvas 颜色与 Alpha 的存储方式 | 和页面合成、图片的预乘 Alpha 策略保持一致，避免透明边缘发黑或发白 |
| `preserveDrawingBuffer` | 绘制后是否保留默认帧缓冲内容 | 需要在绘制后立即截图时才考虑开启；长期开启可能增加开销 |
| `powerPreference` | 向浏览器表达功耗偏好 | 重视性能可请求 `high-performance`，电池设备可考虑 `low-power` |
| `failIfMajorPerformanceCaveat` | 是否在明显使用软件渲染时直接失败 | 对性能要求很高、宁可降级也不接受慢速环境时使用 |

浏览器可能不完全接受这些请求。创建完成后查看实际设置：

```js
console.log(gl.getContextAttributes())
```

多数应用不需要开启 `preserveDrawingBuffer`。如果只是导出当前画面，更推荐在绘制完成后立即调用 `canvas.toBlob()`，或把场景绘制到自己的离屏纹理。

## 先画出一个三角形

页面只需要一块 Canvas：

```html
<canvas id="output"></canvas>

<style>
  #output {
    display: block;
    width: 100%;
    height: 320px;
  }
</style>
```

Canvas 的 CSS 尺寸和内部绘制尺寸是两回事。CSS 只决定显示多大，`canvas.width` 和 `canvas.height` 决定真正参与绘制的像素数量。只设置 CSS 尺寸会拉伸默认的 `300 × 150` 缓冲区，导致模糊。

```js
function resizeCanvas(canvas, gl) {
  const dpr = Math.min(window.devicePixelRatio, 2)
  const width = Math.round(canvas.clientWidth * dpr)
  const height = Math.round(canvas.clientHeight * dpr)

  if (canvas.width === width && canvas.height === height) {
    return false
  }

  canvas.width = width
  canvas.height = height
  gl.viewport(0, 0, width, height)
  return true
}

const canvas = document.querySelector('#output')
const gl = canvas.getContext('webgl2')
resizeCanvas(canvas, gl)
```

### viewport 和 scissor

`gl.viewport(x, y, width, height)` 指定 WebGL 的结果写入绘制缓冲区的哪一块区域。它默认不会自动跟随 Canvas 尺寸变化，所以改变 `canvas.width` 或 `canvas.height` 后必须重新设置。

它不只是用于全屏绘制。需要分屏、小窗口、画中画时，可以先设置一个区域，绘制一台相机的结果，再设置另一个区域绘制另一台相机的结果。

`viewport()` 负责坐标映射到哪块区域；`scissor()` 负责限制实际允许写入的矩形区域。只更新画面的一小块区域时，可以开启 `SCISSOR_TEST`：

```js
gl.enable(gl.SCISSOR_TEST)
gl.scissor(0, 0, 320, 180)
gl.clearColor(0, 0, 0, 1)
gl.clear(gl.COLOR_BUFFER_BIT)
gl.disable(gl.SCISSOR_TEST)
```

如果只是普通的矩形裁剪，`scissor()` 比 Stencil 更简单；如果是任意形状的遮罩，才需要考虑 Stencil。

## 着色器：为什么要写两段代码

WebGL 的绘制过程至少需要两类着色器：

- **顶点着色器**：决定每个顶点最后出现在哪里；
- **片元着色器**：决定图形覆盖的每个像素使用什么颜色。

这样拆开，是因为同一套顶点数据可以用不同方式着色，同一套颜色算法也可以应用到不同几何体。它还允许 GPU 并行处理大量顶点和像素。

```js
const vertexSource = `#version 300 es
layout(location = 0) in vec2 a_position;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`

const fragmentSource = `#version 300 es
precision highp float;

out vec4 outColor;

void main() {
  outColor = vec4(0.12, 0.56, 0.86, 1.0);
}
`
```

顶点着色器会对每个顶点运行一次，把位置写入 `gl_Position`。片元着色器会为图形覆盖到的像素计算颜色。这里暂时不做变换，让所有像素使用同一种蓝色。

`#version 300 es` 表示这是 WebGL 2 的 GLSL ES 3.00 语法。WebGL 1 使用不同的声明和变量写法，不能直接复用这段源码。

### 编译和链接

着色器需要先编译，再链接成 `WebGLProgram`。Program 可以理解为一次绘制要使用的一套“顶点处理规则 + 像素处理规则”。

```js
function createShader(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader)
    gl.deleteShader(shader)
    throw new Error(message || '着色器编译失败')
  }

  return shader
}

function createProgram(gl, vertexSource, fragmentSource) {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource)
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource)
  const program = gl.createProgram()

  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)
  gl.deleteShader(vertexShader)
  gl.deleteShader(fragmentShader)

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const message = gl.getProgramInfoLog(program)
    gl.deleteProgram(program)
    throw new Error(message || '着色器程序链接失败')
  }

  return program
}
```

着色器通常在初始化时编译和缓存，不要在每一帧创建。开发阶段要保留 `getShaderInfoLog()` 和 `getProgramInfoLog()`，否则一个拼写错误就可能只表现为“画布空白”。

## Buffer：把数据交给 GPU

JavaScript 数组在 CPU 内存中，GPU 不能直接高效地使用它。WebGLBuffer 是 GPU 侧的一块数据空间，常见用途包括：

- 顶点位置；
- 顶点颜色；
- 法线和纹理坐标；
- 索引；
- 实例的位置、尺寸或颜色。

```js
const positions = new Float32Array([
  0, 0.75,
  -0.75, -0.65,
  0.75, -0.65
])

const positionBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)
```

### bufferData 的使用提示

最后一个参数是使用提示，不是强制命令。它帮助浏览器判断数据的更新特点：

| 参数 | 含义 | 适合场景 |
| --- | --- | --- |
| `STATIC_DRAW` | 数据上传后很少改变 | 静态模型、背景几何、固定图表 |
| `DYNAMIC_DRAW` | 数据会反复改变 | 动画顶点、实时数据、可编辑图形 |
| `STREAM_DRAW` | 数据上传后很快只使用一次 | 每帧都完全替换的一次性数据 |

如果只更新 Buffer 的一小段，可以使用 `bufferSubData()`，避免每次重新分配全部空间：

```js
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
gl.bufferSubData(gl.ARRAY_BUFFER, 0, nextPositions)
```

### Attribute：每个顶点的输入

顶点着色器中的 `in` 变量通过 Attribute 接收每个顶点的数据。`vertexAttribPointer()` 说明 GPU 如何解读 Buffer 中的数字：

```js
const vao = gl.createVertexArray()
gl.bindVertexArray(vao)
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

gl.enableVertexAttribArray(0)
gl.vertexAttribPointer(
  0,       // location
  2,       // 每个顶点有两个数字
  gl.FLOAT,
  false,
  0,       // 0 表示数据紧密排列
  0
)

gl.bindVertexArray(null)
```

这里的 `0` 要和着色器的 `layout(location = 0)` 对应。使用 `getAttribLocation()` 也可以动态获取位置，但显式 location 更容易阅读和维护。

如果一个顶点同时有位置和颜色，可以交错存储，也可以分开存储。交错数据需要设置 stride 和 offset：

```text
每个顶点：x, y, r, g, b
位置：stride = 5 * 4，offset = 0
颜色：stride = 5 * 4，offset = 2 * 4
```

### ARRAY_BUFFER 和 ELEMENT_ARRAY_BUFFER

- `ARRAY_BUFFER` 通常存储顶点属性；
- `ELEMENT_ARRAY_BUFFER` 存储索引，用于告诉 WebGL 按什么顺序复用顶点。

例如一个矩形只需要四个顶点，但可以用六个索引组成两个三角形。顶点很多且共享关系明显时，索引可以减少数据量；顶点很少或数据需要频繁整体更新时，直接绘制可能更简单。

## VAO：为什么要单独保存布局

`WebGLVertexArrayObject` 会记住一组 Attribute 的启用状态、读取方式以及相关 Buffer 关系。它解决的是“每次绘制前重新绑定一堆顶点输入”的问题。

典型做法是：每种顶点格式创建一个 VAO，初始化时配置一次，绘制时只绑定它：

```js
gl.bindVertexArray(vao)
gl.useProgram(program)
gl.drawArrays(gl.TRIANGLES, 0, 3)
gl.bindVertexArray(null)
```

如果使用 WebGL 1，需要通过 `OES_vertex_array_object` 扩展检查是否支持类似能力。WebGL 2 中 VAO 是核心功能。

## drawArrays、drawElements 和图元类型

WebGL 不理解“房子”“圆”“模型”这些业务对象，它只理解基本图元：

| 图元 | 用途 | 注意事项 |
| --- | --- | --- |
| `POINTS` | 粒子、散点 | 大小和形状通常在着色器中控制 |
| `LINES` | 独立线段 | 每两个顶点组成一条线 |
| `LINE_STRIP` | 连续折线 | 相邻顶点自动连接 |
| `LINE_LOOP` | 闭合轮廓 | 首尾自动连接 |
| `TRIANGLES` | 三角形网格、矩形和模型 | 最通用、最稳定 |
| `TRIANGLE_STRIP` | 连续共享边的三角形 | 数据紧凑，但组织方式更严格 |
| `TRIANGLE_FAN` | 扇形、简单多边形 | 复杂多边形不应盲目使用 |

```js
gl.drawArrays(gl.TRIANGLES, 0, 3)
gl.drawElements(gl.TRIANGLES, indexCount, gl.UNSIGNED_SHORT, 0)
```

复杂多边形通常需要先三角剖分。线宽、圆角和虚线等效果也不应完全依赖 `lineWidth`，因为不同设备对宽线支持不一致，实际项目经常把线段扩展成三角形来绘制。

## Uniform：一次绘制的公共参数

Attribute 适合“每个顶点不同”的数据，Uniform 适合“一次绘制中整体相同”的数据：

- 颜色和透明度；
- 模型、观察、投影矩阵；
- 时间、鼠标位置和画布尺寸；
- 纹理单元编号；
- 光源位置、方向和强度。

着色器中声明 Uniform：

```glsl
uniform mat4 u_matrix;
uniform vec4 u_color;

void main() {
  gl_Position = u_matrix * vec4(a_position, 0.0, 1.0);
}
```

JavaScript 中更新它：

```js
const matrixLocation = gl.getUniformLocation(program, 'u_matrix')
const colorLocation = gl.getUniformLocation(program, 'u_color')

gl.useProgram(program)
gl.uniformMatrix4fv(matrixLocation, false, matrix)
gl.uniform4f(colorLocation, 0.12, 0.56, 0.86, 1)
```

如果同一个 Program 会被反复使用，应缓存 Attribute 和 Uniform 的 location。每帧反复查询名称没有必要。

当许多 Program 需要共享相同的相机矩阵、光照参数时，WebGL 2 的 Uniform Buffer Object 可以把一组 Uniform 组织到一起。小项目使用普通 Uniform 更容易；只有参数数量多、Program 多或更新频繁时，才值得引入 UBO。

## 坐标、矩阵和“相机”

WebGL 没有内置的 Scene、Camera 或 Mesh。这些是 Three.js 等库提供的概念。直接使用 WebGL 时，应用需要自己管理顶点和矩阵。

一次常见的坐标转换是：

```text
模型空间 -> 世界空间 -> 观察空间 -> 裁剪空间 -> 屏幕空间
```

顶点着色器通常写成：

```glsl
gl_Position = projection * view * model * vec4(a_position, 1.0);
```

- **模型矩阵**：解决一个对象放在哪里、旋转多少、缩放多大；
- **观察矩阵**：模拟从哪里看、朝哪个方向看；
- **投影矩阵**：决定透视效果或正交效果；
- **viewport**：把最终的标准化坐标映射到 Canvas 像素。

### 透视和正交什么时候用

- **透视投影**：近处物体看起来更大，适合三维展示、第一人称视角和有远近关系的场景；
- **正交投影**：物体不会因为远近改变尺寸，适合 CAD、编辑器、二维图表、平面设计和需要精确对齐的界面。

视锥是相机能够看到的范围。近裁剪面和远裁剪面决定哪些内容被丢弃。近、远范围相差过大时，深度缓冲区可用精度会下降，可能出现表面闪烁。调整时应让近裁剪面尽量远一些，让远裁剪面尽量近一些。

## Varying：把顶点信息交给像素

顶点着色器和片元着色器之间需要传递数据时，使用 `out` 和 `in`：

```glsl
// 顶点着色器
out vec3 v_color;

void main() {
  v_color = a_color;
  gl_Position = vec4(a_position, 0.0, 1.0);
}

// 片元着色器
in vec3 v_color;
out vec4 outColor;

void main() {
  outColor = vec4(v_color, 1.0);
}
```

三角形内部的值会在顶点之间自动插值，所以一个顶点红、一个顶点绿、一个顶点蓝时，三角形内部会出现渐变。这正是颜色、纹理坐标、法线等数据从顶点走向像素的方式。

如果不希望插值，例如整数 ID 或某些离散数据，需要使用 `flat` 限定符。

## Texture：什么时候应该用纹理

纹理是 GPU 可以读取的图像或数据表。它不只用于“给模型贴照片”，还可以解决这些问题：

- 把图标、字形、照片集中放入一张图集，减少切换；
- 把上一阶段的绘制结果交给下一阶段处理；
- 存储高度、法线、粗糙度、查找表等非颜色数据；
- 用一张图片替代复杂的逐像素计算。

创建和上传一张图片纹理：

```js
const texture = gl.createTexture()
gl.bindTexture(gl.TEXTURE_2D, texture)
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
gl.texImage2D(
  gl.TEXTURE_2D,
  0,
  gl.RGBA,
  gl.RGBA,
  gl.UNSIGNED_BYTE,
  image
)
```

### 纹理过滤和边缘方式

| 参数 | 常见选项 | 什么时候用 |
| --- | --- | --- |
| 放大过滤 | `NEAREST`、`LINEAR` | 像素画或 ID 纹理用 `NEAREST`；普通图片用 `LINEAR` |
| 缩小过滤 | `NEAREST`、`LINEAR`、带 mipmap 的过滤 | 远处或缩小的纹理建议使用 mipmap，减少闪烁 |
| 横向环绕 | `REPEAT`、`MIRRORED_REPEAT`、`CLAMP_TO_EDGE` | 平铺材质用重复；图标和非平铺图片通常截到边缘 |
| 纵向环绕 | 同上 | 根据纹理坐标是否超出 `0` 到 `1` 决定 |

如果使用 `REPEAT` 或 mipmap，纹理尺寸和格式需要满足对应限制。非 2 的幂次纹理在 WebGL 2 中限制较少，但仍要根据过滤和环绕方式检查完整性。

### 纹理上传时的像素参数

以下像素存储参数经常解决“图片倒了、透明边缘不对、上传报错”等问题：

| 参数 | 作用 |
| --- | --- |
| `UNPACK_FLIP_Y_WEBGL` | 上传时翻转 y 轴，处理 DOM 图片坐标与纹理坐标方向差异 |
| `UNPACK_PREMULTIPLY_ALPHA_WEBGL` | 上传时把 RGB 乘以 Alpha，需和透明合成策略一致 |
| `UNPACK_ALIGNMENT` | 控制每行像素的字节对齐，非 4 字节对齐的像素数据需要特别设置 |
| `UNPACK_COLORSPACE_CONVERSION_WEBGL` | 控制部分 DOM 图像的颜色空间转换 |

例如上传非 4 字节对齐的单通道数据时：

```js
gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1)
```

只要数据来源、颜色空间或 Alpha 处理方式发生变化，就应明确设置这些参数，不要依赖另一个图层留下的状态。

### 颜色纹理和数据纹理

照片、图标等颜色纹理需要正确的 sRGB 处理；高度、法线、粗糙度、对象 ID 等数据纹理则应按数值读取，不能把它们当作颜色进行转换。WebGL 2 提供更多内部格式和整数采样方式，但具体格式仍需根据设备能力选择。

## Sampler：把采样规则和图片分开

着色器通过 sampler 读取纹理。WebGL 1 中，纹理对象和采样参数通常绑定在一起；WebGL 2 可以使用 WebGLSampler 单独保存过滤和环绕参数。

当同一张图片在不同绘制中需要不同过滤方式时，Sampler 很有用：例如一处需要清晰的像素边缘，另一处需要平滑缩放。只有少量纹理和固定采样规则时，直接设置 Texture 参数更简单。

## 深度测试：为什么远处的物体不会盖住近处物体

GPU 不会自动理解哪个物体在前面。开启深度测试后，每个像素会保存一个深度值，新片元只有在满足比较条件时才会覆盖旧片元：

```js
gl.enable(gl.DEPTH_TEST)
gl.depthFunc(gl.LESS)
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
```

相关状态的使用场景：

| 状态 | 解决的问题 | 常见用法 |
| --- | --- | --- |
| `DEPTH_TEST` | 处理前后遮挡 | 三维模型、粒子与几何体的深度关系 |
| `depthFunc()` | 决定新旧深度如何比较 | 通常使用 `LESS` 或 `LEQUAL` |
| `depthMask()` | 决定是否写入深度缓冲 | 绘制透明物体时经常关闭深度写入但保留深度测试 |
| `clearDepth()` | 设置清屏时的初始深度 | 多阶段或局部重绘前需要明确清理 |

透明物体需要特别小心：通常先绘制不透明物体，再按远到近绘制透明物体，并根据需要关闭 `depthMask`。仅仅开启深度测试不能自动解决透明排序。

## 背面剔除：为什么可以少画一半三角形

封闭模型的背面通常不可见。开启背面剔除后，GPU 会跳过朝向背面的三角形：

```js
gl.enable(gl.CULL_FACE)
gl.cullFace(gl.BACK)
gl.frontFace(gl.CCW)
```

这要求模型的顶点绕序一致。模型导入后出现“半边消失”，常见原因就是绕序、坐标系或 `frontFace` 设置不一致。双面薄片、纸张、草叶和某些粒子不适合直接剔除背面。

## Blend：透明、叠加和粒子效果

开启混合后，片元颜色会和已有颜色按照指定规则合成：

```js
gl.enable(gl.BLEND)
gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
```

这个组合适合普通非预乘 Alpha 图片。若资源使用预乘 Alpha，常见组合是：

```js
gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
```

混合不仅用于透明，还可以用于粒子发光、加色叠加、屏幕效果和多个图层合成。需要注意：

- 混合顺序通常会影响结果；
- 透明对象一般不能像不透明对象一样随意排序；
- 透明覆盖面积很大时，片元成本会显著增加；
- `blendFuncSeparate()` 和 `blendEquationSeparate()` 可以分别控制颜色与 Alpha 的合成方式。

## Stencil：什么时候需要模板缓冲

Stencil 是每个像素旁边的一小块整数标记。它适合解决“只在某个形状内绘制”“只绘制轮廓”“局部遮罩”等问题。

一个常见流程是：先把遮罩形状写入 stencil，再绘制时只允许 stencil 值符合条件的像素通过：

```js
gl.enable(gl.STENCIL_TEST)
gl.stencilFunc(gl.EQUAL, 1, 0xff)
gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP)
```

如果只是普通矩形裁剪，`scissor()` 更简单；如果是任意形状、孔洞或复杂局部遮罩，Stencil 才更有价值。

## polygonOffset：解决表面闪烁

两个几乎重合的表面会争夺同一个深度值，产生 z-fighting。常见例子是模型表面叠加一层线框、选中高亮或贴花。可以让其中一层的深度值略微偏移：

```js
gl.enable(gl.POLYGON_OFFSET_FILL)
gl.polygonOffset(-1, -1)
```

偏移量不是万能修复。更可靠的方式是避免重合几何体，或调整近远裁剪面来改善深度精度。使用负偏移前要通过实际场景测试，因为过大的偏移可能造成新的遮挡错误。

## Framebuffer：不直接画到屏幕

默认情况下，绘制结果进入 Canvas 的默认帧缓冲区。如果想把结果留给下一步使用，就需要自己创建 WebGLFramebuffer，并把纹理或 Renderbuffer 接到它上面。

离屏绘制可以解决：

- 阴影和反射；
- 对象 ID 读取；
- 先渲染再做模糊、边缘检测等后期处理；
- 多阶段合成；
- 生成可复用的中间图像。

一个帧缓冲区通常包含颜色附件，三维场景还需要深度附件。创建后要检查完整性：

```js
const framebuffer = gl.createFramebuffer()
gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer)

const colorTexture = gl.createTexture()
gl.bindTexture(gl.TEXTURE_2D, colorTexture)
gl.texImage2D(
  gl.TEXTURE_2D,
  0,
  gl.RGBA8,
  width,
  height,
  0,
  gl.RGBA,
  gl.UNSIGNED_BYTE,
  null
)
gl.framebufferTexture2D(
  gl.FRAMEBUFFER,
  gl.COLOR_ATTACHMENT0,
  gl.TEXTURE_2D,
  colorTexture,
  0
)

if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
  throw new Error('帧缓冲区不完整')
}
```

Renderbuffer 适合只需要被 GPU 使用、不需要在着色器中采样的深度、模板或多重采样附件。颜色纹理适合后续读取和处理。

## 渲染循环：每一帧该做什么

静态内容不需要一直重绘；动画内容才需要在每一帧更新数据并绘制：

```js
function render(time) {
  resizeCanvas(canvas, gl)

  gl.clearColor(0.96, 0.97, 0.98, 1)
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

  gl.useProgram(program)
  gl.bindVertexArray(vao)
  gl.uniform1f(timeLocation, time * 0.001)
  gl.drawArrays(gl.TRIANGLES, 0, vertexCount)

  requestAnimationFrame(render)
}

requestAnimationFrame(render)
```

如果内容只在用户操作或数据变化时改变，可以改为按需渲染：状态变化时调用一次 `render()`，空闲时停止循环。这能减少 CPU 唤醒、GPU 使用和电量消耗。

`requestAnimationFrame()` 的时间参数用于计算动画进度，不要假设每帧固定经过 16 毫秒。复杂动画还应处理页面进入后台后的时间跳跃。

## 从 Three.js 的概念回到底层 WebGL

如果你之前接触过 Three.js，可以用下面的对应关系理解直接使用 WebGL 时缺少了什么：

| Three.js 概念 | Three.js 帮你做的事 | WebGL 中需要自己处理什么 |
| --- | --- | --- |
| `Scene` | 管理对象层级和遍历 | 自己维护对象列表、绘制顺序和可见性 |
| `Camera` | 生成观察、投影矩阵 | 自己选择投影并计算矩阵 |
| `Mesh` | 组合几何体与材质 | 自己绑定 VAO、Buffer 和 Program |
| `BufferGeometry` | 管理顶点属性和索引 | 自己设计顶点格式并上传数据 |
| `Material` | 提供着色器和渲染参数 | 自己编写 GLSL、设置 Uniform 和状态 |
| `Light` | 计算光照参数或生成光照结构 | 自己把光源信息传给着色器并实现光照 |
| `WebGLRenderer` | 管理状态、排序和绘制 | 自己组织每次 draw call |
| `OrbitControls` | 处理指针并更新相机 | 自己监听事件、计算旋转和平移 |

### 为什么 WebGL 没有内置 Light

光照不是一种固定的硬件绘制命令，而是一套可以有很多实现的数学模型。Lambert、Phong、PBR、卡通和自定义光照都需要不同的输入和计算，因此 WebGL 只提供着色器能力，不规定“灯光应该是什么”。

一个简单的漫反射模型可能使用：

```glsl
float diffuse = max(dot(normal, lightDirection), 0.0);
vec3 color = baseColor * diffuse;
```

需要灯光时，应用把位置、方向、颜色和强度作为 Uniform 传入。没有灯光并不意味着一定黑屏：如果片元着色器直接输出颜色，或者使用自发光、纯色、纹理采样，就不需要 Light。

### 为什么 WebGL 没有内置 Mesh

Mesh 是业务层的组合概念：几何数据描述“形状”，材质描述“怎么画”。在 WebGL 中，几何数据对应 Buffer/VAO，材质通常对应 Program、Texture 和一组状态。把两者组合成对象、管理对象层级和决定绘制顺序，都属于应用或渲染库的职责。

## 粒子、点云和实例化

`POINTS` 适合粒子和点云，但点的形状受到实现限制。需要圆形、软边、图标或始终面向相机的点时，常见做法是用一个小四边形，再在片元着色器中裁剪或采样纹理。

当许多对象共享同一个几何体和 Program，只是位置、颜色、旋转或尺寸不同，可以使用实例化：

```js
gl.drawElementsInstanced(
  gl.TRIANGLES,
  indexCount,
  gl.UNSIGNED_SHORT,
  0,
  instanceCount
)
```

实例化解决的是“不要为每个相似对象单独发一次绘制命令”。它最适合大量重复形状，不适合每个对象材质和顶点结构都完全不同的情况。

## 常见问题排查

### 画布空白

按这个顺序检查，通常比盲目修改着色器更快：

1. 上下文是否创建成功；
2. Canvas 内部宽高是否大于 0；
3. viewport 是否跟随尺寸更新；
4. 着色器是否编译、Program 是否链接成功；
5. Program、VAO 和 Buffer 是否在绘制前绑定；
6. Attribute location、stride、offset 和顶点数量是否匹配；
7. 顶点是否落在可见范围；
8. 深度、剔除、Stencil 或混合状态是否把结果过滤掉。

开发阶段可以在关键步骤调用：

```js
const error = gl.getError()
```

但不要在每一帧、每个调用后都调用它。频繁检查会增加开销，也会让真正的状态管理问题更难发现。

### 透明边缘发黑或发白

先确认图片是否预乘 Alpha，再让 `premultipliedAlpha`、`UNPACK_PREMULTIPLY_ALPHA_WEBGL` 和 `blendFunc()` 的选择保持一致。混用预乘和非预乘策略，是透明边缘出现光晕的常见原因。

### 图像上下颠倒

DOM 图片和纹理坐标的 y 轴方向可能相反。统一使用 `UNPACK_FLIP_Y_WEBGL` 或统一调整纹理坐标即可，不要让不同资源各自采用一套规则。

### 三维表面闪烁

先检查是否有重合表面，再检查近裁剪面、远裁剪面和深度格式。最后才考虑 `polygonOffset`。如果只是叠加线框或高亮层，可以使用轻微深度偏移，但不能把它当作所有深度问题的通用修复。

### 纹理是黑色或不完整

检查纹理是否加载完成、尺寸和格式是否匹配、纹理参数是否允许当前尺寸、跨域响应是否正确，以及 Framebuffer 是否通过 `checkFramebufferStatus()` 检查。纹理上传错误经常不是着色器本身的问题。

## 性能：先找瓶颈，再选参数

WebGL 的瓶颈可能在 JavaScript、绘制调用数量、顶点处理、片元填充、纹理上传或 GPU 内存。减少顶点不一定能解决过多的状态切换，降低分辨率也不一定能解决 Program 切换过多。

通常按以下顺序判断：

1. **绘制调用太多**：合并相同 Program、纹理和状态的数据，或使用实例化；
2. **状态切换太多**：按 Program、Texture、Blend 和深度状态排序；
3. **数据上传太多**：复用 Buffer，使用 `bufferSubData()` 更新变化部分；
4. **顶点处理太重**：减少不可见对象、简化几何体、使用更合适的属性格式；
5. **片元处理太重**：减少过度绘制，简化片元着色器，控制透明区域；
6. **像素太多**：限制 DPR，降低离屏缓冲区尺寸；
7. **同步等待太多**：谨慎使用 `readPixels()`、频繁查询状态和大范围 CPU/GPU 数据往返。

### 这些参数不是越高越好

- `antialias` 能改善边缘，但会增加默认帧缓冲成本；
- `devicePixelRatio` 越高越清晰，但片元数量按面积增长；
- 纹理过滤越平滑不一定越适合像素画和 ID 纹理；
- 近裁剪面过近、远裁剪面过远，会牺牲深度精度；
- 开启透明混合后，覆盖区域越大，片元成本越高；
- `preserveDrawingBuffer` 方便截图，但不应无理由长期开启。

实际项目应该使用浏览器性能面板和 GPU 调试工具测量，而不是只根据对象数量猜测。

## 跨域和安全限制

上传跨域图片、视频或 Canvas 作为纹理时，资源服务器需要返回允许当前页面访问的 CORS 响应头。加载图片时应在发起请求前设置：

```js
const image = new Image()
image.crossOrigin = 'anonymous'
image.src = imageUrl
```

如果资源没有正确的 CORS 配置，纹理上传、像素读取和 Canvas 导出可能失败。不要试图用前端代码绕过服务器的跨域策略。

## 上下文丢失和资源释放

GPU 重置、设备切换、驱动问题或资源压力都可能导致 WebGL 上下文丢失。上下文丢失后，之前创建的 Program、Buffer、Texture 和 Framebuffer 都不能继续使用。

```js
canvas.addEventListener('webglcontextlost', (event) => {
  event.preventDefault()
  stopRendering()
})

canvas.addEventListener('webglcontextrestored', () => {
  initializePrograms()
  initializeBuffers()
  initializeTextures()
  requestRender()
})
```

因此，CPU 侧要保留必要的源数据，或者能够重新请求资源。初始化函数应该可以安全地完整执行多次，而不是只在页面首次加载时有效。

确定资源不再使用时，显式释放 GPU 对象：

```js
gl.deleteBuffer(buffer)
gl.deleteTexture(texture)
gl.deleteFramebuffer(framebuffer)
gl.deleteRenderbuffer(renderbuffer)
gl.deleteVertexArray(vao)
gl.deleteProgram(program)
```

从 JavaScript 变量中删除引用，不代表 GPU 内存会立刻释放。单页应用反复创建和销毁渲染组件时，资源释放尤其重要。

## OffscreenCanvas：什么时候放到 Worker

如果绘制和数据计算已经明显阻塞主线程，可以把 Canvas 转移为 OffscreenCanvas，在 Worker 中创建 WebGL 上下文。它适合：

- 主线程需要维持复杂交互；
- 数据解析、模拟和绘制都比较重；
- 绘制区域不依赖大量 DOM 操作。

它不会自动让 GPU 绘制更快，也不能消除数据传输成本。事件、尺寸变化、资源加载和错误处理都需要通过消息协议设计。相关内容参见 [OffscreenCanvas](/parts/draw/offscreenCanvas)。

## WebGL、Three.js 和 WebGPU

- 需要掌控 Buffer、Texture、着色器、绘制顺序和显存布局时，使用 WebGL；
- 需要场景图、相机、材质、模型加载和控制器时，使用 [Three.js](/parts/draw/threejs) 可以减少大量基础代码；
- 需要计算着色器和更现代的 GPU 资源模型，并且能接受新的兼容性要求时，研究 [WebGPU](/parts/draw/webGPU)；
- 重点是文字、DOM 交互和少量二维图形时，优先考虑 SVG 或 Canvas 2D。

Three.js 不是 WebGL 的“升级版”，WebGPU 也不是 WebGL 的简单替换。它们解决的问题和抽象层次不同，应根据数据规模、交互方式、兼容性和团队经验选择。

## 推荐的学习顺序

1. 创建上下文，处理 Canvas 尺寸和 viewport；
2. 完成三角形，理解 Program、VAO、Buffer 和 Attribute；
3. 添加 Uniform 和矩阵，做出平移、缩放与旋转；
4. 添加颜色 Attribute 和 varying，理解顶点到像素的数据传递；
5. 加入 Texture，处理过滤、环绕、Alpha 和颜色空间；
6. 根据需要加入深度、背面剔除、Blend 和 Stencil；
7. 使用索引、实例化和批处理应对大量对象；
8. 再学习 Framebuffer、后期处理、粒子和自定义光照；
9. 最后补上性能测量、上下文恢复和资源释放。

每学一个对象，都可以问自己三个问题：它解决了什么问题？它会改变哪一部分渲染流程？如果不用它，最简单的替代方案是什么？这样比背接口名称更容易形成可迁移的理解。

## 参考

- [MDN：WebGL API](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API)
- [WebGL 2 Fundamentals](https://webgl2fundamentals.org/)
- [WebGL 2.0 Specification](https://registry.khronos.org/webgl/specs/latest/2.0/)
- [MDN：WebGL best practices](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices)
