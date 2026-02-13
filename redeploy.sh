#!/bin/bash
set -e

echo "🚀 Starting Force Redeploy..."

# 1. 进入正确目录
cd /var/www/vpnspan
echo "📂 Changed directory to $(pwd)"

# 2. 拉取最新代码
echo "📥 Pulling latest code..."
git fetch origin master
git reset --hard origin/master

# 3. 强制无缓存构建 (关键步骤)
echo "🏗️ Building backend (NO CACHE)..."
docker-compose build --no-cache backend

# 4. 重启服务
echo "♻️ Restarting backend..."
docker-compose up -d backend

# 5. 等待服务启动
echo "⏳ Waiting for service to start..."
sleep 5

# 6. 显示日志
echo "📜 Showing logs (Press Ctrl+C to exit)..."
docker-compose logs -f backend
