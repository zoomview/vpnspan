# ProtonVPN 配置步骤指南

## 📋 配置清单

### ✅ 已完成
- [x] OpenVPN已安装
- [x] OpenVPN已添加到PATH
- [x] 创建了C:\vpn-configs文件夹

### 🔄 待完成
- [ ] 注册ProtonVPN账号
- [ ] 下载OpenVPN配置文件
- [ ] 获取OpenVPN凭证
- [ ] 配置scheduler.js

---

## 第1步：注册ProtonVPN（如果还没有）

1. 访问：https://protonvpn.com
2. 点击"Get ProtonVPN for FREE"
3. 注册免费账号（永久免费，无需信用卡）
4. 验证邮箱

---

## 第2步：下载OpenVPN配置文件

### 详细步骤：

1. **登录ProtonVPN账户**
   - 访问：https://account.protonvpn.com
   - 使用你的邮箱和密码登录

2. **进入下载页面**
   - 左侧菜单点击"Downloads"
   - 或直接访问：https://account.protonvpn.com/downloads

3. **选择配置类型**
   - 找到"OpenVPN configuration files"部分
   - 点击"Router"或"Android, iOS & Windows (OpenVPN GUI)"

4. **下载配置文件**
   - 在"Free servers"部分
   - 选择"United States"（或其他你想要的国家）
   - 推荐下载：**UDP协议**的配置文件
   - 文件名类似：`us-free-01.protonvpn.udp.ovpn`

5. **保存配置文件**
   - 将下载的.ovpn文件保存到：`C:\vpn-configs\`
   - 例如：`C:\vpn-configs\us-free-01.protonvpn.udp.ovpn`

> 💡 提示：免费版只有3个国家的服务器，美国通常速度最快

---

## 第3步：获取OpenVPN凭证

⚠️ **重要**：OpenVPN凭证 ≠ 网页登录密码

### 如何获取：

1. **在账户页面**
   - 还是在 https://account.protonvpn.com/downloads
   - 向下滚动到"OpenVPN / IKEv2 credentials"部分

2. **查看用户名**
   - 显示为：`xxxxxx+f1` 或 `username+pmp`
   - **复制这个完整的用户名**（包括+f1）

3. **查看/重置密码**
   - 点击密码旁边的"眼睛"图标查看
   - 或点击"Generate new password"生成新密码
   - **复制这个密码**

4. **保存凭证**（临时记录，配置后可删除）
   ```
   OpenVPN Username: xxxxxx+f1
   OpenVPN Password: your_password_here
   ```

---

## 第4步：配置监控脚本

### 编辑 `backend/monitor/scheduler.js`

找到ProtonVPN的配置（大约在第16-27行），修改为：

```javascript
{
    id: 'protonvpn',
    name: 'ProtonVPN',
    website: 'https://protonvpn.com',
    tier: 'mid-range',
    monthlyPrice: 9.99,
    description: '隐私为主，瑞士法律，技术派首选',
    affiliateCommission: 20,
    
    // ===== 添加以下3行配置 =====
    configFile: 'C:/vpn-configs/us-free-01.protonvpn.udp.ovpn',  // 你下载的文件路径
    username: 'YOUR_USERNAME+f1',  // 替换为你的OpenVPN用户名
    password: 'YOUR_PASSWORD',     // 替换为你的OpenVPN密码
    // ===========================
    
    enabled: true
}
```

⚠️ **注意**：
- 路径使用正斜杠 `/` 而不是反斜杠 `\`
- 确保文件名和实际下载的文件名一致
- 用户名要包含 `+f1` 或 `+pmp` 后缀

---

## 第5步：测试ProtonVPN连接

### 方法1：运行监控脚本（推荐）

```bash
cd backend
npm run monitor
```

你应该看到类似输出：
```
🚀 VPNSpan Monitoring Scheduler Started
⏰ Schedule: Every 30 minutes
📊 Monitoring VPNs: ProtonVPN

🔍 Starting VPN monitoring at ...

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
```

### 方法2：手动测试OpenVPN连接

先手动验证配置文件是否正确：

```cmd
# 以管理员身份运行cmd
cd C:\vpn-configs
openvpn --config us-free-01.protonvpn.udp.ovpn --auth-user-pass
```

会提示输入用户名和密码，成功后会显示"Initialization Sequence Completed"。

按 `Ctrl+C` 断开连接。

---

## 🐛 常见问题

### 问题1：OpenVPN连接超时
```
Error: OpenVPN连接超时
```
**解决**：
- 检查防火墙是否阻止OpenVPN
- 尝试TCP协议的配置文件（下载时选择TCP而不是UDP）
- 换一个服务器配置文件

### 问题2：认证失败
```
AUTH_FAILED
```
**解决**：
- 确认用户名包含 `+f1` 后缀
- 确认密码是OpenVPN密码，不是网页登录密码
- 在ProtonVPN网站重新生成OpenVPN密码

### 问题3：权限不足
```
Error: Operation not permitted
```
**解决**：
- **以管理员身份**运行命令提示符或PowerShell
- 右键cmd → "以管理员身份运行"

### 问题4：配置文件找不到
```
Error: Cannot open file
```
**解决**：
- 检查文件路径是否正确
- 确认.ovpn文件确实在 `C:\vpn-configs\` 文件夹中
- 检查文件名拼写

---

## ✅ 配置完成检查清单

配置完成后，确认：

- [ ] C:\vpn-configs文件夹已创建
- [ ] .ovpn配置文件已下载到该文件夹
- [ ] OpenVPN凭证已获取（username+f1格式）
- [ ] scheduler.js已添加configFile、username、password
- [ ] 能够成功运行 `npm run monitor`
- [ ] 看到ProtonVPN测试成功的输出

---

## 🎯 完成后的效果

测试成功后：
1. `backend/data/vpn-status.json` 会保存最新的VPN状态
2. `backend/data/history/protonvpn.json` 会记录历史数据
3. 前端访问 http://localhost:3000 会显示真实的ProtonVPN数据

---

## 📞 需要帮助？

配置过程中遇到任何问题，请告诉我：
- 错误信息的完整内容
- 你执行的命令
- 当前进行到哪一步

我会帮你解决！
