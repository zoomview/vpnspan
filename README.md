# VPNSpan - Real-time VPN Performance Monitor

<div align="center">
  
  ![VPNSpan Logo](https://via.placeholder.com/200x80/0f172a/06b6d4?text=VPNSpan)
  
  **Monitor VPNs Across the Globe**
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
  [![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
  [![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
  
</div>

## 📋 项目简介

VPNSpan是一个实时VPN性能监控平台，提供客观、数据驱动的VPN服务质量评估。通过自动化测试，我们监控多个主流VPN服务商的连接速度、延迟、稳定性和流媒体解锁能力。

### ✨ 主要特性

- 🔄 **实时监控** - 每30分钟自动测试所有VPN服务
- 📊 **数据可视化** - 直观的监控矩阵和性能趋势图表
- 🌍 **多维度评估** - 速度、延迟、可用性、流媒体解锁
- 📈 **历史趋势** - 24小时/7天性能数据记录
- 🎨 **现代化UI** - 深色主题，响应式设计
- 🔓 **完全透明** - 公开测试方法论和原始数据

## 🚀 快速开始

### 前置要求

- Node.js 18+
- npm 或 yarn
- (可选) Docker 和 Docker Compose

### 本地开发

1. **克隆项目**
```bash
git clone https://github.com/yourusername/vpnspan.git
cd vpnspan
```

2. **安装依赖**
```bash
# 安装根目录依赖
npm install

# 安装前端依赖
cd frontend && npm install && cd ..

# 安装后端依赖
cd backend && npm install && cd ..
```

3. **配置环境变量**
```bash
cd backend
cp .env.example .env
# 编辑.env文件根据需要调整配置
```

4. **启动开发服务器**
```bash
# 在项目根目录
npm run dev

# 或者分别启动
npm run dev:frontend  # 前端: http://localhost:3000
npm run dev:backend   # 后端: http://localhost:5000
```

5. **访问应用**
打开浏览器访问 http://localhost:3000

### 使用Docker

```bash
# 构建并启动所有服务
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down
```

## 📁 项目结构

```
vpnspan/
├── frontend/              # React前端应用
│   ├── src/
│   │   ├── components/   # React组件
│   │   ├── pages/        # 页面组件
│   │   ├── App.jsx       # 主应用组件
│   │   └── main.jsx      # 入口文件
│   ├── index.html
│   └── package.json
│
├── backend/               # Node.js后端
│   ├── monitor/          # 监控脚本
│   │   ├── scheduler.js  # 定时任务调度
│   │   └── vpn-tester.js # VPN测试逻辑
│   ├── data/             # 数据存储目录
│   ├── server.js         # Express服务器
│   └── package.json
│
├── docker-compose.yml     # Docker编排配置
├── .gitignore
└── README.md
```

## 🔧 配置说明

### 后端环境变量

在 `backend/.env` 文件中配置：

```env
PORT=5000                 # API服务端口
NODE_ENV=development      # 环境模式
```

### VPN测试配置

编辑 `backend/monitor/scheduler.js` 中的 `VPN_CONFIGS` 数组来添加或删除要监控的VPN服务：

```javascript
const VPN_CONFIGS = [
  {
    id: 'expressvpn',
    name: 'ExpressVPN',
    enabled: true
  },
  // 添加更多VPN配置...
]
```

### 监控频率

默认每30分钟运行一次测试。修改 `backend/monitor/scheduler.js` 中的cron表达式来调整频率：

```javascript
// 每30分钟
cron.schedule('0,30 * * * *', () => {
  runMonitoring()
})

// 每15分钟
cron.schedule('0,15,30,45 * * * *', () => {
  runMonitoring()
})
```

## 📊 API接口

### 获取所有VPN状态
```
GET /api/vpn/status
```

响应：
```json
[
  {
    "id": "expressvpn",
    "name": "ExpressVPN",
    "status": "online",
    "uptime": 98.5,
    "speed": 95,
    "latency": 18,
    "nodes": { "online": 50, "total": 52 },
    "streaming": { "netflix": true, "youtube": true, "disney": true },
    "lastChecked": "2026-02-09T12:00:00.000Z"
  }
]
```

### 获取单个VPN详情
```
GET /api/vpn/:id
```

响应包含24小时历史数据和详细信息。

### 健康检查
```
GET /api/health
```

## 🛠️ 开发指南

### 添加新的VPN服务

1. 在 `backend/monitor/scheduler.js` 的 `VPN_CONFIGS` 中添加配置
2. 在 `backend/monitor/vpn-tester.js` 中实现该VPN的测试逻辑
3. （可选）在前端添加VPN的Logo和特定样式

### 实现真实的VPN测试

当前版本使用模拟数据。要实现真实测试：

1. 为每个VPN购买订阅账号
2. 安装VPN客户端（OpenVPN、WireGuard等）
3. 编写自动化脚本连接VPN
4. 集成speedtest-cli进行速度测试
5. 实现流媒体解锁检测

参考 `backend/monitor/vpn-tester.js` 中的注释了解详细实现方法。

## 🚀 部署

### VPS部署

1. 准备一台VPS（推荐配置：2核2G，Ubuntu 20.04+）
2. 安装Docker和Docker Compose
3. 克隆项目并配置环境变量
4. 运行 `docker-compose up -d`
5. 配置Nginx反向代理和SSL证书

### 域名和DNS

将域名（如vpnspan.com）的A记录指向服务器IP。

### SSL证书

使用Let's Encrypt获取免费SSL证书：
```bash
sudo certbot --nginx -d vpnspan.com
```

## 📝 roadmap

- [ ] MVP版本（当前）
  - [x] 基础监控矩阵界面
  - [x] 模拟数据展示
  - [ ] 真实VPN测试集成
  
- [ ] V1.0
  - [ ] 15个VPN服务监控
  - [ ] 真实速度和延迟测试
  - [ ] 流媒体解锁检测
  - [ ] 7天历史数据
  
- [ ] V2.0
  - [ ] 多地监控节点
  - [ ] API公开访问
  - [ ] 邮件告警订阅
  - [ ] 用户自定义对比

## 🤝 贡献

欢迎提交Issue和Pull Request！

## 📄 许可证

本项目采用MIT许可证 - 详见 [LICENSE](LICENSE) 文件

## 📧 联系方式

- 网站：https://vpnspan.com
- 邮箱：hello@vpnspan.com
- GitHub：https://github.com/yourusername/vpnspan

---

<div align="center">
  Made with ❤️ by VPNSpan Team
</div>
