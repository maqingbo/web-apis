# 设备能力

浏览器可以在用户授权后访问部分操作系统和硬件能力。此类 API 的隐私风险较高，通常要求 HTTPS、显式权限、用户激活，并且浏览器支持差异明显。

## 常见能力

| 领域 | API 示例 |
| --- | --- |
| 位置 | Geolocation |
| 剪贴板 | Clipboard API |
| 摄像头和麦克风 | MediaDevices |
| 屏幕捕获 | Screen Capture |
| 传感器 | Generic Sensor APIs |
| 外部设备 | Web Bluetooth、WebUSB、WebHID、Web Serial |
| 凭据与认证器 | Credential Management、Web Authentication |

## 设计注意

设备能力必须提供清晰的替代路径。例如用户拒绝地理位置时允许手动输入，摄像头不可用时允许上传文件。页面还应正确处理设备被拔出、权限在运行期间变化以及标签页进入后台等情况。

硬件 API 不能只依据接口存在性判断可用性，还需要结合安全上下文、Permissions Policy、操作系统能力和实际调用结果。
