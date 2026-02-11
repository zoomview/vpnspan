import { Shield, Target, BarChart3, Zap } from 'lucide-react'

export default function About() {
    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '3rem 2rem' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center' }}>
                About VPN<span style={{ color: 'var(--accent-primary)' }}>Span</span>
            </h1>
            <p style={{
                fontSize: '1.1rem',
                color: 'var(--text-secondary)',
                textAlign: 'center',
                marginBottom: '3rem',
                maxWidth: '700px',
                margin: '0 auto 3rem'
            }}>
                Real-time monitoring of global VPN service performance to help you make informed decisions
            </p>

            {/* Feature Cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '2rem',
                marginBottom: '3rem'
            }}>
                <FeatureCard
                    icon={<BarChart3 size={32} />}
                    title="Real-time Monitoring"
                    description="Automatically test all VPN services every 30 minutes, providing the latest performance data"
                />
                <FeatureCard
                    icon={<Target size={32} />}
                    title="Objective & Unbiased"
                    description="Based on real test data, independent from any VPN vendor influence"
                />
                <FeatureCard
                    icon={<Shield size={32} />}
                    title="Comprehensive  Assessment"
                    description="Monitor multiple dimensions including speed, latency, stability, and streaming unblocking"
                />
                <FeatureCard
                    icon={<Zap size={32} />}
                    title="Historical Trends"
                    description="Provide 24-hour performance curves to help identify service quality fluctuations"
                />
            </div>

            {/* Testing Methodology */}
            <section style={{
                background: 'var(--bg-secondary)',
                padding: '2rem',
                borderRadius: '12px',
                marginBottom: '2rem',
                border: '1px solid var(--border-color)'
            }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>🔬 Testing Methodology</h2>
                <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                    <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
                        Monitoring Frequency
                    </h3>
                    <p>We conduct a complete test of all VPN services every 30 minutes to ensure data timeliness.</p>

                    <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
                        Test Metrics
                    </h3>
                    <ul style={{ paddingLeft: '2rem', marginTop: '0.5rem' }}>
                        <li><strong>Connection Speed</strong>: Measure time required to establish connection using official VPN clients</li>
                        <li><strong>Download Speed</strong>: Test actual download bandwidth via speedtest-cli</li>
                        <li><strong>Latency Test</strong>: Ping multiple target servers and calculate average round-trip time</li>
                        <li><strong>Node Availability</strong>: Test online status of nodes in various regions</li>
                        <li><strong>Streaming Unblocking</strong>: Check access capability to Netflix, YouTube and other platforms</li>
                    </ul>

                    <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
                        Test Environment
                    </h3>
                    <p>
                        All tests are conducted in real network environments. Test servers are located in multiple regions including the United States and Singapore,
                        simulating actual user experiences from different geographic locations.
                    </p>
                </div>
            </section>

            {/* Affiliate Disclosure */}
            <section style={{
                background: 'var(--bg-secondary)',
                padding: '2rem',
                borderRadius: '12px',
                marginBottom: '2rem',
                border: '1px solid #f59e0b',
                borderLeft: '4px solid #f59e0b'
            }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>⚠️ Affiliate Disclosure</h2>
                <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                    <p style={{ marginBottom: '1rem' }}>
                        VPNSpan contains affiliate links. When you purchase VPN services through our links,
                        we may earn a commission at no additional cost to you.
                    </p>
                    <p style={{ marginBottom: '1rem' }}>
                        <strong>Our Commitment:</strong> We only recommend VPN services that we have actually tested.
                        All performance data is based on real measurements and is objective and transparent.
                        Affiliate partnerships do not influence our testing results or recommendations.
                    </p>
                    <p>
                        This site complies with FTC guidelines for affiliate disclosures and maintains editorial independence.
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
                <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>❓ Frequently Asked Questions</h2>

                <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                    <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                        How often is data updated?
                    </h3>
                    <p style={{ marginBottom: '1.5rem' }}>
                        We conduct comprehensive tests every 30 minutes, and the page automatically refreshes to display the latest data.
                    </p>

                    <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                        How do you ensure testing fairness?
                    </h3>
                    <p style={{ marginBottom: '1.5rem' }}>
                        VPNSpan is a completely independent third-party monitoring platform and does not accept any sponsorship or paid promotion from VPN vendors.
                        All test data is based on real measurements and is open and transparent.
                    </p>

                    <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                        Do test results represent my actual usage experience?
                    </h3>
                    <p style={{ marginBottom: '1.5rem' }}>
                        Test results reflect the experience from our test nodes. Due to differences in network environment, geographic location, ISP and other factors,
                        your actual experience may vary. We recommend using test data as a reference and testing yourself during VPN service trial periods.
                    </p>

                    <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                        Why isn't my VPN listed?
                    </h3>
                    <p>
                        We currently monitor mainstream commercial VPN services. If you would like us to add a specific VPN service,
                        please contact us via email: <a href="mailto:contact@vpnspan.com" style={{ color: 'var(--accent-primary)' }}>contact@vpnspan.com</a>
                    </p>
                </div>
            </section>

            {/* Contact */}
            <div style={{
                textAlign: 'center',
                padding: '2rem',
                background: 'var(--bg-secondary)',
                borderRadius: '12px',
                border: '1px solid var(--border-color)'
            }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>📧 Contact Us</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                    Have any questions or suggestions? Feel free to contact us
                </p>
                <a
                    href="mailto:contact@vpnspan.com"
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
                    contact@vpnspan.com
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
