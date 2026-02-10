# VPN测试配置快速指南

## 🚀 快速开始（以ProtonVPN为例）

### 第一步：注册ProtonVPN免费账号

1. 访问 https://protonvpn.com
2. 点击"Get ProtonVPN for FREE"
3. 注册账号（免费版永久可用）

### 第二步：安装OpenVPN

#### Windows安装
1. 下载OpenVPN：https://openvpn.net/community-downloads/
2. 下载并安装"Windows Installer (NSIS)"版本
3. 安装完成后，OpenVPN会添加到系统PATH

验证安装：
```cmd
openvpn --version
```

#### Linux安装

```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install openvpn

# 验证
openvpn --version
```

### 第三步：下载VPN配置文件

1. 登录ProtonVPN账户
2. 前往 https://account.protonvpn.com/downloads
3. 选择"OpenVPN configuration files"
4. 下载你想要的服务器配置（推荐：US服务器）
5. 保存.ovpn文件到：`C:\vpn-configs\`（Windows）或`/etc/openvpn/`（Linux）

### 第四步：获取OpenVPN凭证

ProtonVPN的OpenVPN凭证不同于网页登录密码：

1. 在账户页面找到"OpenVPN / IKEv2 username"
2. 格式类似：`username+f1` 
3. 密码在同一页面可以查看/重置

### 第五步：配置监控脚本

编辑 `backend/monitor/scheduler.js`：

```javascript
{
    id: 'protonvpn',
    name: 'ProtonVPN',
    website: 'https://protonvpn.com',
    
    // 添加以下配置
    configFile: 'C:/vpn-configs/us-free-01.protonvpn.udp.ovpn',  // Windows路径
    // configFile: '/etc/openvpn/us-free-01.protonvpn.udp.ovpn', // Linux路径
    username: 'your_openvpn_username+f1',  // 替换为实际用户名
    password: 'your_openvpn_password',     // 替换为实际密码
    
    enabled: true
}
```

### 第六步：安装速度测试工具（可选但推荐）

#### 安装Python和speedtest-cli

**Windows:**
```cmd
# 1. 安装Python (从 https://python.org 下载)
# 2. 安装speedtest-cli
pip install speedtest-cli

# 验证
speedtest-cli --version
```

**Linux:**
```bash
sudo apt-get install python3-pip
pip3 install speedtest-cli

# 验证
speedtest-cli --version
```

如果不安装speedtest-cli，脚本会自动使用备用的简单速度测试。

### 第七步：测试单个VPN

```bash
cd backend
node -e "import('./monitor/vpn-tester.js').then(m => m.testVPN({id:'protonvpn', name:'ProtonVPN', configFile:'C:/vpn-configs/us-free-01.protonvpn.udp.ovpn', username:'your_username', password:'your_password'}))"
```

---

## 🔧 其他VPN配置方法

### ExpressVPN

ExpressVPN提供原生客户端命令行：

```javascript
{
    id: 'expressvpn',
    name: 'ExpressVPN',
    
    // 方法1: 使用命令行客户端（推荐）
    clientCommand: 'expressvpn connect smart',
    disconnectCommand: 'expressvpn disconnect',
    
    // 方法2: 使用OpenVPN配置
    // configFile: 'C:/vpn-configs/expressvpn-usa.ovpn',
    // username: 'your_username',
    // password: 'your_password',
    
    enabled: true
}
```

**安装ExpressVPN CLI：**
- Windows: 安装桌面应用后，CLI自动可用
- Linux: https://www.expressvpn.com/support/vpn-setup/app-for-linux/

### NordVPN

NordVPN也提供命令行工具：

```javascript
{
    id: 'nordvpn',
    name: 'NordVPN',
    
    // 使用原生客户端
    clientCommand: 'nordvpn connect United States',
    disconnectCommand: 'nordvpn disconnect',
    
    enabled: true
}
```

**安装NordVPN CLI：**
- Windows: 下载桌面应用
- Linux: https://nordvpn.com/download/linux/

### Surfshark

```javascript
{
    id: 'surfshark',
    name: 'Surfshark',
    
    // OpenVPN方式
    configFile: 'C:/vpn-configs/surfshark-us-nyc.prod.surfshark.com_udp.ovpn',
    username: 'your_surfshark_username',
    password: 'your_surfshark_password',
    
    enabled: true
}
```

配置文件下载：https://my.surfshark.com/vpn/manual-setup/main

### CyberGhost

```javascript
{
    id: 'cyberghost',
    name: 'CyberGhost',
    
    // OpenVPN方式
    configFile: 'C:/vpn-configs/CyberGhost-US.ovpn',
    username: 'your_username',
    password: 'your_password',
    
    enabled: true
}
```

---

## 📋 完整测试流程

### 1. 安装所有依赖

```bash
# 进入后端目录
cd backend

# 已经安装过npm依赖了，无需重新安装
# npm install

# 安装系统依赖（如果需要）
# Windows: 安装OpenVPN
# pip install speedtest-cli
```

### 2. 配置VPN

编辑 `backend/monitor/scheduler.js`，添加真实的VPN配置

### 3. 测试单个VPN

```bash
# 运行监控脚本测试
npm run monitor
```

### 4. 查看输出

你应该看到类似的输出：

```
🚀 VPNSpan Monitoring Scheduler Started
⏰ Schedule: Every 30 minutes
📊 Monitoring VPNs: ProtonVPN

🔍 Starting VPN monitoring at 2026-02-09 22:30:00

📡 Testing ProtonVPN...
🔍 开始测试 ProtonVPN...
📍 当前IP: 1.2.3.4
[OpenVPN] Initialization Sequence Completed
✅ VPN连接成功，耗时: 5234ms
📍 VPN IP: 5.6.7.8
⚡ 开始速度测试...
📊 速度: ↓85Mbps ↑72Mbps Ping:28ms
🎬 检测流媒体解锁...
📺 流媒体: Netflix=true YouTube=true
🔌 VPN已断开
✅ ProtonVPN 测试完成

✅ ProtonVPN: online | Speed: 85Mbps | Latency: 28ms
✨ Monitoring completed. Tested 1 VPNs
```

---

## 🐛 常见问题

### 问题1: OpenVPN未找到

```
Error: openvpn: command not found
```

**解决**：
- Windows: 确保OpenVPN安装目录添加到PATH
- Linux: `sudo apt-get install openvpn`

### 问题2: 权限不足

```
Error: Permission denied
```

**解决**：
- Windows: 以管理员身份运行
- Linux: 使用sudo运行或配置sudo权限

### 问题3: speedtest-cli未安装

```
Error: speedtest-cli: not found
```

**解决**：
- `pip install speedtest-cli`
- 或者脚本会自动使用备用测试方法

### 问题4: VPN连接超时

```
Error: VPN连接超时
```

**解决**：
- 检查网络连接
- 确认配置文件路径正确
- 确认用户名密码正确
- 尝试其他服务器配置文件

### 问题5: IP未改变

```
Error: VPN连接后IP未改变
```

**解决**：
- 增加等待时间（脚本已设置3秒）
- 检查VPN是否真的连接成功
- 检查防火墙设置

---

## 🔒 安全提示

> [!WARNING]
> **不要将含密码的配置提交到Git**
> 
> 在`.gitignore`中添加：
> ```
> backend/monitor/vpn-credentials.js
> temp-auth-*.txt
> ```

> [!TIP]
> **使用环境变量存储凭证**
> 
> 在`.env`文件中：
> ```
> PROTONVPN_USERNAME=your_username
> PROTONVPN_PASSWORD=your_password
> ```
> 
> 在代码中读取：
> ```javascript
> username: process.env.PROTONVPN_USERNAME
> ```

---

## ✅ 检查清单

设置完成后，检查以下项目：

- [ ] OpenVPN已安装并可用
- [ ] speedtest-cli已安装（可选）
- [ ] VPN配置文件已下载
- [ ] scheduler.js中已配置真实凭证
- [ ] 能够成功连接至少一个VPN
- [ ] 速度测试正常运行
- [ ] 流媒体检测正常工作
- [ ] VPN能正确断开连接

---

## 📞 需要帮助？

如果遇到问题：
1. 检查上面的"常见问题"部分
2. 查看控制台错误信息
3. 检查OpenVPN日志
4. 尝试手动连接VPN验证凭证是否正确

**下一步**：配置好ProtonVPN后，依次添加其他VPN配置！
