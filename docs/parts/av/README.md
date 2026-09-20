# 音频与视频

浏览器音视频能力可以分为播放、采集、处理、编解码、录制和输出控制。它们共享时间轴、媒体轨道、编解码格式、设备权限和自动播放策略等概念。

下面的 API 地图表示本分类计划覆盖的知识范围，不代表每一项都已经有独立文章。

## API 地图

| 领域 | 主要接口与 API | 作用 |
| --- | --- | --- |
| 媒体播放 | `HTMLMediaElement`、`HTMLAudioElement`、`HTMLVideoElement` | 加载、播放、暂停、定位和控制媒体元素 |
| 字幕与轨道 | `TextTrack`、`TextTrackList`、`VTTCue` | 管理字幕、章节和其他定时文本 |
| 设备采集 | Media Capture and Streams：`MediaDevices`、`MediaStream`、`MediaStreamTrack` | 通过 `getUserMedia()` 采集摄像头和麦克风 |
| 屏幕采集 | Screen Capture API：`getDisplayMedia()` | 获取屏幕、窗口或标签页的媒体轨道 |
| 媒体录制 | MediaStream Recording：`MediaRecorder` | 将媒体流录制为分段 Blob |
| 音频处理 | Web Audio API：`AudioContext`、`AudioNode`、`AudioWorklet` | 构建音频处理、分析、合成和输出节点图 |
| 流媒体播放 | Media Source Extensions：`MediaSource`、`SourceBuffer` | 由 JavaScript 向媒体元素追加分段媒体数据 |
| 内容保护 | Encrypted Media Extensions：`MediaKeys`、`MediaKeySession` | 与 DRM 系统协作播放受保护媒体 |
| 底层编解码 | WebCodecs：`VideoDecoder`、`VideoEncoder`、`AudioDecoder`、`AudioEncoder` | 直接访问音视频编解码帧 |
| 能力探测 | Media Capabilities API | 查询设备对编解码、流畅度和能耗的支持情况 |
| 播放模式 | Picture-in-Picture API、Remote Playback API | 进入画中画或选择远程播放设备 |
| 图像捕获 | Image Capture API | 从摄像头轨道读取照片和相机能力 |

## 生命周期与权限

媒体播放和设备访问经常要求用户激活、HTTPS 或显式授权。停止使用时应调用 `MediaStreamTrack.stop()`，断开不再需要的 AudioNode，并释放对象 URL 等资源。编解码格式还会受到浏览器、操作系统和硬件能力影响。

## 已有专题

- [Audio](/parts/av/audio)
- [Video](/parts/av/video)
- [实时通信](/parts/rtc/)
- [设备能力](/parts/device/)
