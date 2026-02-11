#!/bin/bash
set -e

echo "🔄 Performing Full System Reset & Deploy..."

# 1. 进入目录
cd /var/www/vpnspan || { echo "❌ Directory not found"; exit 1; }

# 2. 拉取最新代码
echo "📥 Pulling latest code..."
git fetch origin master
git reset --hard origin/master

# 3. 授权脚本
chmod +x backend/start.sh
chmod +x setup-surfshark.sh

# 4. 强制无缓存重建后端
echo "🏗️ Rebuilding backend (NO CACHE)..."
docker-compose down
docker-compose build --no-cache backend

# 5. 启动服务
echo "🚀 Starting services..."
docker-compose up -d

# 6. 检查日志
echo "⏳ Waiting for services..."
sleep 5
echo "📜 backend logs:"
docker-compose logs --tail=50 -f backend
