# SVG

SVG 使用 XML 元素描述矢量图形。每个图形通常都是 DOM 节点，可以使用 CSS、事件和无障碍属性，因此特别适合需要精确交互和结构语义的图标、图表及中小规模地图要素。

## 主要 API

| 领域 | 接口与属性 |
| --- | --- |
| 根视口 | `SVGSVGElement`、`viewBox`、`preserveAspectRatio` |
| 图形元素 | `<path>`、`<rect>`、`<circle>`、`<line>`、`<polyline>`、`<polygon>`、`<text>` |
| DOM 接口 | `SVGElement`、`SVGGraphicsElement`、`SVGGeometryElement`、`SVGPathElement` |
| 坐标与变换 | `transform`、`DOMMatrix`、`DOMPoint`、`getCTM()`、`getScreenCTM()` |
| 几何测量 | `getBBox()`、`getTotalLength()`、`getPointAtLength()`、`isPointInFill()` |
| 资源复用 | `<defs>`、`<symbol>`、`<use>`、渐变、图案、裁剪和遮罩 |
| 交互 | DOM Events、Pointer Events、`pointer-events` 属性 |

## 地图场景

SVG 适合行政区轮廓、交互式路径、少量标记和需要独立事件处理的标注。地理数据通常需要先经过投影，再转换成 SVG 路径数据。

当节点数量达到数千甚至更多时，DOM 创建、样式计算和事件处理成本会明显增加。此时可以把复杂底图交给 Canvas 或 WebGL，只保留少量高交互元素使用 SVG。

## 学习重点

1. `viewBox`、用户坐标系和 CSS 像素之间的关系。
2. 路径命令、填充规则、描边和坐标变换。
3. 地理投影与 GeoJSON 到 SVG path 的转换。
4. 事件委托、键盘操作和可访问性。
5. DOM 节点数量、分组复用和更新性能。
