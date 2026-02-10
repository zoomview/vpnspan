# OpenVPN连接超时排查指南

## 问题现象
```
UDP link remote: [AF_INET]146.70.230.98:1194
❌ ProtonVPN 测试失败: OpenVPN连接超时
```

## 可能原因

### 1. ProtonVPN服务器问题
- 免费服务器`us-free-81`可能暂时不可用
- 用户过多导致服务器过载

### 2. 防火墙阻止
- Windows防火墙阻止UDP 1194端口
- 路由器防火墙规则
- ISP限制VPN流量

### 3. 网络问题
- DNS解析问题
- 网络不稳定
- ISP限制

## 解决方案

### ✅ 方案1：使用TCP配置（最推荐）

**为什么TCP更好？**
- 更稳定，不易丢包
- 更不容易被防火墙阻止
- 穿透性更强

**步骤**：
1. 访问 https://account.protonvpn.com/downloads
2. 找到"United States" FREE服务器
3. 下载**TCP协议**的配置文件（不是UDP）
4. 将文件保存到`C:\vpn-configs\`
5. 更新`backend/monitor/scheduler.js`中的配置：
   ```javascript
   configFile: 'C:/vpn-configs/us-free-XX.protonvpn.tcp.ovpn',
   ```

### ✅ 方案2：更换服务器

ProtonVPN免费版有3个国家的服务器：
- 🇺🇸 United States（美国）
- 🇳🇱 Netherlands（荷兰）
- 🇯🇵 Japan（日本）

尝试下载其他国家的配置文件：
```javascript
configFile: 'C:/vpn-configs/nl-free-XX.protonvpn.udp.ovpn',  // 荷兰
// 或
configFile: 'C:/vpn-configs/jp-free-XX.protonvpn.udp.ovpn',  // 日本
```

### ✅ 方案3：检查防火墙

1. **暂时关闭Windows防火墙测试**
   - 打开"Windows Defender 防火墙"
   - 点击"启用或关闭Windows Defender防火墙"
   - 临时选择"关闭"
   - 测试连接
   - **记得测试后重新开启！**

2. **添加OpenVPN防火墙规则**
   - 打开"Windows Defender 防火墙"
   - "高级设置" → "入站规则" → "新建规则"
   - 选择"程序" → 浏览到`C:\Program Files\OpenVPN\bin\openvpn.exe`
   - 允许连接

### ✅ 方案4：使用模拟数据（临时）

如果暂时无法解决VPN连接问题，可以先用模拟数据测试网站功能：

参考 `MOCK_DATA_TEMPLATE.js` 的代码，在`backend/monitor/vpn-tester.js`开头添加：
```javascript
const USE_MOCK_DATA = true
```

这样可以先看到网站效果，等VPN问题解决后再切换回真实测试。

### ✅ 方案5：手动测试连接

先手动测试OpenVPN是否能连接：

```cmd
# 以管理员运行cmd
cd C:\vpn-configs
openvpn --config us-free-81.protonvpn.udp.ovpn --auth-user-pass

# 输入用户名和密码
# 观察是否能看到 "Initialization Sequence Completed"
```

如果手动也连接不上，说明是服务器或网络问题，建议换TCP配置。

## 推荐流程

1. **首选**：下载TCP配置文件（5分钟）
2. **备选**：尝试荷兰或日本服务器
3. **临时**：使用模拟数据先测试网站
4. **排查**：检查防火墙设置

---

**最快解决**：直接下载TCP配置文件替换当前的UDP文件！

TCP配置文件示例：`us-free-XX.protonvpn.tcp.ovpn`
