#!/bin/bash
set -e

echo "🔧 Starting VPNSpan Architecture Fix..."

# 1. 确保在正确目录
cd /var/www/vpnspan || { echo "❌ Directory /var/www/vpnspan not found!"; exit 1; }

# 2. 拉取最新代码 (包含 docker-compose.yml 的修复)
echo "📥 Pulling latest code..."
git fetch origin master
git reset --hard origin/master

# 3. 确保宿主机 OpenVPN 目录存在 (避免Docker自动创建为root目录)
if [ ! -d "/etc/openvpn/surfshark" ]; then
    echo "⚠️ Warning: /etc/openvpn/surfshark not found. Running setup script..."
    bash setup-surfshark.sh
fi

# 4. 彻底重建容器 (不使用缓存，确保新依赖和配置生效)
echo "🏗️ Rebuilding backend container (NO CACHE)..."
docker-compose down
docker-compose build --no-cache backend

# 5. 启动服务
echo "🚀 Starting services..."
docker-compose up -d

# 6. 等待启动并检查日志
echo "⏳ Waiting 10s for service initialization..."
sleep 10

echo "🔍 Checking logs for 'Starting VPN monitoring'..."
if docker-compose logs backend | grep -q "Starting VPN monitoring"; then
    echo "✅ SUCCESS: Monitoring started successfully!"
    echo "🎉 Architecture fix applied."
else
    echo "⚠️ WARNING: Monitoring log not found yet. Showing tail logs:"
    docker-compose logs --tail=20 backend
fi
