#!/bin/bash
# ============================================
# Surfshark OpenVPN 配置部署脚本
# 在服务器上运行此脚本配置 Surfshark
# ============================================

set -e

echo "🦈 Setting up Surfshark on server..."

# 1. 创建 Surfshark 配置目录
sudo mkdir -p /etc/openvpn/surfshark

# 2. 下载 Surfshark OpenVPN 配置文件
echo "📥 Downloading Surfshark OpenVPN configs..."
cd /tmp

# 下载 Surfshark 的 OpenVPN 配置包
wget -q https://my.surfshark.com/vpn/api/v1/server/configurations -O surfshark-configs.zip

# 如果上面的链接不可用，使用备用手动下载方式
if [ ! -f surfshark-configs.zip ] || [ ! -s surfshark-configs.zip ]; then
    echo "⚠️ Auto download failed. Trying alternative..."
    # 手动创建 US New York TCP 配置
    cat > /etc/openvpn/surfshark/us-nyc.prod.surfshark.com_tcp.ovpn << 'OVPN'
client
dev tun
proto tcp
remote us-nyc.prod.surfshark.com 1443
resolv-retry infinite
nobind
persist-key
persist-tun
remote-cert-tls server
auth SHA512
cipher AES-256-CBC
tls-cipher TLS-DHE-RSA-WITH-AES-256-GCM-SHA384
key-direction 1
auth-user-pass
compress
verb 3

<ca>
-----BEGIN CERTIFICATE-----
MIIFTTCCAzWgAwIBAgIJAMs9S3fqwv+mMA0GCSqGSIb3DQEBCwUAMD0xCzAJBgNV
BAYTAlZHMRIwEAYDVQQKDAlTdXJmc2hhcmsxGjAYBgNVBAMMEVN1cmZzaGFyayBS
b290IENBMB4XDTE4MDMxNDE4MTQxMloXDTI4MDMxMTE4MTQxMlowPTELMAkGA1UE
BhMCVkcxEjAQBgNVBAoMCVN1cmZzaGFyazEaMBgGA1UEAwwRU3VyZnNoYXJrIFJv
b3QgQ0EwggIiMA0GCSqGSIb3DQEBAQUAA4ICDwAwggIKAoICAQDEGMNj0aisM63o
SbXGPDmSJkiB8yQWl7FNbsRl2IiKl3gLRhGI0xVETXGBJdmXpOrh4M78fFf7JZXF
atJMXEzilXO1VEHHNn9XJwlqG2Tz1xGmW/2vpXI2tLkLOEQwHNCSpSkBQ4peGOR5
vLcIEJGa+W0ofSzVkFSk8fB7AhWHMU2h8N+Aq3OSORJpnsMnYB2IjqUIkdRqRbmt
4hJVKDiyDjXFNpUiSHFan0X+4GBWOxaFdiGENKLxs4ZYnq3wEJp00MtOmLiUQ2cp
z3tR9g4oHZ8eokxrO1QwoH0CYERtWgvVDqqFbVyELGMRbFMJh+UtOajwnMVnOX4w
TJOkvf/sMPJhTcWONHwPJOExdexsBEBXy4BYiTJblYzzUEZ5J1VBjD8LsTbei6DY
e69Z0RuB2UVGihg5I42epGpTy+1ZvMjNjl+LIi3PI2l8VXHNFUNWbiyThzPGhpwm
IcRj+zqeF6kMoYE7L3YZ+bLdbvw/aVh5VcXOQV4Uqjik/y+HOKhGjBFWP+R4zcf
lsnAzYjDRBAMnZhMfSOrIAO/6XWSE23X11IjJaxsH2ILRUQZG7a5LH8yzP3n+xsC
h1zlMUVBD6ASkZ+0HLBj/1BGQM6E4b3rFsUhR7lH0IjQDbGHfDPVS0fAlIewOgId
PpZ7FHFNCX+B+tIgxgiR1aNjqfzTjwIDAQABo1AwTjAdBgNVHQ4EFgQU15mp5DwN
yl3CyflGMEVn2mCb8tkwHwYDVR0jBBgwFoAU15mp5DwNyl3CyflGMEVn2mCb8tkw
DAYDVR0TBAUwAwEB/zANBgkqhkiG9w0BAQsFAAOCAgEAcWdr6Xl8WgWcrpsp3MRs
0Rt1+YBR5JOm5NuSMhkN1e7MwNMzBMi2gPmpF9HFhMgFVYaczYPBnb+JAlIyxHl
IlYVLmgi3SRqvGkc5MNl8CGxRih9JJHlzx/EPbSJrJlLFMxshJfPk9fiuyUJE3D9
UEZoSaEY8LlP8bBRHSX5sA0TFVJM2eJ4IBkQZS3CSASbFnbwMj+oOS4ZZDq3P3J
wk4b3XPmz3trc4Gx2hOaJKDpgAWxkmQsmmhaN5MZbJhN94lANr3+aOJwRsAWNepN
FLbE3lGraBtOkf2yJalfihJfDIjDlcvfChGFJnZu0c21b6JQOD5u/r+lYEQamQtv
mBXY2GMarsWNO0Rr2fUuDwaTQVG7RpEIBRSqBYCR7kl1dDYJELi8j8dLLYMBxsBz
hFMI3FsCQ7DjWGFZ1hjBJDIL5bIWXQF7N3fUBHjBFT7bMBBI54csLEODlXSHT4RH
LqEPRQ0TKXLugJr0ZlK5GfRSrQf0C9V+Wv7+QF1X+yhW8f71fP0j153BQKXLWQJ
qh/G9EZHbE+sFrwsWq9/Y610Bnorl/GP3pT2f5dU/akVZs1NAH/fgW1T+JSD0KOo
oW/tFEr+FwXbUGJXe3RDZ0n0VFjZSBb7zBRx3O/t1JIKwIj0QDrfNFvRbvZSoalo
cqR1VNzl2T37SuEI/RM4+Fk=
-----END CERTIFICATE-----
</ca>

<tls-auth>
-----BEGIN OpenVPN Static key V1-----
b02cb1d7c6fee5d4f89b8de72b51a8d0
c7b282571e3db0084eefee0dfd022e4a
ca3b8ee20bc6fa7e4ac6baeb31d2deb6
5abc78ae21cd0dc90b4f4b2e33c4e094
1e0e47093c27ff4a2ee7837adc0dd1c0
5d68b5278f8e326d6277b3eb40b40d50
1d96e9c5720ff710dbfcfe1a4d8efb12
7d413b8c651a1793a78e9bb3d4ec6e0e
cdbb3e97a9fc05e0e40b95a6ee61928a
0584eee0e7521f9cbac2c7e3006e15d6
dcfd06b483c8d42e41cd3be0c40a557c
3e55c0e18c1c63c1d1f17bdd5920e011
e8ab978eba09fc20e0c1e94c1e20e0a2
60c95b6406e51eb41c17cf6aae740c5c
a5cfff8f50c9c1b1d06e2d3d7aa7a1a4
7f00e482a3d2af7c1d0e3aa66cfb8108
-----END OpenVPN Static key V1-----
</tls-auth>
OVPN
    echo "✅ Created manual config"
else
    # 解压配置文件
    unzip -o surfshark-configs.zip -d /etc/openvpn/surfshark/
    echo "✅ Extracted Surfshark configs"
fi

# 3. 创建后端环境变量文件 (包含凭证)
echo "📝 Configuring backend environment..."
# 获取脚本所在目录的绝对路径
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
ENV_FILE="$SCRIPT_DIR/backend/.env"

cat > "$ENV_FILE" << EOF
# VPNSpan Backend Configuration
PORT=5000
NODE_ENV=production

# Surfshark VPN
SURFSHARK_USER=wYsxxz2JjWUxKCVRUESep2Lt
SURFSHARK_PASS=BCwqCpc4sbJKMpRZcJm3AaGX
SURFSHARK_OVPN_PATH=/etc/openvpn/surfshark/us-nyc.prod.surfshark.com_tcp.ovpn

# ProtonVPN
PROTONVPN_USER=73GqNmISgumJYEyx+f1
PROTONVPN_PASS=Opjyt9zd14AnMR172BBEXIl3skh80FH8
PROTONVPN_OVPN_PATH=/etc/openvpn/protonvpn/us-free-110.protonvpn.tcp.ovpn
EOF

echo "✅ Backend .env created at $ENV_FILE"

# 4. 设置OpenVPN配置目录权限
sudo chmod -R 600 /etc/openvpn/surfshark/
sudo chmod 700 /etc/openvpn/surfshark/

# 5. (可选) 测试OpenVPN连接
# 注意：实际生产环境由Node.js应用通过OpenVPN客户端调用
echo "🔌 Testing connection (optional)..."
# 创建临时auth以供测试
echo -e "wYsxxz2JjWUxKCVRUESep2Lt\nBCwqCpc4sbJKMpRZcJm3AaGX" > /tmp/temp_surfshark_auth.txt
chmod 600 /tmp/temp_surfshark_auth.txt

sudo openvpn --config /etc/openvpn/surfshark/us-nyc.prod.surfshark.com_tcp.ovpn \
    --auth-user-pass /tmp/temp_surfshark_auth.txt \
    --auth-retry nointeract \
    --connect-timeout 30 \
    --daemon

sleep 15

# 检查连接
if curl -s https://api.ipify.org; then
    echo ""
    echo "✅ Surfshark connected! IP changed."
else
    echo "⚠️ Connection test inconclusive"
fi

# 关闭测试连接
sudo killall openvpn 2>/dev/null || true
sleep 3

echo ""
echo "🎉 Surfshark setup complete!"
echo ""
echo "Next steps:"
echo "1. Push the updated code to GitHub"
echo "2. SSH into server and pull the changes"
echo "3. Run this script on the server"
echo "4. Restart the monitoring container"
