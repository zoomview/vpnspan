#!/bin/bash
set -e

echo "🔧 Fixing Configuration & Credentials..."

# 1. 确认目录
cd /var/www/vpnspan || { echo "❌ Directory not found"; exit 1; }

# 2. 写入 .env 文件
echo "📝 Writing backend/.env..."
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

echo "✅ Environment file created."

# 3. 检查文件是否存在
ls -l backend/.env

# 4. 重启 Docker 容器以加载新配置
echo "♻️ Restarting backend container..."
docker-compose up -d backend

# 5. 立即查看日志
echo "📜 Checking logs (Ctrl+C to exit)..."
docker-compose logs -f backend
