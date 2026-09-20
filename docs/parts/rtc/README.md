# 实时通信

WebRTC 为浏览器提供实时音视频和点对点数据传输能力。它不只是一条连接，而是一组负责采集媒体、协商能力、穿越网络和传输数据的 API 与协议。

## 核心组成

- `MediaDevices` 和 MediaStreamTrack：获取并管理本地媒体轨道。
- `RTCPeerConnection`：协商并传输音视频。
- `RTCDataChannel`：传输任意应用数据。
- ICE、STUN 和 TURN：发现连接路径并在必要时中继流量。
- 信令服务：交换 SDP 和 ICE candidate，由应用自行实现。

WebRTC 不会替应用完成房间管理、身份认证或信令。生产环境通常还需要 TURN 服务、网络质量监控、权限处理和轨道生命周期管理。

- [WebRTC](/parts/rtc/webRTC)
