import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Zap, Clock, Globe, TrendingUp, Activity } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import axios from 'axios'

export default function VPNDetail() {
    const { id } = useParams()
    const [vpnData, setVpnData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchVPNDetail()
    }, [id])

    const fetchVPNDetail = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`/api/vpn/${id}`)
            setVpnData(response.data)
        } catch (error) {
            console.error('Failed to fetch VPN detail:', error)
            // 使用模拟数据
            setVpnData(getMockDetail(id))
        } finally {
            setLoading(false)
        }
    }

    const getMockDetail = (vpnId) => {
        const baseData = {
            expressvpn: { name: 'ExpressVPN', uptime: 98.5, speed: 95, latency: 18 },
            nordvpn: { name: 'NordVPN', uptime: 96.8, speed: 88, latency: 25 },
            surfshark: { name: 'Surfshark', uptime: 92.3, speed: 75, latency: 42 },
            protonvpn: { name: 'ProtonVPN', uptime: 94.2, speed: 82, latency: 32 },
            cyberghost: { name: 'CyberGhost', uptime: 88.5, speed: 68, latency: 55 }
        }

        const info = baseData[vpnId] || baseData.expressvpn

        // 生成24小时模拟数据
        const history = []
        for (let i = 23; i >= 0; i--) {
            const hour = new Date()
            hour.setHours(hour.getHours() - i)
            history.push({
                time: hour.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
                speed: info.speed + Math.random() * 20 - 10,
                latency: info.latency + Math.random() * 10 - 5,
                uptime: info.uptime + Math.random() * 2 - 1
            })
        }

        return {
            id: vpnId,
            name: info.name,
            currentStats: {
                uptime: info.uptime,
                speed: info.speed,
                latency: info.latency,
                status: 'online'
            },
            history24h: history,
            nodes: {
                total: 52,
                online: 50,
                locations: ['美国', '英国', '日本', '新加坡', '德国', '加拿大', '澳大利亚', '法国']
            },
            streaming: {
                netflix: true,
                youtube: true,
                disney: true,
                hulu: false,
                bbc: true
            },
            protocols: ['OpenVPN', 'WireGuard', 'IKEv2'],
            pricing: {
                monthly: 12.95,
                yearly: 99.95,
                currency: 'USD'
            }
        }
    }

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '60vh',
                fontSize: '1.2rem',
                color: 'var(--text-secondary)'
            }}>
                <Activity className="loading" size={32} style={{ marginRight: '1rem' }} />
                Loading...
            </div>
        )
    }

    if (!vpnData) {
        return <div style={{ padding: '2rem', textAlign: 'center' }}>VPN data not found</div>
    }

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
            {/* Back button */}
            <Link to="/" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1.5rem',
                color: 'var(--text-secondary)',
                fontSize: '0.95rem'
            }}>
                <ArrowLeft size={18} />
                Back to Dashboard
            </Link>

            {/* Title */}
            <h1 style={{ fontSize: '2rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {vpnData.name}
                <span style={{
                    fontSize: '0.875rem',
                    padding: '0.25rem 0.75rem',
                    background: 'var(--success)',
                    color: 'white',
                    borderRadius: '12px'
                }}>
                    Online
                </span>
            </h1>

            {/* Current Stats Cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2rem'
            }}>
                <MetricCard
                    icon={<TrendingUp size={24} />}
                    title="Uptime"
                    value={`${vpnData.currentStats.uptime.toFixed(1)}%`}
                    subtitle="Last 24 hours"
                    color="var(--success)"
                />
                <MetricCard
                    icon={<Zap size={24} />}
                    title="Avg Speed"
                    value={`${vpnData.currentStats.speed} Mbps`}
                    subtitle="Download speed"
                    color="var(--accent-primary)"
                />
                <MetricCard
                    icon={<Clock size={24} />}
                    title="Latency"
                    value={`${vpnData.currentStats.latency}ms`}
                    subtitle="Average response time"
                    color="var(--warning)"
                />
                <MetricCard
                    icon={<Globe size={24} />}
                    title="Node Status"
                    value={`${vpnData.nodes.online}/${vpnData.nodes.total}`}
                    subtitle="Online nodes"
                    color="var(--success)"
                />
            </div>

            {/* 24-Hour Performance Charts */}
            <div style={{
                background: 'var(--bg-secondary)',
                borderRadius: '12px',
                padding: '1.5rem',
                marginBottom: '2rem',
                boxShadow: 'var(--shadow)'
            }}>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>24-Hour Performance Trends</h2>

                {/* Speed Chart */}
                <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        Download Speed (Mbps)
                    </h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={vpnData.history24h}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                            <XAxis
                                dataKey="time"
                                stroke="var(--text-muted)"
                                tick={{ fill: 'var(--text-muted)' }}
                            />
                            <YAxis
                                stroke="var(--text-muted)"
                                tick={{ fill: 'var(--text-muted)' }}
                            />
                            <Tooltip
                                contentStyle={{
                                    background: 'var(--bg-tertiary)',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '8px',
                                    color: 'var(--text-primary)'
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey="speed"
                                stroke="var(--accent-primary)"
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Latency Chart */}
                <div>
                    <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        Latency (ms)
                    </h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={vpnData.history24h}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                            <XAxis
                                dataKey="time"
                                stroke="var(--text-muted)"
                                tick={{ fill: 'var(--text-muted)' }}
                            />
                            <YAxis
                                stroke="var(--text-muted)"
                                tick={{ fill: 'var(--text-muted)' }}
                            />
                            <Tooltip
                                contentStyle={{
                                    background: 'var(--bg-tertiary)',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '8px',
                                    color: 'var(--text-primary)'
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey="latency"
                                stroke="var(--warning)"
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Detailed Information */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.5rem'
            }}>
                {/* Node Distribution */}
                <InfoCard title="Node Distribution">
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {vpnData.nodes.locations.map(loc => (
                            <span key={loc} style={{
                                padding: '0.5rem 1rem',
                                background: 'var(--bg-tertiary)',
                                borderRadius: '20px',
                                fontSize: '0.875rem'
                            }}>
                                {loc}
                            </span>
                        ))}
                    </div>
                </InfoCard>

                {/* Streaming Support */}
                <InfoCard title="Streaming Unblocking">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                        {Object.entries(vpnData.streaming).map(([platform, supported]) => (
                            <div key={platform} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}>
                                <span style={{
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    background: supported ? 'var(--success)' : 'var(--error)'
                                }} />
                                <span style={{ textTransform: 'capitalize' }}>{platform}</span>
                            </div>
                        ))}
                    </div>
                </InfoCard>

                {/* Supported Protocols */}
                <InfoCard title="Supported Protocols">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {vpnData.protocols.map(protocol => (
                            <div key={protocol} style={{
                                padding: '0.75rem',
                                background: 'var(--bg-tertiary)',
                                borderRadius: '6px',
                                fontSize: '0.95rem'
                            }}>
                                {protocol}
                            </div>
                        ))}
                    </div>
                </InfoCard>
            </div>
        </div>
    )
}

function MetricCard({ icon, title, value, subtitle, color }) {
    return (
        <div style={{
            background: 'var(--bg-secondary)',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: 'var(--shadow)',
            border: '1px solid var(--border-color)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                <div style={{ color }}>{icon}</div>
                <h3 style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', fontWeight: '500' }}>{title}</h3>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.25rem', color }}>{value}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{subtitle}</div>
        </div>
    )
}

function InfoCard({ title, children }) {
    return (
        <div style={{
            background: 'var(--bg-secondary)',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: 'var(--shadow)',
            border: '1px solid var(--border-color)'
        }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', fontWeight: '600' }}>{title}</h3>
            {children}
        </div>
    )
}
