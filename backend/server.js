import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fs from 'fs'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 使用动态路径 - 本地开发用 __dirname，生产环境用绝对路径
const isProduction = process.env.NODE_ENV === 'production'
const APP_ROOT = isProduction 
    ? '/var/www/vpnspan/backend' 
    : __dirname

const app = express()
const PORT = process.env.PORT || 5000

// 启动服务器
app.listen(PORT, () => {
    console.log(`🚀 VPNSpan API server running on http://localhost:${PORT}`)
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`)
})

// 中间件
app.use(cors())
app.use(express.json())

// 数据文件路径 - 使用绝对路径
const DATA_DIR = join(APP_ROOT, 'data')
const STATUS_FILE = join(DATA_DIR, 'vpn-status.json')
const HISTORY_DIR = join(DATA_DIR, 'history')

// 确保数据目录存在
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
}
if (!fs.existsSync(HISTORY_DIR)) {
    fs.mkdirSync(HISTORY_DIR, { recursive: true })
}

// 读取VPN状态数据
function readVPNStatus() {
    try {
        if (fs.existsSync(STATUS_FILE)) {
            const data = fs.readFileSync(STATUS_FILE, 'utf8')
            return JSON.parse(data)
        }
    } catch (error) {
        console.error('Error reading VPN status:', error)
    }

    // 返回示例数据
    return [
        {
            id: 'expressvpn',
            name: 'ExpressVPN',
            status: 'online',
            uptime: 98.5,
            speed: 95,
            latency: 18,
            nodes: { online: 50, total: 52 },
            streaming: { netflix: true, youtube: true, disney: true },
            lastChecked: new Date().toISOString()
        },
        {
            id: 'nordvpn',
            name: 'NordVPN',
            status: 'online',
            uptime: 96.8,
            speed: 88,
            latency: 25,
            nodes: { online: 38, total: 40 },
            streaming: { netflix: true, youtube: true, disney: true },
            lastChecked: new Date().toISOString()
        },
        {
            id: 'surfshark',
            name: 'Surfshark',
            status: 'degraded',
            uptime: 92.3,
            speed: 75,
            latency: 42,
            nodes: { online: 25, total: 28 },
            streaming: { netflix: true, youtube: true, disney: false },
            lastChecked: new Date().toISOString()
        },
        {
            id: 'protonvpn',
            name: 'ProtonVPN',
            status: 'online',
            uptime: 94.2,
            speed: 82,
            latency: 32,
            nodes: { online: 18, total: 20 },
            streaming: { netflix: true, youtube: true, disney: true },
            lastChecked: new Date().toISOString()
        },
        {
            id: 'cyberghost',
            name: 'CyberGhost',
            status: 'degraded',
            uptime: 88.5,
            speed: 68,
            latency: 55,
            nodes: { online: 22, total: 30 },
            streaming: { netflix: false, youtube: true, disney: false },
            lastChecked: new Date().toISOString()
        }
    ]
}

// 读取VPN历史数据
function readVPNHistory(vpnId) {
    const historyFile = join(HISTORY_DIR, `${vpnId}.json`)
    console.log('Reading history from:', historyFile)
    try {
        if (fs.existsSync(historyFile)) {
            const data = fs.readFileSync(historyFile, 'utf8')
            const history = JSON.parse(data)
            console.log(`Loaded ${history.length} history records for ${vpnId}`)
            return history
        } else {
            console.log('History file not found:', historyFile)
        }
    } catch (error) {
        console.error(`Error reading history for ${vpnId}: `, error)
    }

    // 返回空数组而不是mock数据
    return []
}

// API 路由

// 获取所有VPN状态
app.get('/api/vpn/status', (req, res) => {
    try {
        const status = readVPNStatus()
        res.json(status)
    } catch (error) {
        console.error('Error in /api/vpn/status:', error)
        res.status(500).json({ error: 'Failed to fetch VPN status' })
    }
})

// 获取单个VPN详细信息
app.get('/api/vpn/:id', (req, res) => {
    try {
        const { id } = req.params
        const allVPNs = readVPNStatus()
        const vpn = allVPNs.find(v => v.id === id)

        if (!vpn) {
            return res.status(404).json({ error: 'VPN not found' })
        }

        const history = readVPNHistory(id)

        // 构建详细信息
        const detail = {
            id: vpn.id,
            name: vpn.name,
            currentStats: {
                uptime: vpn.uptime,
                speed: vpn.speed,
                latency: vpn.latency,
                status: vpn.status
            },
            history24h: history,
            nodes: {
                total: vpn.nodes.total,
                online: vpn.nodes.online,
                locations: ['United States', 'United Kingdom', 'Japan', 'Singapore', 'Germany', 'Canada', 'Australia', 'France']
            },
            streaming: {
                ...vpn.streaming,
                hulu: false,
                bbc: true
            },
            protocols: ['OpenVPN', 'WireGuard', 'IKEv2'],
            pricing: {
                monthly: 12.95,
                yearly: 99.95,
                currency: 'USD'
            },
            lastChecked: vpn.lastChecked
        }

        res.json(detail)
    } catch (error) {
        console.error(`Error in /api/vpn / ${req.params.id}: `, error)
        res.status(500).json({ error: 'Failed to fetch VPN details' })
    }
})

// 健康检查
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    })
})

// 404处理
app.use((req, res) => {
    res.status(404).json({ error: 'Not found' })
})

// 错误处理
app.use((err, req, res, next) => {
    console.error('Server error:', err)
    res.status(500).json({ error: 'Internal server error' })
})

// 启动服务器
app.listen(PORT, () => {
    console.log(`🚀 VPNSpan API server running on http://localhost:${PORT}`)
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`)
})

export default app
