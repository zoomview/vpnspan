# VPNSpan 今晚快速上线清单

## ⏰ 时间：约30分钟

### ✅ 准备工作（现在完成）

- [x] 部署脚本已创建
- [x] 部署文档已准备
- [ ] **Git提交代码**（5分钟）

---

## 🚀 第1步：提交代码到Git（5分钟）

### 创建GitHub仓库

1. **访问GitHub**：https://github.com/new
2. **仓库名**：vpnspan
3. **设置**：Private（私有）
4. **不要**勾选"Initialize with README"
5. 点击"Create repository"

### 本地提交代码

```powershell
# Windows PowerShell
cd C:\agent项目\vpnspan

# 初始化Git
git init

# 添加所有文件
git add .

# 提交
git commit -m "feat: VPNSpan MVP - initial deployment"

# 添加远程仓库（替换为你的GitHub用户名）
git remote add origin https://github.com/YOUR_USERNAME/vpnspan.git

# 推送
git push -u origin main
```

**如果推送失败**：
```powershell
# 首次配置Git
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# 如果需要认证
# 使用GitHub personal access token
```

---

## 🌐 第2步：创建Digital Ocean Droplet（5分钟）

1. **登录DO**：https://cloud.digitalocean.com
2. **Create → Droplets**
3. **配置选择**：
   ```
   镜像：Ubuntu 22.04 LTS
   套餐：Basic - $6/月
   大小：1GB / 1 CPU / 25GB SSD
   位置：San Francisco 3（或离中国更近的）
   认证：使用你的SSH密钥（或密码）
   主机名：vpnspan
   ```
4. **Create Droplet**
5. **记录IP地址**：___.___.___.___

---

## 📝 第3步：配置DNS（5分钟）

1. **域名管理处**（vpnspan.com）
2. **添加A记录**：
   ```
   @ → [Droplet IP]
   www → [Droplet IP]
   ```
3. **保存**

---

## 💻 第4步：部署到服务器（10分钟）

### 连接服务器
```bash
ssh root@[Droplet IP]
```

### 克隆代码
```bash
cd /var/www
git clone https://github.com/YOUR_USERNAME/vpnspan.git
cd vpnspan
```

### 运行部署脚本
```bash
# 1. 安装环境（自动）
chmod +x deploy-server.sh
bash deploy-server.sh
# 等待5分钟

# 2. 配置环境变量（暂时留空）
nano backend/.env
# 按Ctrl+X, Y, Enter保存

# 3. 部署应用
chmod +x deploy-app.sh
bash deploy-app.sh
# 等待3分钟

# 4. 配置SSL
chmod +x setup-ssl.sh
bash setup-ssl.sh
# 输入：vpnspan.com
```

---

## ✅ 第5步：验证上线（5分钟）

### 检查服务
```bash
# 查看容器
docker-compose ps

# 查看日志
docker-compose logs backend | tail -20
```

### 浏览器访问
```
https://vpnspan.com
```

**应该看到**：
- ✅ VPNSpan首页
- ✅ Dashboard显示（虽然没有真实数据）
- ✅ HTTPS绿锁标志

---

## 📊 完成检查清单

- [ ] GitHub仓库已创建，代码已推送
- [ ] Digital Ocean Droplet已创建
- [ ] DNS已配置
- [ ] 部署脚本已运行完成
- [ ] Docker容器运行正常
- [ ] 可以访问 https://vpnspan.com
- [ ] API健康检查正常

---

## 🐛 如果遇到问题

### DNS未生效
```bash
# 检查DNS
dig vpnspan.com

# 暂时用IP访问
curl http://[Droplet IP]
```

### SSL申请失败
```bash
# 等待DNS生效后重试
bash setup-ssl.sh
```

### 容器启动失败
```bash
# 查看日志
docker-compose logs

# 重启
docker-compose down
docker-compose up -d
```

---

## 🎯 成功后的状态

```
网站：https://vpnspan.com ✅
状态：在线，HTTPS
数据：Mock数据（明天配置真实VPN）
服务器：Digital Ocean $6/月
位置：美国

下一步：
- 明天：申请联盟计划
- 明天：配置第一个VPN（Surfshark）
- 周末：添加更多VPN
```

---

**现在开始！** 先提交代码到GitHub！

```powershell
cd C:\agent项目\vpnspan
git init
git add .
git commit -m "feat: initial commit"
```
