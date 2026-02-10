// 临时使用模拟数据测试
// 将此代码添加到 backend/monitor/vpn-tester.js 的开头

// ========== 临时配置：使用模拟数据 ==========
const USE_MOCK_DATA = true  // 改为 true 使用模拟数据，false 使用真实测试
// ===========================================

export async function testVPN(config) {
    // 如果启用模拟数据，直接返回模拟结果
    if (USE_MOCK_DATA) {
        console.log(`\n🔍 测试 ${config.name}（模拟模式）...`)
        await sleep(2000)  // 模拟测试时间

        return {
            id: config.id,
            name: config.name,
            status: Math.random() > 0.15 ? 'online' : 'degraded',
            uptime: 88 + Math.random() * 10,
            speed: Math.round(70 + Math.random() * 30),
            latency: Math.round(20 + Math.random() * 40),
            nodes: {
                online: Math.floor(40 + Math.random() * 10),
                total: Math.floor(45 + Math.random() * 8)
            },
            streaming: {
                netflix: Math.random() > 0.3,
                youtube: true,
                disney: Math.random() > 0.5
            },
            connectionTime: Math.floor(3000 + Math.random() * 2000),
            vpnIP: `10.96.0.${Math.floor(Math.random() * 255)}`,
            lastChecked: new Date().toISOString()
        }
    }

    // 以下是原有的真实测试代码...
    console.log(`\n🔍 开始测试 ${config.name}...`)
    // ... (保持原有代码不变)
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
