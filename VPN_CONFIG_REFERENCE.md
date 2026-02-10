# VPN 配置参考文档

## 📋 当前监控的5个VPN服务

### 1. 🏆 ExpressVPN
- **官网**：https://www.expressvpn.com
- **定位**：高端旗舰产品
- **月费**：$12.95（1年套餐约$8.32/月）
- **试用**：30天退款保证
- **佣金**：$36-50/单
- **特点**：
  - ✅ 速度最快，延迟最低
  - ✅ 94个国家，3000+服务器
  - ✅ 流媒体解锁能力最强
  - ✅ 客户端最成熟
  - ⚠️ 价格最贵

**联盟计划**：https://www.expressvpn.com/affiliates

---

### 2. 💎 NordVPN
- **官网**：https://nordvpn.com
- **定位**：高端主流产品
- **月费**：$11.99（2年套餐约$3.99/月）
- **试用**：30天退款保证
- **佣金**：$30-40/单或30%分成
- **特点**：
  - ✅ 用户量最大（1400万+）
  - ✅ 60个国家，5500+服务器
  - ✅ 营销预算高，品牌认知度强
  - ✅ 双重VPN、Onion over VPN等高级功能
  - ⚠️ 速度稍慢于ExpressVPN

**联盟计划**：https://nordvpn.com/affiliate/

---

### 3. ⭐ Surfshark
- **官网**：https://surfshark.com
- **定位**：性价比之王
- **月费**：$2.49/月（2年套餐）
- **试用**：30天退款保证
- **佣金**：$25-35/单
- **特点**：
  - ✅ 价格极低
  - ✅ **无限设备**（最大卖点）
  - ✅ 100个国家，3200+服务器
  - ✅ 增长最快的VPN品牌
  - ⚠️ 速度中等

**联盟计划**：https://surfshark.com/affiliates

---

### 4. 🔒 ProtonVPN
- **官网**：https://protonvpn.com
- **定位**：隐私至上的中端产品
- **月费**：$9.99/月
- **试用**：**免费版永久可用**
- **佣金**：$15-25/单
- **特点**：
  - ✅ 瑞士法律保护
  - ✅ 开源代码，透明审计
  - ✅ 技术派首选
  - ✅ 有免费版（1国家，1设备）
  - ⚠️ 服务器较少（67个国家）

**联盟计划**：https://protonvpn.com/partners

---

### 5. 📍 CyberGhost
- **官网**：https://www.cyberghostvpn.com
- **定位**：入门级性价比产品
- **月费**：$2.19/月（2年套餐）
- **试用**：**45天退款保证**（最长）
- **佣金**：$20-30/单
- **特点**：
  - ✅ 90个国家，**9000+服务器**（最多）
  - ✅ 价格极低
  - ✅ 45天退款期最长
  - ✅ 适合新手
  - ⚠️ 速度和稳定性一般

**联盟计划**：https://www.cyberghostvpn.com/en_US/affiliates

---

## 💰 总成本估算

### 初期测试阶段（利用试用期）
- **成本**：$0
- **时长**：30-45天
- **策略**：利用退款保证测试所有功能

### 正式运营阶段（购买正式订阅）

| VPN | 推荐套餐 | 月均成本 | 年成本 |
|-----|---------|---------|--------|
| ExpressVPN | 1年套餐 | $8.32 | $99.95 |
| NordVPN | 2年套餐 | $3.99 | $47.88 |
| Surfshark | 2年套餐 | $2.49 | $29.88 |
| ProtonVPN | 免费版 | $0 | $0 |
| CyberGhost | 2年套餐 | $2.19 | $26.28 |
| **总计** | - | **$16.99** | **$203.99/年** |

> [!TIP]
> **省钱技巧**：
> - ProtonVPN可以先用免费版（功能受限但可测试）
> - 利用Black Friday/网络星期一折扣购买
> - 购买2年套餐可节省50-70%
> - 实际运营成本：约$200/年

---

## 🔧 测试配置步骤

### 第一步：注册试用账号

每个VPN都提供7-45天试用：

```bash
1. ExpressVPN - 注册账号，30天内可退款
2. NordVPN    - 注册账号，30天内可退款
3. Surfshark  - 注册账号，30天内可退款
4. ProtonVPN  - 直接使用免费版（无需付费）
5. CyberGhost - 注册账号，45天内可退款
```

### 第二步：安装客户端

下载并安装各VPN的Windows客户端：

```
ExpressVPN:  https://www.expressvpn.com/setup
NordVPN:     https://nordvpn.com/download/
Surfshark:   https://surfshark.com/download/windows
ProtonVPN:   https://protonvpn.com/download
CyberGhost:  https://www.cyberghostvpn.com/en_US/apps/vpn-for-windows
```

### 第三步：获取配置文件（用于自动化）

大部分VPN支持OpenVPN配置：

1. **ExpressVPN**：
   - 登录网站 → My Account → Set Up Other Devices
   - 下载.ovpn配置文件

2. **NordVPN**：
   - https://nordvpn.com/ovpn/
   - 下载服务器配置文件

3. **Surfshark**：
   - https://my.surfshark.com/vpn/manual-setup/main
   - 下载OpenVPN配置

4. **ProtonVPN**：
   - https://account.protonvpn.com/downloads
   - 下载OpenVPN配置

5. **CyberGhost**：
   - 客户端内下载配置文件

### 第四步：更新监控脚本

编辑 `backend/monitor/scheduler.js`，添加真实凭证：

```javascript
const VPN_CONFIGS = [
    {
        id: 'expressvpn',
        name: 'ExpressVPN',
        // 添加实际配置
        username: 'your_username',
        password: 'your_password',
        configFile: 'C:/vpn-configs/expressvpn-usa.ovpn',
        enabled: true
    },
    // ... 其他VPN配置
]
```

---

## 📊 联盟营销链接参考

申请联盟计划后，你会获得专属链接，例如：

```
ExpressVPN:  https://www.expressvpn.com/go/youraffid
NordVPN:     https://go.nordvpn.net/aff_c?offer_id=XXX&aff_id=YYYY
Surfshark:   https://surfshark.com/?a_aid=YOURID
ProtonVPN:   https://protonvpn.com/?ref=YOURID
CyberGhost:  https://www.cyberghostvpn.com/?offer=XXXX
```

这些链接需要集成到前端的"查看详情"按钮中。

---

## 🎯 推荐顺序

### 阶段1：验证技术可行性（第1-2周）
1. **ProtonVPN**（免费版）- 先测试技术流程
2. **NordVPN**（30天试用）- 测试速度检测
3. **Surfshark**（30天试用）- 测试流媒体检测

### 阶段2：完整测试（第3-4周）
4. **ExpressVPN**（30天试用）- 测试高端VPN
5. **CyberGhost**（45天试用）- 测试入门级VPN

### 阶段3：正式运营（第5周+）
- 购买正式订阅（2年套餐最划算）
- 申请联盟计划
- 开始真实监控

---

## ⚠️ 注意事项

> [!WARNING]
> **测试频率控制**
> - 不要过于频繁地连接/断开VPN
> - 建议每30分钟测试一次（当前配置）
> - 避免被VPN服务商标记为异常使用

> [!IMPORTANT]
> **联盟计划申请时机**
> - 建议网站有初步流量后再申请（月UV 1000+）
> - 申请时说明是"VPN评测网站"
> - 提供真实的网站链接（vpnspan.com）

> [!TIP]
> **优先级建议**
> - 先用ProtonVPN免费版验证技术
> - 再利用试用期测试其他VPN
> - 最后购买2年套餐节省成本

---

## 📝 下一步TODO

- [ ] 注册ProtonVPN免费账号
- [ ] 下载并测试ProtonVPN客户端
- [ ] 编写真实的VPN连接脚本
- [ ] 测试速度检测功能
- [ ] 依次注册其他VPN试用
- [ ] 完善自动化测试流程
- [ ] 申请联盟计划

---

**更新时间**：2026-02-09  
**下次更新**：购买正式订阅后更新实际价格
