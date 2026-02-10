#!/bin/bash

# VPNSpan SSL证书配置脚本
# 配置Let's Encrypt免费SSL证书

set -e

echo "=========================================="
echo "配置SSL证书"
echo "=========================================="
echo ""

# 检查域名
read -p "请输入域名（例如：vpnspan.com）: " DOMAIN

if [ -z "$DOMAIN" ]; then
    echo "❌ 域名不能为空"
    exit 1
fi

# 检查DNS是否指向此服务器
SERVER_IP=$(curl -s ifconfig.me)
DOMAIN_IP=$(dig +short $DOMAIN | tail -1)

echo "服务器IP: $SERVER_IP"
echo "域名IP: $DOMAIN_IP"

if [ "$SERVER_IP" != "$DOMAIN_IP" ]; then
    echo "⚠️  警告：域名DNS尚未指向此服务器"
    read -p "是否继续？(y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# 配置SSL
echo "🔒 申请SSL证书..."
certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN

# 设置自动续期
echo "⏰ 配置自动续期..."
(crontab -l 2>/dev/null; echo "0 3 * * * certbot renew --quiet") | crontab -

echo ""
echo "=========================================="
echo "✅ SSL配置完成！"
echo "=========================================="
echo ""
echo "🌐 访问网站："
echo "   https://$DOMAIN"
echo "   https://www.$DOMAIN"
echo ""
echo "🔒 证书信息："
certbot certificates
echo ""
