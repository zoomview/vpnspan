#!/bin/bash
set -e

echo "🧹 Cleaning up corrupted Docker state (Fixing 'ContainerConfig' error)..."

# 1. 进入项目目录
cd /var/www/vpnspan || { echo "❌ Directory not found"; exit 1; }

# 2. 强力停止并删除旧容器 (不管是否存在)
# 这是解决 KeyError 的关键步骤：必须手动删除容器，不能依赖 docker-compose down
echo "🗑️ Removing old backend container..."
docker stop vpnspan_backend_1 2>/dev/null || true
docker rm -f vpnspan_backend_1 2>/dev/null || true

# 3. 清理相关镜像 (确保完全重新构建)
echo "🗑️ Removing old backend image..."
docker rmi vpnspan-backend 2>/dev/null || true
docker rmi vpnspan_backend 2>/dev/null || true

# 4. 再次确保 .env 存在 (以防万一)
if [ ! -f backend/.env ]; then
    echo "⚠️ .env missing, executing configuration fix..."
    # 写入 .env 文件
    cat > backend/.env << 'EOF'
PORT=5000
NODE_ENV=production
SURFSHARK_USER=wYsxxz2JjWUxKCVRUESep2Lt
SURFSHARK_PASS=BCwqCpc4sbJKMpRZcJm3AaGX
SURFSHARK_OVPN_PATH=/etc/openvpn/surfshark/us-nyc.prod.surfshark.com_tcp.ovpn
PROTONVPN_USER=73GqNmISgumJYEyx+f1
PROTONVPN_PASS=Opjyt9zd14AnMR172BBEXIl3skh80FH8
PROTONVPN_OVPN_PATH=/etc/openvpn/protonvpn/us-free-110.protonvpn.tcp.ovpn
EOF
fi

# 5. 重新构建并启动 (无缓存)
echo "🚀 Rebuilding and Starting (Ubuntu Base)..."
docker-compose build --no-cache backend
docker-compose up -d backend

# 6. 查看日志
echo "📜 Showing logs (Press Ctrl+C to exit)..."
docker-compose logs -f backend
