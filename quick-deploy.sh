#!/bin/bash

# VPNSpan 应用快速部署
# 在 /var/www/vpnspan 目录执行

set -e

echo "=========================================="
echo "部署VPNSpan应用"
echo "=========================================="

# 1. 配置环境变量
echo "⚙️  配置环境变量..."
cd /var/www/vpnspan/backend
cat > .env <<EOF
PORT=5000
NODE_ENV=production
EOF
echo "✅ 环境变量已配置"

# 2. 启动Docker容器
echo "🐳 启动Docker容器..."
cd /var/www/vpnspan
docker-compose up -d --build

# 3. 等待容器启动
echo "⏳ 等待容器启动..."
sleep 15

# 4. 检查容器状态
echo "📊 容器状态："
docker-compose ps

# 5. 配置Nginx
echo "🌐 配置Nginx..."
cat > /etc/nginx/sites-available/vpnspan <<'NGINX_EOF'
server {
    listen 80;
    server_name vpnspan.com www.vpnspan.com _;
    
    # 前端
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }
    
    # API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
NGINX_EOF

# 启用站点
rm -f /etc/nginx/sites-enabled/default
ln -sf /etc/nginx/sites-available/vpnspan /etc/nginx/sites-enabled/

# 测试并重启Nginx
nginx -t
systemctl restart nginx

echo ""
echo "=========================================="
echo "✅ 应用部署完成！"
echo "=========================================="
echo ""
echo "🌐 HTTP访问测试："
echo "   http://146.190.133.213"
echo ""
echo "📊 容器日志："
echo "   docker-compose logs -f"
echo ""
echo "🔒 下一步配置SSL（DNS生效后）："
echo "   bash /var/www/vpnspan/setup-ssl.sh"
echo ""
