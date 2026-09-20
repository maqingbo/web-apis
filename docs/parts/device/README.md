# 设备能力

浏览器可以在用户授权后访问部分操作系统和硬件能力。此类 API 的隐私风险较高，通常要求 HTTPS、显式权限或用户激活，并且不同浏览器和设备之间的支持差异明显。

下面的 API 地图表示本分类计划覆盖的知识范围，不代表每一项都已经有独立文章。

## API 地图

| 领域 | 主要接口与 API | 能力与限制 |
| --- | --- | --- |
| 地理位置 | Geolocation API、`navigator.geolocation` | 获取设备位置，需要授权并考虑精度与持续定位成本 |
| 剪贴板 | Clipboard API、`navigator.clipboard`、Clipboard Events | 读取或写入系统剪贴板，通常要求安全上下文和用户操作 |
| 摄像头与麦克风 | MediaDevices、`getUserMedia()`、`enumerateDevices()` | 采集媒体和枚举设备，需要权限并处理设备切换 |
| 屏幕捕获 | Screen Capture API、`getDisplayMedia()` | 由用户选择屏幕、窗口或标签页进行共享 |
| 设备方向与运动 | Device Orientation Events、Device Motion Events | 获取方向和加速度信息，移动端权限策略不同 |
| 通用传感器 | Accelerometer、Gyroscope、Magnetometer、AmbientLightSensor | 以统一模型访问传感器，支持度有限 |
| 外部硬件 | Web Bluetooth、WebUSB、WebHID、Web Serial、Web NFC | 连接蓝牙、USB、HID、串口或 NFC 设备，兼容性差异明显 |
| 游戏与反馈 | Gamepad API、Vibration API | 读取游戏控制器输入或触发设备振动 |
| 屏幕与电源 | Screen Orientation API、Screen Wake Lock API | 锁定方向或阻止屏幕休眠 |
| 系统集成 | Web Share API、Contact Picker API、Badging API | 调用系统分享、选择联系人或显示应用徽标 |
| 通知与推送 | Notifications API、Push API | 经授权显示系统通知或接收服务器推送 |
| 凭据与认证器 | Credential Management API、Web Authentication API | 使用密码、公钥凭据或硬件认证器完成登录 |
| 设备状态 | Battery Status API、Network Information API | 提供电量或连接质量提示，支持度与隐私限制较多 |

## 设计原则

- 为拒绝授权、缺少硬件和浏览器不支持提供替代路径。
- 不要只通过属性是否存在判断可用性，还要检查安全上下文、Permissions Policy 和实际调用结果。
- 正确处理设备拔出、权限在运行中变化、标签页进入后台和媒体轨道结束。
- 只收集完成任务所必需的数据，并明确说明用途和保存周期。

例如，用户拒绝地理位置时允许手动输入，摄像头不可用时允许上传文件，硬件连接断开时提供重新连接和状态恢复入口。

## 相关专题

- [音频与视频](/parts/av/)
- [实时通信](/parts/rtc/)
- [安全与权限](/parts/security/)
