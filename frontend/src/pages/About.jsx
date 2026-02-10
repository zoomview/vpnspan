import { Shield, Target, BarChart3, Zap } from 'lucide-react'

export default function About() {
    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '3rem 2rem' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center' }}>
                关于 VPN<span style={{ color: 'var(--accent-primary)' }}>Span</span>
            </h1>
            <p style={{
                fontSize: '1.1rem',
                color: 'var(--text-secondary)',
                textAlign: 'center',
                marginBottom: '3rem',
                maxWidth: '700px',
                margin: '0 auto 3rem'
            }}>
                实时监控全球VPN服务性能，帮助您做出明智的选择
            </p>

            {/* 特点卡片 */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '2rem',
                marginBottom: '3rem'
            }}>
                <FeatureCard
                    icon={<BarChart3 size={32} />}
                    title="实时监控"
                    description="每30分钟自动测试所有VPN服务，提供最新的性能数据"
                />
                <FeatureCard
                    icon={<Target size={32} />}
                    title="客观中立"
                    description="基于真实测试数据，不受任何VPN厂商影响，保持独立性"
                />
                <FeatureCard
                    icon={<Shield size={32} />}
                    title="全面评估"
                    description="监控速度、延迟、稳定性、流媒体解锁等多个维度"
                />
                <FeatureCard
                    icon={<Zap size={32} />}
                    title="历史趋势"
                    description="提供24小时性能曲线，帮助识别服务质量波动"
                />
            </div>

            {/* 测试方法论 */}
            <section style={{
                background: 'var(--bg-secondary)',
                padding: '2rem',
                borderRadius: '12px',
                marginBottom: '2rem',
                border: '1px solid var(--border-color)'
            }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>🔬 测试方法论</h2>
                <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                    <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
                        监控频率
                    </h3>
                    <p>我们每30分钟对所有VPN服务进行一次完整测试，确保数据的时效性。</p>

                    <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
                        测试指标
                    </h3>
                    <ul style={{ paddingLeft: '2rem', marginTop: '0.5rem' }}>
                        <li><strong>连接速度</strong>：使用官方VPN客户端连接，测量建立连接所需时间</li>
                        <li><strong>下载速度</strong>：通过speedtest-cli测试实际下载带宽</li>
                        <li><strong>延迟测试</strong>：ping多个目标服务器，计算平均往返时间</li>
                        <li><strong>节点可用性</strong>：测试各地区节点的在线状态</li>
                        <li><strong>流媒体解锁</strong>：检测Netflix、YouTube等平台的访问能力</li>
                    </ul>

                    <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
                        测试环境
                    </h3>
                    <p>
                        所有测试在真实的网络环境下进行，测试服务器位于美国、新加坡等多个地区，
                        模拟不同地理位置用户的实际使用体验。
                    </p>
                </div>
            </section>

            {/* FAQ */}
            <section style={{
                background: 'var(--bg-secondary)',
                padding: '2rem',
                borderRadius: '12px',
                marginBottom: '2rem',
                border: '1px solid var(--border-color)'
            }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>❓ 常见问题</h2>

                <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                    <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                        数据多久更新一次？
                    </h3>
                    <p style={{ marginBottom: '1.5rem' }}>
                        我们每30分钟进行一次全面测试，页面会自动刷新显示最新数据。
                    </p>

                    <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                        如何保证测试的公正性？
                    </h3>
                    <p style={{ marginBottom: '1.5rem' }}>
                        VPNSpan是完全独立的第三方监控平台，不接受任何VPN厂商的赞助或付费推广。
                        所有测试数据基于真实测量，公开透明。
                    </p>

                    <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                        测试结果代表我的实际使用体验吗？
                    </h3>
                    <p style={{ marginBottom: '1.5rem' }}>
                        测试结果反映了我们测试节点的体验，由于网络环境、地理位置、ISP等因素的差异，
                        您的实际体验可能会有所不同。建议将测试数据作为参考，并结合VPN服务商的试用期自行测试。
                    </p>

                    <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                        为什么没有我使用的VPN？
                    </h3>
                    <p>
                        我们目前监控主流的商业VPN服务。如果您希望我们添加特定的VPN服务，
                        请通过邮件联系我们：<a href="mailto:hello@vpnspan.com">hello@vpnspan.com</a>
                    </p>
                </div>
            </section>

            {/* 联系方式 */}
            <div style={{
                textAlign: 'center',
                padding: '2rem',
                background: 'var(--bg-secondary)',
                borderRadius: '12px',
                border: '1px solid var(--border-color)'
            }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>📧 联系我们</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                    有任何问题或建议，欢迎与我们联系
                </p>
                <a
                    href="mailto:hello@vpnspan.com"
                    style={{
                        display: 'inline-block',
                        padding: '0.75rem 2rem',
                        background: 'var(--accent-primary)',
                        color: 'white',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        fontWeight: '500',
                        textDecoration: 'none'
                    }}
                >
                    hello@vpnspan.com
                </a>
            </div>
        </div>
    )
}

function FeatureCard({ icon, title, description }) {
    return (
        <div style={{
            background: 'var(--bg-secondary)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid var(--border-color)',
            textAlign: 'center'
        }}>
            <div style={{
                color: 'var(--accent-primary)',
                marginBottom: '1rem',
                display: 'flex',
                justifyContent: 'center'
            }}>
                {icon}
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', fontWeight: '600' }}>
                {title}
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                {description}
            </p>
        </div>
    )
}
