@echo off
echo ========================================
echo VPNSpan 监控服务 (管理员模式)
echo ========================================
echo.

cd /d "%~dp0backend"

echo 正在启动VPN监控...
echo.

npm run monitor

pause
