# VPNSpan 部署命令速查

## 服务器信息
```
IP: 146.190.133.213
域名: vpnspan.com
仓库: https://github.com/zoomview/vpnspan
```

---

## 📋 立即执行（复制粘贴）

### 1. 配置DNS（在域名管理处）

```
添加A记录：
类型: A
主机: @
值: 146.190.133.213
TTL: 600

类型: A
主机: www
值: 146.190.133.213
TTL: 600
```

**验证DNS生效**（5-30分钟）：
```powershell
nslookup vpnspan.com
# 应该返回 146.190.133.213
```

---

### 2. SSH连接服务器

```bash
ssh root@146.190.133.213
```

如果是Windows PowerShell：
```powershell
ssh root@146.190.133.213
```

**首次连接会提示**：
```
The authenticity of host '146.190.133.213' can't be established.
Are you sure you want to continue connecting (yes/no)?
```
输入：`yes`

---

### 3. 快速部署（推荐）

**方法A：一键部署（所有步骤自动化）**

```bash
# 1. 克隆代码
cd /var/www
git clone https://github.com/zoomview/vpnspan.git
cd vpnspan

# 2. 执行完整部署
chmod +x deploy-complete.sh
bash deploy-complete.sh
```

当提示配置DNS时，按照上面的DNS配置完成后按Enter继续。

---

**方法B：分步部署（推荐，便于排错）**

```bash
# SSH到服务器后执行：

# 1. 克隆代码
cd /var/www
git clone https://github.com/zoomview/vpnspan.git
cd vpnspan

# 2. 安装环境（5分钟）
chmod +x deploy-server.sh
bash deploy-server.sh

# 3. 配置环境变量
nano backend/.env
# 按Ctrl+X, Y, Enter保存（或直接保存空文件）

# 4. 部署应用（3分钟）
chmod +x deploy-app.sh
bash deploy-app.sh

# 5. 测试HTTP访问
curl http://146.190.133.213
# 应该看到HTML内容

# 6. 配置SSL（确保DNS已生效）
chmod +x setup-ssl.sh
bash setup-ssl.sh
# 输入域名：vpnspan.com
```

---

### 4. 验证部署

```bash
# 检查Docker容器
docker-compose ps

# 应该看到：
# vpnspan_frontend_1  up
# vpnspan_backend_1   up

# 查看日志
docker-compose logs backend | tail -20

# 测试API
curl http://localhost:5000/api/health
```

---

### 5. 浏览器访问

```
HTTP (临时): http://146.190.133.213
HTTPS (DNS生效后): https://vpnspan.com
```

---

## 🐛 故障排查

### DNS未生效
```bash
# 检查DNS
dig vpnspan.com

# 暂时用IP访问
curl http://146.190.133.213
```

### 容器未启动
```bash
# 查看详细日志
docker-compose logs

# 重启容器
docker-compose down
docker-compose up -d
```

### SSL申请失败
```bash
# 确认DNS已生效
ping vpnspan.com

# 重新申请SSL
bash setup-ssl.sh
```

### 端口被占用
```bash
# 检查端口
netstat -tulpn | grep :80
netstat -tulpn | grep :3000

# 停止冲突服务
systemctl stop apache2
```

---

## ✅ 部署成功标志

- [ ] SSH能连接到 146.190.133.213
- [ ] Git代码克隆成功
- [ ] Docker容器运行正常
- [ ] curl http://146.190.133.213 返回HTML
- [ ] DNS解析到 146.190.133.213
- [ ] HTTPS访问正常：https://vpnspan.com
- [ ] API正常：https://vpnspan.com/api/health

---

## 🎯 部署完成后

```bash
# 查看服务状态
docker-compose ps

# 实时查看日志
docker-compose logs -f backend

# 重启服务
docker-compose restart

# 停止服务
docker-compose down

# 启动服务
docker-compose up -d
```

---

**现在开始！先配置DNS，然后SSH到服务器！**

```bash
ssh root@146.190.133.213
```
