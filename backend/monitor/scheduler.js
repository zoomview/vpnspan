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
        description: 'Industry benchmark, fastest speed, best reputation',
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
        description: 'Largest user base, many nodes, great for streaming',
        affiliateCommission: 40,
        enabled: false  // 暂时禁用，等配置后再启用
    },
{
        id: 'surfshark',
        name: 'Surfshark',
        website: 'https://surfshark.com',
        tier: 'budget',
        monthlyPrice: 1.99,
        description: 'Best value, unlimited devices, popular with youth',
        affiliateCommission: 30,
        configFile: process.env.SURFSHARK_OVPN_PATH || '/etc/openvpn/us-lax.prod.surfshark.com_tcp.ovpn',
        username: process.env.SURFSHARK_USER || '',
        password: process.env.SURFSHARK_PASS || '',
        enabled: true
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
async function initScheduler() {
    ensureDataDirs()

    console.log('🚀 VPNSpan Monitoring Scheduler Started')
    console.log('⏰ Schedule: Every 30 minutes')
    console.log('📊 Monitoring VPNs:', VPN_CONFIGS.map(c => c.name).join(', '))

    // 立即运行一次
    await runMonitoring()

    // 每30分钟运行一次 (cron: 0,30 * * * *)
    cron.schedule('0,30 * * * *', () => {
        runMonitoring()
    })

    console.log('\n✅ Scheduler is running. Press Ctrl+C to stop.\n')
}

// 如果是直接运行此脚本，则启动调度器
if (process.argv[1] === fileURLToPath(import.meta.url)) {
    initScheduler()
}

export { initScheduler }
