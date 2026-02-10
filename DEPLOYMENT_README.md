# VPNSpan 部署相关文件

## .gitignore 排除说明

这些文件不应该提交到Git仓库：

1. `.env` - 包含敏感的VPN凭证
2. `node_modules/` - 依赖包，很大
3. `data/` - 运行时数据
4. 日志文件和缓存

## 如何使用部署脚本

### 服务器上执行顺序

```bash
# 1. 环境安装
bash deploy-server.sh

# 2. 应用部署
bash deploy-app.sh

# 3. SSL配置
bash setup-ssl.sh
```

### 本地测试脚本

```bash
# Windows上可以使用Git Bash测试脚本语法
# 但不要在Windows上实际执行（只在服务器上执行）
```
