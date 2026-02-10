# OpenVPN安装和配置指南（Windows）

## 问题说明

ProtonVPN桌面客户端 ≠ OpenVPN命令行工具

- **ProtonVPN客户端**：图形界面，手动连接
- **OpenVPN CLI**：命令行工具，可用于自动化脚本

我们的监控脚本需要OpenVPN CLI来自动化测试。

## 解决方案1：安装OpenVPN（推荐）

### 第一步：下载OpenVPN

1. 访问：https://openvpn.net/community-downloads/
2. 下载 "Windows Installer (NSIS)"
3. 或直接下载：https://swupdate.openvpn.org/community/releases/OpenVPN-2.6.8-I001-amd64.msi

### 第二步：安装OpenVPN

1. 运行安装程序
2. **重要**：在"Choose Components"页面，确保勾选：
   - ✅ OpenVPN Service
   - ✅ OpenVPN GUI
   - ✅ EasyRSA 3 Certificate Management Scripts
3. 点击Next，完成安装
4. 默认安装路径：`C:\Program Files\OpenVPN`

### 第三步：添加到系统PATH

**方法1：自动添加（推荐）**

安装时会自动添加，但如果没有，手动添加：

1. 右键"此电脑" → 属性
2. 高级系统设置 → 环境变量
3. 在"系统变量"中找到"Path"
4. 点击"编辑" → "新建"
5. 添加：`C:\Program Files\OpenVPN\bin`
6. 确定保存

**方法2：使用PowerShell添加**

以管理员身份运行PowerShell：

```powershell
# 添加OpenVPN到PATH
$openVpnPath = "C:\Program Files\OpenVPN\bin"
$currentPath = [Environment]::GetEnvironmentVariable("Path", "Machine")
if ($currentPath -notlike "*$openVpnPath*") {
    [Environment]::SetEnvironmentVariable("Path", "$currentPath;$openVpnPath", "Machine")
    Write-Host "✅ OpenVPN已添加到PATH"
}
```

### 第四步：验证安装

**重要**：添加PATH后需要重新打开命令提示符

```cmd
# 关闭当前cmd窗口，重新打开
openvpn --version
```

应该看到类似输出：
```
OpenVPN 2.6.8 x86_64-w64-mingw32 [SSL (OpenSSL)] [LZO] [LZ4] [PKCS11] [AEAD]
```

---

## 解决方案2：使用ProtonVPN CLI（替代方案）

如果你不想安装OpenVPN，可以使用ProtonVPN官方CLI工具。

### 下载ProtonVPN CLI

1. 访问：https://protonvpn.com/support/official-windows-vpn-client/
2. 或使用PowerShell安装：

```powershell
# 使用Chocolatey安装
choco install protonvpn-cli

# 或使用winget
winget install ProtonVPN.ProtonVPN
```

### 修改测试脚本

在`backend/monitor/scheduler.js`中修改ProtonVPN配置：

```javascript
{
    id: 'protonvpn',
    name: 'ProtonVPN',
    
    // 方法1：使用ProtonVPN CLI（不需要OpenVPN）
    clientCommand: 'protonvpn-cli connect --fastest',
    disconnectCommand: 'protonvpn-cli disconnect',
    
    // 方法2：使用OpenVPN（需要先安装）
    // configFile: 'C:/vpn-configs/protonvpn-us.ovpn',
    // username: 'your_username',
    // password: 'your_password',
    
    enabled: false  // 暂时禁用，等配置好再启用
}
```

---

## 解决方案3：简化方案（开发测试）

如果你暂时只想测试网站功能，可以：

### 1. 暂时禁用真实VPN测试

编辑 `backend/monitor/vpn-tester.js`，在最开始添加：

```javascript
// 临时使用模拟数据，跳过真实测试
const USE_MOCK_DATA = true

export async function testVPN(config) {
  if (USE_MOCK_DATA) {
    // 返回模拟数据
    await sleep(2000)  // 模拟测试时间
    return getMockResult(config)
  }
  
  // ... 原有的真实测试代码
}

function getMockResult(config) {
  return {
    id: config.id,
    name: config.name,
    status: Math.random() > 0.15 ? 'online' : 'degraded',
    uptime: 88 + Math.random() * 10,
    speed: 70 + Math.random() * 30,
    latency: 20 + Math.random() * 40,
    nodes: {
      online: Math.floor(40 + Math.random() * 10),
      total: Math.floor(45 + Math.random() * 8)
    },
    streaming: {
      netflix: Math.random() > 0.3,
      youtube: true,
      disney: Math.random() > 0.5
    },
    lastChecked: new Date().toISOString()
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
```

这样你可以先测试网站功能，等OpenVPN安装好后再切换到真实测试。

---

## 推荐做法

我建议：

### 第一阶段：先让网站跑起来（今天）
1. ✅ .env文件已创建
2. 🔄 使用模拟数据测试（暂时跳过真实VPN）
3. 🚀 运行网站，查看前端效果

### 第二阶段：安装OpenVPN（明天）
1. 下载并安装OpenVPN
2. 重启电脑（确保PATH生效）
3. 下载ProtonVPN配置文件
4. 配置真实测试

### 第三阶段：逐步添加VPN（未来一周）
1. 先测试ProtonVPN
2. 再添加其他VPN

---

## 🚀 立即运行网站

不等OpenVPN，现在就可以运行网站：

```bash
# 在项目根目录
cd c:\agent项目\vpnspan

# 安装依赖（如果还没安装）
npm install
cd frontend && npm install && cd ..
cd backend && npm install && cd ..

# 启动开发服务器
npm run dev
```

访问 http://localhost:3000 查看效果！

---

你想先怎么做？
A. 现在立即安装OpenVPN（我帮你一步步操作）
B. 先跑起来网站看效果，明天再装OpenVPN
C. 使用ProtonVPN CLI替代OpenVPN
