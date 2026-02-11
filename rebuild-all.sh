#!/bin/bash
set -e

echo "🏗️ Starting Component Rebuild (Ubuntu-based)..."

# 1. 切换目录
cd /var/www/vpnspan || { echo "❌ Directory not found"; exit 1; }

# 2. 强制同步代码
echo "📥 Syncing code..."
git fetch origin master
git reset --hard origin/master

# 3. 赋予脚本执行权限
chmod +x backend/start.sh
chmod +x setup-surfshark.sh

# 4. 停止旧容器
echo "🛑 Stopping old containers..."
docker-compose down

# 5. 彻底清洁构建 (利用新Dockerfile)
echo "🔨 Building backend (Ubuntu Base)..."
# 使用 --no-cache 确保重新下载所有 apt 依赖
docker-compose build --no-cache backend

# 6. 启动服务
echo "🚀 Starting services..."
docker-compose up -d

# 7. 日志验证
echo "⏳ Waiting 10s for initialization..."
sleep 10

echo "🔍 Checking logs..."
docker-compose logs --tail=20 backend

echo ""
echo "✅ Rebuild Complete. If you see 'VPNSpan API server running' and 'Monitoring Scheduler Started', it works!"
