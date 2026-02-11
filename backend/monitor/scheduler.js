import cron from 'node-cron'
import { testVPN } from './vpn-tester.js'
import fs from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

dotenv.config({ path: join(dirname(fileURLToPath(import.meta.url)), '..', '.env') })

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const DATA_DIR = join(dirname(__dirname), 'data')
const STATUS_FILE = join(DATA_DIR, 'vpn-status.json')
const HISTORY_DIR = join(DATA_DIR, 'history')

// VPN配置列表
// 推荐的5个主流VPN服务商，覆盖高中低端市场
const VPN_CONFIGS = [
    {
        id: 'expressvpn',
        name: 'ExpressVPN',
        website: 'https://www.expressvpn.com',
        tier: 'premium',          // 定位：高端
        monthlyPrice: 12.95,      // 美元
        description: '行业标杆，速度最快，口碑最好',
        affiliateCommission: 50,  // 每单佣金约$50
        enabled: false,  // 暂时禁用，等配置后再启用
        // 未来扩展：添加测试凭证
        // username: '',
        // password: '',
        // configFile: ''
    },
    {
        id: 'nordvpn',
        name: 'NordVPN',
        website: 'https://nordvpn.com',
        tier: 'premium',
        monthlyPrice: 11.99,
        description: '用户量最大，节点多，适合流媒体',
        affiliateCommission: 40,
        enabled: false  // 暂时禁用，等配置后再启用
    },
    {
        id: 'surfshark',
        name: 'Surfshark',
        website: 'https://surfshark.com',
        tier: 'budget',           // 定位：性价比
        monthlyPrice: 1.99,
        description: '性价比之王，无限设备，年轻用户喜爱',
        affiliateCommission: 30,
        configFile: process.env.SURFSHARK_OVPN_PATH || '/etc/openvpn/surfshark/us-nyc.prod.surfshark.com_tcp.ovpn',
        username: process.env.SURFSHARK_USER || '',
        password: process.env.SURFSHARK_PASS || '',
        enabled: !!(process.env.SURFSHARK_USER && process.env.SURFSHARK_PASS)
    },
    {
        id: 'protonvpn',
        name: 'ProtonVPN',
        website: 'https://protonvpn.com',
        tier: 'mid-range',        // 定位：中端
        monthlyPrice: 9.99,
        description: '隐私为主，瑞士法律，技术派首选',
        affiliateCommission: 20,
        configFile: process.env.PROTONVPN_OVPN_PATH || '/etc/openvpn/protonvpn/us-free-110.protonvpn.tcp.ovpn',
        username: process.env.PROTONVPN_USER || '',
        password: process.env.PROTONVPN_PASS || '',
        enabled: !!(process.env.PROTONVPN_USER && process.env.PROTONVPN_PASS)
    },
    {
        id: 'cyberghost',
        name: 'CyberGhost',
        website: 'https://www.cyberghostvpn.com',
        tier: 'budget',
        monthlyPrice: 2.19,
        description: '节点最多，价格便宜，适合入门',
        affiliateCommission: 25,
        enabled: false  // 暂时禁用，等配置后再启用
    }
]

// 确保数据目录存在
function ensureDataDirs() {
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true })
    }
    if (!fs.existsSync(HISTORY_DIR)) {
        fs.mkdirSync(HISTORY_DIR, { recursive: true })
    }
}

// 保存VPN状态
function saveVPNStatus(results) {
    try {
        fs.writeFileSync(STATUS_FILE, JSON.stringify(results, null, 2))
        console.log(`✅ Saved status for ${results.length} VPNs`)
    } catch (error) {
        console.error('Error saving VPN status:', error)
    }
}

// 保存历史数据
function saveVPNHistory(vpnId, data) {
    try {
        const historyFile = join(HISTORY_DIR, `${vpnId}.json`)
        let history = []

        // 读取现有历史
        if (fs.existsSync(historyFile)) {
            const existing = fs.readFileSync(historyFile, 'utf8')
            history = JSON.parse(existing)
        }

        // 添加新数据点
        history.push({
            time: new Date().toISOString(),
            speed: data.speed,
            latency: data.latency,
            uptime: data.uptime
        })

        // 只保留最近7天的数据（7 * 24 * 2 = 336个数据点，每30分钟一个）
        if (history.length > 336) {
            history = history.slice(-336)
        }

        fs.writeFileSync(historyFile, JSON.stringify(history, null, 2))
    } catch (error) {
        console.error(`Error saving history for ${vpnId}:`, error)
    }
}

// 运行监控任务
async function runMonitoring() {
    console.log(`\n🔍 Starting VPN monitoring at ${new Date().toLocaleString()}`)

    const results = []

    for (const config of VPN_CONFIGS) {
        if (!config.enabled) {
            console.log(`⏭️  Skipping ${config.name} (disabled)`)
            continue
        }

        console.log(`📡 Testing ${config.name}...`)

        try {
            const result = await testVPN(config)
            results.push(result)

            // 保存历史数据
            saveVPNHistory(config.id, result)

            console.log(`✅ ${config.name}: ${result.status} | Speed: ${result.speed}Mbps | Latency: ${result.latency}ms`)
        } catch (error) {
            console.error(`❌ Error testing ${config.name}:`, error.message)

            // 记录失败状态
            results.push({
                id: config.id,
                name: config.name,
                status: 'offline',
                uptime: 0,
                speed: 0,
                latency: 0,
                nodes: { online: 0, total: 0 },
                streaming: { netflix: false, youtube: false, disney: false },
                lastChecked: new Date().toISOString(),
                error: error.message
            })
        }
    }

    // 保存所有结果
    saveVPNStatus(results)

    console.log(`\n✨ Monitoring completed. Tested ${results.length} VPNs`)
}

// 初始化调度器
function initScheduler() {
    ensureDataDirs()

    console.log('🚀 VPNSpan Monitoring Scheduler Started')
    console.log('⏰ Schedule: Every 30 minutes')
    console.log('📊 Monitoring VPNs:', VPN_CONFIGS.map(c => c.name).join(', '))

    // 立即运行一次
    runMonitoring()

    // 每30分钟运行一次 (cron: 0,30 * * * *)
    cron.schedule('0,30 * * * *', () => {
        runMonitoring()
    })

    console.log('\n✅ Scheduler is running. Press Ctrl+C to stop.\n')
}

// 启动调度器
initScheduler()
