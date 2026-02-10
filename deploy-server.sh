#!/bin/bash

# VPNSpan Digital Ocean 快速部署脚本
# 在新创建的Droplet上运行此脚本

set -e  # 遇到错误立即停止

echo "=========================================="
echo "VPNSpan 自动部署脚本"
echo "=========================================="
echo ""

# 1. 更新系统
echo "📦 更新系统packager..."
apt update && apt upgrade -y

# 2. 安装Docker
echo "🐳 安装Docker..."
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    rm get-docker.sh
    echo "✅ Docker已安装"
else
    echo "⏭️  Docker已存在"
fi

# 3. 安装Docker Compose
echo "🐳 安装Docker Compose..."
if ! command -v docker-compose &> /dev/null; then
    apt install docker-compose -y
    echo "✅ Docker Compose已安装"
else
    echo "⏭️  Docker Compose已存在"
fi

# 4. 安装Nginx
echo "🌐 安装Nginx..."
if ! command -v nginx &> /dev/null; then
    apt install nginx -y
    echo "✅ Nginx已安装"
else
    echo "⏭️  Nginx已存在"
fi

# 5. 安装Certbot（SSL证书）
echo "🔒 安装Certbot..."
if ! command -v certbot &> /dev/null; then
    apt install certbot python3-certbot-nginx -y
    echo "✅ Certbot已安装"
else
    echo "⏭️  Certbot已存在"
fi

# 6. 安装OpenVPN（VPN测试需要）
echo "🔐 安装OpenVPN..."
if ! command -v openvpn &> /dev/null; then
    apt install openvpn -y
    echo "✅ OpenVPN已安装"
else
    echo "⏭️  OpenVPN已存在"
fi

# 7. 安装speedtest-cli（速度测试需要）
echo "⚡ 安装speedtest-cli..."
if ! command -v speedtest-cli &> /dev/null; then
    apt install python3-pip -y
    pip3 install speedtest-cli
    echo "✅ speedtest-cli已安装"
else
    echo "⏭️  speedtest-cli已存在"
fi

# 8. 创建项目目录
echo "📁 创建项目目录..."
mkdir -p /var/www/vpnspan
mkdir -p /etc/vpn-configs

# 9. 配置防火墙
echo "🔥 配置防火墙..."
ufw allow 22/tcp   # SSH
ufw allow 80/tcp   # HTTP
ufw allow 443/tcp  # HTTPS
ufw --force enable

echo ""
echo "=========================================="
echo "✅ 基础环境安装完成！"
echo "=========================================="
echo ""
echo "下一步："
echo "1. 上传项目代码到 /var/www/vpnspan"
echo "2. 配置环境变量"
echo "3. 启动Docker容器"
echo "4. 配置Nginx和SSL"
echo ""
echo "运行: bash /var/www/vpnspan/deploy-app.sh"
echo ""
