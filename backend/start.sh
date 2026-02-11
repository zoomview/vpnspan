#!/bin/bash

# 启动API服务器（后台运行）
echo "🚀 Starting VPNSpan API Server..."
node server.js &

# 等待几秒钟让服务器启动
sleep 5

# 启动VPN监控调度器（前台运行，保持容器存活）
echo "🔄 Starting VPN Monitor Scheduler..."
node monitor/scheduler.js
