#!/bin/bash

# VPNSpan 应用部署脚本
# 在 /var/www/vpnspan 目录运行

set -e

echo "=========================================="
echo "部署VPNSpan应用"
echo "=========================================="
echo ""

# 检查是否在正确目录
if [ ! -f "docker-compose.yml" ]; then
    echo "❌ 错误：请在项目根目录运行此脚本"
    exit 1
fi

# 1. 配置环境变量
echo "⚙️  配置环境变量..."
if [ ! -f "backend/.env" ]; then
    cp backend/.env.example backend/.env
    echo "⚠️  请编辑 backend/.env 添加VPN凭证"
    echo "   运行: nano backend/.env"
    read -p "配置完成后按Enter继续..."
fi

# 2. 构建并启动容器
echo "🐳 构建并启动Docker容器..."
docker-compose down 2>/dev/null || true
docker-compose up -d --build

# 3. 等待服务启动
echo "⏳ 等待服务启动..."
sleep 10

# 4. 检查服务状态
echo "📊 检查服务状态..."
docker-compose ps

# 5. 配置Nginx
echo "🌐 配置Nginx反向代理..."
cat > /etc/nginx/sites-available/vpnspan <<'EOF'
server {
    listen 80;
    server_name vpnspan.com www.vpnspan.com;
    
    # 安全头
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    add_header X-XSS-Protection "1; mode=block";
    
    # 前端
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
    }
    
    # API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
EOF

# 启用站点
rm -f /etc/nginx/sites-enabled/vpnspan
ln -s /etc/nginx/sites-available/vpnspan /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default  # 删除默认站点

# 测试Nginx配置
nginx -t

# 重启Nginx
systemctl restart nginx

echo ""
echo "=========================================="
echo "✅ 应用部署完成！"
echo "=========================================="
echo ""
echo "📊 服务状态："
docker-compose ps
echo ""
echo "🌐 访问测试："
echo "   HTTP: http://$(curl -s ifconfig.me)"
echo ""
echo "🔒 下一步："
echo "   1. 确认DNS已指向此服务器"
echo "   2. 运行SSL配置: bash /var/www/vpnspan/setup-ssl.sh"
echo ""
