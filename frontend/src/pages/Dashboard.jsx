import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { RefreshCw, Zap, Clock, Globe, CheckCircle, AlertTriangle, XCircle } from 'lucide-react'
import axios from 'axios'

export default function Dashboard() {
    const [vpnData, setVpnData] = useState([])
    const [loading, setLoading] = useState(true)
    const [lastUpdate, setLastUpdate] = useState(null)

    useEffect(() => {
        fetchVPNData()
        // Auto refresh every 5 minutes
        const interval = setInterval(fetchVPNData, 5 * 60 * 1000)
        return () => clearInterval(interval)
    }, [])

    const fetchVPNData = async () => {
        setLoading(true)
        try {
            const response = await axios.get('/api/vpn/status')
            setVpnData(response.data)
            setLastUpdate(new Date())
        } catch (error) {
            console.error('Failed to fetch VPN data:', error)
            // 使用模拟数据（开发阶段）
            setVpnData(getMockData())
            setLastUpdate(new Date())
        } finally {
            setLoading(false)
        }
    }

    const getMockData = () => [
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

    const getStatusIcon = (status) => {
        switch (status) {
            case 'online': return <CheckCircle size={20} color="var(--success)" />
            case 'degraded': return <AlertTriangle size={20} color="var(--warning)" />
            case 'offline': return <XCircle size={20} color="var(--error)" />
            default: return null
        }
    }

    const getSpeedBars = (speed) => {
        const bars = Math.ceil(speed / 20)
        return '⚡'.repeat(bars)
    }

    const getStreamingIcons = (streaming) => {
        return (
            <div style={{ display: 'flex', gap: '4px', fontSize: '0.875rem' }}>
                {streaming.netflix && <span title="Netflix">📺</span>}
                {streaming.youtube && <span title="YouTube">▶️</span>}
                {streaming.disney && <span title="Disney+">🎬</span>}
            </div>
        )
    }

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
            {/* Top Stats Cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2rem'
            }}>
                <StatCard
                    icon={<Globe size={24} />}
                    title="VPNs Monitored"
                    value={vpnData.length}
                    subtitle="Real-time monitoring"
                />
                <StatCard
                    icon={<CheckCircle size={24} />}
                    title="Online Services"
                    value={vpnData.filter(v => v.status === 'online').length}
                    subtitle={`${((vpnData.filter(v => v.status === 'online').length / vpnData.length) * 100).toFixed(0)}% Availability`}
                />
                <StatCard
                    icon={<Zap size={24} />}
                    title="Average Speed"
                    value={`${Math.round(vpnData.reduce((sum, v) => sum + v.speed, 0) / vpnData.length)} Mbps`}
                    subtitle="Global average"
                />
                <StatCard
                    icon={<Clock size={24} />}
                    title="Last Updated"
                    value={lastUpdate ? new Date(lastUpdate).toLocaleTimeString('en-US') : '--'}
                    subtitle={lastUpdate ? `${Math.floor((new Date() - lastUpdate) / 60000)} min ago` : 'Waiting for update'}
                />
            </div>

            {/* Refresh Button */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem'
            }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>VPN Performance Matrix</h2>
                <button
                    onClick={fetchVPNData}
                    disabled={loading}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.75rem 1.5rem',
                        background: 'var(--accent-primary)',
                        color: 'white',
                        borderRadius: '8px',
                        fontSize: '0.95rem',
                        fontWeight: '500',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        opacity: loading ? 0.6 : 1
                    }}
                >
                    <RefreshCw size={18} className={loading ? 'loading' : ''} />
                    {loading ? 'Refreshing...' : 'Refresh Data'}
                </button>
            </div>

            {/* VPN监控表格 */}
            <div style={{
                background: 'var(--bg-secondary)',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: 'var(--shadow)'
            }}>
                <table style={{
                    width: '100%',
                    borderCollapse: 'collapse'
                }}>
                    <thead>
                        <tr style={{
                            background: 'var(--bg-tertiary)',
                            borderBottom: '2px solid var(--border-color)'
                        }}>
                            <th style={thStyle}>Provider</th>
                            <th style={thStyle}>Status</th>
                            <th style={thStyle}>Uptime</th>
                            <th style={thStyle}>Speed</th>
                            <th style={thStyle}>Latency</th>
                            <th style={thStyle}>Nodes</th>
                            <th style={thStyle}>Streaming</th>
                            <th style={thStyle}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vpnData.map((vpn, index) => (
                            <tr key={vpn.id} style={{
                                borderBottom: '1px solid var(--border-color)',
                                transition: 'background 0.2s ease',
                                cursor: 'pointer'
                            }}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-tertiary)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                                <td style={tdStyle}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <span style={{ fontSize: '1.2rem' }}>
                                            {index === 0 ? '🏆' : index === 1 ? '💎' : index === 2 ? '⭐' : '📍'}
                                        </span>
                                        <span style={{ fontWeight: '600' }}>{vpn.name}</span>
                                    </div>
                                </td>
                                <td style={tdStyle}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        {getStatusIcon(vpn.status)}
                                        <span style={{ textTransform: 'capitalize' }}>
                                            {vpn.status === 'online' ? 'Online' : vpn.status === 'degraded' ? 'Degraded' : 'Offline'}
                                        </span>
                                    </div>
                                </td>
                                <td style={tdStyle}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <div style={{
                                            width: '100px',
                                            height: '8px',
                                            background: 'var(--bg-primary)',
                                            borderRadius: '4px',
                                            overflow: 'hidden'
                                        }}>
                                            <div style={{
                                                width: `${vpn.uptime}%`,
                                                height: '100%',
                                                background: vpn.uptime > 95 ? 'var(--success)' : vpn.uptime > 90 ? 'var(--warning)' : 'var(--error)',
                                                transition: 'width 0.3s ease'
                                            }} />
                                        </div>
                                        <span style={{ fontWeight: '600' }}>{vpn.uptime}%</span>
                                    </div>
                                </td>
                                <td style={tdStyle}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <span>{getSpeedBars(vpn.speed)}</span>
                                        <span>{vpn.speed} Mbps</span>
                                    </div>
                                </td>
                                <td style={tdStyle}>
                                    <span style={{
                                        color: vpn.latency < 30 ? 'var(--success)' : vpn.latency < 50 ? 'var(--warning)' : 'var(--error)'
                                    }}>
                                        {vpn.latency}ms
                                    </span>
                                </td>
                                <td style={tdStyle}>
                                    <span>{vpn.nodes.online}/{vpn.nodes.total}</span>
                                </td>
                                <td style={tdStyle}>
                                    {getStreamingIcons(vpn.streaming)}
                                </td>
                                <td style={tdStyle}>
                                    <Link
                                        to={`/vpn/${vpn.id}`}
                                        style={{
                                            padding: '0.5rem 1rem',
                                            background: 'var(--accent-primary)',
                                            color: 'white',
                                            borderRadius: '6px',
                                            fontSize: '0.875rem',
                                            display: 'inline-block'
                                        }}
                                    >
                                        View Details
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Info Section */}
            <div style={{
                marginTop: '2rem',
                padding: '1.5rem',
                background: 'var(--bg-secondary)',
                borderRadius: '8px',
                borderLeft: '4px solid var(--accent-primary)'
            }}>
                <h3 style={{ marginBottom: '0.75rem', fontSize: '1.1rem' }}>📊 About Monitoring Data</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                    VPNSpan automatically tests all VPN services every 30 minutes. Data includes connection speed, latency, node availability, and streaming unblocking capabilities.
                    All tests are conducted in real network environments with objective and unbiased results. Click "View Details" for 24-hour performance trend charts.
                </p>
            </div>
        </div>
    )
}

function StatCard({ icon, title, value, subtitle }) {
    return (
        <div style={{
            background: 'var(--bg-secondary)',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: 'var(--shadow)',
            border: '1px solid var(--border-color)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                <div style={{ color: 'var(--accent-primary)' }}>{icon}</div>
                <h3 style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', fontWeight: '500' }}>{title}</h3>
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>{value}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{subtitle}</div>
        </div>
    )
}

const thStyle = {
    padding: '1rem',
    textAlign: 'left',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: 'var(--text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
}

const tdStyle = {
    padding: '1.25rem 1rem',
    fontSize: '0.95rem'
}
