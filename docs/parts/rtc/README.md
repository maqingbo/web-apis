# 实时通信

WebRTC 为浏览器提供实时音视频和点对点数据传输能力。它不是一条单独的连接，而是一组负责媒体轨道、能力协商、网络路径发现、加密传输和连接统计的 API 与协议。

下面的 API 地图表示本分类计划覆盖的知识范围，不代表每一项都已经有独立文章。

## API 地图

| 阶段 | 主要接口与 API | 作用 |
| --- | --- | --- |
| 本地媒体 | `MediaDevices`、`MediaStream`、`MediaStreamTrack` | 获取并管理摄像头、麦克风或屏幕轨道 |
| 对等连接 | `RTCPeerConnection` | 协调协商、网络连接和媒体或数据传输 |
| 会话描述 | `RTCSessionDescription`、`RTCIceCandidate` | 表达 SDP 描述和 ICE candidate |
| 媒体传输 | `RTCRtpSender`、`RTCRtpReceiver`、`RTCRtpTransceiver` | 控制音视频的发送、接收和方向 |
| 数据通道 | `RTCDataChannel` | 在对等连接中传输文本或二进制应用数据 |
| 统计与诊断 | `RTCPeerConnection.getStats()`、RTCStats | 观察码率、丢包、延迟、候选路径和编解码信息 |
| 身份与变换 | WebRTC Encoded Transform、Insertable Streams | 在编解码与传输之间处理编码帧，支持度需确认 |

## 浏览器之外的组成

- **信令服务**：交换 SDP 和 ICE candidate，由应用使用 WebSocket、HTTP 等自行实现。
- **STUN**：帮助端点发现公网地址和可用连接路径。
- **TURN**：无法建立直接路径时中继流量，生产环境通常不可缺少。
- **SFU / MCU**：多人会议中转发或混合媒体，不属于浏览器 Web API。

WebRTC 不会替应用完成房间管理、身份认证或信令。实际项目还需要处理权限、设备切换、轨道生命周期、网络质量变化和连接恢复。

## 已有专题

- [WebRTC](/parts/rtc/webRTC)
- [音频与视频](/parts/av/)
- [网络与数据传输](/parts/getData/)
