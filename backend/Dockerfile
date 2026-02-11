# 后端Dockerfile
FROM node:18-alpine

WORKDIR /app

# 安装依赖
COPY package*.json ./
RUN npm ci --only=production

# 安装OpenVPN和必要的测试工具
RUN apk add --no-cache \
    openvpn \
    python3 \
    py3-pip \
    bash \
    procps \
    iproute2 \
    curl

# 安装speedtest-cli (使用Ookla官方版本或pip版本)
# 这里使用pip安装speedtest-cli，因为它更轻量且兼容性好
RUN pip3 install speedtest-cli

# 复制源代码
COPY . .

# 创建数据目录
RUN mkdir -p /app/data/history

# 创建必要的TUN设备节点（如果宿主机未共享）以及配置目录
RUN mkdir -p /dev/net && \
    if [ ! -c /dev/net/tun ]; then \
    mknod /dev/net/tun c 10 200; \
    fi

EXPOSE 5000

# 添加启动脚本权限
COPY start.sh .
RUN chmod +x start.sh

CMD ["./start.sh"]
