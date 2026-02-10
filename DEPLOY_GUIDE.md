# VPNSpan Digital Ocean 快速部署指南

## 🚀 30分钟快速上线

### 第一步：创建Droplet（5分钟）

1. **登录Digital Ocean**
   - 访问：https://cloud.digitalocean.com

2. **创建新Droplet**
   - 点击 "Create" → "Droplets"

3. **选择配置**：
   ```
   镜像：Ubuntu 22.04 LTS
   套餐：Basic
   CPU选项：Regular
   大小：$6/月（1GB / 1 CPU / 25GB SSD）
   
   数据中心：
   - 推荐：美国旧金山（SFO3）
   - 备选：纽约（NYC3）或洛杉矶
   
   认证：SSH密钥（推荐）或密码
   
   主机名：vpnspan
   ```

4. **点击 "Create Droplet"**

5. **记录信息**：
   ```
   IP地址：[记下来]
   用户名：root
   密码/SSH密钥：[你设置的]
   ```

---

### 第二步：配置DNS（5分钟）

1. **访问域名管理**
   - 你的vpnspan.com域名注册商

2. **添加A记录**：
   ```
   类型：A
   主机：@
   值：[Droplet的IP地址]
   TTL：600

   类型：A
   主机：www
   值：[Droplet的IP地址]
   TTL：600
   ```

3. **验证DNS**（5-30分钟生效）：
   ```bash
   # Windows PowerShell
   nslookup vpnspan.com
   
   # 应该显示你的服务器IP
   ```

---

### 第三步：上传代码（5分钟）

#### 方法A：使用Git（推荐）

```bash
# 1. 本地提交代码
cd C:\agent项目\vpnspan
git init
git add .
git commit -m "Initial commit"

# 2. 推送到GitHub/GitLab（如果还没有仓库）
# 创建GitHub仓库后：
git remote add origin https://github.com/yourusername/vpnspan.git
git push -u origin main

# 3. 在服务器克隆
ssh root@[服务器IP]
cd /var/www
git clone https://github.com/yourusername/vpnspan.git
```

#### 方法B：使用SCP（直接上传）

```powershell
# Windows PowerShell
# 压缩项目
Compress-Archive -Path C:\agent项目\vpnspan\* -DestinationPath C:\vpnspan.zip

# 上传到服务器
scp C:\vpnspan.zip root@[服务器IP]:/var/www/

# SSH到服务器
ssh root@[服务器IP]

# 解压
cd /var/www
apt install unzip -y
unzip vpnspan.zip -d vpnspan
cd vpnspan
```

---

### 第四步：运行部署脚本（10分钟）

```bash
# SSH到服务器
ssh root@[服务器IP]

# 1. 安装基础环境
cd /var/www/vpnspan
chmod +x deploy-server.sh
bash deploy-server.sh

# 等待5分钟，自动安装Docker、Nginx等

# 2. 配置VPN凭证
nano backend/.env

# 编辑内容（暂时可以留空，后面再配置）：
# PORT=5000
# NODE_ENV=production

# 按Ctrl+X，然后Y，然后Enter保存

# 3. 部署应用
chmod +x deploy-app.sh
bash deploy-app.sh

# 4. 配置SSL证书
chmod +x setup-ssl.sh
bash setup-ssl.sh
# 输入域名：vpnspan.com

# 等待证书申请完成
```

---

### 第五步：验证部署（5分钟）

```bash
# 1. 检查Docker容器
docker-compose ps

# 应该看到：
# vpnspan_frontend_1  up
# vpnspan_backend_1   up

# 2. 检查日志
docker-compose logs backend | tail -20

# 3. 访问网站
curl https://vpnspan.com

# 4. 浏览器访问
# https://vpnspan.com
```

---

## ✅ 部署成功检查清单

- [ ] Droplet已创建，IP地址已记录
- [ ] DNS A记录已添加，可以ping通
- [ ] 代码已上传到 /var/www/vpnspan
- [ ] Docker容器运行正常
- [ ] Nginx反向代理配置完成
- [ ] SSL证书申请成功
- [ ] 可以通过 https://vpnspan.com 访问
- [ ] API健康检查：https://vpnspan.com/api/health 返回200

---

## 🐛 常见问题

### 问题1：DNS未生效

```bash
# 症状：certbot报错找不到域名
# 解决：等待DNS生效（最多24小时，通常5-30分钟）

# 检查DNS：
dig vpnspan.com

# 暂时用IP访问测试：
curl http://[服务器IP]
```

### 问题2：端口被占用

```bash
# 检查端口
netstat -tulpn | grep :80
netstat -tulpn | grep :3000
netstat -tulpn | grep :5000

# 停止占用服务
systemctl stop apache2  # 如果有
docker-compose down
docker-compose up -d
```

### 问题3：容器无法启动

```bash
# 查看详细日志
docker-compose logs frontend
docker-compose logs backend

# 重建容器
docker-compose down
docker-compose up -d --build
```

### 问题4：内存不足

```bash
# 检查内存使用
free -h

# 如果内存不够，添加swap：
fallocate -l 1G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab
```

---

## 📊 部署后监控

### 检查服务状态

```bash
# 容器状态
docker-compose ps

# 系统资源
htop

# 磁盘空间
df -h

# 后端日志
docker-compose logs -f backend
```

### 重启服务

```bash
# 重启所有容器
docker-compose restart

# 仅重启backend
docker-compose restart backend

# 重启Nginx
systemctl restart nginx
```

---

## 🔒 安全加固（可选，部署后做）

```bash
# 1. 修改SSH端口
nano /etc/ssh/sshd_config
# 修改 Port 22 为 Port 2222
systemctl restart sshd

# 2. 禁用root密码登录（确保SSH密钥已配置）
nano /etc/ssh/sshd_config
# 设置 PermitRootLogin without-password
systemctl restart sshd

# 3. 配置fail2ban防暴力破解
apt install fail2ban -y
systemctl enable fail2ban
```

---

## 🎯 部署时间估算

```
创建Droplet：5分钟
配置DNS：5分钟（等待生效：5-30分钟）
上传代码：5分钟
运行脚本：10分钟
验证测试：5分钟

总计：30分钟（不含DNS等待）
```

---

## 📞 需要帮助？

如果部署过程遇到问题：

1. 查看错误日志：`docker-compose logs`
2. 检查服务状态：`docker-compose ps`
3. 重新运行脚本：`bash deploy-app.sh`
4. 联系我提供错误信息

---

**现在开始！登录Digital Ocean创建Droplet！** 🚀
