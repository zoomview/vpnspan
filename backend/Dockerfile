FROM ubuntu:22.04

# 避免交互式前端报错
ENV DEBIAN_FRONTEND=noninteractive

WORKDIR /app

# 1. 更新源并安装基础工具
RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    ca-certificates \
    iproute2 \
    procps \
    unzip \
    wget \
    openvpn \
    python3 \
    && rm -rf /var/lib/apt/lists/*

# 2. 安装 Node.js 18.x (来自 NodeSource)
RUN mkdir -p /etc/apt/keyrings && \
    curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg && \
    echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_18.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list && \
    apt-get update && apt-get install -y nodejs && \
    rm -rf /var/lib/apt/lists/*

# 3. 安装官方 Ookla Speedtest CLI (替代不稳定的 pip 版本)
RUN curl -s https://packagecloud.io/install/repositories/ookla/speedtest-cli/script.deb.sh | bash && \
    apt-get install -y speedtest && \
    rm -rf /var/lib/apt/lists/*

# 4. 创建必要的目录和设备节点
RUN mkdir -p /app/data/history /dev/net
# 尝试创建 tun 设备，如果失败也不报错（因为是在构建阶段）
RUN mknod /dev/net/tun c 10 200 || true

# 5. 安装 Node 依赖
COPY package*.json ./
RUN npm ci --only=production

# 6. 复制源代码和启动脚本
COPY . .
RUN chmod +x start.sh

EXPOSE 5000

CMD ["./start.sh"]
