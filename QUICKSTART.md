# VPNSpan 快速启动指南

## 🚀 5分钟快速启动

### 第一步：安装依赖

```bash
# 1. 进入项目目录
cd vpnspan

# 2. 安装根目录依赖
npm install

# 3. 安装前端依赖
cd frontend
npm install
cd ..

# 4. 安装后端依赖
cd backend
npm install
cd ..
```

### 第二步：配置环境

```bash
# 复制后端环境变量配置
cd backend
cp .env.example .env
cd ..
```

### 第三步：启动开发服务器

**方式1：使用并发启动（推荐）**
```bash
# 在项目根目录运行
npm run dev
```

这会同时启动前端（端口3000）和后端（端口5000）。

**方式2：分别启动**

打开两个终端窗口：

```bash
# 终端1 - 启动前端
cd frontend
npm run dev

# 终端2 - 启动后端
cd backend
npm run dev
```

### 第四步：访问应用

打开浏览器访问：http://localhost:3000

## 📊 测试监控功能

### 查看监控数据

当前版本使用模拟数据，你可以：
1. 在首页看到5个VPN服务的监控矩阵
2. 点击"查看详情"查看24小时性能图表
3. 点击"刷新数据"手动更新数据

### 启动监控调度器（可选）

如果你想测试定时监控功能：

```bash
cd backend
npm run monitor
```

这会每30分钟自动运行一次监控测试。

## 🔧 常见问题

### 端口被占用

如果端口3000或5000被占用，你可以修改：
- 前端端口：编辑 `frontend/vite.config.js`
- 后端端口：编辑 `backend/.env`

### 依赖安装失败

如果使用npm安装失败，尝试：
```bash
npm install --legacy-peer-deps
```

或使用yarn：
```bash
yarn install
```

### 前端无法连接后端

确保：
1. 后端服务已启动（http://localhost:5000）
2. 检查浏览器控制台是否有CORS错误
3. 确认Vite代理配置正确

## 📦 生产部署

### 使用Docker（推荐）

```bash
# 构建并启动
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止
docker-compose down
```

### 手动部署

```bash
# 1. 构建前端
cd frontend
npm run build

# 2. 启动后端生产模式
cd ../backend
NODE_ENV=production npm start
```

## 🎯 下一步

1. ✅ 熟悉界面和功能
2. 📝 阅读 `README.md` 了解详细信息
3. 🔧 编辑 `backend/monitor/vpn-tester.js` 实现真实的VPN测试
4. 🚀 部署到VPS服务器

## 💡 提示

- 开发时建议使用Chrome DevTools查看网络请求
- 后端API文档见 `README.md` 的API部分
- 前端使用React DevTools可以更好地调试组件

祝你使用愉快！🎉
