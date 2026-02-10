// ProtonVPN配置模板
// 将此文件复制内容到 backend/monitor/scheduler.js 中对应的ProtonVPN配置部分

{
    id: 'protonvpn',
        name: 'ProtonVPN',
            website: 'https://protonvpn.com',
                tier: 'mid-range',
                    monthlyPrice: 9.99,
                        description: '隐私为主，瑞士法律，技术派首选',
                            affiliateCommission: 20,

                                // ========== 配置这里 ==========
                                // 1. 从 https://account.protonvpn.com/downloads 下载.ovpn文件
                                // 2. 将文件保存到 C:\vpn-configs\
                                // 3. 将下面的路径改为你实际的文件名
                                configFile: 'C:/vpn-configs/us-free-01.protonvpn.udp.ovpn',

                                    // 4. 从 https://account.protonvpn.com/downloads 获取OpenVPN凭证
                                    // 5. 用户名格式：xxxxxx+f1 或 username+pmp（包含+后缀）
                                    username: 'YOUR_OPENVPN_USERNAME+f1',  // ← 替换这里

                                        // 6. 密码不是网页登录密码，是专门的OpenVPN密码
                                        password: 'YOUR_OPENVPN_PASSWORD',     // ← 替换这里
                                            // ===============================

                                            enabled: true
}

/* 
配置步骤：
1. ✅ 已创建 C:\vpn-configs 文件夹
2. ⏳ 下载ProtonVPN的.ovpn配置文件到该文件夹
3. ⏳ 获取OpenVPN凭证（不是网页密码！）
4. ⏳ 复制上面的配置替换scheduler.js中的对应部分
5. ⏳ 运行 npm run monitor 测试

详细步骤见：PROTONVPN_SETUP.md
*/
