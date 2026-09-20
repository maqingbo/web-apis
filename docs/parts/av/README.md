# 音频与视频

音视频能力可以分为媒体播放、实时采集、处理与录制几层。它们共享时间轴、轨道、编解码、设备权限和自动播放策略等概念。

## 主要能力

- `<audio>` 和 `<video>`：媒体加载、播放、轨道与时间控制。
- Media Capture and Streams：通过 `getUserMedia()` 获取摄像头、麦克风和屏幕轨道。
- MediaRecorder：把 MediaStream 录制为分段 Blob。
- Web Audio：构建音频处理节点图。
- Media Source Extensions：由 JavaScript 向媒体元素追加分段媒体数据。

媒体播放和设备访问经常要求用户激活、HTTPS 或显式授权。使用结束后应停止不再需要的 MediaStreamTrack，并释放相关对象 URL 和处理节点。

## 内容

- [Audio](/parts/av/audio)
- [Video](/parts/av/video)
- [实时通信](/parts/rtc/)
