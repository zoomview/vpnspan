#!/bin/bash

# VPNSpan 一键部署脚本 - 完整版
# 服务器IP: 146.190.133.213
# 域名: vpnspan.com

echo "=========================================="
echo "VPNSpan 完整部署流程"
echo "服务器: 146.190.133.213"
echo "=========================================="
echo ""

# 第1步：克隆代码
echo "📦 克隆代码..."
cd /var/www
git clone https://github.com/zoomview/vpnspan.git
cd vpnspan

# 第2步：安装环境
echo "🔧 安装基础环境..."
chmod +x deploy-server.sh
bash deploy-server.sh

# 第3步：配置环境变量
echo "⚙️  配置环境变量..."
cd backend
cp .env.example .env
echo "PORT=5000" >> .env
echo "NODE_ENV=production" >> .env
cd ..

# 第4步：部署应用
echo "🚀 部署应用..."
chmod +x deploy-app.sh
bash deploy-app.sh

# 第5步：等待DNS生效提示
echo ""
echo "⏸️  等待DNS配置..."
echo ""
echo "请在域名管理处添加以下DNS记录："
echo "  类型: A"
echo "  主机: @"
echo "  值: 146.190.133.213"
echo "  TTL: 600"
echo ""
echo "  类型: A"
echo "  主机: www"
echo "  值: 146.190.133.213"
echo "  TTL: 600"
echo ""
read -p "DNS配置完成后按Enter继续..."

# 第6步：配置SSL
echo "🔒 配置SSL证书..."
chmod +x setup-ssl.sh
bash setup-ssl.sh

echo ""
echo "=========================================="
echo "✅ 部署完成！"
echo "=========================================="
echo ""
echo "🌐 访问网站："
echo "   https://vpnspan.com"
echo ""
echo "📊 检查状态："
echo "   docker-compose ps"
echo "   docker-compose logs -f backend"
echo ""
